from cidades import cidade_bp
from flask import Flask, send_from_directory
from flask_cors import CORS
import os

from cidades import cidade_bp

app = Flask(__name__, static_url_path='', static_folder='static')

# Habilita CORS para todas as rotas e origens (ou especifique localhost:3000 se quiser limitar)
CORS(app, origins=["http://localhost:3000"])

app.register_blueprint(cidade_bp)

@app.route("/")
def home():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'index.html')

if __name__ == "__main__":
    app.run(debug=True)
