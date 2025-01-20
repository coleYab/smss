package user

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

// CreateUser implements types.UserStore.
func (s *Store) CreateUser(user types.RegisterUserPayload) (uuid.UUID, error) {
	u, err := s.queries.CreateUser(s.ctx, repository.CreateUserParams{
		Email:    user.Email,
		Password: user.Password,
		Username: user.Username,
		Role:     user.Role,
	})

	return u.ID, err
}

// GetAllUsers implements types.UserStore.
func (s *Store) GetAllUsers() ([]repository.User, error) {
	return s.queries.GetUsers(s.ctx)
}

// GetUserByEmail implements types.UserStore.
func (s *Store) GetUserByEmail(email string) (repository.User, error) {
	return s.queries.GetUserByEmail(s.ctx, email)
}

// GetUserById implements types.UserStore.
func (s *Store) GetUserById(id uuid.UUID) (repository.User, error) {
	return s.queries.GetUserById(s.ctx, id)
}

func NewStore(conn *pgx.Conn) *Store {
	ctx := context.Background()
	return &Store{
		ctx:     ctx,
		queries: repository.New(conn),
	}
}
