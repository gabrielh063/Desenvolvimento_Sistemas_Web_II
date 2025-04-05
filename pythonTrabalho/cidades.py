import pymysql
import pymysql.cursors
from dbConfig import connect_db
from flask import jsonify
from flask import flash, request, Blueprint, current_app

cidade_bp = Blueprint("/cidade_bp", __name__)

@cidade_bp.route("/cidade")
def cidade():
    try:
        conn = connect_db()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cur.execute("SELECT * FROM cidades")
        rows = cur.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()

@cidade_bp.route("/cidade/<id>")
def cidadeById(id):
    try:
        conn = connect_db()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cur.execute("SELECT * FROM cidades WHERE idCidade = %s", (id))
        rows = cur.fetchall()
        resp = jsonify(rows[0])
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()
        


@cidade_bp.route("/cidade", methods = ["POST"])
def cidadeNovo():
    try:
        conn = connect_db()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cidade = request.json
        nomeCidade = cidade["nomeCidade"]
        uf = cidade["uf"]
        populacao = cidade["populacao"]
        anoFundacao = cidade["anoFundacao"]
        area = cidade["area"]
        cur.execute("INSERT INTO cidades (nomeCidade, uf, populacao, anoFundacao, area) VALUES (%s,%s,%s,%s,%s)",(nomeCidade, uf, populacao, anoFundacao, area))
        conn.commit()
        resp = jsonify({"message": "inserido"})
        
        
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()

@cidade_bp.route("/cidade/<id>/", methods = ["PUT"])
def cidadeAlterar(id):
    try:
        conn = connect_db()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cidade = request.json
        nomeCidade = cidade["nomeCidade"]
        uf = cidade["uf"]
        populacao = cidade["populacao"]
        anoFundacao = cidade["anoFundacao"]
        area = cidade["area"]
        cur.execute("UPDATE cidades SET nomeCidade = %s, uf = %s, populacao = %s, anoFundacao = %s, area = %s WHERE idCidade = %s ",(nomeCidade, uf, populacao, anoFundacao, area, id))
        conn.commit()
        resp = jsonify({"message": "alterado"})
        rows = cur.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
        return e
    finally:
        cur.close()
        conn.close()

@cidade_bp.route("/cidade/<id>/", methods = ["DELETE"])
def cidadeExcluir(id):
    try:
        conn = connect_db()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cur.execute("DELETE FROM cidades WHERE idCidade = %s", (id))
        conn.commit()
        resp = jsonify({"message": "excluido"})
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()
