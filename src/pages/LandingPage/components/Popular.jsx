import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { useState, useEffect } from 'react'

import {
  fetchPopularMovies,
  fetchMostPopularTV,
} from '../../../api/apiServices'

const Popular = () => {
  const [popularMovies, setPopularMovies] = useState([])
  const [popularTV, setPopularTV] = useState([])
  const [populars, setPopulars] = useState(popularMovies)

  const [showMovies, setShowMovies] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const movies = await fetchPopularMovies()
      const tv = await fetchMostPopularTV()

      setPopularMovies(movies.results)
      setPopularTV(tv.results)

      if (showMovies) {
        setPopulars(popularMovies)
      } else {
        setPopulars(popularTV)
      }
    }

    fetchData()
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
        <Swiper slidesPerView={1} className='w-full h-full'>
          {populars.map((item) => (
            <SwiperSlide
              className='relative snap-x snap-mandatory'
              key={item.id}
            >
              <div
                className='w-full h-full snap-center'
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(4,13,18,1) 0, rgba(4,13,18,0.3) 20%),
                                    linear-gradient(90deg, rgba(4,13,18,1) 0, rgba(4,13,18,0.3) 20%), 
                                    linear-gradient(180deg, rgba(4,13,18,1) 0, rgba(4,13,18,0.3) 20%),
                                    url(https://image.tmdb.org/t/p/original/${item.backdrop_path})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className='absolute inset-0 z-10 flex flex-col h-full gap-4 p-4 cursor-pointer lg:p-0 lg:left-24 top-8 lg:w-80 text-muted hover:text-whiteText'>
                <img
                  src={`https://image.tmdb.org/t/p/original/${
                    item.poster_path || item.backdrop_path
                  }`}
                  className='object-cover opacity-0 rounded-2xl lg:opacity-100 drop-shadow-xl h-4/5'
                  loading='lazy'
                ></img>
                <p className='text-sm lg:text-2xl'>
                  {showMovies ? item.title : item.original_name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Popular
