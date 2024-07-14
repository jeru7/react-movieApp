import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { motion, AnimatePresence } from 'framer-motion'

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  fetchPopularMovies,
  fetchMostPopularTV,
} from '../../../api/apiServices'
import AddButton from '../../../reusable/AddButton'

const Popular = () => {
  const [popularMovies, setPopularMovies] = useState([])
  const [popularTV, setPopularTV] = useState([])
  const [populars, setPopulars] = useState(popularMovies)

  const [showMovies, setShowMovies] = useState(true)

  const swiperRef = useRef(null)

  const navigate = useNavigate()

  const handleCardClick = (item) => {
    navigate(`/details/${item.title || item.name}`, {
      state: item,
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const movies = await fetchPopularMovies()
      const tv = await fetchMostPopularTV()

      setPopularMovies(movies.results)
      setPopularTV(tv.results)
    }

    fetchData()
  }, [])

  useEffect(() => {
    setPopulars(showMovies ? popularMovies : popularTV)
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(0, 0)
    }
  }, [showMovies, popularMovies, popularTV])

  return (
    <section className='flex flex-col h-screen gap-2 shrink-0 snap-start'>
      <div className='flex items-center justify-between mx-2 mt-14 text-md sm:text-xl lg:text-2xl text-whiteText'>
        <h3 className=''>What&apos;s Popular</h3>
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
      <div className='flex flex-1'>
        <AnimatePresence key={showMovies}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className='w-full h-full'
          >
            <Swiper ref={swiperRef} slidesPerView={1} className='w-full h-full'>
              {populars.map((item) => (
                <SwiperSlide
                  className='relative cursor-pointer snap-x snap-mandatory'
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                >
                  <div
                    className='w-full h-full snap-center'
                    style={{
                      backgroundImage: `linear-gradient(0deg, rgba(4,13,18,1) 0, rgba(4,13,18,0.3) 20%),
                                    linear-gradient(90deg, rgba(4,13,18,1) 0, rgba(4,13,18,0.3) 20%), 
                                    linear-gradient(180deg, rgba(4,13,18,1) 0, rgba(4,13,18,0.3) 20%),
                                    url(https://image.tmdb.org/t/p/w1280/${item.backdrop_path})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                  <div className='absolute inset-0 z-10 flex flex-col p-4 cursor-apointer lg:p-0 group lg:justiyh-full lg:left-24 lg:top-8 lg:w-80'>
                    <div className='relative h-full'>
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${
                          item.poster_path || item.backdrop_path
                        }`}
                        className='hidden object-cover h-full transition-opacity duration-300 lg:block rounded-2xl drop-shadow-xl group-hover:opacity-80'
                        loading='lazy'
                      ></img>
                      <AddButton item={item} />
                    </div>
                    <p className='text-sm truncate lg:text-2xl text-muted group-hover:text-whiteText'>
                      {showMovies ? item.title : item.original_name}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Popular
