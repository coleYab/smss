package user

import (
	"fmt"
	"net/http"

	"github.com/coleYab/ecommerce_go/config"
	"github.com/coleYab/ecommerce_go/middleware"
	"github.com/coleYab/ecommerce_go/service/auth"
	"github.com/coleYab/ecommerce_go/types"
	"github.com/coleYab/ecommerce_go/utils"
	"github.com/go-playground/validator"
	"github.com/gorilla/mux"
)

type Handler struct {
	store types.UserStore
}

func NewHandler(store types.UserStore) *Handler {
	return &Handler{
		store: store,
	}
}

func (h *Handler) registerUser(w http.ResponseWriter, r *http.Request) {
	// read the payload and parse the payload
	var userPayload types.RegisterUserPayload
	if err := utils.ParseJson(r, &userPayload); err != nil {
		// write a bad reqeuest to the standard writer
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// validate the input here and also handle the error here generated from validtion
	if err := utils.Validator.Struct(userPayload); err != nil {
		errz := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest,
			fmt.Errorf("request validation failed with %v", errz))
		return
	}

	// check if the user with the same email exists
	_, err := h.store.GetUserByEmail(userPayload.Email)
	if err == nil { // if the user exists
		utils.WriteError(w, http.StatusBadRequest,
			fmt.Errorf("user with the email %s already exists", userPayload.Email))
		return
	}

	hashedPassword, err := auth.HashPassword(userPayload.Password)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	userPayload.Password = hashedPassword

	// create the new user
	id, err := h.store.CreateUser(userPayload)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJson(w, http.StatusCreated,
		map[string]string{"id": id.String()},
	)
}

// Completed the login and also the token generation now the only thing left is valiation
// by using role and middleware for all the authorized endpoints
func (h *Handler) loginUser(w http.ResponseWriter, r *http.Request) {
	// read the payload parse the payload
	var loginPayload types.LoginUserPayload
	if err := utils.ParseJson(r, &loginPayload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// validate the request because that might be invalid
	if err := utils.Validator.Struct(loginPayload); err != nil {
		errz := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest,
			fmt.Errorf("request validation failed with %v", errz))
		return
	}

	// get the user by email then validate against the password
	user, err := h.store.GetUserByEmail(loginPayload.Email)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid email or password"))
		return
	}

	if err := auth.ComparePassword(user.Password, loginPayload.Password); err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid email or password"))
		return
	}

	// add jwt token
	token, err := auth.CreateJWTToken(config.Envs.JwtSecret, user.ID, user.Role)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, fmt.Errorf("token generation failed"))
		return
	}
	// Set the cookie in the response
	cookie := &http.Cookie{
		Name:     "jwt",                // Cookie name
		Value:    token,                // JWT token
		MaxAge:   3500,                 // Cookie expiration time in seconds
		HttpOnly: true,                 // Prevent client-side JavaScript access
		Path:     "/",                  // Cookie valid for all paths
		Secure:   true,                 // Send cookie only over HTTPS (recommended for production)
		SameSite: http.SameSiteLaxMode, // Prevent CSRF attacks
	}

	http.SetCookie(w, cookie) // Add the cookie to the response headers

	utils.WriteJson(w, http.StatusOK, map[string]string{"token": token})
}

func (h *Handler) logoutUser(w http.ResponseWriter, r *http.Request) {
}

// TODO: add midlleware to allow only admins to access this slite
func (h *Handler) handleGetUsers(w http.ResponseWriter, r *http.Request) {
	users, err := h.store.GetAllUsers()
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJson(w, http.StatusOK, users)
}

func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/user/register", h.registerUser).Methods("POST")
	router.HandleFunc("/login", h.loginUser)
	router.HandleFunc("/logout", h.logoutUser)
	router.HandleFunc("/user", middleware.ProtectRoute(h.handleGetUsers, h.store, "admin")).Methods("GET")
}
