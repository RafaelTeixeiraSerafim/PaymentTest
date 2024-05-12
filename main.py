from flask import Flask
from flask_cors import CORS
from database.db import db
from routes.route_index import route_index
from dotenv import load_dotenv
import os

load_dotenv()

class MyServer:
    def __init__(self) -> None:
        self.app = Flask(__name__)
        self.app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_CONNECTION")
        db.init_app(self.app)
        with self.app.app_context():
            db.create_all()

        CORS(self.app)
        route_index(self.app)
        
    def run(self):
        self.app.run(port=5000, debug=True, host='localhost')

if __name__ == "__main__":
    app = MyServer()
    
    app.run()
