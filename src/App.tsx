import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { NordicLayout } from './components/layout/NordicLayout'
import { HomePage } from './pages/HomePage'
import { ShopPage } from './pages/ShopPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { ContactPage } from './pages/ContactPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { CartPage } from './pages/CartPage'
import { ProductsPage } from './pages/ProductsPage'
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AuthProvider, useAuth } from './state/AuthContext'
import { CartProvider } from './state/CartContext'
import { ProductsProvider } from './state/ProductsContext'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/giris" replace />
  return children
}

function AdminProtectedRoute({ children }: { children: JSX.Element }) {
  const { admin } = useAuth()
  if (!admin) return <Navigate to="/admin/giris" replace />
  return children
}

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <NordicLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/koleksiyon/:kategori" element={<ShopPage />} />
              <Route path="/urun/:productId" element={<ProductDetailPage />} />
              <Route path="/iletisim" element={<ContactPage />} />
              <Route path="/giris" element={<LoginPage />} />
              <Route path="/uye-ol" element={<RegisterPage />} />
              <Route path="/urunler" element={<ProductsPage />} /> {/* Added products route */}
              <Route
                path="/sepet"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/admin/giris" element={<AdminLoginPage />} />
              <Route
                path="/admin"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboardPage />
                  </AdminProtectedRoute>
                }
              />
            </Routes>
          </NordicLayout>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  )
}

export default App
