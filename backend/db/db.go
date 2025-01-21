package db

import (
	"context"
	"log"
	"time"

	"github.com/jackc/pgx/v4"
)

// NewStorage initializes a single database connection using pgx.Conn.
func NewStorage(cfg string) (*pgx.Conn, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	conn, err := pgx.Connect(ctx, cfg)
	if err != nil {
		log.Fatalf("Unable to connect to the database: %v", err)
		return nil, err
	}

	// Ping the database to ensure connectivity
	if err := conn.Ping(ctx); err != nil {
		log.Fatalf("Failed to ping the database: %v", err)
		return nil, err
	}

	return conn, nil
}
