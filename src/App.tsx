import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState({})

  useEffect(() => {
    fetch("http://localhost:5000/products").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <>
    </>
  )
}

export default App
