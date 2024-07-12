import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Card from './components/Card'

const SearchResult = ({ setShowNav, setAbsolute }) => {
  const location = useLocation()
  const { searchResultData } = location.state

  useEffect(() => {
    setShowNav(true)
    setAbsolute(false)
  }, [setShowNav, setAbsolute])

  return (
    <main className='flex p-4 pt-24 text-whiteText'>
      <div className='flex flex-col w-full gap-2'>
        {searchResultData.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </main>
  )
}

export default SearchResult
