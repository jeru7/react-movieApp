import { createContext, useState } from 'react'

export const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('')
  const [localSearchValue, setLocalSearchValue] = useState('')
  const [openSearch, setOpenSearch] = useState(false)

  const openSearchClick = () => {
    setOpenSearch(true)
  }

  const closeSearch = () => {
    setOpenSearch(false)
  }

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        localSearchValue,
        setLocalSearchValue,
        openSearch,
        openSearchClick,
        closeSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
