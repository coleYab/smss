package main

import (
	"log"
	"os"

	"github.com/coleYab/ecommerce_go/config"
	"github.com/coleYab/ecommerce_go/db"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func main() {
	db, _ := db.NewStorage(config.Envs.GetConnectionString())

	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		log.Fatal(err)
	}

	migration, err := migrate.NewWithDatabaseInstance(
		"file://cmd/migrations/", "postgres", driver)
	if err != nil {
		log.Fatalf("Failed to create migration: %v", err)
	}

	cmd := os.Args[len(os.Args)-1]
	if cmd == "up" {
		if err := migration.Up(); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("Failed to make up migration: %v", err)
		}
	} else if cmd == "down" {
		if err := migration.Down(); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("Failed to make up migration: %v", err)
		}
	}
}
