# # SDK do Mercado Pago
# import mercadopago
# # Adicione as credenciais
# sdk = mercadopago.SDK("TEST-390474968038201-050900-8f0e58898bfd4925699bcf76e196d0bc-387339876")


# # Cria um item na preferência
# preference_data = {
#     "items": [
#         {
#             "id": "1",
#             "title": "Stardew Valley",
#             "currency_id": "BRL",
#             "quantity": 1,
#             "unit_price": 24.99
#         }
#     ]
# }

# preference_response = sdk.preference().create(preference_data)
# preference = preference_response["response"]
# print(preference)
