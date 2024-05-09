from flask import render_template, jsonify



def productsController():
    product = {
        "id": "1",
        "title": "Stardew Valley",
        "currency_id": "BRL",
        "quantity": 1,
        "unit_price": 24.99
    }
    
    try:
        # return render_template('products.html', product=product), 200
        response = jsonify(product)
        
        return response
    except Exception as e:
        return f"Erro: {e}", 405