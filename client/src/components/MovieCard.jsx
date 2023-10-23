import {
  getMovieWatchTime,
  extractCrew,
  reviewColor,
  formatNumber,
} from "../utils/index";
const MovieCard = ({ data }) => {
  const baseUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-3 ss:gap-10 gap-0"
      id="movieCard"
    >
      <div className="w-full h-full mx-auto flex items-center justify-center">
        <div className="h-[560px] ss:w-[370px] w-[400px] rounded-xl overflow-hidden my-auto shadow-lg shadow-gray-800">
          <img
            src={`${baseUrl}${data.poster_path}`}
            className="hover:scale-105 ease-in-out transition-all duration-700 object-cover object-center w-full h-full"
          />
        </div>
      </div>
      <div className="flex flex-col items-start flex-wrap justify-center col-span-2 mt-4 lg:mt-0">
        <div>
          <h2 className="text-5xl font-extrabold">
            {data?.title}
            <span className="font-medium text-gray-300">
              {" "}
              ({data?.release_date.slice(0, 4)})
            </span>
          </h2>
          <div className="flex items-center text-gray-200 font-medium mb-6">
            <span>
              {data?.release_date} ({data?.production_countries[0]?.iso_3166_1})
            </span>
            <div className="bg-white w-1 h-1 rounded-full mx-3" />
            <p>
              {data?.genres.map((genre, index) => (
                <span key={genre.id}>
                  {genre.name}
                  {index !== data?.genres.length - 1 ? ", " : " "}
                </span>
              ))}
            </p>
            <div className="bg-white w-1 h-1 rounded-full mx-3" />
            <p>{getMovieWatchTime(data?.runtime)}</p>
          </div>
        </div>
        <div className="flex gap-4 items-center mb-5">
          <div
            className="hover:scale-110 transition-all duration-300 ease-in-out radial-progress bg-gray-800 border-[6px] border-gray-800"
            style={{
              "--value": data?.vote_average * 10,
              "--size": "60px",
              "--thickness": ".26rem",
              color: `${reviewColor(data?.vote_average * 10)}`,
            }}
          >
            <p className="text-white font-varela font-bold text-xl">
              {parseInt(data?.vote_average * 10)}
              <sup className="text-[13px]"> %</sup>
            </p>
          </div>
          <h4 className="text-[18px] font-medium">User Score</h4>
        </div>
        <div>
          <h4 className="text-gray-300 italic font-medium text-lg">
            {data?.tagline}
          </h4>
          <h3 className="mt-[10px] mb-2 text-2xl font-semibold">Overview</h3>
          <p className="font-normal text-[17px]">{data?.overview}</p>
          <ol className="mt-5 flex justify-start flex-wrap">
            {extractCrew(data?.credits.crew).map((crew, index) => (
              <li
                className={`pr-5 min-w-[140px] max-w-[300px] ml-0 ${
                  index !== 0 && "lg:ml-5"
                }`}
                key={index}
              >
                <h4 className="font-bold text-base">{crew.name}</h4>
                <p className="text-sm">{crew.job}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col w-full mt-5">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg overflow-hidden border-[#1f2937]">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-[#1f2937] text-left text-gray-300">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-sm font-medium text-gray-100"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-sm font-medium text-gray-100"
                      >
                        Original Language
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-sm font-medium text-gray-100"
                      >
                        Budget
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-sm font-medium text-gray-100"
                      >
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {data?.status || "NaN"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {data?.original_language.toUpperCase() || "NaN"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {formatNumber(data?.budget) || "NaN"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {formatNumber(data?.revenue) || "NaN"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
