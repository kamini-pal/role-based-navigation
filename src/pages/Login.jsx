import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
    const [username, setUsername] = useState('admin')
    const { login, user } = useAuth()
    const navigate = useNavigate()

    // If already logged in, redirect to dashboard
    if (user) {
        navigate('/dashboard', { replace: true })
        return null
    }

    function handleLogin(e) {
        e.preventDefault()
        const success = login(username)
        if (success) {
            navigate('/dashboard')
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login</h1>
                <form onSubmit={handleLogin} className="modal-form" style={{ padding: 0 }}>
                    <div className="form-group">
                        <label htmlFor="username">Select User</label>
                        <select
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        >
                            <option value="admin">Admin</option>
                            <option value="viewer">Viewer</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
