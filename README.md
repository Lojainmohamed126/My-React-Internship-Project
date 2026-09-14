# Prompts Used

Movie search app built with Vite, React, TypeScript, MVVM, OMDb API, Firebase Auth, and Realtime Database.

This README lists the prompts used to build the application, in order.

## Project scaffolding

1. "Initialize a new React application using Vite, React, and TypeScript. Use functional components only. Do not install any UI library. Do not add any movie functionality yet."
2.  "Remove all default Vite content, images, styles, and demonstration code. Leave a minimal working React application with an empty App component. Do not create any additional components or functionality."
3.  "Create a reusable Header component. The Header should contain: a Home navigation link; a Favourites navigation link; a search input; a Search button. Use React Router links for navigation. Only create and display the Header. Do not create the Home or Favourites screens yet. Do not connect the search input to any functionality."
4. "please can you add styling to the header"
5.  "Create the empty MVVM file structure for the Home screen. Create: src/pages/Home/HomeModel.ts, src/pages/Home/useHomeViewModel.ts, src/pages/Home/HomeView.tsx. Requirements: HomeModel.ts will later contain Home-specific data and business logic; useHomeViewModel.ts will later contain React state and actions; HomeView.tsx will later render the Home interface. Create only minimal placeholder exports so the application can compile. Do not add API requests, React state, or movie UI."
6.  "Create the empty MVVM file structure for the Favourites screen. Create: src/pages/Favourites/FavouritesModel.ts, src/pages/Favourites/useFavouritesViewModel.ts, src/pages/Favourites/FavouritesView.tsx. Create only minimal placeholder exports so the application can compile. Do not add Firebase, state, movie cards, or other functionality."
7.  "Create a services folder and an empty OMDb movie service file: src/services/omdbMovieService.ts. Add a short comment explaining that this file will contain communication with the OMDb API. Do not implement the API request yet."
8.  "Implement the OMDb movie search request inside: src/services/omdbMovieService.ts. Create an exported async function: searchMovies(query: string): Promise<Movie[]>. Requirements: use the OMDb API; read the API key from VITE_OMDB_API_KEY; encode the search query; use the Movie and OmdbSearchResponse types; return the Search array as Movie[]; throw a readable error when the HTTP request fails; throw a readable error when OMDb returns Response: 'False'. For the API_URL use https://www.omdbapi.com/. Do not use React hooks. Do not use useEffect. Do not manage loading, error, or component state."

## Setup & OMDb service

9. "for the API-URL use www.omdbapi.com/"
10. "Do not modify anything. Show me the exact current OMDb request URL pattern in `omdbMovieService.ts` (but DO NOT show my API key), and explain exactly how `VITE_API_URL` is being used. Also tell me: 1. What value `VITE_API_URL` is expected to contain. 2. Whether the OMDb API key is stored separately or included in that URL. 3. Whether my `.env` currently contains the correct OMDb configuration. 4. Whether I need to restart the Vite dev server after the `.env` change. Do not edit any files."
11. "npm.cmd run dev"
12. "okay add console logs just to double check if it works"
13. "Don't navigate to or manage the dev server. I'll test the app myself at http://localhost:5174/. For now, make no further code changes. I will check the browser console after searching for a movie."

## Home feature (Model / ViewModel / View)

14. "Implement the Home model inside: src/pages/Home/HomeModel.ts. Import searchMovies from omdbMovieService. Create and export: getMovies(query: string): Promise<Movie[]>. Responsibilities: trim the query; validate that the query contains at least two characters; call searchMovies with the cleaned query; return the movie list. Do not use React hooks. Do not use useState or useEffect. Do not call fetch directly."
15. "Implement a custom hook inside: src/pages/Home/useHomeViewModel.ts. Create and export: useHomeViewModel(). Manage these properties using useState: query, movies, loading, error. Create a function: handleSearch(). The function should: set loading to true; clear the previous error; call getMovies from HomeModel using the current query; save the returned movie list in movies state; store a readable error if the request fails; set loading to false when finished. Return: query, setQuery, movies, loading, error, handleSearch. Do not render JSX. Do not call fetch directly. Do not import omdbMovieService directly."
16. "Implement the Home view inside: src/pages/Home/HomeView.tsx. Requirements: import and use useHomeViewModel; display the current search input; connect the input value to query; update query using setQuery; call handleSearch when the Search button is clicked; also allow searching by submitting the form; display a loading message while loading is true; display the error message when error exists; render the movie list using .map(); display the movie title, year, type, and poster. Do not call fetch directly. Do not import HomeModel or omdbMovieService. Do not implement favourites yet. Do not create a reusable MovieCard component yet."
17. "we dont need here search input because we have it already in the header"
18. "Create an initialMovies() function inside HomeModel. Requirements: automatically fetch at least 20 movies when the Home screen opens; every application launch should display a different selection of movies; generate the movie list by randomly selecting search keywords from a predefined seed list (for example: Batman, Avengers, Harry Potter, Star Wars, Spider-Man, Marvel, Disney, Matrix, Lord of the Rings, Fast, Mission Impossible, Pixar, Horror, Comedy, Action); use Promise.all to execute requests in parallel; merge all results into a single array; remove duplicate movies using imdbID; shuffle the final array; return exactly 20 unique movies; keep all fetching logic inside HomeModel; use the existing omdbMovieService; do not use React hooks; do not call fetch directly."
19. "there supposed to be in home view model use effect"

## MovieCard component

20. "Create a reusable MovieCard component. Create: src/components/MovieCard/MovieCard.tsx. Requirements: receive one Movie object through props; display poster, title, year, type; add a Favourite button, but do not connect it yet; use the shared Movie type; keep the component presentational; do not call APIs; do not use Firebase; do not manage the movie list. Update HomeView to render MovieCard using .map()."

## Styling & layout

21. "where is homeview.css"

## Wiring the header search into Home

22. "add in the homeview.tsx a functionality that make teh search works"
23. "right , so what we can make to make the search work"
24. "option 2, wire up the header input"
25. "When I search a movie by character and press home, nothing is loaded, it should reload random movies, debug"

## Firebase & Favourites feature

26. "Create and configure Firebase for the application. Create: src/services/firebaseService.ts. Requirements: initialize Firebase using environment variables; export the database instance; do not save or load any favourites yet; do not modify HomeView; do not add authentication."
27. "Inside src/services/firebaseService.ts, add functions for managing favourite movies. Create: addFavourite(movie: Movie): Promise<void>, removeFavourite(imdbID: string): Promise<void>, getFavourites(): Promise<Movie[]>. Requirements: use imdbID as the unique movie identifier; keep all Firebase communication inside this service; return typed data; throw readable errors when operations fail; do not use React hooks; do not update the UI yet."
28. "Implement the Favourites model inside: src/pages/Favourites/FavouritesModel.ts. Import the Firebase service functions. Create and export: loadFavourites(): Promise<Movie[]>, saveFavourite(movie: Movie): Promise<void>, deleteFavourite(imdbID: string): Promise<void>. Requirements: act as a wrapper around firebaseService; do not call Firebase directly outside the service; do not use React hooks; do not manage loading or error state."
29. "Implement a custom hook inside: src/pages/Favourites/useFavouritesViewModel.ts. Create and export: useFavouritesViewModel(). Manage with useState: favourites, loading, error. Create these functions: loadMovies(), removeMovie(imdbID). Requirements: use FavouritesModel only; load favourites when the screen opens; use useEffect for the initial load; update local state after a movie is removed; return all state and actions required by FavouritesView; do not render JSX; do not import firebaseService directly."
30. "Implement src/pages/Favourites/FavouritesView.tsx. Requirements: use useFavouritesViewModel; display a loading message while loading; display an error message when error exists; render favourites using MovieCard and .map(); show a friendly empty message when there are no favourites; allow removing a movie from favourites; do not call Firebase directly; do not import FavouritesModel directly."

## Favourite button wiring 

31. "when i click a favourite button from the signle card of the movie, nothing happens and it should add that movie as favourite to the real time dataset

## Firebase Auth & Auth feature (Model / ViewModel / View)

32. "Install Firebase and update the existing Firebase configuration. Requirements: initialize Firebase Authentication using getAuth; initialize Cloud Firestore using getFirestore; export auth and db; read Firebase configuration from Vite environment variables; use the modern modular Firebase SDK; do not add registration or login UI yet; do not add anything new regarding favourites logic yet. Create or update: src/services/firebaseService.ts. Also create an .env.example file containing placeholder Firebase environment variables."
33. "Create: src/services/authService.ts. Implement and export these functions: registerUser(email, password), loginUser(email, password), logoutUser(), subscribeToAuthChanges(callback). Requirements: use Firebase Authentication; use createUserWithEmailAndPassword for registration; use signInWithEmailAndPassword for login; use signOut for logout; use onAuthStateChanged inside subscribeToAuthChanges; return typed Firebase User data where appropriate; convert Firebase errors into readable messages; do not use React hooks; do not use useState or useEffect; do not render JSX."
34. "Create the MVVM file structure for authentication. Create: src/pages/Auth/AuthModel.ts, src/pages/Auth/useAuthViewModel.ts, src/pages/Auth/AuthView.tsx. Requirements: add minimal typed placeholder exports; ensure the application still compiles; do not implement registration or login yet; do not add routing yet."
35. "Implement src/pages/Auth/AuthModel.ts. Import the authentication functions from authService. Create and export: register(email, password), login(email, password), logout(). Responsibilities: trim and normalize the email address; validate that the email and password are not empty; validate that the password contains at least six characters; call the corresponding authService function; return the authenticated Firebase User. Do not use React hooks. Do not call Firebase Authentication directly outside authService. Do not manage UI state."
36. "Implement the useAuthViewModel custom hook inside: src/pages/Auth/useAuthViewModel.ts. Manage these values using useState: email, password, mode ('login'/'register'), loading, error. Create these functions: handleSubmit(), toggleMode(). Requirements: handleSubmit should call AuthModel.login when mode is 'login'; handleSubmit should call AuthModel.register when mode is 'register'; clear previous errors before submitting; manage the loading state; store readable errors; clear the password after successful authentication; return all state and functions needed by AuthView; do not render JSX; do not call Firebase directly; do not import authService directly."
37. "Implement src/pages/Auth/AuthView.tsx. Requirements: use useAuthViewModel; display either 'Login' or 'Create Account' based on the current mode; add a controlled email input; add a controlled password input; add a submit button; disable the submit button while loading; display readable validation or Firebase errors; add a button for switching between login and registration; submit the form using onSubmit; prevent the default browser form submission. Do not call Firebase directly. Do not import AuthModel or authService."
38. "Create a global authentication context. Create: src/context/AuthContext.tsx. Requirements: use onAuthStateChanged through authService; store the current Firebase user; store an authLoading state while Firebase restores the session; expose user, authLoading, logout; wrap the application with AuthProvider; unsubscribe from the authentication listener when the provider unmounts; show a loading state while authentication is being initialized; do not add favourites logic."

## Types cleanup

39. "move types under /types"
40. "what about AuthProviderProps (AuthContext.tsx lines 14-17)"
41. "where is the file index.ts"
42. "create"

## Routing & auth-gated navigation

43. "Update the application routing. Requirements: add an /auth route that displays AuthView; allow HomeView to remain publicly accessible; protect the /favourites route; when an unauthenticated user opens /favourites, redirect them to /auth; when an authenticated user opens /auth, redirect them to /; preserve the Header on every page; use the user and authLoading values from AuthContext."
44. "where is authroute"
45. "yes" *(consolidate the two route guards into one `AuthRoute` component)*
46. "If I am unauth and click favourite button from the home page, redirect me to the favourites page"

## User-scoped favourites & logout

47. "Update the existing favourites service so favourites are stored under the signed-in user's profile. Use this Real time DB structure: users/{userId}/favourites/{imdbID}. Update the existing functions so they receive userId: addFavourite(userId, movie), removeFavourite(userId, imdbID), getFavourites(userId). Requirements: use userId as the parent user document ID; use imdbID as the favourite document ID; preserve the existing function behaviour; do not use React hooks; do not access auth.currentUser inside the service; throw a readable error when userId is missing."
48. "add logout button as well and connect it with logout function"


