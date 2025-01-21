package main

import (
	"log"

	"github.com/coleYab/ecommerce_go/cmd/api"
	"github.com/coleYab/ecommerce_go/config"
	"github.com/coleYab/ecommerce_go/db"
	"github.com/joho/godotenv"
)

func main() {
	// connect to db here
	godotenv.Load()
	db, _ := db.NewStorage(config.Envs.GetConnectionString())

	// create a simple server here
	server := api.NewApiServer(config.Envs.Port, db)
	err := server.Run()
	if err != nil {
		log.Fatalf("Running the server failed with error %s", err.Error())
	}
}
