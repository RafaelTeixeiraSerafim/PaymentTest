from flask import Flask
from flask_cors import CORS
from routes.routeIndex import routeIndex

class MyServer:
    def __init__(self) -> None:
        self.app = Flask(__name__)
        CORS(self.app)
        routeIndex(self.app)
        
    def run(self):
        return self.app.run(port=5000, debug=True, host='localhost')
    
if __name__ == "__main__":
    app = MyServer()
    app.run()