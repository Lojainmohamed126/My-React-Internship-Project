import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMovies, initialMovies } from './HomeModel'
import { saveFavourite } from '../Favourites/FavouritesModel'
import { useAuth } from '../../context/AuthContext'
import type { Movie } from '../../types/movie'

export function useHomeViewModel() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [favouriteError, setFavouriteError] = useState<string | null>(null)

  async function loadInitialMovies() {
    setLoading(true)
    setError(null)

    try {
      const results = await initialMovies()
      setMovies(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInitialMovies()
  }, [])

  async function handleSearch() {
    setLoading(true)
    setError(null)

    try {
      const results = await getMovies(query)
      setMovies(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function addFavourite(movie: Movie) {
    if (!user) {
      navigate('/favourites')
      return
    }

    setFavouriteError(null)

    try {
      await saveFavourite(user.uid, movie)
    } catch (err) {
      setFavouriteError(
        err instanceof Error ? err.message : 'Something went wrong',
      )
    }
  }

  return {
    query,
    setQuery,
    movies,
    loading,
    error,
    handleSearch,
    loadInitialMovies,
    favouriteError,
    addFavourite,
  }
}
