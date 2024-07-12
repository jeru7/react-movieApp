import imagePlaceholder from '../../../assets/imagePlaceholder.png'

import { motion } from 'framer-motion'

const Card = ({ data }) => {
  const getYear = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.getFullYear()
  }

  return (
    <div className='flex flex-col items-center w-full gap-1 pb-2 m-auto border-b cursor-pointer text-whiteText border-b-secondary sm:items-start'>
      <motion.img
        src={
          data.poster_path
            ? `https://image.tmdb.org/t/p/w300/${data.poster_path}`
            : imagePlaceholder
        }
        alt={data.title || data.original_name}
        loading='lazy'
        className='w-[200px] h-[300px] rounded-sm'
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />
      <div className='flex flex-col self-end w-full'>
        <h3 className='text-sm truncate'>{data.title || data.original_name}</h3>
        <p className='text-sm'>
          {getYear(data.release_date) || getYear(data.first_air_date) || 'N/A'}
        </p>
      </div>
    </div>
  )
}

export default Card
