import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHeart } from '@fortawesome/free-solid-svg-icons'

import { motion, AnimatePresence } from 'framer-motion'

import { SearchContext } from '../context/SearchContext'

import { useContext } from 'react'

const Navigator = ({ showNav, absolute }) => {
  const { searchValue } = useContext(SearchContext)

  return (
    <AnimatePresence>
      {showNav && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.75 }}
          exit={{ y: -100, opacity: 0, transition: { duration: 1 } }}
          transition={{ duration: 0.5 }}
          className={`z-10 flex flex-col w-full p-2 bg-secondary text-whiteText hover:opacity-100 gap-4 ${
            absolute ? 'absolute' : 'sticky top-0'
          }`}
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(4, 13, 18, 1), rgba(4, 13, 18, 0.4) 80%)',
          }}
        >
          <div className='flex justify-between w-full display'>
            <Link to='/home' className='text-xl font-medium'>
              CineBrowse
            </Link>
            <div className='flex items-center gap-5 text-2xl'>
              <Link to='/favorites'>
                <FontAwesomeIcon icon={faHeart} className='cursor-pointer' />
              </Link>
              <FontAwesomeIcon icon={faSearch} className='cursor-pointer' />
            </div>
          </div>
          {searchValue && !absolute && (
            <p className='text-xs sm:text-base md:text-lg'>
              Results for: &apos;{searchValue}&apos;
            </p>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default Navigator
