import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Hero, MovieInfo, Reviews, Recommendations } from "./components";

export const AppContext = createContext();

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const App = () => {
  const [movieId, setMovieId] = useState(null);

  return (
    <AppContext.Provider value={{ movieId, setMovieId }}>
      <QueryClientProvider client={client}>
        <div className="text-white w-full antialiased">
          <Hero />
          <MovieInfo />
          <Reviews />
          <Recommendations />
          <Toaster position="top-center" />
        </div>
      </QueryClientProvider>
    </AppContext.Provider>
  );
};

export default App;
