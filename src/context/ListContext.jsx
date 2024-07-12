import { createContext, useEffect, useState, useContext } from 'react'

export const ListContext = createContext()

export const useLists = () => {
  return useContext(ListContext)
}

export const ListProvider = ({ children }) => {
  const [list, setList] = useState(() => {
    const addedItem = localStorage.getItem('lists')
    return addedItem ? JSON.parse(addedItem) : []
  })

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(list))
  }, [list])

  const addToList = (item) => {
    setList((prev) => [...prev, item])
  }

  const removeFromList = (itemId) => {
    setList((prev) => prev.filter((item) => item.id !== itemId))
  }

  const isOnList = (itemId) => {
    return list.some((item) => item.id === itemId)
  }

  return (
    <ListContext.Provider value={{ list, addToList, removeFromList, isOnList }}>
      {children}
    </ListContext.Provider>
  )
}
