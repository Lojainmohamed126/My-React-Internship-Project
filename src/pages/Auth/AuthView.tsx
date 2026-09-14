import type { ChangeEvent, FormEvent } from 'react'
import { useAuthViewModel } from './useAuthViewModel'
import './AuthView.css'

function AuthView() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    loading,
    error,
    handleSubmit,
    toggleMode,
  } = useAuthViewModel()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    handleSubmit()
  }

  function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  return (
    <div className="auth-view">
      <h1 className="auth-view__title">
        {mode === 'login' ? 'Login' : 'Create Account'}
      </h1>

      <form className="auth-view__form" onSubmit={onSubmit}>
        <label className="auth-view__field">
          <span className="auth-view__label">Email</span>
          <input
            type="email"
            className="auth-view__input"
            aria-label="Email"
            value={email}
            onChange={onEmailChange}
          />
        </label>

        <label className="auth-view__field">
          <span className="auth-view__label">Password</span>
          <input
            type="password"
            className="auth-view__input"
            aria-label="Password"
            value={password}
            onChange={onPasswordChange}
          />
        </label>

        {error && <p className="auth-view__error">{error}</p>}

        <button
          type="submit"
          className="auth-view__submit"
          disabled={loading}
        >
          {mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </form>

      <button type="button" className="auth-view__toggle" onClick={toggleMode}>
        {mode === 'login'
          ? 'Need an account? Create Account'
          : 'Already have an account? Login'}
      </button>
    </div>
  )
}

export default AuthView
