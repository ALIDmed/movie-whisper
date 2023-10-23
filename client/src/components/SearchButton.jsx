import React from "react";

const SearchButton = () => {
  return (
    <div className="pointer-events-none sm:flex hidden items-center justify-center absolute top-0 left-0 bottom-0 right-0 z-[1] hover:block ease-in-out duration-700 scale-0 group-hover:scale-100 overflow-visible">
      <div className="w-[14rem] h-[14rem] rounded-full bg-red-500 absolute opacity-[0.2]" />
      <div className="w-[22rem] h-[22rem]  rounded-full bg-red-500 absolute opacity-[0.15]" />
      <div className="w-[30rem] h-[30rem]  rounded-full bg-red-500 absolute opacity-[0.1]" />
    </div>
  );
};

export default SearchButton;
