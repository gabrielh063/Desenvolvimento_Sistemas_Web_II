import pymysql

DB_HOST = '54.91.193.137'
DB_USER = 'libertas'
DB_NAME = 'libertas5per'
DB_PASSWORD = '123456'

def connect_db():
    return pymysql.connect(host=DB_HOST,
                           user=DB_USER,
                           password=DB_PASSWORD,
                           database=DB_NAME)

def create_cidades_table():
    conn = connect_db()
    try:
        with conn.cursor() as cur:
            cur.execute('''
                CREATE TABLE cidades (
                    idCidade INT PRIMARY KEY AUTO_INCREMENT,
                    nomeCidade VARCHAR(255),
                    uf VARCHAR(255),
                    populacao VARCHAR(255),
                    anoFundacao VARCHAR(255),
                    area VARCHAR(255)
                )
            ''')
        conn.commit()
    finally:
        conn.close()

                           