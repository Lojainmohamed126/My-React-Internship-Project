import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'
import { auth } from './firebaseService'

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
}

export async function registerUser(
  email: string,
  password: string,
): Promise<User> {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
    return credential.user
  } catch (err) {
    throw new Error(`Failed to register: ${toErrorMessage(err)}`)
  }
}

export async function loginUser(
  email: string,
  password: string,
): Promise<User> {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    return credential.user
  } catch (err) {
    throw new Error(`Failed to log in: ${toErrorMessage(err)}`)
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth)
  } catch (err) {
    throw new Error(`Failed to log out: ${toErrorMessage(err)}`)
  }
}

export function subscribeToAuthChanges(
  callback: (user: User | null) => void,
): () => void {
  return onAuthStateChanged(auth, callback)
}

function toErrorMessage(err: unknown): string {
  if (err instanceof FirebaseError) {
    return AUTH_ERROR_MESSAGES[err.code] ?? err.message
  }

  return err instanceof Error ? err.message : 'Unknown error'
}
