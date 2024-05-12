# SDK do Mercado Pago
import mercadopago
import urllib
import json
import os
from dotenv import load_dotenv

load_dotenv()

# Adicione as credenciais
sdk = mercadopago.SDK(os.getenv("MERCADOPAGO_TEST_ACCESS_TOKEN"))

def fetch_products():
    try:
        with urllib.request.urlopen('http://localhost:5000/products') as response:
            data = response.read()
            return json.loads(data)
    except Exception as e:
        print(str(e))

def get_payment_link():
    data = fetch_products()

    preference_data = {
        "items": data['productList']
    }

    try:
        preference_response = sdk.preference().create(preference_data)
    except Exception as e:
        return f'ERROR: {str(e)}'

    preference = preference_response["response"]
    return preference['init_point']