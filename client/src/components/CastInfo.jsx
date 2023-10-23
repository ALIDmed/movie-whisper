import { useEffect, useState } from "react";
import axios from "axios";
import Paragraph from "./Paragraph";
import { placeholder } from "../assets/index";

const CastInfo = ({ id, setModal }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`)
        .then((res) => setData(res.data))
        .then((data) => console.log(data));
    };
    document.body.classList.add("overflow-y-hidden");
    fetchData();
  }, []);

  console.log(data);

  const handleClose = (e) => {
    e.target.id === "wrapper" && setModal((prev) => !prev);
    document.body.classList.remove("overflow-y-hidden");
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-[100]"
      id="wrapper"
      onClick={handleClose}
    >
      {data && (
        <div className="w-[75vw] bg-white text-black h-fit max-h-[80vh] rounded-lg overflow-y-auto relative">
          <div
            className="rounded-lg absolute top-2 right-2 bg-red-600 w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={() => {
              document.body.classList.remove("overflow-y-hidden");
              setModal((prev) => !prev);
            }}
          >
            <h3 className="font-mono text-white text-xl">x</h3>
          </div>
          <div className=" grid grid-cols-1 lg:grid-cols-4 ss:gap-6 p-7 gap-x-0">
            <div className="lg:w-full rounded-lg overflow-hidden mx-auto ss:w-[300px] w-[200px]">
              <img
                src={
                  data.profile_path
                    ? `https://image.tmdb.org/t/p/original${data.profile_path}`
                    : placeholder
                }
                alt=""
                className="w-full object-cover rounded-lg"
              />
            </div>
            <div className="col-span-3">
              <h2 className="text-3xl font-bold mb-6">{data.name}</h2>
              <h3 className="text-lg font-semibold">Biography </h3>
              {data.biography ? (
                <Paragraph text={data.biography} maxChars={300} />
              ) : (
                <p>Biography not found</p>
              )}

              <h3 className="text-lg font-semibold mt-4">Birth </h3>
              <p>{`${
                data.birthday == null ? "Birthday not found" : data.birthday
              } ${data.place_of_birth == null ? "" : data.place_of_birth}`}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CastInfo;
