package middleware

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/coleYab/ecommerce_go/service/auth"
	"github.com/coleYab/ecommerce_go/types"
	"github.com/coleYab/ecommerce_go/utils"
)

type HandlerFunc func(w http.ResponseWriter, r *http.Request)

func ProtectRoute(next HandlerFunc, store types.UserStore, role string) HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// do the authorization logic here
		token := r.Header.Get("Authorization")
		// assuming that it will be a "<TokenType> <tokenValue>"
		tokenPart := strings.Split(token, " ")
		log.Printf("%v is the token part that was parsed", tokenPart[1])
		if tokenPart[0] != "Bearer" {
			utils.WriteError(w, http.StatusUnauthorized, fmt.Errorf("invalid token type expected bearer token"))
			return
		}

		userCred, err := auth.ParseJWTToken(tokenPart[1], store)
		if err != nil {
			utils.WriteError(w, http.StatusUnauthorized, err)
			return
		}

		user, err := store.GetUserById(userCred.UserId)
		if err != nil || user.Role != role {
			utils.WriteError(w, http.StatusUnauthorized, fmt.Errorf("invalid authorization token or site access blocked due to unavailable role"))
			return
		}

		// set the user id here
		next(w, r)
	}
}
