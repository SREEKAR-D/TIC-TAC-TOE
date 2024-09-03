package main

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	r := chi.NewRouter()

	// Use the Logger middleware for request logging
	r.Use(middleware.Logger)

	// Serve static files from the "static" directory
	r.Handle("/static/*", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// Handle the root route to serve the index.html file
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/index.html")
	})

	log.Println("Serving on :8082")
	if err := http.ListenAndServe(":8082", r); err != nil {
		log.Fatal(err)
	}
}
