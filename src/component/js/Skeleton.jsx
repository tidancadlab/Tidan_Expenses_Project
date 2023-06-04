function Skeleton(props) {
  return (
    <div className={`opacity-40 relative ${props.className} `}>
      <div className="h-[50px] mt-1 px-5 min-w-full flex justify-between items-center gap-1 bg-gray-200 bg-opacity-50 rounded plsAnminate">
        <div className="w-full max-w-[130px] relative flex flex-col gap-2">
          <div className="bg-slate-400 w-full h-4 rounded"></div>
          <div className="bg-slate-400 max-w-[calc(100%-30px)] h-2 rounded"></div>
        </div>
        <div className="border-l h-full border-white border-dashed"></div>
        <div className="w-full max-w-[200px] relative flex flex-col gap-2">
          <div className="bg-slate-400 w-full h-4 rounded"></div>
          <div className="bg-slate-400 max-w-[calc(100%-30px)] h-2 rounded"></div>
        </div>
        <div className="border-l h-full border-white border-dashed"></div>
        <div className="w-full max-w-[140px] relative flex flex-col gap-2">
          <div className="bg-slate-400 w-full h-4 rounded"></div>
          <div className="bg-slate-400 max-w-[calc(100%-30px)] h-2 rounded"></div>
        </div>
        <div className="border-l h-full border-white border-dashed"></div>
        <div className="w-full max-w-[160px] relative flex flex-col gap-2">
          <div className="bg-slate-400 w-full h-4 rounded"></div>
          <div className="bg-slate-400 max-w-[calc(100%-630px)] h-2 rounded"></div>
        </div>
        <div className="border-l h-full border-white border-dashed"></div>
        <div className="w-full max-w-[140px] relative flex flex-col gap-2">
          <div className="bg-slate-400 w-full h-4 rounded"></div>
          <div className="bg-slate-400 max-w-[calc(100%-30px)] h-2 rounded"></div>
        </div>
        <div className="border-l h-full border-white border-dashed"></div>
        <div className="w-full max-w-[240px] relative flex flex-col gap-2">
          <div className="bg-slate-400 w-full h-4 rounded"></div>
          <div className="bg-slate-400 max-w-[calc(100%-30px)] h-2 rounded"></div>
        </div>
        <div className="border-l h-full border-white border-dashed"></div>
        <div className="w-full max-w-[100px] relative flex flex-col gap-2">
          <div className="bg-slate-400 w-full h-4 rounded"></div>
          <div className="bg-slate-400 max-w-[calc(100%-30px)] h-2 rounded"></div>
        </div>
        <div className="border-l h-full border-white border-dashed"></div>
        <div className="w-full max-w-[100px] relative flex flex-col gap-2">
          <div className="bg-slate-400 w-full h-4 rounded"></div>
          <div className="bg-slate-400 max-w-[calc(100%-30px)] h-2 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
