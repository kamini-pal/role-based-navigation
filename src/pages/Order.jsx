import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import mockOrders from '../data/mockOrders'

const initialFormState = {
    customer: '',
    email: '',
    items: '',
    total: '',
    status: 'Pending',
}

function Order() {
    const { hasPermission } = useAuth()
    const [orders, setOrders] = useState(mockOrders)
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState(initialFormState)
    const [formErrors, setFormErrors] = useState({})

    function formatCurrency(amount) {
        return '₹' + amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })
    }

    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
    }

    function generateOrderId() {
        const maxId = orders.reduce((max, order) => {
            const num = parseInt(order.id.split('-')[1], 10)
            return num > max ? num : max
        }, 0)
        return `ORD-${maxId + 1}`
    }

    function validateForm() {
        const errors = {}
        if (!formData.customer.trim()) {
            errors.customer = 'Customer name is required'
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Enter a valid email address'
        }
        if (!formData.items || Number(formData.items) < 1) {
            errors.items = 'At least 1 item is required'
        }
        if (!formData.total || Number(formData.total) <= 0) {
            errors.total = 'Total must be greater than 0'
        }
        return errors
    }

    function handleInputChange(e) {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        // Clear error for this field as user types
        if (formErrors[name]) {
            setFormErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    function handleCreateOrder(e) {
        e.preventDefault()
        const errors = validateForm()
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return
        }

        const newOrder = {
            id: generateOrderId(),
            customer: formData.customer.trim(),
            email: formData.email.trim(),
            date: new Date().toISOString().split('T')[0],
            status: formData.status,
            total: parseFloat(formData.total),
            items: parseInt(formData.items, 10),
        }

        setOrders((prev) => [newOrder, ...prev])
        setFormData(initialFormState)
        setFormErrors({})
        setShowModal(false)
    }

    function handleCloseModal() {
        setShowModal(false)
        setFormData(initialFormState)
        setFormErrors({})
    }

    return (
        <div className="orders-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Orders</h1>
                    <p className="page-subtitle">Manage and track all customer orders</p>
                </div>
                {hasPermission('Orders', 'CREATE') && (
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        + Create Order
                    </button>
                )}
            </div>

            <div className="orders-stats">
                <div className="stat-card">
                    <span className="stat-label">Total Orders</span>
                    <span className="stat-value">{orders.length}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Delivered</span>
                    <span className="stat-value">{orders.filter(o => o.status === 'Delivered').length}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Processing</span>
                    <span className="stat-value">{orders.filter(o => o.status === 'Processing').length}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Pending</span>
                    <span className="stat-value">{orders.filter(o => o.status === 'Pending').length}</span>
                </div>
            </div>

            <div className="table-container">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="order-id">{order.id}</td>
                                <td>
                                    <div className="customer-info">
                                        <span className="customer-name">{order.customer}</span>
                                        <span className="customer-email">{order.email}</span>
                                    </div>
                                </td>
                                <td>{formatDate(order.date)}</td>
                                <td>{order.items}</td>
                                <td className="order-total">{formatCurrency(order.total)}</td>
                                <td>
                                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <span className="action-placeholder">—</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create Order Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Create New Order</h2>
                            <button className="modal-close" onClick={handleCloseModal}>×</button>
                        </div>
                        <form onSubmit={handleCreateOrder} className="modal-form">
                            <div className="form-group">
                                <label htmlFor="customer">Customer Name</label>
                                <input
                                    id="customer"
                                    name="customer"
                                    type="text"
                                    placeholder="Enter customer name"
                                    value={formData.customer}
                                    onChange={handleInputChange}
                                    className={formErrors.customer ? 'input-error' : ''}
                                />
                                {formErrors.customer && <span className="error-text">{formErrors.customer}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter email address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={formErrors.email ? 'input-error' : ''}
                                />
                                {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="items">Number of Items</label>
                                    <input
                                        id="items"
                                        name="items"
                                        type="number"
                                        min="1"
                                        placeholder="e.g. 3"
                                        value={formData.items}
                                        onChange={handleInputChange}
                                        className={formErrors.items ? 'input-error' : ''}
                                    />
                                    {formErrors.items && <span className="error-text">{formErrors.items}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="total">Order Total (₹)</label>
                                    <input
                                        id="total"
                                        name="total"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="e.g. 2499.00"
                                        value={formData.total}
                                        onChange={handleInputChange}
                                        className={formErrors.total ? 'input-error' : ''}
                                    />
                                    {formErrors.total && <span className="error-text">{formErrors.total}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Create Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Order