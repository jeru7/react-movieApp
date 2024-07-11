import { useEffect, useState } from 'react'
import SearchBar from '../../../reusable/Searchbar'
import friendsImage from '../../../assets/friends.jpg'

import { motion, AnimatePresence } from 'framer-motion'

const Hero = ({ populars, showNav }) => {
  const [mostPopular, setMostPopular] = useState([])

  useEffect(() => {
    if (populars && populars.length > 0) setMostPopular(populars[0])
  }, [populars])

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(180deg, rgba(4, 13, 18, 1), rgba(4, 13, 18, 0.4) 20%), linear-gradient(0deg, rgba(4, 13, 18, 1), rgba(4, 13, 18, 0.4) 20%), url(${friendsImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <section
      className='relative h-screen bg-center bg-cover shrink-0 snap-start'
      style={backgroundImageStyle}
    >
      <div
        className='absolute w-full h-full bg-black opacity-40 '
        style={{ filter: 'blur(0.5px)' }}
      ></div>
      <AnimatePresence key={showNav}>
        {!showNav && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='absolute inset-0 flex flex-col items-center justify-center gap-1 text-white sm:gap-2 md:gap-3 '
            key='hero-content'
          >
            <h1 className='text-4xl font-medium sm:text-5xl md:text-6xl lg:text-7xl'>
              CineBrowse
            </h1>
            <SearchBar />
          </motion.div>
        )}
      </AnimatePresence>
      <h2 className='absolute opacity-50 text-md md:text-xl lg:bottom-12 md:left-8 bottom-8 left-4 text-muted'>
        {mostPopular.title}
      </h2>
    </section>
  )
}

export default Hero
