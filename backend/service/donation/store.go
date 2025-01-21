package donation

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

// UpdateBook implements types.BookStore.
func (s *Store) UpdateBook(id uuid.UUID, book types.UpdateBookPayload) (repository.Book, error) {
	return s.queries.UpdateBook(s.ctx, repository.UpdateBookParams{
		ID:                 id,
		AvailabilityStatus: book.AvailabilityStatus,
		Category:           book.Category,
		Title:              book.Title,
		Author:             book.Author,
		Isbn:               book.ISBN,
	})
}

// DeleteBookById implements types.BookStore.
func (s *Store) DeleteBookById(id uuid.UUID) error {
	return s.queries.DeleteBookById(s.ctx, id)
}

// CreateBook implements types.BookStore.
func (s *Store) CreateBook(book types.CreateBookPayload) (uuid.UUID, error) {
	b, err := s.queries.CreateBook(s.ctx, repository.CreateBookParams{
		Category: book.Category,
		Title:    book.Title,
		Author:   book.Author,
		Isbn:     book.ISBN,
	})

	return b.ID, err
}

// GetAllBooks implements types.BookStore.
func (s *Store) GetAllBooks() ([]repository.Book, error) {
	return s.queries.GetBooks(s.ctx)
}

// GetBookByISBN implements types.BookStore.
func (s *Store) GetBookByISBN(isbn string) (repository.Book, error) {
	return s.queries.GetBookByIsbn(s.ctx, isbn)
}

// GetBookById implements types.BookStore.
func (s *Store) GetBookById(id uuid.UUID) (repository.Book, error) {
	return s.queries.GetBookById(s.ctx, id)
}

func NewStore(conn *pgx.Conn) *Store {
	ctx := context.Background()
	return &Store{
		ctx:     ctx,
		queries: repository.New(conn),
	}
}
