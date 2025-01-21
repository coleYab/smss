package auth

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) (string, error) {
	hCost := bcrypt.DefaultCost
	hPassword, err := bcrypt.GenerateFromPassword([]byte(password), hCost)
	if err != nil {
		return "", err
	}

	return string(hPassword), nil
}

// are they equal or not
func ComparePassword(hPassword string, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hPassword), []byte(password))
}
