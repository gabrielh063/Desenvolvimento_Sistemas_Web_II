import pymysql
import pymysql.cursors
from db_config import connect_db
from flask import jsonify
from flask import flash, request, Blueprint

usuario_bp = Blueprint("/usuario", __name__)

@usuario_bp.route("/usuario")
def usuario():
    try:
        conn = connect_db()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cur.execute("SELECT * FROM usuario")
        rows = cur.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()

@usuario_bp.route("/usuario/<id>")
def usuarioById(id):
    try:
        conn = connect_db()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cur.execute("SELECT * FROM usuario WHERE idusuario = %s", (id))
        rows = cur.fetchall()
        resp = jsonify(rows[0])
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()
        


@usuario_bp.route("/usuario", methods = ["POST"])
def usuarioNovo():
    try:
        conn = connect_db()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        usuario = request.json
        nome = usuario["nome"]
        email = usuario["email"]
        senha = usuario["senha"]
        telefone = usuario["telefone"]
        cur.execute("INSERT INTO usuario (nome, email, senha, telefone) VALUES (%s,%s,%s,%s)",(nome, email, senha, telefone))
        conn.commit()
        resp = jsonify({"message": "inserido"})
        rows = cur.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()

@usuario_bp.route("/usuario/<id>/", methods = ["PUT"])
def usuarioAlterar(id):
    try:
        conn = connect_db()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        usuario = request.json
        nome = usuario["nome"]
        email = usuario["email"]
        senha = usuario["senha"]
        telefone = usuario["telefone"]
        cur.execute("UPDATE usuario SET nome = %s, email = %s, senha = %s, telefone = %s WHERE idusuario = %s ",(nome, email, senha, telefone, id))
        conn.commit()
        resp = jsonify({"message": "alterado"})
        rows = cur.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()

@usuario_bp.route("/usuario/<id>/", methods = ["DELETE"])
def usuarioExcluir(id):
    try:
        conn = connect_db()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cur.execute("DELETE FROM usuario WHERE idusuario = %s", (id))
        conn.commit()
        resp = jsonify({"message": "excluido"})
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()
