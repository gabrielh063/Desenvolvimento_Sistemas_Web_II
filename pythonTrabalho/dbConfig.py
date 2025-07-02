import pymysql

DB_HOST = 'localhost'
DB_USER = 'root'
DB_NAME = 'cidades'
DB_PASSWORD = 'root'

def connect_db():
    return pymysql.connect(host=DB_HOST,
                           user=DB_USER,
                           password=DB_PASSWORD,
                           database=DB_NAME)


                           