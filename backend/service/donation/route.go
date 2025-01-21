package donation

import (
	"fmt"
	"net/http"

	"github.com/coleYab/ecommerce_go/types"
	"github.com/coleYab/ecommerce_go/utils"
	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

type Handler struct {
	donationStore types.DonationStore
	userStore     types.UserStore
}

func NewHandler(ds types.DonationStore, us types.UserStore) *Handler {
	return &Handler{
		donationStore: ds,
		userStore:     us,
	}
}

func (h *Handler) createDonation(w http.ResponseWriter, r *http.Request) {
	// read the payload and parse the payload
	var donationPayload types.CreateDonationPayload
	if err := utils.ParseJson(r, &donationPayload); err != nil {
		// write a bad reqeuest to the standard writer
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// validate the input here and also handle the error here generated from validtion
	if err := utils.Validator.Struct(donationPayload); err != nil {
		errz := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest,
			fmt.Errorf("request validation failed with %v", errz))
		return
	}

	// create a new book here
	book, err := h.donationStore.CreateDonation(donationPayload)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJson(w, http.StatusCreated, book)
}

func (h *Handler) deleteDonation(w http.ResponseWriter, r *http.Request) {
	id, err := utils.GetUUIDFromParam(r, "id")
	if err != nil {
		utils.WriteJson(w, http.StatusBadRequest, err)
		return
	}

	err = h.donationStore.DeleteDonationById(id)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("%s", "the donation is not found"+err.Error()))
		return
	}

	utils.WriteJson(w, http.StatusNoContent, nil)
}

func (h *Handler) getDonationById(w http.ResponseWriter, r *http.Request) {
	id, err := utils.GetUUIDFromParam(r, "id")
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	book, err := h.donationStore.GetDonationById(id)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("%s", "the donation is not found"+err.Error()))
		return
	}

	utils.WriteJson(w, http.StatusOK, book)
}

func (h *Handler) getDonations(w http.ResponseWriter, r *http.Request) {
	books, err := h.donationStore.GetAllDonations()
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJson(w, http.StatusOK, books)
}

func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/donation", h.createDonation).Methods("POST")
	router.HandleFunc("/donation/{id}", h.deleteDonation).Methods("DELETE")
	router.HandleFunc("/donation", h.getDonations).Methods("GET")
	router.HandleFunc("/donation/{id}", h.getDonationById).Methods("GET")
}
