import { useEffect, useRef } from "react";

const Autocomplete = ({
  displaySuggestions,
  suggestions,
  handleSuggestions,
  setDisplaySuggestions,
}) => {
  const divRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setDisplaySuggestions(false);
      }
    };

    // Attach a click event listener to the document when the component mounts
    if (displaySuggestions) {
      // Attach a click event listener to the document when the component is mounted
      document.addEventListener("click", handleClickOutside);

      // Clean up the event listener when the component unmounts
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [displaySuggestions]);

  return (
    <div
      className={`${
        displaySuggestions ? "scale-100" : "scale-0"
      } w-[95%] sm:w-full h-[fit-content] bg-input-bg rounded-lg mt-1 transition-all duration-300 ease-in-out origin-top absolute z-[3]`}
      ref={divRef}
    >
      <ul className="px-2 text-[#93969c] font-medium">
        {suggestions.slice(0, 4).map((v, i) => {
          return (
            <li
              key={i}
              onClick={() => handleSuggestions(v)}
              className={`py-2 ${
                i !== suggestions.length - 1 ? "border-b" : "border-b-0"
              } border-gray-700 cursor-pointer font-medium text-[16px] hover:text-[#BEC2CB] transition-all ease-in-out duration-300`}
            >
              {v}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Autocomplete;
