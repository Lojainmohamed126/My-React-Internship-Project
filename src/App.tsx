import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomeView from './pages/Home/HomeView'
import FavouritesView from './pages/Favourites/FavouritesView'
import AuthView from './pages/Auth/AuthView'
import { useAuth } from './context/AuthContext'
import { useHomeViewModel } from './pages/Home/useHomeViewModel'

type AuthRouteProps = {
  children: ReactNode
  requireAuth: boolean
}

function AuthRoute({ children, requireAuth }: AuthRouteProps) {
  const { user, authLoading } = useAuth()

  if (authLoading) {
    return <p>Loading...</p>
  }

  if (requireAuth && !user) {
    return <Navigate to="/auth" replace />
  }

  if (!requireAuth && user) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  const {
    query,
    setQuery,
    movies,
    loading,
    error,
    handleSearch,
    loadInitialMovies,
    favouriteError,
    addFavourite,
  } = useHomeViewModel()

  return (
    <>
      <Header
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        onHomeClick={loadInitialMovies}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomeView
              movies={movies}
              loading={loading}
              error={error}
              favouriteError={favouriteError}
              onFavouriteClick={addFavourite}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <AuthRoute requireAuth>
              <FavouritesView />
            </AuthRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <AuthRoute requireAuth={false}>
              <AuthView />
            </AuthRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
