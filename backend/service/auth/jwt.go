package auth

import (
	"strconv"
	"time"

	"github.com/coleYab/ecommerce_go/config"
	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
)

func CreateJWTToken(secret string, id uuid.UUID, role string) (string, error) {
	expiration, err := strconv.Atoi(config.Envs.JwtExpirations)
	if err != nil {
		return "", err
	}
	expirationTime := time.Duration(expiration) * time.Second
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId":    id.String(),
		"userRole":  role,
		"expiresAt": time.Now().Add(expirationTime).Unix(),
	})

	return token.SignedString([]byte(secret))
}
