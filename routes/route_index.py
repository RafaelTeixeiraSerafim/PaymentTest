from routes.products_route import products_route
from routes.carts_route import carts_route

def route_index(app):
    products_route(app)
    carts_route(app)