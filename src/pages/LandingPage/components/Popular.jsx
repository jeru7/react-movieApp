import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const Popular = ({ populars }) => {
  return (
    <section className='flex flex-col h-screen gap-2 shrink-0 snap-start'>
      <h3 className='mx-2 mt-14 text-md sm:text-xl lg:text-2xl text-whiteText'>
        What&apos;s Popular
      </h3>
      <div className='flex flex-1'>
        <Swiper slidesPerView={1} initialSlide={1} className='w-full h-full'>
          {populars.map((movie) => (
            <SwiperSlide
              className='relative snap-x snap-mandatory'
              key={movie.id}
            >
              <div
                className='w-full h-full snap-center'
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(4,13,18,1) 0, rgba(4,13,18,0.3) 20%),
                                    linear-gradient(90deg, rgba(4,13,18,1) 0, rgba(4,13,18,0.3) 20%), 
                                    linear-gradient(180deg, rgba(4,13,18,1) 0, rgba(4,13,18,0.3) 20%),
                                    url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className='absolute inset-0 z-10 flex flex-col h-full gap-4 p-4 cursor-pointer lg:p-0 lg:left-24 lg:top-24 lg:h-3/4 lg:w-80 text-muted hover:text-whiteText'>
                <div
                  className='flex-1 opacity-0 rounded-2xl lg:opacity-100 drop-shadow-xl'
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                ></div>
                <p className='text-sm lg:text-2xl'>{movie.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Popular
