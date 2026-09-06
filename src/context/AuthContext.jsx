import { createContext, useContext, useState } from 'react'
import mockPermissions from '../data/mockPermission'

const AuthContext = createContext(null)

// Mock users with different permission sets
const mockUsers = {
    admin: {
        name: 'admin',
        permissions: mockPermissions,
    },
    viewer: {
        name: 'viewer',
        permissions: {
            modules: [
                {
                    name: 'Billing',
                    permission: ['VIEW'],
                },
            ],
        },
    },
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [permissions, setPermissions] = useState({ modules: [] })

    function login(username) {
        const mockUser = mockUsers[username]
        if (mockUser) {
            setUser({ name: mockUser.name })
            setPermissions(mockUser.permissions)
            return true
        }
        return false
    }

    function logout() {
        setUser(null)
        setPermissions({ modules: [] })
    }

    function hasPermission(moduleName, action) {
        const mod = permissions.modules.find(
            (m) => m.name.toLowerCase() === moduleName.toLowerCase()
        )
        if (!mod) return false
        return mod.permission.includes(action)
    }

    return (
        <AuthContext.Provider value={{ user, permissions, login, logout, hasPermission }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
