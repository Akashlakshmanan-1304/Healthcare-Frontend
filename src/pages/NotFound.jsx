import React from 'react';

export default function NotFound() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: '80vh', background: '#f8f9fa' }}
    >
      <div style={{ position: 'relative', marginBottom: 30 }}>
        <h1
          className="display-1 fw-bold"
          style={{
            color: '#0d6efd',
            textShadow: '0 2px 8px rgba(13,110,253,0.2)',
            animation: 'bounce404 1.5s infinite'
          }}
        >
          404
        </h1>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '70%',
            transform: 'translate(-50%, 0)',
            width: 120,
            height: 10,
            background: 'rgba(0,0,0,0.08)',
            borderRadius: 10,
            filter: 'blur(2px)',
            animation: 'shadow404 1.5s infinite'
          }}
        />
      </div>
      <h2 className="mb-3" style={{ animation: 'fadeIn404 2s' }}>Page Not Found</h2>
      <p className="text-muted mb-4" style={{ animation: 'fadeIn404 2.5s' }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <a href="/" className="btn btn-primary px-4 py-2" style={{ animation: 'fadeIn404 3s' }}>
        Go Home
      </a>
      <style>
        {`
          @keyframes bounce404 {
            0%, 100% { transform: translateY(0);}
            50% { transform: translateY(-20px);}
          }
          @keyframes shadow404 {
            0%, 100% { width: 120px;}
            50% { width: 80px;}
          }
          @keyframes fadeIn404 {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}