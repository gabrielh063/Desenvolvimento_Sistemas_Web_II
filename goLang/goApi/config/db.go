package config

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

const (
	DB_HOST = "54.91.193.137"
	DB_USER = "libertas"
	DB_PASSWAORD = "123456"
	DB_NAME = "libertas5per"
)

func Connect() (*sql.DB, error){
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s", DB_USER, DB_PASSWAORD, DB_HOST, DB_NAME)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}
	err = db.Ping()
	if err!=nil {
		return nil,err
	}
	log.Println("conexao com banco suave")
	return db, nil
}