import { createContext, useEffect, useState } from 'react'

export const ScreenContext = createContext()

export const ScreenProvider = ({ children }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ScreenContext.Provider value={{ screenWidth, setScreenWidth }}>
      {children}
    </ScreenContext.Provider>
  )
}
