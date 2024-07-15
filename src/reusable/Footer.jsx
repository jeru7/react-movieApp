import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className='flex items-center justify-center w-full p-4 text-whiteText'>
      <div className='flex items-end gap-1'>
        <a
          href='https://github.com/jeru7'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-end gap-1 hover:scale-105 '
        >
          <FontAwesomeIcon icon={faGithub} className='text-4xl' />
          <p className=''>jeru7</p>
        </a>
      </div>
    </footer>
  )
}

export default Footer
