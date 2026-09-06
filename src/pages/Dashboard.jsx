import { useAuth } from '../context/AuthContext'
import mockOrders from '../data/mockOrders'

// Read orders from localStorage (same key used in Order.jsx).
// Falls back to mockOrders if nothing is saved yet.
const ORDERS_STORAGE_KEY = 'roleBasedNavigation_orders'

function loadOrders() {
    try {
        const saved = localStorage.getItem(ORDERS_STORAGE_KEY)
        if (saved) {
            const parsed = JSON.parse(saved)
            if (Array.isArray(parsed) && parsed.length > 0) return parsed
        }
    } catch {
        // corrupted data — use seed
    }
    return mockOrders
}

function formatCurrency(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

// Badge for order status — reuses existing status-badge CSS classes
function StatusBadge({ status }) {
    return (
        <span className={`status-badge status-${status.toLowerCase()}`}>
            {status}
        </span>
    )
}

// Permission tag pill
function PermTag({ label }) {
    return <span className="perm-tag">{label}</span>
}

function Dashboard() {
    const { user, permissions, hasPermission } = useAuth()
    const canViewOrders = hasPermission('Orders', 'VIEW')

    // Only load + compute order stats when the user has Orders access
    const orders = canViewOrders ? loadOrders() : []

    const totalOrders   = orders.length
    const totalRevenue  = orders.reduce((sum, o) => sum + Number(o.total), 0)
    const pendingCount  = orders.filter(o => o.status === 'Pending').length
    const deliveredCount = orders.filter(o => o.status === 'Delivered').length
    const processingCount = orders.filter(o => o.status === 'Processing').length
    const shippedCount  = orders.filter(o => o.status === 'Shipped').length
    const cancelledCount = orders.filter(o => o.status === 'Cancelled').length

    // Recent orders — 5 most recent (first items in the array are newest due to Order.jsx prepend)
    const recentOrders = orders.slice(0, 5)

    return (
        <div className="dashboard-page">
            {/* ── Page Header ── */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">
                        Welcome back, <strong>{user?.name}</strong>. Here's what's happening today.
                    </p>
                </div>
            </div>

            {/* ── KPI Stat Cards (Orders module only) ── */}
            {canViewOrders && (
                <>
                    <div className="orders-stats dash-kpi-grid">
                        <div className="stat-card stat-card--blue">
                            <span className="stat-label">Total Orders</span>
                            <span className="stat-value">{totalOrders}</span>
                        </div>
                        <div className="stat-card stat-card--green">
                            <span className="stat-label">Total Revenue</span>
                            <span className="stat-value">{formatCurrency(totalRevenue)}</span>
                        </div>
                        <div className="stat-card stat-card--yellow">
                            <span className="stat-label">Pending Orders</span>
                            <span className="stat-value">{pendingCount}</span>
                        </div>
                        <div className="stat-card stat-card--teal">
                            <span className="stat-label">Delivered Orders</span>
                            <span className="stat-value">{deliveredCount}</span>
                        </div>
                    </div>

                    {/* ── Two-column lower section ── */}
                    <div className="dash-lower-grid">

                        {/* Order Status Overview */}
                        <div className="dash-card">
                            <h2 className="dash-card-title">Order Status Overview</h2>
                            <div className="status-overview">
                                <StatusOverviewRow label="Pending"    count={pendingCount}    total={totalOrders} colorClass="bar-pending" />
                                <StatusOverviewRow label="Processing" count={processingCount} total={totalOrders} colorClass="bar-processing" />
                                <StatusOverviewRow label="Shipped"    count={shippedCount}    total={totalOrders} colorClass="bar-shipped" />
                                <StatusOverviewRow label="Delivered"  count={deliveredCount}  total={totalOrders} colorClass="bar-delivered" />
                                <StatusOverviewRow label="Cancelled"  count={cancelledCount}  total={totalOrders} colorClass="bar-cancelled" />
                            </div>
                        </div>

                        {/* Access Overview */}
                        <AccessOverview permissions={permissions} />
                    </div>

                    {/* ── Recent Orders Table ── */}
                    <div className="dash-card dash-card--full">
                        <h2 className="dash-card-title">Recent Orders</h2>
                        {recentOrders.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-state-icon">📋</div>
                                <p>No orders yet. Create your first order in the Orders module.</p>
                            </div>
                        ) : (
                            <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
                                <table className="orders-table">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map(order => (
                                            <tr key={order.id}>
                                                <td className="order-id">{order.id}</td>
                                                <td>
                                                    <div className="customer-info">
                                                        <span className="customer-name">{order.customer}</span>
                                                        <span className="customer-email">{order.email}</span>
                                                    </div>
                                                </td>
                                                <td>{formatDate(order.date)}</td>
                                                <td className="order-total">{formatCurrency(order.total)}</td>
                                                <td><StatusBadge status={order.status} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* ── Viewer: no Orders access — show only access overview ── */}
            {!canViewOrders && (
                <div className="dash-lower-grid dash-lower-grid--single">
                    <AccessOverview permissions={permissions} />
                </div>
            )}
        </div>
    )
}

// ── Status bar row component ──
function StatusOverviewRow({ label, count, total, colorClass }) {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0
    return (
        <div className="status-row">
            <div className="status-row-meta">
                <span className="status-row-label">{label}</span>
                <span className="status-row-count">{count} <span className="status-row-pct">({pct}%)</span></span>
            </div>
            <div className="status-bar-track">
                <div
                    className={`status-bar-fill ${colorClass}`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    )
}

// ── Permission / access overview card ──
function AccessOverview({ permissions }) {
    return (
        <div className="dash-card">
            <h2 className="dash-card-title">Your Access Overview</h2>
            {permissions.modules.length === 0 ? (
                <p className="dash-no-access">No modules are accessible with your current role.</p>
            ) : (
                <div className="access-module-list">
                    {permissions.modules.map(mod => (
                        <div key={mod.name} className="access-module-item">
                            <span className="access-module-name">{mod.name}</span>
                            <div className="access-perm-tags">
                                {mod.permission.map(p => (
                                    <PermTag key={p} label={p} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dashboard