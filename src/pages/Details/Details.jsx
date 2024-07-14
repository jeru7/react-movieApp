import {
  fetchMovieCharacters,
  fetchMovieRecommendations,
  fetchMovieGenres,
  fetchTVCharacters,
  fetchTVRecommendations,
  fetchTVGenres,
} from '../../api/apiServices'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Cast from './components/Cast'

const Details = ({ setShowNav, setAbsolute }) => {
  const location = useLocation()
  const item = location.state

  const [genres, setGenres] = useState([])
  const [characters, setCharacters] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [isMovie, setIsMovie] = useState(true)

  useEffect(() => {
    setShowNav(true)
    setAbsolute(false)
  }, [setShowNav, setAbsolute])

  useEffect(() => {
    const fetchData = async () => {
      setIsMovie('title' in item)

      if (isMovie) {
        try {
          const [movieGenres, movieCharacters, movieRecommendations] =
            await Promise.all([
              fetchMovieGenres(),
              fetchMovieCharacters(item.id),
              fetchMovieRecommendations(item.id),
            ])

          setGenres(filteredGenres(movieGenres.genres, item.genre_ids))

          setCharacters(filteredCast(movieCharacters))

          setRecommendations(movieRecommendations.results)
        } catch (error) {
          console.error(error)
        }
      } else {
        try {
          const [tvGenres, tvCharacters, tvRecommendations] = await Promise.all(
            [
              fetchTVGenres(),
              fetchTVCharacters(item.id),
              fetchTVRecommendations(item.id),
            ]
          )

          setGenres(filteredGenres(tvGenres.genres, item.genre_ids))

          setCharacters(filteredCast(tvCharacters))

          setRecommendations(tvRecommendations.results)
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchData()
  }, [item, isMovie])

  const filteredGenres = (genres, itemGenres) => {
    return genres
      .filter((genre) => itemGenres.includes(genre.id))
      .map((genre) => genre.name)
  }

  const filteredCast = (item) => {
    return item.cast.filter(
      (character) => character.known_for_department === 'Acting'
    )
  }

  return (
    <>
      <main
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(4, 13, 18, 1), rgba(4, 13, 18, 0.4) 50%), url(https://image.tmdb.org/t/p/w1280/${item.backdrop_path})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        className='h-screen p-1 pt-14 sm:p-4 md:pt-20'
      >
        {console.log(item.id)}
        <div className='flex flex-col items-center justify-center w-full h-full gap-2 md:items-end md:justify-start sm:gap-4 md:gap-8 md:flex-row'>
          <img
            src={`https://image.tmdb.org/t/p/w1280/${item.poster_path}`}
            alt={`${item.name || item.title} poster`}
            className='flex-1 w-auto rounded-lg sm:w-auto md:h-full h-2/5'
          />
          <div className='flex flex-col justify-end w-full gap-2 p-2 overflow-hidden text-whiteText'>
            <h1 className='text-xl font-bold truncate lg:text-5xl'>
              {item.name || item.title}
            </h1>
            <div className='flex w-full gap-1 pb-1 overflow-x-auto md:gap-2 min-scroll'>
              {console.log(genres)}
              {genres.map((genre, index) => (
                <p
                  key={index}
                  className='p-1 px-2 text-xs font-thin border-2 md:px-3 md:text-sm rounded-xl'
                >
                  {genre}
                </p>
              ))}
            </div>
            <p className='text-xs font-light lg:text-lg text-whiteText'>
              {item.overview}
            </p>
          </div>
        </div>
      </main>
      <Cast />
    </>
  )
}

export default Details
