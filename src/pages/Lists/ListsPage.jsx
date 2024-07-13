import { useEffect, useContext } from 'react'

import { useLists } from '../../context/ListContext'
import { SearchContext } from '../../context/SearchContext'

import Card from '../../reusable/Card'

const ListsPage = ({ setShowNav, setAbsolute }) => {
  const { list } = useLists()
  const { setLocalSearchValue } = useContext(SearchContext)

  useEffect(() => {
    setShowNav(true)
    setAbsolute(false)
    setLocalSearchValue('')
  }, [setShowNav, setAbsolute, setLocalSearchValue])

  return (
    <main className='flex flex-col gap-2 p-4 pt-20 sm:pt-24 text-whiteText'>
      <p className='w-full text-sm text-right text-muted'>
        {list.length === 0
          ? 'No items'
          : list.length === 1
          ? '1 item'
          : `${list.length} items`}
      </p>
      <div className='grid w-full grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8'>
        {list.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </main>
  )
}

export default ListsPage
