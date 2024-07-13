import imagePlaceholder from '../assets/imagePlaceholder.png'

import AddButton from './AddButton'

const Card = ({ data }) => {
  const getYear = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.getFullYear()
  }

  return (
    <div className='relative flex flex-col items-center w-full gap-1 pb-2 m-auto border-b cursor-pointer md:w-full text-whiteText border-b-secondary sm:items-start group'>
      <img
        src={
          data.poster_path
            ? `https://image.tmdb.org/t/p/w300/${data.poster_path}`
            : imagePlaceholder
        }
        alt={data.title || data.original_name}
        loading='lazy'
        className='w-full h-[300px] sm:h-[400px]  md:w-[200px] md:h-[300px] rounded-sm transition-opacity duration-300 group-hover:opacity-50'
      />
      <AddButton item={data} />
      <div className='flex flex-col self-end w-full'>
        <h3 className='w-3/5 text-sm truncate'>
          {data.title || data.original_name}
        </h3>
        <p className='text-sm'>
          {getYear(data.release_date) || getYear(data.first_air_date) || 'N/A'}
        </p>
      </div>
    </div>
  )
}

export default Card
