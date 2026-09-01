import { useEffect, useRef, useState } from 'react'

function VideoPanel({ src, eager = false, children }) {
  const panelRef = useRef(null)
  const videoRef = useRef(null)
  const inViewRef = useRef(eager)
  const [shouldLoad, setShouldLoad] = useState(eager)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting

        if (entry.isIntersecting) {
          setShouldLoad(true)
          videoRef.current?.play().catch(() => {})
        } else {
          videoRef.current?.pause()
        }
      },
      { rootMargin: '25% 0px', threshold: 0.45 }
    )

    observer.observe(panel)
    return () => observer.disconnect()
  }, [])

  function handleCanPlay(event) {
    if (inViewRef.current) {
      event.currentTarget.play().catch(() => {})
    }
  }

  return (
    <section ref={panelRef} className="panel">
      {shouldLoad ? (
        <video
          ref={videoRef}
          className="panel-video"
          src={src}
          muted
          loop
          playsInline
          preload={eager ? 'auto' : 'metadata'}
          onCanPlay={handleCanPlay}
        />
      ) : null}
      <div className="panel-content">{children}</div>
    </section>
  )
}

export default VideoPanel
