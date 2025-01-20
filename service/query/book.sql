-- name: GetBooks :many
SELECT * FROM "Book";

-- name: GetBooksByAvailablity :many
SELECT * FROM "Book" WHERE availability_status = $1;

-- name: GetBookById :one
SELECT * FROM "Book" WHERE id = $1;

-- name: GetBookByIsbn :one
SELECT * FROM "Book" WHERE isbn = $1;

-- name: DeleteBookById :exec
DELETE FROM "Book" WHERE id = $1;

-- name: CreateBook :one
INSERT INTO "Book" ( title, author , isbn , category) 
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: UpdateBook :one
INSERT INTO "Book" ( title, author , isbn, category, availability_status) 
VALUES ($1, $2, $3, $4, $5)
RETURNING *;
