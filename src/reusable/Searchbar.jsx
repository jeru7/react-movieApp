const SearchBar = () => {
  return (
    <div className='relative flex w-10/12 bg-black border rounded-md sm:w-96 bg-opacity-30 border-highlight2'>
      <input
        className='w-4/5 px-1 text-sm bg-transparent rounded-l-md'
        placeholder='Search movie'
        type='text'
      ></input>
      <button className='flex items-center justify-center w-1/5 px-2 py-2 text-xs border-l rounded-md bg-secondary border-l-highlight2'>
        Search
      </button>
    </div>
  )
}

export default SearchBar
