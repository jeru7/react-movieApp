import { useEffect, useState } from 'react'
import { fetchPopularMovies } from '../../api/apiServices'

import Hero from './components/Hero'
import Popular from './components/Popular'

const LandingPage = ({ showNav }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchPopularMovies()
        setData(res.results)
      } catch (e) {
        console.log(e)
      }
    }

    fetchData()
  }, [])

  return (
    <main className='flex flex-col w-full h-full'>
      <Hero data={data} showNav={showNav} />
      <Popular data={data} />
    </main>
  )
}

export default LandingPage
