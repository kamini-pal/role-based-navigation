import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


function Sidebar() {
    const { user, permissions, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    if (!user) return null

    return (
        <aside className="sidebar">
            <h2>My Application</h2>

            <nav className="sidebar-nav">
                <Link to="/dashboard">Dashboard</Link>
                {permissions.modules
                    .filter((mod) => mod.permission.includes('VIEW'))
                    .map((module) => (
                        <Link key={module.name} to={`/${module.name.toLowerCase()}`}>
                            {module.name}
                        </Link>
                    ))}
            </nav>

            <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #ddd' }}>
                <p style={{ margin: '0 0 8px', fontSize: '14px' }}>Logged in as: <strong>{user.name}</strong></p>
                <button onClick={handleLogout} style={{ padding: '6px 16px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>
        </aside>
    )
}

export default Sidebar