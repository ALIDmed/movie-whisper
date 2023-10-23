const AutocompleteSkeleton = () => {
  return (
    // bg-gray-200 dark:bg-gray-700
    <div
      role="status"
      className="animate-pulse grid grid-cols-1 lg:grid-cols-4"
    >
      <div className="col-span-1  flex justify-center rounded-xl mr-10">
        <div className="h-[560px] w-[350px] rounded-xl bg-gray-300 dark:bg-gray-700 "></div>
      </div>
      <div className="col-span-3 flex flex-col items-start flex-wrap justify-center w-full mt-4 lg:mt-0">
        <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700  w-[60%] mb-5"></div>
        <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 mb-5"></div>
        <div className="bg-gray-200 rounded-full dark:bg-gray-700 w-[50%] mb-5 h-5"></div>
        <div className="bg-gray-200 rounded-full dark:bg-gray-700 w-[20%] mb-5 h-7 my-3"></div>
        <div className="bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-5 h-24"></div>
        <div className="h-12 mt-5 flex items-center justify-between w-full gap-3">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg h-12"></div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg h-12"></div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg h-12"></div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg h-12"></div>
        </div>
      </div>
    </div>
  );
};

export default AutocompleteSkeleton;
