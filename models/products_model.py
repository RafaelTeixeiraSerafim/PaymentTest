from database.db import db

class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=True, nullable=False)
    price = db.Column(db.Float(2), unique=False, nullable=False)

    def __init__(self, title, price) -> None:
        self.title = title
        self.price = price

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'price': self.price
        }
    