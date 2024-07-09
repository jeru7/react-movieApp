import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useEffect, useState } from 'react'

const TopRated = ({ topRated }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [slidesPerView, setSlidesPerView] = useState(0)

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

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [screenWidth])

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
      <h2 className='mx-2 mt-14 text-md sm:text-xl lg:text-2xl text-whiteText'>
        Top Rated
      </h2>
      <div className='flex h-full'>
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={8}
          className='flex w-full p-4'
        >
          {topRated.map((movie) => (
            <SwiperSlide
              key={movie.id}
              className='flex flex-col h-full transition-transform transform cursor-pointer hover:scale-105'
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                className='flex-1 object-cover rounded-xl'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-[rgba(4,13,18,1)] via-[rgba(4,13,18,.4)] to-transparent rounded-xl'></div>
              <p className='absolute text-lg left-2 bottom-2 text-whiteText'>
                {movie.title}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default TopRated
