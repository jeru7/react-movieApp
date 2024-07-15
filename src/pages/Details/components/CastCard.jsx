import imagePlaceholder from '../../../assets/imagePlaceholder.png'
import LazyLoad from 'react-lazy-load'

const CastCard = ({ character }) => {
  return (
    <div className='flex flex-col items-center text-center text-whiteText w-fit'>
      <LazyLoad>
        <img
          src={
            character.profile_path
              ? `https://image.tmdb.org/t/p/w185/${character.profile_path}`
              : imagePlaceholder
          }
          alt={`${character.name} photo`}
          className='rounded-full h-[100px] w-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] object-center object-cover pb-1'
          loading='lazy'
        />
      </LazyLoad>
      <div className='swiper-lazy-preloader swiper-lazy-preloader-white'></div>
      <p className='text-sm'>{character.name}</p>
      <p className='text-xs text-muted'>{character.character}</p>
    </div>
  )
}

export default CastCard
