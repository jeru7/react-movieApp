import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHeart } from '@fortawesome/free-solid-svg-icons'

import { CSSTransition } from 'react-transition-group'

const Navigator = ({ showNav }) => {
  return (
    <CSSTransition in={showNav} timeout={500} classNames='nav' unmountOnExit>
      <nav className='fixed z-50 flex justify-between w-full p-2 opacity-75 bg-secondary text-whiteText hover:opacity-100'>
        <Link to='/' className='text-xl font-medium'>
          MovieApp
        </Link>
        <div className='flex items-center gap-5 text-2xl'>
          <Link to='/favorites'>
            <FontAwesomeIcon icon={faHeart} className='cursor-pointer' />
          </Link>
          <FontAwesomeIcon icon={faSearch} className='cursor-pointer' />
        </div>
      </nav>
    </CSSTransition>
  )
}

export default Navigator
