import Hero from './components/Hero'
import Popular from './components/Popular'
import TopRated from './components/TopRated'

import { useEffect, useRef } from 'react'

const LandingPage = ({ showNav, handleScrollChange, setShowNav }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        handleScrollChange(containerRef.current.scrollTop)
      }
    }

    const container = containerRef.current

    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScrollChange])

  useEffect(() => {
    setShowNav(false)
  }, [setShowNav])

  return (
    <div className='relative flex flex-col w-full'>
      <main
        ref={containerRef}
        className={`relative flex flex-col h-screen gap-2 overflow-y-auto snap-y snap-mandatory`}
      >
        <Hero showNav={showNav} />
        <Popular />
        <TopRated />
      </main>
    </div>
  )
}

export default LandingPage
