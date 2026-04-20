import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Checkout from './pages/Checkout'
import OrderConfirmed from './pages/OrderConfirmed'
import Reviews from './pages/Reviews'
import Subscription from './pages/Subscription'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmed" element={<OrderConfirmed />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App