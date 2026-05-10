export default function SiteLoading() {
  return (
    <main style={{
      background: '#07070E', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '64px', height: '64px', margin: '0 auto 1.5rem',
          borderRadius: '50%', border: '2px solid rgba(255,255,255,0.05)',
          borderTopColor: '#06B6D4', borderRightColor: '#D4A574',
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{ color: '#808098', fontSize: '0.9rem', letterSpacing: '0.05em' }}>
          LOADING PREMIUM SITE
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
