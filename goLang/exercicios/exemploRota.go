package main

import (
	"fmt"
	"net/http"
)

func index(w http.ResponseWriter, r *http.Request){
	fmt.Fprintln(w, "ola mundao")
}
func segundaRota(w http.ResponseWriter, r *http.Request){
	fmt.Fprintln(w, "ola mundaozao")
}
func main() {
	http.HandleFunc("/", index)
	http.HandleFunc("/segunda", segundaRota)
	fmt.Println("servidor rodando na porta 8080")
	http.ListenAndServe(":8080", nil)
}