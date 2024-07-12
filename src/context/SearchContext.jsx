import { createContext, useState } from 'react'

export const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('')
  const [localSearchValue, setLocalSearchValue] = useState('')

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        localSearchValue,
        setLocalSearchValue,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
