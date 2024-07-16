import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faBookmark,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

import { motion, AnimatePresence } from 'framer-motion'

import { SearchContext } from '../context/SearchContext'
import { ScreenContext } from '../context/ScreenContext'

import { useContext, useEffect } from 'react'

import SearchBar from '../reusable/Searchbar'

const Navigator = ({ showNav, absolute }) => {
  const { localSearchValue, openSearch, openSearchClick, closeSearch } =
    useContext(SearchContext)
  const { screenWidth } = useContext(ScreenContext)

  return (
    <>
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
                <Link to='/lists'>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className='cursor-pointer'
                  />
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
                        onClick={openSearchClick}
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
      {openSearch && <SearchModal closeSearch={closeSearch} />}
    </>
  )
}

const SearchModal = ({ closeSearch }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  return (
    <div className='fixed z-40 w-full h-full bg-gray-900 bg-opacity-50'>
      <div className='absolute z-50 flex flex-col items-center justify-center h-32 px-4 pb-4 transform -translate-x-1/2 -translate-y-1/2 rounded-lg text-whiteText w-96 sm:w-fit bg-primary top-1/4 left-1/2'>
        <FontAwesomeIcon
          icon={faXmark}
          className='self-end pr-6 sm:pr-0 text-error'
          onClick={closeSearch}
        />
        <h4>Search</h4>
        <SearchBar />
      </div>
    </div>
  )
}

export default Navigator
