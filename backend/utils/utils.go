package utils

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	validator "github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

var Validator = validator.New()

func ParseJson(r *http.Request, payload any) error {
	if r.Body == nil {
		return fmt.Errorf("request body missing")
	}

	return json.NewDecoder(r.Body).Decode(payload)
}

func WriteJson(w http.ResponseWriter, status int, payload any) error {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(payload)
}

func WriteError(w http.ResponseWriter, status int, err error) error {
	return WriteJson(w, status, map[string]string{
		"message": err.Error(),
	})
}

func LogRequestAndResponse(r *http.Response, statusCode int) {
	// TIMESTAMP, METHOD, URL, STATAUS CODE
	log.Printf("%v %v %v", r.Request.Method, r.Request.URL, statusCode)
}

func GetUUIDFromParam(r *http.Request, paramName string) (uuid.UUID, error) {
	givenId, ok := mux.Vars(r)[paramName]
	if !ok {
		return uuid.UUID{}, fmt.Errorf("product id is required")
	}

	id, err := uuid.Parse(givenId)
	if err != nil {
		return uuid.UUID{}, fmt.Errorf("%s must be a valid uuid", paramName)
	}

	return id, nil
}
