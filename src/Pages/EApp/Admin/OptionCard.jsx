
function OptionCard(props) {
    const data = props.data;
    console.log(data);
  return (
    <>
      <div style={{background: "#0D0D0D"}} className="p-8 rounded-2xl cursor-pointer hover:bg-[#002F58] ease-in-out duration-150 shad">
        <h1 className="text-5xl text-[#F2C641] mb-4 mt-4 border border-[#F25835] rounded-md w-fit p-1">{data.logo}</h1>
        <h1 className="text-xl text-[#04BF68] text-left mb-0.5">
          {data.h1}
        </h1>
        <div className="text-lg">
          <p className="max-w-[250px] text-[#0477BF] text-left font-thin text-sm">{data.p}</p>
        </div>
      </div>
    </>
  );
}

export default OptionCard;
