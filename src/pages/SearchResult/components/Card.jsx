import imagePlaceholder from '../../../assets/imagePlaceholder.png'

const Card = ({ data }) => {
  const getYear = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.getFullYear()
  }

  return (
    <div className='flex flex-col items-center gap-2 pb-2 border-b cursor-pointer border-b-secondary sm:flex-row text-whiteText'>
      <div className='w-2/5 lg:w-[300px] lg:h-[350px]'>
        <img
          src={
            data.poster_path
              ? `https://image.tmdb.org/t/p/w300/${data.poster_path}`
              : imagePlaceholder
          }
          alt={data.title || data.original_name}
          loading='lazy'
          className='w-full h-full rounded-xl'
        />
      </div>
      <div className='flex flex-col justify-end w-full h-full'>
        <h3 className='text-sm sm:text-lg'>
          {data.title || data.original_name}
        </h3>
        <p className='text-sm sm:text-lg'>
          {getYear(data.release_date) || getYear(data.first_air_date)}
        </p>
        <p>{data.media_type}</p>
        <p>{data.vote_average}</p>
      </div>
    </div>
  )
}

export default Card
