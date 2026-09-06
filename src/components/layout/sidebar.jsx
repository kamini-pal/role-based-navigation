import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate, useLocation } from 'react-router-dom'


function Sidebar() {
    const { user, permissions, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    if (!user) return null

    return (
        <aside className="sidebar">
            <h2>Role Based Nav</h2>

            <nav className="sidebar-nav">
                <Link 
                    to="/dashboard"
                    className={location.pathname === '/dashboard' ? 'active' : ''}
                >
                    Dashboard
                </Link>
                {permissions.modules
                    .filter((mod) => mod.permission.includes('VIEW'))
                    .map((module) => {
                        const path = `/${module.name.toLowerCase()}`
                        return (
                            <Link 
                                key={module.name} 
                                to={path}
                                className={location.pathname.startsWith(path) ? 'active' : ''}
                            >
                                {module.name}
                            </Link>
                        )
                    })}
            </nav>

            <div className="sidebar-footer">
                <p className="user-info">Logged in as: <strong>{user.name}</strong></p>
                <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%', borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                    Logout
                </button>
            </div>
        </aside>
    )
}

export default Sidebar