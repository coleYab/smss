-- name: GetBooks :many
SELECT * FROM "Book";

-- name: GetBooksByAvailablity :many
SELECT * FROM "Book" WHERE availability_status = $1;

-- name: GetBookById :one
SELECT * FROM "Book" WHERE id = $1;

-- name: GetBookByAuthor :many
SELECT * FROM "Book" WHERE author = $1;

-- name: GetBookByIsbn :one
SELECT * FROM "Book" WHERE isbn = $1;

-- name: DeleteBookById :exec
DELETE FROM "Book" WHERE id = $1;

-- name: CreateBook :one
INSERT INTO "Book" ( title, author , isbn , category) 
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: UpdateBook :one
UPDATE "Book" SET title = $2, author = $3, isbn = $4, category = $5, availability_status = $6
WHERE id = $1
RETURNING *;


