import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Order from './pages/Order'
import Billing from './pages/Billing'
import Unauthorized from './pages/Unothorized'

import Layout from './components/layout/layout'


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
