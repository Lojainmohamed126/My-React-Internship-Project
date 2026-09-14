import type { Movie, OmdbSearchResponse } from '../types/movie'

export async function searchMovies(query: string): Promise<Movie[]> {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY
  const API_URL = import.meta.env.VITE_API_URL

  if (!apiKey) {
    throw new Error('Missing VITE_OMDB_API_KEY environment variable')
  }

  if (!API_URL) {
    throw new Error('Missing VITE_API_URL environment variable')
  }

  const url = new URL(API_URL)
  url.searchParams.set('apikey', apiKey)
  url.searchParams.set('s', query)

  console.log('[omdbMovieService] API_URL:', API_URL)
  console.log(
    '[omdbMovieService] request URL:',
    url.toString().replace(apiKey, '***'),
  )

  const response = await fetch(url)

  console.log(
    '[omdbMovieService] response status:',
    response.status,
    response.statusText,
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch movies from OMDb (${response.status} ${response.statusText})`,
    )
  }

  const data: OmdbSearchResponse = await response.json()

  console.log('[omdbMovieService] response body:', data)

  if (data.Response === 'False') {
    throw new Error(data.Error ?? 'OMDb returned an unsuccessful response')
  }

  return data.Search ?? []
}
