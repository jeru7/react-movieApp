import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHeart } from '@fortawesome/free-solid-svg-icons'

import { motion, AnimatePresence } from 'framer-motion'

import { SearchContext } from '../context/SearchContext'
import { ScreenContext } from '../context/ScreenContext'

import { useContext } from 'react'

import SearchBar from '../reusable/Searchbar'

const Navigator = ({ showNav, absolute }) => {
  const { localSearchValue } = useContext(SearchContext)
  const { screenWidth } = useContext(ScreenContext)

  return (
    <AnimatePresence>
      {showNav && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.75 }}
          exit={{ y: -100, opacity: 0, transition: { duration: 0.5 } }}
          transition={{ duration: 0.5 }}
          className={`z-10 flex flex-col w-full p-2 bg-secondary text-whiteText hover:opacity-100 gap-4 ${
            absolute ? 'absolute' : 'fixed top-0'
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
              <AnimatePresence>
                {screenWidth <= 768 ? (
                  <motion.div
                    key='search-icon'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    transition={{ duration: 0.5 }}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      className='cursor-pointer'
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key='search-bar'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 100 }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    transition={{ duration: 0.5 }}
                  >
                    <SearchBar />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {localSearchValue && !absolute && (
            <p className='text-xs sm:text-base md:text-lg'>
              Results for: &apos;{localSearchValue}&apos;
            </p>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default Navigator
