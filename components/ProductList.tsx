import React from "react"
import { OriginalProduct } from '../types.tsx'
import axios from "axios"

export interface ProductListProps {
    products: OriginalProduct[],
    onUpdate: (product: OriginalProduct) => void,
    updateCallback: () => void
}

export default function ProductList({ products, onUpdate, updateCallback }: ProductListProps) {
    const onDelete = (id: number) => {
        axios.delete(`http://localhost:5000/product/${id}`).then((response) => {
            console.log(response);
            updateCallback()

            alert(`Produto deletado com sucesso.`)
        }).catch((error) => {
            console.log(error);

            alert(`${error.response.data}. \n\nTente novamente.`)
        });
    }

    const onBuy = (product: OriginalProduct) => {
        axios.post('http://localhost:5000/carts', {
            productList: [{
                id: product.id.toString(),
                title: product.title,
                currency_id: "BRL",
                quantity: 1,
                unit_price: product.price
            }]
        }).then((response) => {
            console.log(response);

            window.location.href = response.data;
        }).catch((error) => {
            console.log(error);

            alert(`${error.response.data}. \n\nTente novamente.`)
        });
    }

    return (
        <div>
            <h1>Product List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>
                                <button onClick={() => onUpdate(product)}>Update</button>
                                <button onClick={() => onDelete(product.id)}>Delete</button>
                                <button onClick={() => onBuy(product)}>Buy</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}