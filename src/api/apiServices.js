import axios from 'axios'
import { API_KEY, ACCESS_TOKEN } from './apiConfig'

export const fetchMostPopularMovie = async () => {
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

export const fetchTopRated = async () => {
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

export const fetchTVGenre = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/genre/tv/list',
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
