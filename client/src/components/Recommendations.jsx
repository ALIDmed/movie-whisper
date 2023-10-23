import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { placeholder } from "../assets/index";
import { IconContext } from "react-icons";
import { BiSolidStar, BiSolidTime } from "react-icons/bi";

const Recommendations = () => {
  const { movieId, setMovieId } = useContext(AppContext);
  const [rcmdMovieId, setRcmdMovieId] = useState([]);
  const baseUrl = "https://api.themoviedb.org/3/movie/";
  const apiKey = import.meta.env.VITE_API_KEY;
  const recommendUrl = `http://127.0.0.1:5000/recommend?movie_id=`;

  useEffect(() => {
    if (!movieId) return;
    setRcmdMovieId([]);
    axios
      .get(`${recommendUrl}${movieId}`)
      .then((res) => {
        if (res.data.results.length > 0) {
          const ids = res.data.results;
          ids.forEach((id) => {
            axios.get(`${baseUrl}${id}?api_key=${apiKey}`).then((res) => {
              setRcmdMovieId((prevRcmdMovieId) => [
                ...prevRcmdMovieId,
                res.data,
              ]);
              console.log(id);
              console.log(rcmdMovieId);
            });
          });
        } else {
          throw new Error("Failed to find recommendations trying tmdb...");
        }
      })
      .catch((err) => {
        axios
          .get(`${baseUrl}${movieId}/recommendations?api_key=${apiKey}`)
          .then((res) => {
            if (res.data.results.length > 0) {
              setRcmdMovieId(res.data.results);
              console.log(rcmdMovieId);
            } else {
              throw new Error(
                "Failed to find recommendations trying similar movies..."
              );
            }
          })
          .catch((err) => {
            axios
              .get(`${baseUrl}${movieId}/similar?api_key=${apiKey}`)
              .then((res) => {
                setRcmdMovieId(res.data.results);
                console.log(rcmdMovieId);
              });
          });
      });
    if (rcmdMovieId.length > 20) setRcmdMovieId((prev) => prev.slice(0, 20));
  }, [movieId]);

  if (!movieId || !rcmdMovieId) return <></>;
  return (
    <div className="max-w-[1400px] ss:px-10 py-8 mx-auto px-4">
      <div className="ss:text-4xl sm:text-5xl text-3xl font-extrabold text-center mb-8">
        <h1>Recommendations</h1>
      </div>
      <div className="grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 rounded-xl overflow-hidden">
        {rcmdMovieId.map((movie, index) => (
          <div
            className="h-fit mx-auto overflow-hidden w-[250px] ss:w-[380px] lg:w-[330px] lgx:w-[370px] cursor-pointer hover:scale-105 ease-in-out duration-300 transition-all bg-gray-900 rounded-lg"
            key={index}
            data-id={movie.id}
            onClick={(e) => {
              const newId = e.currentTarget.getAttribute("data-id");
              document
                .getElementById("movieCard")
                .scrollIntoView({ behavior: "smooth" });
              setMovieId(newId);
            }}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                  : placeholder
              }
              className="w-full object-cover"
            />
            <div className="mt-2 p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold lg:text-lg max-w-[90%]">
                  {movie.title}
                </h2>
                <p className="ml-2">{movie.release_date.slice(0, 4)}</p>
              </div>
              <IconContext.Provider value={{ size: "20px", color: "#dc2626" }}>
                <div className="flex items-center justify-between text-gray-400">
                  <p>{movie.original_language.toUpperCase() || "NaN"}</p>
                  <div className="flex justify-between items-center text-gray-100">
                    <div className="flex items-center gap-1">
                      <p>{movie.vote_average.toFixed(1)}</p>
                      <BiSolidStar />
                    </div>
                    {movie.runtim && (
                      <div className="flex items-center gap-1 ml-4">
                        <p>{movie.runtime}</p>
                        <BiSolidTime />
                      </div>
                    )}
                  </div>
                </div>
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
