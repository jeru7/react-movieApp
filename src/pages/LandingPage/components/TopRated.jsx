import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useEffect, useState, useContext } from 'react'

import { fetchTopRatedMovies, fetchTopRatedTV } from '../../../api/apiServices'

import { ScreenContext } from '../../../context/ScreenContext'
import AddButton from '../../../reusable/AddButton'

const TopRated = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [topRatedTV, setTopRatedTV] = useState([])
  const [topRated, setTopRated] = useState(topRatedMovies)

  const [slidesPerView, setSlidesPerView] = useState(0)

  const [showMovies, setShowMovies] = useState(true)

  const { screenWidth, setScreenWidth } = useContext(ScreenContext)

  useEffect(() => {
    const fetchData = async () => {
      const movie = await fetchTopRatedMovies()
      const tvSeries = await fetchTopRatedTV()

      setTopRatedMovies(movie.results)
      setTopRatedTV(tvSeries.results)

      if (showMovies) {
        setTopRated(topRatedMovies)
      } else {
        setTopRated(topRatedTV)
      }
    }

    fetchData()
  }, [showMovies, topRatedMovies, topRatedTV])

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
      if (screenWidth < 425) {
        return setSlidesPerView(1)
      } else if (screenWidth > 425 && screenWidth < 768) {
        return setSlidesPerView(2)
      } else if (screenWidth > 768 && screenWidth < 1280) {
        return setSlidesPerView(3)
      } else {
        setSlidesPerView(5)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [screenWidth, setScreenWidth])

  useEffect(() => {
    setSlidesPerView(computeSlidesPerView(screenWidth))
  }, [screenWidth])

  const computeSlidesPerView = (width) => {
    if (width < 375) {
      return 1
    } else if (width >= 375 && width < 720) {
      return 2
    } else if (width >= 720 && width < 1280) {
      return 3
    } else {
      return 5
    }
  }

  return (
    <section className='flex flex-col h-screen shrink-0 snap-start'>
      <div className='flex items-center justify-between mx-2 mt-14 text-md sm:text-xl lg:text-2xl text-whiteText'>
        <h2 className=''>Top Rated</h2>
        <div className='flex gap-4 text-sm'>
          <p
            className={`${
              showMovies
                ? 'text-muted underline'
                : 'text-secondary hover:text-muted'
            } cursor-pointer`}
            onClick={() => {
              setShowMovies(true)
            }}
          >
            Movies
          </p>
          <p
            className={`${
              showMovies
                ? 'text-secondary hover:text-muted'
                : 'text-muted underline'
            } cursor-pointer`}
            onClick={() => {
              setShowMovies(false)
            }}
          >
            TV Series
          </p>
        </div>
      </div>
      <div className='flex h-full'>
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={8}
          className='flex w-full p-4'
        >
          {topRated.map((item) => (
            <SwiperSlide
              key={item.id}
              className='flex flex-col h-full p-1 transition-transform transform cursor-pointer bg-primary group'
            >
              <img
                src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                alt={showMovies ? item.title : item.original_name}
                className='flex-1 object-cover transition-opacity duration-300 rounded-md group-hover:opacity-50'
                loading='lazy'
              />
              <AddButton item={item} />
              <div className='swiper-lazy-preloader swiper-lazy-preloader-white'></div>
              <div className='absolute inset-0 bg-gradient-to-t from-[rgba(4,13,18,1)] via-[rgba(4,13,18,.4)] to-transparent rounded-xl'></div>
              <p className='absolute text-lg left-2 bottom-2 text-whiteText'>
                {showMovies ? item.title : item.original_name}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default TopRated
