package main

import "fmt"

func Main() {
	preco := 100.0
	var quantidade float64
	quantidade = 50

	total := preco * quantidade
	if (quantidade>=5){
		total = total - (total * 10 /100)
	}

	fmt.Println("O valor total é: ", total)
}