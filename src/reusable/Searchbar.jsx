import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons'

import { fetchSearchResults } from '../api/apiServices'

import { useNavigate } from 'react-router-dom'

import { motion, AnimatePresence } from 'framer-motion'

import { SearchContext } from '../context/SearchContext'

import { useContext } from 'react'

const SearchBar = () => {
  const navigate = useNavigate()
  const { searchValue, setSearchValue, setLocalSearchValue, closeSearch } =
    useContext(SearchContext)

  const handleSearch = async () => {
    if (!searchValue) return
    try {
      const searchResult = await fetchSearchResults(searchValue)
      const searchResultData = searchResult.results
      setLocalSearchValue(searchValue)
      closeSearch()

      navigate(`/search/${encodeURIComponent(searchValue)}`, {
        state: { searchResultData },
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <div className='relative flex items-center w-10/12 gap-2 bg-black border rounded-md sm:w-96 bg-opacity-30 border-highlight2'>
      <input
        className='flex-1 px-1 text-sm bg-transparent outline-0 rounded-l-md'
        placeholder='Search...'
        type='text'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <AnimatePresence>
        {searchValue && (
          <motion.div
            key='icon'
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='cursor-pointer'
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              onClick={() => setSearchValue('')}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className='flex px-4 py-2 text-lg border-l rounded-md items-centerw-auto bg-secondary border-l-highlight2'
        onClick={handleSearch}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  )
}

export default SearchBar
