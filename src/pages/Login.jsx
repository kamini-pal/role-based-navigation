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
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '32px' }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Select User:</label>
                <select
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ display: 'block', width: '100%', padding: '8px', margin: '12px 0' }}
                >
                    <option value="admin">admin</option>
                    <option value="viewer">viewer</option>
                </select>
                <button
                    type="submit"
                    style={{ padding: '8px 24px', cursor: 'pointer' }}
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
