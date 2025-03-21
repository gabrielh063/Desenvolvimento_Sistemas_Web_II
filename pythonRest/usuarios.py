import pymysql
from db_config import connect_db
from flask import jsonify
from flask import flash, request, Blueprint

usuario_bp = Blueprint("usuario", __name__)

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

