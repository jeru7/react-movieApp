import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Navigator from './layout/Navigator'

import LandingPage from './pages/LandingPage/LandingPage'

import MovieDetails from './pages/MovieDetails/MovieDetails'
import FavoritePage from './pages/Favorites/FavoritePage'

import { useState, useEffect } from 'react'

function App() {
  const [showNav, setShowNav] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const handleScrollChange = (scrollPosition) => {
    setScrollY(scrollPosition)
  }

  useEffect(() => {
    setShowNav(scrollY > 0)
  }, [scrollY])

  return (
    <BrowserRouter>
      <Navigator showNav={showNav} />
      <Routes>
        <Route
          path='/*'
          element={
            <LandingPage
              showNav={showNav}
              handleScrollChange={handleScrollChange}
              setShowNav={setShowNav}
            />
          }
        />
        <Route path='/details' element={<MovieDetails />} />
        <Route path='/favorites' element={<FavoritePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
