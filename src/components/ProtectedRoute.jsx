import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ moduleName, children }) {
    const { user, hasPermission } = useAuth()

    // Not logged in then redirect to login
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // If a specific module permission is required then check it
    if (moduleName && !hasPermission(moduleName, 'VIEW')) {
        return <Navigate to="/unauthorized" replace />
    }

    return children
}

export default ProtectedRoute
