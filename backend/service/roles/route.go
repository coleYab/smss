package roles

import (
	"net/http"

	"github.com/coleYab/ecommerce_go/types"
	"github.com/coleYab/ecommerce_go/utils"
	"github.com/go-playground/validator"
	"github.com/gorilla/mux"
)

type Handler struct {
	store types.RoleStore
}

func NewHandler(store types.RoleStore) *Handler {
	return &Handler{
		store: store,
	}
}

func (h *Handler) createDonor(w http.ResponseWriter, r *http.Request) {
	var donorPayload types.CreateDonorPayload
	if err := utils.ParseJson(r, &donorPayload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := utils.Validator.Struct(donorPayload); err != nil {
		errz := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, errz)
		return
	}

	donor, err := h.store.CreateDonor(donorPayload)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	utils.WriteJson(w, http.StatusCreated, donor)
}

func (h *Handler) updateDonor(w http.ResponseWriter, r *http.Request) {
	id, err := utils.GetUUIDFromParam(r, "id")
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	var donorPayload types.UpdateDonorPayload
	if err := utils.ParseJson(r, &donorPayload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := utils.Validator.Struct(donorPayload); err != nil {
		errz := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, errz)
		return
	}

	librarian, err := h.store.UpdateDonor(id, donorPayload)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	utils.WriteJson(w, http.StatusCreated, librarian)
}

func (h *Handler) deleteDonor(w http.ResponseWriter, r *http.Request) {
	id, err := utils.GetUUIDFromParam(r, "id")
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := h.store.DeleteDonorById(id); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	utils.WriteJson(w, http.StatusNoContent, nil)

}

func (h *Handler) createLibrarian(w http.ResponseWriter, r *http.Request) {
	var librarianPayload types.CreateLibrarianPayload
	if err := utils.ParseJson(r, &librarianPayload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := utils.Validator.Struct(librarianPayload); err != nil {
		errz := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, errz)
		return
	}

	librarian, err := h.store.CreateLibrarian(librarianPayload)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	utils.WriteJson(w, http.StatusCreated, librarian)
}

func (h *Handler) updateLibrarian(w http.ResponseWriter, r *http.Request) {
	id, err := utils.GetUUIDFromParam(r, "id")
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	var librarianPayload types.UpdateLibrarianPayload
	if err := utils.ParseJson(r, &librarianPayload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := utils.Validator.Struct(librarianPayload); err != nil {
		errz := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, errz)
		return
	}

	librarian, err := h.store.UpdateLibrarian(id, librarianPayload)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	utils.WriteJson(w, http.StatusCreated, librarian)
}

func (h *Handler) deleteLibrarian(w http.ResponseWriter, r *http.Request) {
	id, err := utils.GetUUIDFromParam(r, "id")
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := h.store.DeleteLibrarianById(id); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	utils.WriteJson(w, http.StatusNoContent, nil)
}

func (h *Handler) createTeacher(w http.ResponseWriter, r *http.Request) {
	var teacherPayload types.CreateTeacherPayload
	if err := utils.ParseJson(r, &teacherPayload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := utils.Validator.Struct(teacherPayload); err != nil {
		errz := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, errz)
		return
	}

	teacher, err := h.store.CreateTeacher(teacherPayload)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	utils.WriteJson(w, http.StatusCreated, teacher)
}

func (h *Handler) updateTeacher(w http.ResponseWriter, r *http.Request) {
	id, err := utils.GetUUIDFromParam(r, "id")
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	var teacherPayload types.UpdateTeacherPayload
	if err := utils.ParseJson(r, &teacherPayload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := utils.Validator.Struct(teacherPayload); err != nil {
		errz := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, errz)
		return
	}

	teacher, err := h.store.UpdateTeacher(id, teacherPayload)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	utils.WriteJson(w, http.StatusCreated, teacher)
}

func (h *Handler) deleteTeacher(w http.ResponseWriter, r *http.Request) {
	id, err := utils.GetUUIDFromParam(r, "id")
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := h.store.DeleteTeacherById(id); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	utils.WriteJson(w, http.StatusNoContent, nil)
}

func (h *Handler) createStudent(w http.ResponseWriter, r *http.Request) {
	var studentPayload types.CreateStudentPayload
	if err := utils.ParseJson(r, &studentPayload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := utils.Validator.Struct(studentPayload); err != nil {
		errz := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, errz)
		return
	}

	librarian, err := h.store.CreateStudent(studentPayload)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	utils.WriteJson(w, http.StatusCreated, librarian)
}

func (h *Handler) updateStudent(w http.ResponseWriter, r *http.Request) {
	id, err := utils.GetUUIDFromParam(r, "id")
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	var studentPayload types.UpdateLibrarianPayload
	if err := utils.ParseJson(r, &studentPayload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := utils.Validator.Struct(studentPayload); err != nil {
		errz := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, errz)
		return
	}

	student, err := h.store.UpdateLibrarian(id, studentPayload)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	utils.WriteJson(w, http.StatusCreated, student)
}

func (h *Handler) deleteStudent(w http.ResponseWriter, r *http.Request) {
	id, err := utils.GetUUIDFromParam(r, "id")
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := h.store.DeleteStudentById(id); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	utils.WriteJson(w, http.StatusNoContent, nil)
}

// TODO: find some better way to handle this cases
func (h *Handler) RegisterRoutes(router *mux.Router) {
	// librarian endpoints
	router.HandleFunc("/librarian", h.createLibrarian).Methods("POST")
	router.HandleFunc("/librarian", h.updateLibrarian).Methods("PUT")
	router.HandleFunc("/librarian", h.deleteLibrarian).Methods("DELETE")

	// donor endpoints
	router.HandleFunc("/donor", h.createDonor).Methods("POST")
	router.HandleFunc("/donor", h.updateDonor).Methods("PUT")
	router.HandleFunc("/donor", h.deleteDonor).Methods("DELETE")

	// student endpoints
	router.HandleFunc("/student", h.createStudent).Methods("POST")
	router.HandleFunc("/student", h.updateStudent).Methods("PUT")
	router.HandleFunc("/student", h.deleteStudent).Methods("DELETE")

	// teacher endpoints
	router.HandleFunc("/teacher", h.createTeacher).Methods("POST")
	router.HandleFunc("/teacher", h.updateTeacher).Methods("PUT")
	router.HandleFunc("/teacher", h.deleteTeacher).Methods("DELETE")
}
