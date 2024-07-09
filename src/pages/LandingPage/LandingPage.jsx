import Hero from './components/Hero'
import Popular from './components/Popular'
import TopRated from './components/TopRated'

import { fetchPopularMovies, fetchTopRated } from '../../api/apiServices'

import { useState, useEffect, useRef } from 'react'

const LandingPage = ({ showNav, handleScrollChange, setShowNav }) => {
  const [populars, setPopulars] = useState([])
  const [topRated, setTopRated] = useState([])
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
    const fetchData = async () => {
      try {
        const populars = await fetchPopularMovies()
        const topRated = await fetchTopRated()
        setPopulars(populars.results)
        setTopRated(topRated.results)
      } catch (e) {
        console.log(e)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    setShowNav(false)
  }, [setShowNav])

  return (
    <div className='relative flex flex-col w-full'>
      <main
        ref={containerRef}
        className={`relative flex flex-col h-screen gap-2 overflow-y-auto snap-y snap-mandatory`}
      >
        <Hero populars={populars} showNav={showNav} />
        <Popular populars={populars} />
        <TopRated topRated={topRated} />
      </main>
    </div>
  )
}

export default LandingPage
