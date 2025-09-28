// Errorpage.jsx
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  
  // Determine error type and message
  const getErrorDetails = () => {
    if (error.status === 404) {
      return {
        title: "Page Not Found",
        message: "The page you're looking for doesn't exist or has been moved.",
        code: "404"
      };
    }
    
    if (error.status === 401) {
      return {
        title: "Unauthorized Access",
        message: "You don't have permission to access this page.",
        code: "401"
      };
    }
    
    if (error.status === 403) {
      return {
        title: "Access Denied",
        message: "You need special permissions to view this content.",
        code: "403"
      };
    }
    
    if (error.status === 500) {
      return {
        title: "Server Error",
        message: "Something went wrong on our end. Please try again later.",
        code: "500"
      };
    }
    
    // Default error
    return {
      title: "Oops! Something went wrong",
      message: "An unexpected error has occurred. Please try again.",
      code: error.status || "Error"
    };
  };
  
  const errorDetails = getErrorDetails();
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        background: 'white',
        padding: '40px 30px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Error Icon */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#fee2e2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '40px'
          }}>
            ⚠️
          </div>
        </div>
        
        {/* Error Code */}
        <div style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '10px'
        }}>
          {errorDetails.code}
        </div>
        
        {/* Error Title */}
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '15px'
        }}>
          {errorDetails.title}
        </h1>
        
        {/* Error Message */}
        <p style={{
          color: '#6b7280',
          marginBottom: '30px',
          lineHeight: '1.6'
        }}>
          {errorDetails.message}
        </p>
        
        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          alignItems: 'center'
        }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 24px',
              backgroundColor: '#2563eb',
              color: 'white',
              fontWeight: '500',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            🏠 Go Home
          </Link>
          
          <button
            onClick={() => window.location.reload()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 24px',
              backgroundColor: '#e5e7eb',
              color: '#374151',
              fontWeight: '500',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#d1d5db'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#e5e7eb'}
          >
            🔄 Try Again
          </button>
        </div>
        
        {/* Technical Details (for development) */}
        {process.env.NODE_ENV === 'development' && error?.message && (
          <div style={{
            marginTop: '30px',
            padding: '15px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            textAlign: 'left'
          }}>
            <p style={{
              fontSize: '14px',
              fontFamily: 'monospace',
              color: '#374151'
            }}>
              {error.message}
            </p>
            {error.stack && (
              <pre style={{
                fontSize: '12px',
                color: '#6b7280',
                marginTop: '10px',
                overflow: 'auto'
              }}>
                {error.stack}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;

