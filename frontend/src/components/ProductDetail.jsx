import { useState, useEffect } from 'react'

export default function ProductDetail({ productId, onNavigate }) {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then(res => res.json())
        .then(data => setProduct(data))
    }
  }, [productId])

  const handleAddToCart = () => {
    fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: product.id, quantity: 1 })
    })
    
    alert("Added to cart!")
  }

  if (!product) return <div>Loading...</div>

  return (
    <div>
      <button onClick={() => onNavigate('list')} style={{ marginBottom: '15px' }}>&larr; Back</button>
      <h2>{product.name}</h2>
      <p style={{ fontSize: '1.2em' }}>{product.description}</p>
      <p>Base Price: ${product.base_price}</p>
      
      <button 
        onClick={handleAddToCart}
        style={{ background: 'blue', color: 'white', padding: '10px 15px', marginTop: '20px', cursor: 'pointer', border: 'none' }}
      >
        Add to Cart
      </button>
    </div>
  )
}