import { useAuth } from '../context/AuthContext'

function Order() {
    const { hasPermission } = useAuth()

    return (
        <div>
            <h1>Order page</h1>
            <p>Welcome to the order page.</p>
            {hasPermission('Orders', 'CREATE') && (
                <button style={{ padding: '8px 20px', marginTop: '16px', cursor: 'pointer' }}>
                    Create Order
                </button>
            )}
        </div>
    )
}

export default Order