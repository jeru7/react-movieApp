import axios from 'axios'
import { ACCESS_TOKEN } from './apiConfig'

// MOVIES
export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/movie/popular',
      {
        params: {
          language: 'en-US',
          page: '1',
        },
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          Accept: 'application/JSON',
        },
      }
    )
    return response.data
  } catch (e) {
    console.log(`Error: ${e.message}`)
  }
}

export const fetchTopRatedMovies = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/movie/top_rated',
      {
        params: {
          language: 'en-US',
          page: '1',
        },
        headers: {
          accept: 'application/JSON',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    )
    return response.data
  } catch (e) {
    console.log(e)
  }
}

export const fetchMovieGenre = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list',
      {
        params: {
          language: 'en',
        },
        headers: {
          accept: 'application/JSON',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    )
    return response.data
  } catch (e) {
    console.log(e)
  }
}

export const fetchMovieTrailer = async (movieId) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      {
        params: {
          language: 'en-US',
          page: '1',
        },
        headers: {
          accept: 'application/JSON',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    )

    const trailers = response.data.results.filter(
      (video) => video.type === 'Trailer' && video.site === 'Youtube'
    )

    if (trailers.length > 0) {
      const trailer = trailers[0]
      const trailerUrl = `https://www.youtube.com/watch=?v=${trailer.key}`
      return trailerUrl
    }
  } catch (e) {
    console.log(e)
  }
}

// TV SERIES
export const fetchMostPopularTV = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/tv/popular',
      {
        params: {
          language: 'en-US',
          page: '1',
        },
        headers: {
          accept: 'application/JSON',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    )
    return response.data
  } catch (e) {
    console.log(e)
  }
}

export const fetchTopRatedTV = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/tv/top_rated',
      {
        params: {
          language: 'en-US',
          page: '1',
        },
        headers: {
          accept: 'application/JSON',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    )

    return response.data
  } catch (e) {
    console.log(e)
  }
}

// search
export const fetchSearchResults = async (searchValue) => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/search/multi',
      {
        params: {
          query: `${searchValue}`,
          include_adult: 'false',
          language: 'en-US',
          page: '1',
        },
        headers: {
          accept: 'application/JSON',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    )

    return response.data
  } catch (e) {
    console.log(e)
  }
}

// extras
export const fetchRecommendations = async (movieId) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations`,
      {
        params: {
          language: 'en-US',
          page: '1',
        },
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          Accept: 'application/JSON',
        },
      }
    )
    return response.data
  } catch (e) {
    console.log(e)
  }
}
