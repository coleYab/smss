package roles

import (
	"context"

	"github.com/coleYab/ecommerce_go/service/repository"
	"github.com/jackc/pgx/v4"
)

type Store struct {
	queries *repository.Queries
	ctx     context.Context
}

func NewStore(conn *pgx.Conn) *Store {
	ctx := context.Background()
	return &Store{
		ctx:     ctx,
		queries: repository.New(conn),
	}
}
