import { useNavigate } from 'react-router-dom'

function Unauthorized() {
    const navigate = useNavigate()

    return (
        <div className="error-page">
            <div className="error-card">
                <div className="error-icon">🔒</div>
                <h1 className="error-title">Access Denied</h1>
                <p className="error-message">You do not have permission to access this page.</p>
                <button className="btn btn-primary" onClick={() => navigate(-1)}>
                    Go Back
                </button>
            </div>
        </div>
    )
}


export default Unauthorized;