package bookrent

import (
	"context"

	"github.com/coleYab/ecommerce_go/service/repository"
	"github.com/coleYab/ecommerce_go/types"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v4"
)

type Store struct {
	queries *repository.Queries
	ctx     context.Context
}

// CreateBookRent implements types.BookRentStore.
func (s *Store) CreateBookRent(br types.CreateBookRentPayload) (uuid.UUID, error) {
	bs, err := s.queries.CreateBookRent(s.ctx, repository.CreateBookRentParams{
		LibrarianID:  br.LibrarianID,
		StudentID:    br.StudentID,
		BookID:       br.BookID,
		ReturnWithin: br.ReturnWithin,
		Status:       br.Status,
	})

	if err != nil {
		return uuid.UUID{}, err
	}

	return bs.ID, nil
}

// DeleteBookRentById implements types.BookRentStore.
func (s *Store) DeleteBookRentById(id uuid.UUID) error {
	return s.queries.DeleteBookRentById(s.ctx, id)
}

// GetAllBookRents implements types.BookRentStore.
func (s *Store) GetAllBookRents() ([]repository.BookRent, error) {
	return s.queries.GetBookRents(s.ctx)
}

// GetBookRentById implements types.BookRentStore.
func (s *Store) GetBookRentById(id uuid.UUID) (repository.BookRent, error) {
	return s.queries.GetBookRentById(s.ctx, id)
}

// UpdateBookRent implements types.BookRentStore.
func (s *Store) UpdateBookRent(id uuid.UUID, br types.UpdateBookRentPayload) (repository.BookRent, error) {
	return s.queries.UpdateBookRent(s.ctx, repository.UpdateBookRentParams{
		ID:           id,
		BookID:       br.BookID,
		LibrarianID:  br.LibrarianID,
		StudentID:    br.StudentID,
		Status:       br.Status,
		ReturnWithin: br.ReturnWithin,
	})
}

func NewStore(conn *pgx.Conn) *Store {
	ctx := context.Background()
	return &Store{
		ctx:     ctx,
		queries: repository.New(conn),
	}
}
