from controllers.products_controller import products_controller, product_controller

def products_route(app):
    app.route('/products', methods=['GET', 'POST'])(products_controller)
    app.route('/product/<id>', methods=['PATCH', 'DELETE'])(product_controller)