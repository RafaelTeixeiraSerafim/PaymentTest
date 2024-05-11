import { useEffect, useState } from 'react'
import ProductList from '../components/ProductList.tsx'
import { Product } from '../types.tsx'

interface Products {
  productList: Product[]
}

function App() {
  const [products, setProducts] = useState<Products>({ productList: [] })

  async function fetchProducts() {
    const response = await fetch("http://localhost:5000/products")
    const json_response = await response.json()

    setProducts(json_response)
    console.log(json_response)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <ProductList products={products.productList} />
  )
}

export default App
