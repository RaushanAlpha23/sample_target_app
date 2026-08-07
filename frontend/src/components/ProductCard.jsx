import { useState, useEffect } from 'react'

export default function ProductCard({ product, onNavigate }) {
  const [priceData, setPriceData] = useState(null)

  useEffect(() => {
    fetch(`/api/products/${product.id}/pricing`)
      .then(res => res.json())
      .then(data => setPriceData(data))
  }, [product.id])

  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
      <h3>{product.name}</h3>
      <p style={{ color: '#666', fontSize: '0.9em' }}>
        {product.description?.substring(0, 30)}...
      </p>
      
      <div style={{ margin: '15px 0', fontWeight: 'bold' }}>
        Price: ${priceData ? priceData.price : '...'} 
        {priceData?.discount_active && <span style={{ color: 'red', marginLeft: '5px' }}>(Sale!)</span>}
      </div>
      
      <button 
        onClick={() => onNavigate('detail', product.productId)}
        style={{ padding: '8px 12px', cursor: 'pointer' }}
      >
        View Details
      </button>
    </div>
  )
}