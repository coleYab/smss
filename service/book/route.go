package book

import (
	"fmt"
	"net/http"

	"github.com/coleYab/ecommerce_go/types"
	"github.com/coleYab/ecommerce_go/utils"
	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

type Handler struct {
	store types.BookStore
}

func NewHandler(store types.BookStore) *Handler {
	return &Handler{
		store: store,
	}
}

func (h *Handler) createBook(w http.ResponseWriter, r *http.Request) {
	// read the payload and parse the payload
	var bookPayload types.CreateBookPayload
	if err := utils.ParseJson(r, &bookPayload); err != nil {
		// write a bad reqeuest to the standard writer
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// validate the input here and also handle the error here generated from validtion
	if err := utils.Validator.Struct(bookPayload); err != nil {
		errz := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest,
			fmt.Errorf("request validation failed with %v", errz))
		return
	}

	// check if the user with the same email exists
	_, err := h.store.GetBookByISBN(bookPayload.ISBN)
	if err == nil { // if the user exists
		utils.WriteError(w, http.StatusBadRequest,
			fmt.Errorf("book with the isbn %v already exists", bookPayload.ISBN))
		return
	}

	// create a new book here
	book, err := h.store.CreateBook(bookPayload)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJson(w, http.StatusCreated, book)
}

func (h *Handler) deleteBook(w http.ResponseWriter, r *http.Request) {
	id, err := utils.GetUUIDFromParam(r, "id")
	if err != nil {
		utils.WriteJson(w, http.StatusBadRequest, err)
		return
	}

	err = h.store.DeleteBookById(id)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("%s", "the book is not found"+err.Error()))
		return
	}

	utils.WriteJson(w, http.StatusNoContent, nil)
}

func (h *Handler) updateBook(w http.ResponseWriter, r *http.Request) {
	id, err := utils.GetUUIDFromParam(r, "id")
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	var bookPayload types.UpdateBookPayload
	if err := utils.ParseJson(r, &bookPayload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// validate now broooo
	if err := utils.Validator.Struct(bookPayload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	_, err = h.store.GetBookById(id)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("the book you requesting for doesnt exist"))
		return
	}

	// now prepare the book for update
	book, err := h.store.UpdateBook(bookPayload)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJson(w, http.StatusOK, book)
}

func (h *Handler) getBookById(w http.ResponseWriter, r *http.Request) {
	id, err := utils.GetUUIDFromParam(r, "id")
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	book, err := h.store.GetBookById(id)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("%s", "the book is not found"+err.Error()))
		return
	}

	utils.WriteJson(w, http.StatusOK, book)
}

func (h *Handler) getBooks(w http.ResponseWriter, r *http.Request) {
	books, err := h.store.GetAllBooks()
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJson(w, http.StatusOK, books)
}

func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/book", h.createBook).Methods("POST")
	router.HandleFunc("/book/{id}", h.deleteBook).Methods("DELETE")
	router.HandleFunc("/book", h.getBooks).Methods("GET")
	router.HandleFunc("/book/{id}", h.updateBook).Methods("PUT")
	router.HandleFunc("/book/{id}", h.getBookById).Methods("GET")
}
