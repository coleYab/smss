package api

import (
	"log"
	"net/http"

	"github.com/coleYab/ecommerce_go/service/book"
	"github.com/coleYab/ecommerce_go/service/bookrent"
	"github.com/coleYab/ecommerce_go/service/user"
	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v4"
)

type ApiServer struct {
	addr string
	db   *pgx.Conn
}

func NewApiServer(addr string, db *pgx.Conn) *ApiServer {
	return &ApiServer{
		addr: addr,
		db:   db,
	}
}

func (s *ApiServer) Run() error {
	router := mux.NewRouter()
	subrouter := router.PathPrefix("/api/v1/").Subrouter()

	router.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Successfully pinged the database"))
	})

	userStore := user.NewStore(s.db)
	userHanlder := user.NewHandler(userStore)
	userHanlder.RegisterRoutes(subrouter)

	bookStore := book.NewStore(s.db)
	bookHanlder := book.NewHandler(bookStore)
	bookHanlder.RegisterRoutes(subrouter)

	bookRentStore := bookrent.NewStore(s.db)
	bookRentHanlder := bookrent.NewHandler(bookStore, userStore, bookRentStore)
	bookRentHanlder.RegisterRoutes(subrouter)

	log.Printf("Server started running at address: http://localhost:%v", s.addr)
	return http.ListenAndServe(s.addr, router)
}
