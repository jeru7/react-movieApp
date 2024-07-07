import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Navigator from './layout/Navigator'

import LandingPage from './pages/LandingPage/LandingPage'

import MovieDetails from './pages/MovieDetails/MovieDetails'
import FavoritePage from './pages/Favorites/FavoritePage'

function App() {
  return (
    <BrowserRouter>
      <Navigator />
      <Routes>
        <Route path='/*' element={<LandingPage />} />
        <Route path='/details' element={<MovieDetails />} />
        <Route path='/favorites' element={<FavoritePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
