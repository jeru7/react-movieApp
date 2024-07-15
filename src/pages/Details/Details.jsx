import {
  fetchMovieCharacters,
  fetchMovieRecommendations,
  fetchMovieGenres,
  fetchTVCharacters,
  fetchTVRecommendations,
  fetchTVGenres,
  fetchMovieTrailer,
  fetchTVTrailer,
} from '../../api/apiServices'
import { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import imagePlaceholder from '../../assets/imagePlaceholder.png'

import { SearchContext } from '../../context/SearchContext'
import { ScreenContext } from '../../context/ScreenContext'
import { useLists } from '../../context/ListContext'

import CastCard from './components/CastCard'

import LazyLoad from 'react-lazy-load'

import AddButton from '../../reusable/AddButton'

import { motion } from 'framer-motion'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Footer from '../../reusable/Footer'

const Details = ({ setShowNav, setAbsolute }) => {
  const location = useLocation()
  const item = location.state

  const { setLocalSearchValue } = useContext(SearchContext)
  const { addToList, removeFromList, isOnList } = useLists()

  const [genres, setGenres] = useState([])
  const [characters, setCharacters] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [isMovie, setIsMovie] = useState(true)
  const [videoURL, setVideoURL] = useState('')
  const [displayVid, setDisplayVid] = useState(false)

  const { screenWidth } = useContext(ScreenContext)
  const [slidesPerViewCast, setSlidesPerViewCast] = useState(0)
  const [slidesPerViewDetails, setSlidesPerViewDetails] = useState(0)

  const navigate = useNavigate()

  const handleCardClick = (item) => {
    navigate(`/details/${item.title || item.name}`, {
      state: item,
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [item])

  const handleListClick = () => {
    if (isOnList(item.id)) {
      removeFromList(item.id)
    } else {
      addToList(item)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (screenWidth < 420) {
        setSlidesPerViewCast(3)
        setSlidesPerViewDetails(1)
      } else if (screenWidth >= 420 && screenWidth <= 540) {
        setSlidesPerViewCast(4)
        setSlidesPerViewDetails(2)
      } else if (screenWidth >= 540 && screenWidth <= 700) {
        setSlidesPerViewCast(5)
        setSlidesPerViewDetails(3)
      } else if (screenWidth >= 700 && screenWidth <= 1000) {
        setSlidesPerViewDetails(4)
      } else if (screenWidth >= 1000 && screenWidth <= 1280) {
        setSlidesPerViewDetails(5)
      } else {
        setSlidesPerViewCast(7)
        setSlidesPerViewDetails(7)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [screenWidth])

  useEffect(() => {
    setShowNav(true)
    setAbsolute(false)
    setLocalSearchValue('')
  }, [setShowNav, setAbsolute, setLocalSearchValue])

  useEffect(() => {
    const fetchData = async () => {
      setIsMovie('title' in item)
      if (isMovie) {
        try {
          const [
            movieGenres,
            movieCharacters,
            movieRecommendations,
            movieTrailer,
          ] = await Promise.all([
            fetchMovieGenres(),
            fetchMovieCharacters(item.id),
            fetchMovieRecommendations(item.id),
            fetchMovieTrailer(item.id),
          ])

          setGenres(filteredGenres(movieGenres.genres, item.genre_ids))

          setCharacters(filteredCast(movieCharacters))

          setVideoURL(movieTrailer)

          setRecommendations(movieRecommendations.results)

          setDisplayVid(movieTrailer)
        } catch (error) {
          console.error(error)
        }
      } else {
        try {
          const [tvGenres, tvCharacters, tvRecommendations, tvTrailer] =
            await Promise.all([
              fetchTVGenres(),
              fetchTVCharacters(item.id),
              fetchTVRecommendations(item.id),
              fetchTVTrailer(item.id),
            ])
          setGenres(filteredGenres(tvGenres.genres, item.genre_ids))

          setCharacters(filteredCast(tvCharacters))

          setVideoURL(tvTrailer)

          setRecommendations(tvRecommendations.results)

          setDisplayVid(tvTrailer)
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

  const embedUrl = (url) => {
    if (url) {
      const videoId = url.split('v=')[1]
      return `https://www.youtube.com/embed/${videoId}`
    }
    return ''
  }

  return (
    <motion.div
      className='flex flex-col gap-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <main
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(4, 13, 18, 1), rgba(4, 13, 18, 0.4) 50%), url(https://image.tmdb.org/t/p/w1280/${item.backdrop_path})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        className='h-screen p-1 pt-14 sm:p-4 sm:pt-20'
      >
        <div className='flex flex-col items-center justify-center w-full h-full gap-2 md:items-end md:justify-start sm:gap-4 md:gap-8 md:flex-row'>
          <img
            src={`https://image.tmdb.org/t/p/w1280/${item.poster_path}`}
            alt={`${item.name || item.title} poster`}
            className='flex-1 w-auto rounded-lg sm:w-auto md:h-full h-2/5'
          />
          <div className='flex flex-col justify-end w-full gap-2 p-2 overflow-hidden text-whiteText'>
            <button
              className='px-2 py-1 font-bold truncate border-2 rounded-xl text-md lg:text-lg w-fit hover:scale-105'
              onClick={handleListClick}
            >
              {isOnList(item.id) ? 'Remove from list' : 'Add to list'}
            </button>
            <h1 className='text-xl font-bold truncate lg:text-5xl'>
              {item.name || item.title}
            </h1>
            <div className='flex w-full gap-1 pb-1 overflow-x-auto md:gap-2 min-scroll'>
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

      <section className='flex flex-col justify-center gap-2 p-2 h-fit text-whiteText'>
        <h3 className='text-md md:text-xl'>Casts</h3>
        <Swiper
          slidesPerView={slidesPerViewCast}
          spaceBetween={10}
          className='w-full h-full'
        >
          {characters.map((character) => (
            <SwiperSlide key={character.id}>
              <CastCard character={character} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className='flex flex-col px-2 md:h-screen md:justify-around text-whiteText'>
        <h3 className='text-md md:text-xl'>Trailer</h3>
        {displayVid ? (
          <LazyLoad className='h-80 w-[80%] md:h-[95%] self-center'>
            <iframe
              src={embedUrl(videoURL)}
              title='YouTube video player'
              className='w-full h-full'
              allowFullScreen
            ></iframe>
          </LazyLoad>
        ) : (
          <div className='flex items-center justify-center w-full h-full bg-gray-300'>
            <p className='text-3xl text-muted'>NO AVAILABLE VIDEO</p>
          </div>
        )}
      </section>
      <section className='p-2 text-whiteText'>
        <h3 className='text-md md:text-xl'>You might like</h3>
        <Swiper
          className='flex p-4 h-fit'
          slidesPerView={slidesPerViewDetails}
          spaceBetween={8}
        >
          {recommendations.map((item) => (
            <SwiperSlide key={item.id} onClick={() => handleCardClick(item)}>
              <div className='flex flex-col items-center cursor-pointer group'>
                <img
                  src={
                    `https://image.tmdb.org/t/p/w1280/${item.poster_path}` ||
                    imagePlaceholder
                  }
                  alt={`Poster of ${item.title || item.name}`}
                  className='w-full h-[400px] transition-opacity duration-300 rounded-md group-hover:opacity-50'
                  loading='lazy'
                />
                <AddButton item={item} />
                <div className='swiper-lazy-preloader swiper-lazy-preloader-white'></div>
                <p className='w-full text-sm text-center truncate'>
                  {item.title || item.title}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <Footer />
    </motion.div>
  )
}

export default Details
