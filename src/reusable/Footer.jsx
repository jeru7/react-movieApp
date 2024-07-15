import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className='flex items-center justify-center w-full p-4 text-whiteText'>
      <div className='flex items-end gap-1'>
        <FontAwesomeIcon icon={faGithub} className='text-4xl' />
        <p className=''>jeru7</p>
      </div>
    </footer>
  )
}

export default Footer
