import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Navigator from './layout/Navigator'

import LandingPage from './pages/LandingPage/LandingPage'

import MovieDetails from './pages/MovieDetails/MovieDetails'
import FavoritePage from './pages/Favorites/FavoritePage'

import { useState, useEffect } from 'react'

function App() {
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY
      if (scrollPos > 0) {
        setShowNav(true)
      } else {
        setShowNav(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <BrowserRouter>
      <Navigator showNav={showNav} />
      <Routes>
        <Route path='/*' element={<LandingPage showNav={showNav} />} />
        <Route path='/details' element={<MovieDetails />} />
        <Route path='/favorites' element={<FavoritePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
