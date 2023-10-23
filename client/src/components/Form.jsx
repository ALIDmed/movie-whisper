import { useContext, useEffect, useState } from "react";
import { search } from "../assets";
import axios from "axios";
import SearchButton from "./SearchButton";
import Autocomplete from "./Autocomplete";
import { AppContext } from "../App";
import { toast } from "react-hot-toast";

const Form = () => {
  const [films, setFilms] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [displaySuggestions, setDisplaySuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const { setMovieId } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      axios.get("http://127.0.0.1:5000/allmovies").then((res) => {
        setFilms(res.data);
      });
    };
    fetchData();
  }, []);

  const getMovieId = async (movie) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}`;
    axios.get(url).then((res) => {
      if (res.data.results.length == 0) {
        toast.error("Movie not found", {
          duration: 2000,
          style: {
            border: "1px solid white",
            background: "#21232c",
            fontWeight: "600",
            color: "white",
          },
        });
      }

      setMovieId(res.data.results[0].id);
    });
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchText(inputValue);

    inputValue ? setDisplaySuggestions(true) : setDisplaySuggestions(false);

    const temp = films.filter((film) =>
      film.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(temp);
  };

  const handleSuggestions = (v) => {
    setSearchText(v);
    setDisplaySuggestions(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovieId(searchText);
  };

  return (
    <div className="flex justify-center mt-5 h-12">
      {/* <div className="flex w-11 items-center justify-center rounded-tl-lg rounded-bl-lg bg-input-bg">
        <img src={search} className="w-[24px] h-[24px] object-contain" />
      </div> */}
      <form
        className="flex flex-col sm:flex-row relative"
        onSubmit={handleSubmit}
      >
        <div className="flex">
          <div className="flex w-11 items-center justify-center rounded-tl-lg rounded-bl-lg bg-input-bg">
            <img src={search} className="w-[24px] h-[24px] object-contain" />
          </div>
          <div className="relative">
            <input
              type="text"
              required
              onChange={handleInputChange}
              value={searchText}
              className="ss:w-[370px] min-w-[150px] w-[250px] min-h-[48px] bg-input-bg pl-2 outline-0 text-[#93969c] font-poppins font-medium text-xl pr-4 rounded-tr-lg rounded-br-lg text-ellipsis overflow-hidden"
            />
            <Autocomplete
              suggestions={suggestions}
              handleSuggestions={handleSuggestions}
              displaySuggestions={displaySuggestions}
              setDisplaySuggestions={setDisplaySuggestions}
            />
          </div>
        </div>

        <div className="relative flex items-center justify-center group mt-5 sm:mt-0">
          <button
            type="submit"
            className="rounded-lg text-white font-semibold cursor-pointer -ml-2 px-6 py-3 bg-red-600 hover:scale-110 ease-in-out duration-300 z-[2] relative"
          >
            Get Movies
          </button>
          <SearchButton />
        </div>
      </form>
    </div>
  );
};

export default Form;
