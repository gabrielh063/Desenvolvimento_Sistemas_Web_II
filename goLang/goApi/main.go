package main

import (
	"apigolang/routers"
	"log"
	"net/http"
)
func main() {
	router := routers.SetupRouter()
	log.Println("Iniciando servidor em 8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}