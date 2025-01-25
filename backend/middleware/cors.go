package middleware

import "net/http"

func CorsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// CORS Headers
				// Allow specific origin (replace with your frontend URL)
				w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
				// Allow credentials (cookies)
				w.Header().Set("Access-Control-Allow-Credentials", "true")
				// Allow specific methods
				w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
				// Allow specific headers
				w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		
				// Handle preflight requests
				if r.Method == "OPTIONS" {
					w.WriteHeader(http.StatusOK)
					return
				}
		
				// Pass the request to the next handler
				next.ServeHTTP(w, r)
		})
}
