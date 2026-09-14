import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getDatabase, get, ref, remove, set } from 'firebase/database'
import type { Movie } from '../types/movie'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)

const realtimeDb = getDatabase(firebaseApp)

function requireUserId(userId: string): void {
  if (!userId) {
    throw new Error('A signed-in user is required to manage favourites')
  }
}

function favouritesRef(userId: string) {
  return ref(realtimeDb, `users/${userId}/favourites`)
}

function favouriteRef(userId: string, imdbID: string) {
  return ref(realtimeDb, `users/${userId}/favourites/${imdbID}`)
}

export async function addFavourite(
  userId: string,
  movie: Movie,
): Promise<void> {
  requireUserId(userId)

  try {
    await set(favouriteRef(userId, movie.imdbID), movie)
  } catch (err) {
    throw new Error(
      `Failed to add "${movie.Title}" to favourites: ${toErrorMessage(err)}`,
    )
  }
}

export async function removeFavourite(
  userId: string,
  imdbID: string,
): Promise<void> {
  requireUserId(userId)

  try {
    await remove(favouriteRef(userId, imdbID))
  } catch (err) {
    throw new Error(`Failed to remove favourite movie: ${toErrorMessage(err)}`)
  }
}

export async function getFavourites(userId: string): Promise<Movie[]> {
  requireUserId(userId)

  try {
    const snapshot = await get(favouritesRef(userId))

    if (!snapshot.exists()) {
      return []
    }

    return Object.values(snapshot.val() as Record<string, Movie>)
  } catch (err) {
    throw new Error(`Failed to load favourite movies: ${toErrorMessage(err)}`)
  }
}

function toErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Unknown error'
}
