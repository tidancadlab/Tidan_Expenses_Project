function ProgressBar({ cssColor, cssMessage, message }) {

  return (
    <>
      <div className="relative w-[500px] flex flex-row items-baseline bg-slate-300 h-1 rounded-full m-auto">
        <div
          className={`${cssMessage} w-full absolute movingMessage -translate-x-1/2 -top-8`}
        >
          {message}
        </div>
        <div
          className={`${cssColor} progressAnimation h-1 min-w-[12px] rounded`}
        ></div>
      </div>
    </>
  );
}

export default ProgressBar;
