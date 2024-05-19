import React, { useState } from "react"
import axios from "axios"
import { OriginalProduct, SimpleProduct } from "../types"

interface ProductFormProps {
    existingProduct: OriginalProduct,
    updateCallback: () => void
}

export default function ProductForm({ existingProduct = { id: 0, title: "", price: 0 }, updateCallback }: ProductFormProps) {
    const [product, setProduct] = useState<SimpleProduct>({
        id: existingProduct.id || 0,
        title: existingProduct.title || "",
        price: existingProduct.price.toString() || ""
    })
    const [submitMessage, setSubmitMessage] = useState("")

    const isUpdating = existingProduct.id !== 0

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!product.title || !product.price) {
            setSubmitMessage("Todos os campos devem ser preenchidos.")
            return
        }

        if (!parseFloat(product.price)) {
            setSubmitMessage("Digite valores válidos.")
            return
        }

        let request, url;
        if (isUpdating) {
            request = axios.patch
            url = `http://localhost:5000/product/${product.id}`
        }
        else {
            request = axios.post
            url = 'http://localhost:5000/products'
        }

        request(url, {
            title: product.title,
            price: parseFloat(product.price)
        })
            .then((response) => {
                console.log(response);
                updateCallback()

                setSubmitMessage("")
                alert(`Produto ${isUpdating ? 'alterado' : 'criado'} com sucesso.`)
            })
            .catch((error) => {
                console.log(error);

                setSubmitMessage("")
                alert(`${error.response.data}. \n\nTente novamente.`)
            });

    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={product.title} onChange={(e) => setProduct({ ...product, title: e.target.value })} />
            <br /><br />

            <label htmlFor="price">Price</label>
            <input type="text" name="price" id="price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
            <br /><br />

            <button type="submit">{isUpdating ? 'Update' : 'Create'} Product</button>

            <p>{submitMessage}</p>
        </form>
    )
}