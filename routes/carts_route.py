from controllers.carts_controller import carts_controller

def carts_route(app):
    app.route('/carts', methods=['POST'])(carts_controller)