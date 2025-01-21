-- name: CreateUser :one
INSERT INTO "User" ( username, password, email, role )
VALUES ( $1, $2, $3, $4 )
RETURNING *;

-- name: UpdateUser :one
UPDATE "User" SET
    username = $3,
    password = $4,
    role = $5
WHERE id = $1 AND email = $2
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM "User" WHERE id = $1;

-- name: GetUsers :many
SELECT * FROM "User";

-- name: GetUserByEmail :one
SELECT * FROM "User" WHERE email = $1;

-- name: GetUserById :one
SELECT * FROM "User" WHERE id = $1;

-- name: GetUsersByRole :many
SELECT * FROM "User" WHERE role = $1;    