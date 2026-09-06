import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Order from './pages/Order'
import Billing from './pages/Billing'
import Unauthorized from './pages/Unothorized'
import Login from './pages/Login'

import Layout from './components/layout/layout'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute moduleName="Orders"><Order /></ProtectedRoute>} />
          <Route path="/billing" element={<ProtectedRoute moduleName="Billing"><Billing /></ProtectedRoute>} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

