import MovieCard from '../../components/MovieCard/MovieCard'
import type { Movie } from '../../types/movie'
import './HomeView.css'

type HomeViewProps = {
  movies: Movie[]
  loading: boolean
  error: string | null
  favouriteError: string | null
  onFavouriteClick: (movie: Movie) => void
}

function HomeView({
  movies,
  loading,
  error,
  favouriteError,
  onFavouriteClick,
}: HomeViewProps) {
  return (
    <div className="home-view">
      {loading && <p className="home-view__status">Loading...</p>}
      {error && <p className="home-view__error">{error}</p>}
      {favouriteError && <p className="home-view__error">{favouriteError}</p>}

      <div className="home-view__grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onFavouriteClick={() => onFavouriteClick(movie)}
          />
        ))}
      </div>
    </div>
  )
}

export default HomeView
