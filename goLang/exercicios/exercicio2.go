package main

import "fmt"

func Main() {
	altura := 1.95
	peso := 70.0
	imc := peso / (altura * altura)

	if (imc < 25) {
		fmt.Println("Peso normal com imc" , imc)
	} else {
		fmt.Println("Sobrepeso com imc" , imc)
	}
}