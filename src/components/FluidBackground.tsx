/* Fixed full-screen background — video + aurora blobs.
   Sits at z-0 behind every section. */
export default function FluidBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden>

      {/* ── Full-page background video ── */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.28 }}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
      />

      {/* Dark vignette so sections stay readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Purple — top-left */}
      <div className="fluid-blob" style={{
        width: '85vw', height: '85vw',
        top: '-25%', left: '-30%',
        background: 'radial-gradient(circle, #7c3aed 0%, transparent 68%)',
        animation: 'blob1 26s ease-in-out infinite',
      }} />
      {/* Cyan — bottom-right */}
      <div className="fluid-blob" style={{
        width: '75vw', height: '75vw',
        bottom: '-20%', right: '-28%',
        background: 'radial-gradient(circle, #0891b2 0%, transparent 68%)',
        animation: 'blob2 32s ease-in-out infinite',
      }} />
      {/* Rose — centre */}
      <div className="fluid-blob" style={{
        width: '55vw', height: '55vw',
        top: '35%', left: '25%',
        background: 'radial-gradient(circle, #9d174d 0%, transparent 68%)',
        animation: 'blob3 22s ease-in-out infinite',
        opacity: 0.18,
      }} />
      {/* Indigo — top-right */}
      <div className="fluid-blob" style={{
        width: '65vw', height: '65vw',
        top: '-10%', right: '-22%',
        background: 'radial-gradient(circle, #4338ca 0%, transparent 68%)',
        animation: 'blob4 19s ease-in-out infinite reverse',
        opacity: 0.18,
      }} />

      {/* Grain noise texture */}
      <div className="fluid-grain" />
    </div>
  )
}
