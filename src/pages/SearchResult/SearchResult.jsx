import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../../reusable/Card'
import Footer from '../../reusable/Footer'

const SearchResult = ({ setShowNav, setAbsolute }) => {
  const location = useLocation()
  const { searchResultData } = location.state

  useEffect(() => {
    setShowNav(true)
    setAbsolute(false)
  }, [setShowNav, setAbsolute])

  return (
    <>
      <main className='flex flex-col gap-2 p-4 pt-20 sm:pt-24 text-whiteText'>
        <p className='w-full text-sm text-right text-muted'>
          {searchResultData.length === 0
            ? 'No result'
            : searchResultData.length === 1
            ? '1 result'
            : `${searchResultData.length} results`}
        </p>
        <div className='grid w-full grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8'>
          {searchResultData.map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </div>
      </main>
    </>
  )
}

export default SearchResult
