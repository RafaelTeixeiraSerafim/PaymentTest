import { useEffect, useState } from 'react'
import { OriginalProduct } from '../types.tsx'
import ProductList from '../components/ProductList.tsx'
import ProductForm from '../components/ProductForm.tsx'
import Modal from '../components/Modal.tsx'
import axios from 'axios'

interface Products {
  productList: OriginalProduct[]
}

function App() {
  const [products, setProducts] = useState<Products>({ productList: [] })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<OriginalProduct>({
    id: 0,
    title: "",
    price: 0
  })

  const fetchProducts = () => {
    axios.get("http://localhost:5000/products").then((response) => {
      setProducts(response.data)
    }).catch((error) => {
      console.error(error)
    })
  }

  useEffect(() => {
    fetchProducts()
  }, [])


  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentProduct({
      id: 0,
      title: "",
      price: 0
    })
  }

  const openModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openUpdateModal = (product: OriginalProduct) => {
    if (isModalOpen) return
    setCurrentProduct(product)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchProducts()
  }

  return (
    <>
      <ProductList products={products.productList} onUpdate={openUpdateModal} updateCallback={onUpdate} />
      <button onClick={openModal}>Create Product</button>

      {isModalOpen && <Modal closeModal={closeModal}>
        <ProductForm existingProduct={currentProduct} updateCallback={onUpdate} />
      </Modal>}
    </>
  )
}

export default App
