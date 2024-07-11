import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Navigator from './layout/Navigator'

import LandingPage from './pages/LandingPage/LandingPage'

import Details from './pages/Details/Details'
import FavoritePage from './pages/Favorites/FavoritePage'

import { useState, useEffect } from 'react'

import { SearchProvider } from './context/SearchContext'

import SearchResult from './pages/SearchResult/SearchResult'

function App() {
  const [showNav, setShowNav] = useState(false)
  const [absolute, setAbsolute] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const handleScrollChange = (scrollPosition) => {
    setScrollY(scrollPosition)
  }

  useEffect(() => {
    setShowNav(scrollY > 0)
  }, [scrollY])

  return (
    <SearchProvider>
      <BrowserRouter>
        <Navigator showNav={showNav} absolute={absolute} />
        <Routes>
          <Route
            path='/*'
            element={
              <LandingPage
                showNav={showNav}
                handleScrollChange={handleScrollChange}
                setShowNav={setShowNav}
                setAbsolute={setAbsolute}
              />
            }
          />
          <Route
            path='/search/:query'
            element={
              <SearchResult setShowNav={setShowNav} setAbsolute={setAbsolute} />
            }
          />
          <Route path='/details' element={<Details />} />
          <Route path='/favorites' element={<FavoritePage />} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  )
}

export default App
