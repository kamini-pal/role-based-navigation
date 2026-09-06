function Dashboard() {
    return (
        <div className="dashboard-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">Welcome back to the application dashboard</p>
                </div>
            </div>
            
            <div className="orders-stats">
                <div className="stat-card" style={{ padding: '32px' }}>
                    <span className="stat-label">System Status</span>
                    <span className="stat-value" style={{ color: '#059669' }}>Online</span>
                </div>
                <div className="stat-card" style={{ padding: '32px' }}>
                    <span className="stat-label">Current Role</span>
                    <span className="stat-value">Active</span>
                </div>
            </div>
        </div>
    )
}

export default Dashboard