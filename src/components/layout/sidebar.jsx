function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>My Application</h2>

            <nav className="sidebar-nav">
                <a href="/dashboard">Dashboard</a>
                <a href="/orders">Orders</a>
                <a href="/billing">Billing</a>
            </nav>
        </aside>
    )
}

export default Sidebar