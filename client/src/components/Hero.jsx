import { hero, logo } from "../assets";
import Form from "./Form.jsx";

const Hero = () => {
  return (
    <div className="w-full h-[500px] relative flex justify-center items-center">
      <img src={hero} className="w-full h-full object-cover opacity-70" />
      <div className="black__gradient absolute top-0 right-0 w-full bottom-0 left-0" />
      <img
        src={logo}
        className="absolute top-6 left-7 sm:w-[10rem] sm:h-[3rem] object-contain w-[89px] h-[24]"
      />
      <div className="z-[1] absolute w-full sm:px-16 px-6 flex justify-center flex-col text-center">
        <h1 className="font-extrabold sm:text-6xl text-4xl text-center">
          Discover Your Next Favorite
          <br className="hidden lg:flex" /> Movie With AI
        </h1>
        <h3 className="sm:text-2xl text-1xl mt-4 text-gray-300 font-normal">
          Let Us Guide You Through the Cinematic Universe
        </h3>
        <Form />
      </div>
    </div>
  );
};

export default Hero;
