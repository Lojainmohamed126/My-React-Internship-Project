import type { ChangeEvent, FormEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Header.css'

type HeaderProps = {
  query: string
  setQuery: (query: string) => void
  onSearch: () => void
  onHomeClick: () => void
}

function Header({ query, setQuery, onSearch, onHomeClick }: HeaderProps) {
  const { user, logout } = useAuth()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch()
  }

  function onQueryChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value)
  }

  function onLogoutClick() {
    void logout()
  }

  return (
    <header className="header">
      <nav className="header__nav">
        <NavLink
          to="/"
          onClick={onHomeClick}
          className={({ isActive }) =>
            `header__link${isActive ? ' header__link--active' : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            `header__link${isActive ? ' header__link--active' : ''}`
          }
        >
          Favourites
        </NavLink>
        {user ? (
          <button
            type="button"
            className="header__logout"
            onClick={onLogoutClick}
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              `header__link${isActive ? ' header__link--active' : ''}`
            }
          >
            Login
          </NavLink>
        )}
      </nav>

      <form className="header__search" onSubmit={onSubmit}>
        <input
          type="search"
          className="header__search-input"
          placeholder="Search movies..."
          aria-label="Search movies"
          value={query}
          onChange={onQueryChange}
        />
        <button type="submit" className="header__search-button">
          Search
        </button>
      </form>
    </header>
  )
}

export default Header
