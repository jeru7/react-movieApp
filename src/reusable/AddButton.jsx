import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons'

import { useLists } from '../context/ListContext'

const AddButton = ({ item }) => {
  const { addToList, removeFromList, isOnList } = useLists()

  const handleClick = (e) => {
    e.stopPropagation()
    if (isOnList(item.id)) {
      removeFromList(item.id)
    } else {
      addToList(item)
    }
  }

  return (
    <button
      className='absolute -top-2 -right-1 z-50 rounded-md text-whiteText h-[8%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rotate-12'
      onClick={handleClick}
    >
      {isOnList(item.id) ? (
        <FontAwesomeIcon icon={faBookmark} className='h-full' />
      ) : (
        <FontAwesomeIcon icon={faBookmarkRegular} className='h-full' />
      )}
    </button>
  )
}

export default AddButton
