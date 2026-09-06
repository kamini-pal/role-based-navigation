import mockInvoices from '../data/mockBilling'

// ─────────────────────────────────────────────
// Billing is VIEW-only (permission: ["VIEW"]).
// No Create / Edit / Delete controls anywhere.
// ─────────────────────────────────────────────

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

function InvoiceStatusBadge({ status }) {
    const cls =
        status === 'Paid'    ? 'invoice-badge--paid'    :
        status === 'Pending' ? 'invoice-badge--pending' :
        'invoice-badge--overdue'
    return <span className={`invoice-badge ${cls}`}>{status}</span>
}

function Billing() {
    const invoices = mockInvoices

    // ── Summary calculations ──
    const totalInvoiced  = invoices.reduce((sum, inv) => sum + inv.amount, 0)
    const totalPaid      = invoices.filter(i => i.status === 'Paid')
                                   .reduce((sum, i) => sum + i.amount, 0)
    const totalPending   = invoices.filter(i => i.status === 'Pending')
                                   .reduce((sum, i) => sum + i.amount, 0)
    const totalOverdue   = invoices.filter(i => i.status === 'Overdue')
                                   .reduce((sum, i) => sum + i.amount, 0)

    const paidCount    = invoices.filter(i => i.status === 'Paid').length
    const pendingCount = invoices.filter(i => i.status === 'Pending').length
    const overdueCount = invoices.filter(i => i.status === 'Overdue').length

    return (
        <div className="billing-page">
            {/* ── Page Header ── */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Billing</h1>
                    <p className="page-subtitle">View invoices and billing information</p>
                </div>
                {/* No create button — VIEW-only module */}
                <span className="billing-view-badge">View Only</span>
            </div>

            {/* ── Summary Cards ── */}
            <div className="orders-stats billing-stats-grid">
                <div className="stat-card stat-card--blue">
                    <span className="stat-label">Total Invoiced</span>
                    <span className="stat-value billing-stat-value">{formatCurrency(totalInvoiced)}</span>
                    <span className="stat-sub">{invoices.length} invoices</span>
                </div>
                <div className="stat-card stat-card--green">
                    <span className="stat-label">Paid</span>
                    <span className="stat-value billing-stat-value">{formatCurrency(totalPaid)}</span>
                    <span className="stat-sub">{paidCount} invoices</span>
                </div>
                <div className="stat-card stat-card--yellow">
                    <span className="stat-label">Pending</span>
                    <span className="stat-value billing-stat-value">{formatCurrency(totalPending)}</span>
                    <span className="stat-sub">{pendingCount} invoices</span>
                </div>
                <div className="stat-card stat-card--red">
                    <span className="stat-label">Overdue</span>
                    <span className="stat-value billing-stat-value">{formatCurrency(totalOverdue)}</span>
                    <span className="stat-sub">{overdueCount} invoices</span>
                </div>
            </div>

            {/* ── Invoices Table ── */}
            <div className="table-container">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Customer</th>
                            <th>Invoice Date</th>
                            <th>Due Date</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((inv) => (
                            <tr key={inv.id}>
                                <td className="invoice-id">{inv.id}</td>
                                <td>
                                    <div className="customer-info">
                                        <span className="customer-name">{inv.customer}</span>
                                        <span className="customer-email">{inv.email}</span>
                                    </div>
                                </td>
                                <td>{formatDate(inv.date)}</td>
                                <td>
                                    <span className={inv.status === 'Overdue' ? 'billing-due-overdue' : ''}>
                                        {formatDate(inv.dueDate)}
                                    </span>
                                </td>
                                <td className="order-total">{formatCurrency(inv.amount)}</td>
                                <td>
                                    <span className="billing-method">{inv.method}</span>
                                </td>
                                <td>
                                    <InvoiceStatusBadge status={inv.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── Read-only notice ── */}
            <p className="billing-readonly-note">
                ℹ️ Billing records are read-only. Contact your administrator to make changes.
            </p>
        </div>
    )
}

export default Billing