from flask import jsonify, request
from database.db import db
from models.products_model import Products

def product_controller(id):
    if request.method == 'PATCH':
        try:
            data = request.get_json()
        except Exception as a:
            return f"ERROR: {str(e)}", 400
        
        try:
            product = Products.query.get(id) # Could also cause a 400, but idk

            if not product:
                return f"ERROR: Produto não existe", 400
            
            product.title = data.get('title', product.title)
            product.price = data.get('price', product.price)

            db.session.commit()
        except Exception as e:
            return f'ERROR: {str(e)}', 500
        
        return f"Produto alterado com sucesso", 200
    elif request.method == 'DELETE':
        try:
            product = Products.query.get(id)
            
            if not product:
                return f'ERROR: Produto não existe', 400
        
            db.session.delete(product)
            db.session.commit()
        except Exception as e:
            return f'ERROR: {str(e)}', 500
        
        return f'Produto deletado com sucesso', 200

def products_controller():
    if request.method == 'GET':
        try:
            data = Products.query.all()
            products = [product.to_dict() for product in data]
            print(products)

            return jsonify({"productList": products})
        except Exception as e:
            return f"ERROR: {str(e)}", 500
    elif request.method == 'POST':
        try:
            data = request.get_json()
            isRepeatedTitle = Products.query.filter(Products.title == data['title']).all()

            if isRepeatedTitle: 
                return f'ERROR: Um produto com esse nome já existe', 400

        except Exception as e:
            return f'ERROR: {str(e)}', 400
        
        product = Products(data['title'], data['price'])
        
        try:
            db.session.add(product)
            db.session.commit()
        except Exception as e:
            return f"ERROR: {str(e)}", 500

        return "Produto criado com sucesso", 200
    