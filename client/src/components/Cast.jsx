import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { placeholder } from "../assets/index";
import CastInfo from "./CastInfo";

const Cast = ({ cast }) => {
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  const [modal, setModal] = useState(false);
  const [castChosen, setActorChosen] = useState(null);

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <>
      <div className="text-4xl sm:text-5xl font-extrabold text-center mb-5 mt-16">
        <h1>Cast</h1>
      </div>
      <motion.div
        className="cursor-grab overflow-hidden  py-3 relative rounded-lg"
        whileTap={{ cursor: "grabbing" }}
        ref={carousel}
      >
        <motion.div
          className="flex w-full"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
        >
          {cast.slice(0, 20).map((member, index) => (
            <motion.div
              className="min-w-[200px] mx-4 rounded-lg overflow-hidden h-fit bg-white"
              key={index}
            >
              <div className="w-full h-[300px]">
                <img
                  src={`${baseUrl}${member.profile_path}`}
                  className="w-full pointer-events-none object-cover"
                  onError={(e) => {
                    e.target.src = placeholder;
                  }}
                />
              </div>
              <div className="px-3 my-3">
                <h4 className="text-black font-bold text-lg">{member?.name}</h4>
                <p className="text-slate-600 font-medium text-sm">
                  {member?.character}
                </p>
                <span
                  className="text-blue-500 cursor-pointer text-sm"
                  data-id={member.id}
                  onClick={(e) => {
                    setActorChosen(e.currentTarget.getAttribute("data-id"));
                    setModal((prev) => !prev);
                    console.log(castChosen);
                  }}
                >
                  View More
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      {modal && <CastInfo id={castChosen} setModal={setModal} />}
    </>
  );
};

export default Cast;
