import pymysql
import pymysql.cursors
from db_config import connect_db
from flask import jsonify
from flask import flash, request, Blueprint, current_app
import jwt
import datetime

login_bp = Blueprint("login", __name__)


@login_bp.route("/login", methods=["POST"])
def login():
    try:
        usuario = request.json
        email = usuario["email"]
        senha = usuario["senha"]

        conn = connect_db()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        conn.execute("""SELECT * FROM usuario WHERE email = %s AND senha = %s""", (email, senha))
        rows = cur.fetchall()
        if len(rows)==0:
            resp = {"success": False}, 401

        else:
            global SECRET_KEY
            token = jwt.encode({"user": email, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, current_app.config.get("SECRET_KEY"), algorithm="HS256")
            resp = {"success": True, "token": token }, 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()