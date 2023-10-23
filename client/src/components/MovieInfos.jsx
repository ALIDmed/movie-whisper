import axios from "axios";
import AutocompleteSkeleton from "./AutocompleteSkeleton";
import { AppContext } from "../App";
import { useContext, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Cast from "./Cast";

const MovieInfos = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const { movieId } = useContext(AppContext);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!movieId) return;
      try {
        setIsLoading(true);
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`
          )
          .then((res) => setData(res.data))
          .then(() => setIsLoading(false));
      } catch (e) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(movieId);
  }, [movieId]);

  if (!movieId || data === null)
    return <div className="h-[calc(100vh-500px)] w-full"></div>;
  return (
    <div className="max-w-[1400px] px-10 py-8 mx-auto">
      {isLoading ? (
        <AutocompleteSkeleton />
      ) : (
        <>
          <MovieCard data={data} />
          <Cast cast={data.credits.cast} />
        </>
      )}
    </div>
  );
};

export default MovieInfos;
