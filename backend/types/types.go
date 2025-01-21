package types

import (
	"time"

	"github.com/coleYab/ecommerce_go/service/repository"
	"github.com/google/uuid"
)

type LoginUserPayload struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type RegisterUserPayload struct {
	Username string `json:"username" valiate:"required"`
	Role     string `json:"role" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=200"`
}

type User struct {
	Id        int       `json:"id"`
	FirstName string    `json:"firstName"`
	LastName  string    `json:"lastName"`
	Email     string    `json:"email"`
	Password  string    `json:"-"` // it is like json ignore for golang
	CreatedAt time.Time `json:"createdAt"`
}

type CreateBookPayload struct {
	Category string `json:"category" validate:"required"`
	Title    string `json:"title" validate:"required"`
	Author   string `json:"author" validate:"required"`
	ISBN     string `json:"isbn" validate:"required,max=20"`
}

type Product struct {
	Id          int       `json:"id"`
	Name        string    `json:"name"`
	Price       float64   `json:"price"`
	Description string    `json:"description"`
	Quantitiy   uint      `json:"quantity"`
	Image       string    `json:"image"`
	CreatedAt   time.Time `json:"createdAt"`
}

type UserStore interface {
	GetUserByEmail(email string) (repository.User, error)
	GetUserById(id uuid.UUID) (repository.User, error)
	GetAllUsers() ([]repository.User, error)
	CreateUser(user RegisterUserPayload) (uuid.UUID, error)
}

type BookStore interface {
	GetBookByISBN(isbn string) (repository.Book, error)
	GetBookById(id uuid.UUID) (repository.Book, error)
	GetAllBooks() ([]repository.Book, error)
	CreateBook(book CreateBookPayload) (uuid.UUID, error)
	DeleteBookById(id uuid.UUID) error
	UpdateBook(uuid.UUID, UpdateBookPayload) (repository.Book, error)
}

type ProductStore interface {
	GetProducts(productId []int) ([]*Product, error)
	GetProductById(int) (*Product, error)
	CreateProduct(Product) error
}

type OrderStore interface {
	CreateOrder(Order) (int, error)
	CreateOrderItem(OrderItem) error
}

type CartRequestPayload struct {
	CartItems []CartItemPayload `json:"cartItems" validate:"required"`
}

type CartItemPayload struct {
	ProductId int `json:"productId" validate:"required"`
	Quantity  int `json:"quantity" validate:"required"`
}

type Order struct {
	Id         int         `json:"id"`
	UserId     int         `json:"userId"`
	Name       string      `json:"name"`
	OrderItems []OrderItem `json:"orderItems"`
	Status     string      `json:"status"`
	Address    string      `json:"address"`
	TotalPrice float64     `json:"totalPrice"`
}

type OrderItem struct {
	OrderId   int `json:"orderId"`
	ProductId int `json:"productId"`
	Quantity  int `json:"quantity"`
}

type UpdateBookPayload struct {
	Title              string `validate:"required" json:"title"`
	Author             string `validate:"required" json:"author"`
	ISBN               string `validate:"required" json:"isbn"`
	Category           string `validate:"required" json:"category"`
	AvailabilityStatus bool   `json:"availability_status"`
}

type CreateBookRentPayload struct {
	BookID       uuid.UUID `validate:"required" json:"book_id"`
	StudentID    uuid.UUID `validate:"required" json:"student_id"`
	LibrarianID  uuid.UUID `validate:"required" json:"librarian_id"`
	ReturnWithin int32     `validate:"required" json:"return_within"`
	Status       string    `validate:"required" json:"status"`
}

type BookRentStore interface {
	GetBookRentById(id uuid.UUID) (repository.BookRent, error)
	GetAllBookRents() ([]repository.BookRent, error)
	CreateBookRent(book CreateBookRentPayload) (uuid.UUID, error)
	DeleteBookRentById(id uuid.UUID) error
	UpdateBookRent(uuid.UUID, UpdateBookRentPayload) (repository.BookRent, error)
}

type UpdateBookRentPayload struct {
	ID           uuid.UUID `validate:"required" json:"id"`
	BookID       uuid.UUID `validate:"required" json:"book_id"`
	StudentID    uuid.UUID `validate:"required" json:"student_id"`
	LibrarianID  uuid.UUID `validate:"required" json:"librarian_id"`
	RentDate     time.Time `validate:"required" json:"rent_date"`
	ReturnWithin int32     `validate:"required" json:"return_within"`
	Status       string    `validate:"required" json:"status"`
}
