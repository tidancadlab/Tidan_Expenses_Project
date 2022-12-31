function ProgressRound() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex relative justify-center items-center dark:text-white h-36 w-36 rounded-full dark:border-gray-800 animate-bounce border-4 mt-72">
          {" "}
          loading...
          <div className="absolute top-[-4px] left-[-4px] h-[144px] w-[144px] border-4 border-transparent animate-spin border-b-red-400 rounded-full"></div>
        </div>
      </div>
    </>
  );
}

export default ProgressRound;
