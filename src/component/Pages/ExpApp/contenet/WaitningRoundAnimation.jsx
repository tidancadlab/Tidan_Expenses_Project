function WaitingRoundAnimation() {
  return (
    <>
      <div className="flex gap-1 justify-center items-center px-3 py-1">
        <div className="w-4 h-4 border-2 border-l-[#fd1d1d] border-t-[#833ab4] border-r-[#fcb045] border-black rounded-full animate-spin"></div>
        {/* <code>Processing...</code> */}
      </div>
    </>
  );
}

export default WaitingRoundAnimation;
