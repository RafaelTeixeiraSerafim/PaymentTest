import mercadopago
import os
from dotenv import load_dotenv

load_dotenv()

sdk = mercadopago.SDK(os.getenv("MERCADOPAGO_TEST_ACCESS_TOKEN"))

def get_payment_link(data):
    preference_data = {
        "items": data['productList']
    }

    try:
        preference_response = sdk.preference().create(preference_data)
    except Exception as e:
        return f'ERROR: {str(e)}'

    preference = preference_response["response"]
    return preference['init_point']