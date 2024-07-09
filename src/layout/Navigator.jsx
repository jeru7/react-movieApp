import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHeart } from '@fortawesome/free-solid-svg-icons'

import { motion, AnimatePresence } from 'framer-motion'

const Navigator = ({ showNav }) => {
  return (
    <AnimatePresence>
      {showNav && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.75 }}
          exit={{ y: -100, opacity: 0, transition: { duration: 1 } }}
          transition={{ duration: 0.5 }}
          className='absolute z-10 flex justify-between w-full p-2 bg-secondary text-whiteText hover:opacity-100'
        >
          <Link to='/' className='text-xl font-medium'>
            MovieApp
          </Link>
          <div className='flex items-center gap-5 text-2xl'>
            <Link to='/favorites'>
              <FontAwesomeIcon icon={faHeart} className='cursor-pointer' />
            </Link>
            <FontAwesomeIcon icon={faSearch} className='cursor-pointer' />
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default Navigator
