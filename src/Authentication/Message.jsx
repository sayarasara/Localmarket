// ToastMessage.jsx
import React, { useState, useEffect } from 'react';

let globalShowMessage = null;

export const Message = () => {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState('success');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    globalShowMessage = (msgType, msgText) => {
      setType(msgType);
      setMessage(msgText);
      setIsVisible(true);
      
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };
  }, []);

  if (!isVisible || !message) return null;

  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-800',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-800',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-800',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    }
  };

  const currentStyle = styles[type] || styles.success;

  return (
    <div className="fixed top-24 right-4 z-50 animate-slide-in-right">
      <div className={`${currentStyle.bg} border-l-4 ${currentStyle.border} rounded-lg shadow-2xl max-w-md w-full`}>
        <div className="p-4">
          <div className="flex items-start">
            <div className={`flex-shrink-0 ${currentStyle.iconBg} rounded-full p-2`}>
              {type === 'success' ? (
                <svg className={`h-5 w-5 ${currentStyle.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : type === 'error' ? (
                <svg className={`h-5 w-5 ${currentStyle.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className={`h-5 w-5 ${currentStyle.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            
            <div className="ml-3 flex-1">
              <p className={`text-sm font-medium ${currentStyle.text}`}>
                {message}
              </p>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-3 overflow-hidden rounded-full bg-gray-200">
            <div className={`h-1 rounded-full ${currentStyle.progressBg || 'bg-green-500'} animate-progress-shrink`} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes progress-shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
        
        .animate-progress-shrink {
          animation: progress-shrink 3s linear forwards;
        }
      `}</style>
    </div>
  );
};

// Global function to show messages from anywhere
export const showMessage = (type, message) => {
  if (globalShowMessage) {
    globalShowMessage(type, message);
  } else {
    console.warn('ToastMessage component not mounted yet');
  }
};

// Helper functions for convenience
export const showSuccess = (message) => showMessage('success', message);
export const showError = (message) => showMessage('error', message);
export const showInfo = (message) => showMessage('info', message);