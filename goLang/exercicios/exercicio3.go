package main

import "fmt"

func main() {
	distancia := 100.0
	precoEtanol := 3.99	
	precoGasolina := 5.99
	gastoEtanol := distancia /9 * precoEtanol
	gastoGasolina := distancia / 11 * precoGasolina

	fmt.Println("valor gasto com etanol: ", gastoEtanol)
	fmt.Println("valor gasto com gasolina: ", gastoGasolina)
	if (gastoGasolina < gastoEtanol){
		fmt.Println("seloco num compensa etanol")
	} else if (gastoEtanol < gastoGasolina) {
		fmt.Println("seloco num compensa gasolina")
	} else {
		fmt.Println("seloco compensa os dois")
	}
}