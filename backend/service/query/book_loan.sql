-- name: CreateBookRent :one
INSERT INTO "BookRent" (book_id, student_id, librarian_id, return_within, status, rent_date)
VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
RETURNING *;

-- name: UpdateBookRent :one
UPDATE "BookRent" SET 
    book_id = $2, 
    student_id = $3, 
    librarian_id = $4, 
    return_within = $5, 
    status = $6
WHERE id = $1
RETURNING *;

-- name: GetBookRents :many
SELECT * FROM "BookRent";

-- name: GetBookRentById :one
SELECT * FROM "BookRent" WHERE id = $1;

-- name: GetBookRentByStudentId :many
SELECT * FROM "BookRent" WHERE student_id = $1;

-- name: GetBookRentByLibrarianId :many
SELECT * FROM "BookRent" WHERE librarian_id = $1;

-- name: GetBookRentByStatus :many
SELECT * FROM "BookRent" WHERE status = $1;

-- name: DeleteBookRentById :exec
DELETE FROM "BookRent" WHERE id = $1;