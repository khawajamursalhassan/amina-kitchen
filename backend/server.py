from flask import Flask, jsonify
from products import products
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def assending_sort(products):
    for i in range(len(products)):
        for j in range(0, len(products) - i - 1):
            if products[j]['name'] > products[j + 1]['name']:
                products[j], products[j + 1] = products[j + 1], products[j]
    return products

def descending_sort(products):
    for i in range(len(products)):
        for j in range(0, len(products) - i - 1):
            if products[j]['name'] < products[j + 1]['name']:
                products[j], products[j + 1] = products[j + 1], products[j]
    return products

@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)

@app.route('/assending-products', methods=['GET'])
def get_assending_products():
    return jsonify(assending_sort(products))

@app.route('/descending-products', methods=['GET'])
def get_descending_products():
    return jsonify(descending_sort(products))

if __name__ == '__main__':
    app.run(debug=True)

