from flask import jsonify, request
from mercadopagoapi import get_payment_link

def carts_controller():
    if request.method == 'POST':
        try:
            data = request.get_json()

        except Exception as e:
            return f'ERROR: {str(e)}', 400
        
        return jsonify(get_payment_link(data))
    