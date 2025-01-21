package bookrent

import (
	"fmt"
	"net/http"

	"github.com/coleYab/ecommerce_go/types"
	"github.com/coleYab/ecommerce_go/utils"
	"github.com/gorilla/mux"
)

type Handler struct {
	bookStore     types.BookStore
	userStore     types.UserStore
	bookRentStore types.BookRentStore
}

func NewHandler(bs types.BookStore, us types.UserStore, brs types.BookRentStore) *Handler {
	return &Handler{
		bookStore:     bs,
		userStore:     us,
		bookRentStore: brs,
	}
}

func (h *Handler) createBookRent(w http.ResponseWriter, r *http.Request) {
	var brPayload types.CreateBookRentPayload
	if err := utils.ParseJson(r, &brPayload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// validate now broooo
	if err := utils.Validator.Struct(brPayload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	_, err := h.bookStore.GetBookById(brPayload.BookID)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("the book you requesting for doesnt exist"))
		return
	}

	// TODO: make sure the factor out this code to be set into the authorization middelware
	// and also get the data from there
	_, err = h.userStore.GetUserById(brPayload.LibrarianID)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("there is no librarian found by this id"))
		return
	}

	_, err = h.userStore.GetUserById(brPayload.StudentID)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("there is no user found by this id"))
		return
	}

	// now prepare the book for update
	id, err := h.bookRentStore.CreateBookRent(brPayload)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJson(w, http.StatusOK, id)
}

// protect it with authorization
func (h *Handler) deleteBookRent(w http.ResponseWriter, r *http.Request) {
	id, err := utils.GetUUIDFromParam(r, "id")
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	err = h.bookRentStore.DeleteBookRentById(id)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("%s", "the book rent is not found"+err.Error()))
		return
	}

	utils.WriteJson(w, http.StatusNoContent, nil)
}

func (h *Handler) updateBookRent(w http.ResponseWriter, r *http.Request) {
	id, err := utils.GetUUIDFromParam(r, "id")
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	var brPayload types.UpdateBookRentPayload
	if err := utils.ParseJson(r, &brPayload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// validate now broooo
	if err := utils.Validator.Struct(brPayload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	_, err = h.bookRentStore.GetBookRentById(id)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("the book rent that you updating doesnt exist"))
		return
	}

	_, err = h.bookStore.GetBookById(id)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("the book you requesting for doesnt exist"))
		return
	}

	_, err = h.userStore.GetUserById(id)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("the user you requesting for doesnt exist"))
		return
	}

	// now prepare the book for update
	bookRent, err := h.bookRentStore.UpdateBookRent(id, brPayload)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJson(w, http.StatusOK, bookRent)
}

func (h *Handler) getBookRentById(w http.ResponseWriter, r *http.Request) {
	id, err := utils.GetUUIDFromParam(r, "id")
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	book, err := h.bookRentStore.GetBookRentById(id)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("%s", "the book rent is not found"+err.Error()))
		return
	}

	utils.WriteJson(w, http.StatusOK, book)
}

func (h *Handler) getBookRents(w http.ResponseWriter, r *http.Request) {
	brs, err := h.bookRentStore.GetAllBookRents()
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJson(w, http.StatusOK, brs)
}

func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/bookrent", h.createBookRent).Methods("POST")
	router.HandleFunc("/bookrent/{id}", h.deleteBookRent).Methods("DELETE")
	router.HandleFunc("/bookrent", h.getBookRents).Methods("GET")
	router.HandleFunc("/bookrent/{id}", h.updateBookRent).Methods("PUT")
	router.HandleFunc("/bookrent/{id}", h.getBookRentById).Methods("GET")
}
