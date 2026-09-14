import { useEffect, useState } from 'react'
import { deleteFavourite, loadFavourites } from './FavouritesModel'
import { useAuth } from '../../context/AuthContext'
import type { Movie } from '../../types/movie'

export function useFavouritesViewModel() {
  const { user } = useAuth()
  const [favourites, setFavourites] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadMovies() {
    if (!user) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const results = await loadFavourites(user.uid)
      setFavourites(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMovies()
  }, [user])

  async function removeMovie(imdbID: string) {
    if (!user) {
      return
    }

    setError(null)

    try {
      await deleteFavourite(user.uid, imdbID)
      setFavourites((current) =>
        current.filter((movie) => movie.imdbID !== imdbID),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return {
    favourites,
    loading,
    error,
    loadMovies,
    removeMovie,
  }
}
