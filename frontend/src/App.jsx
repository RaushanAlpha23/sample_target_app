import { useState } from 'react'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'

function App() {
  const [view, setView] = useState('list')
  const [selectedProductId, setSelectedProductId] = useState(null)

  const navigate = (newView, id = null) => {
    setView(newView)
    setSelectedProductId(id)
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <nav style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
        <button onClick={() => navigate('list')} style={{ marginRight: '10px' }}>Home</button>
        <button onClick={() => navigate('cart')}>View Cart</button>
      </nav>
      
      <main>
        {view === 'list' && <ProductList onNavigate={navigate} />}
        {view === 'detail' && <ProductDetail productId={selectedProductId} onNavigate={navigate} />}
        {view === 'cart' && <Cart onNavigate={navigate} />}
      </main>
    </div>
  )
}

export default App