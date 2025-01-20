package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	dbHost         string
	dbPort         string
	dbPassword     string
	dbUser         string
	dbName         string
	Port           string
	JwtExpirations string
	JwtSecret      string
}

var Envs = initConfig()

func initConfig() *Config {
	godotenv.Load()
	return &Config{
		dbHost:         getEnv("DB_HOST", "localhost"),
		dbPort:         getEnv("DB_PORT", "5432"),
		dbPassword:     getEnv("DB_PWD", "password"),
		dbName:         getEnv("DB_NAME", "ecom"),
		dbUser:         getEnv("DB_USER", "postgres"),
		Port:           ":" + getEnv("PORT", "5000"),
		JwtExpirations: getEnv("JWT_EXPIRATION", "3600"),
		JwtSecret:      getEnv("JWT_SECRET", "My Super secret"),
	}
}

func (c *Config) GetConnectionString() string {
	return fmt.Sprintf("host=%s port=5432 user=%s password=%s dbname=%s sslmode=disable",
		c.dbHost, c.dbUser, c.dbPassword, c.dbName)
}

func getEnv(key, fallback string) string {
	if data, ok := os.LookupEnv(key); ok {
		return data
	}

	return fallback
}
