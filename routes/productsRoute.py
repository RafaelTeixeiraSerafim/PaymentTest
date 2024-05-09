from controllers.productsController import productsController

def productsRoute(app):
    app.route('/products')(productsController)