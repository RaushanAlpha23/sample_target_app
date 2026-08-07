import { useState, useEffect } from 'react'

export default function Cart({ onNavigate }) {
  const [cartData, setCartData] = useState({ items: [], total_items: 0 })

  useEffect(() => {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => setCartData(data))
  }, [])

  const totalCost = cartData.items.reduce((acc, item) => acc + item.price, 0)

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p>{cartData.total_items} items in cart</p>
      
      {cartData.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ marginTop: '20px' }}>
          {cartData.items.map((item, idx) => (
            <div key={idx} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
              <strong>{item.name}</strong> - ${item.price} x {item.quantity}
            </div>
          ))}
          
          <h3 style={{ marginTop: '20px' }}>Total Cost: ${totalCost}</h3>
        </div>
      )}
      
      <button onClick={() => onNavigate('list')} style={{ marginTop: '20px' }}>Continue Shopping</button>
    </div>
  )
}