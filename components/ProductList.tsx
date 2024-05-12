import React from "react"
import { OriginalProduct } from '../types.tsx'
import axios from "axios"

export interface ProductListProps {
    products: OriginalProduct[],
    updateProduct: (product: OriginalProduct) => void,
    updateCallback: () => void
}

export default function ProductList({ products, updateProduct, updateCallback }: ProductListProps) {
    const onDelete = async (id: number) => {
        axios.delete(`http://localhost:5000/product/${id}`).then((response) => {
            console.log(response);
            updateCallback()

            alert(`Produto deletado com sucesso.`)
            return
        }).catch((error) => {
            console.log(error);

            alert(`${error.response.data}. \n\nTente novamente.`)
            return
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
                                <button onClick={() => updateProduct(product)}>Update</button>
                                <button onClick={() => onDelete(product.id)}>Delete</button>
                                <button>Add to Cart</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}