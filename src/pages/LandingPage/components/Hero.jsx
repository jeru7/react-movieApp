import { useEffect, useState } from 'react'
import SearchBar from '../../../reusable/Searchbar'

import { CSSTransition } from 'react-transition-group'

import './Hero.css'

const Hero = ({ data, showNav }) => {
  const [mostPopular, setMostPopular] = useState([])

  useEffect(() => {
    if (data && data.length > 0) setMostPopular(data[0])
  }, [data])

  const backgroundImageStyle = {
    backgroundImage: mostPopular
      ? `linear-gradient(0deg, rgba(4,13,18,1) 0%, rgba(4,13,18,0.3) 40%), url(https://image.tmdb.org/t/p/original/${mostPopular.backdrop_path})`
      : 'none',
  }

  //   url: https://image.tmdb.org/t/p/w500/mostPopular.backdrop_path
  return (
    <>
      <section
        className='relative bg-center bg-cover h-80 md:h-96 lg:h-screen'
        style={backgroundImageStyle}
      >
        <div
          className='absolute w-full h-full bg-black opacity-40'
          style={{ filter: 'blur(0.5px)' }}
        ></div>
        {console.log(showNav)}
        <CSSTransition
          in={!showNav}
          timeout={300}
          classNames='hero'
          unmountOnExit
        >
          <div className='absolute inset-0 flex flex-col items-center justify-center gap-1 text-white sm:gap-2 md:gap-3'>
            <h1 className='text-4xl font-medium sm:text-5xl md:text-6xl lg:text-7xl'>
              MovieApp
            </h1>
            <SearchBar />
          </div>
        </CSSTransition>
        <h2 className='absolute opacity-50 text-md md:text-xl lg:bottom-12 md:left-8 bottom-8 left-4 text-whiteText'>
          {mostPopular.title}
        </h2>
      </section>
    </>
  )
}

export default Hero
