package auth

import (
	"fmt"
	"strconv"
	"time"

	"github.com/coleYab/ecommerce_go/config"
	"github.com/coleYab/ecommerce_go/types"
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
		"userId":   id.String(),
		"userRole": role,
		"exp":      time.Now().Add(expirationTime).Unix(),
	})

	return token.SignedString([]byte(secret))
}

func ParseJWTToken(tokenStr string, store types.UserStore) (types.JWTClaims, error) {
	secretKey := []byte(config.Envs.JwtSecret)

	// Parse and validate the token
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		// Validate the algorithm
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return secretKey, nil
	})

	if err != nil {
		return types.JWTClaims{}, fmt.Errorf("error parsing token: %v", err)
	}

	// Extract claims
	var res types.JWTClaims
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userId, _ := claims["userId"].(string)
		res.UserId, _ = uuid.Parse(userId)
		res.Role, _ = claims["userRole"].(string)
		expp, _ := claims["exp"].(float64)
		res.Exp = time.Unix(int64(expp), 0)
	} else {
		return res, fmt.Errorf("invalid token or unable to extract claims")
	}

	// validate the timeliness of the token
	if res.Exp.After(time.Now()) {
		return res, fmt.Errorf("token is expired")
	}

	return res, nil
}
