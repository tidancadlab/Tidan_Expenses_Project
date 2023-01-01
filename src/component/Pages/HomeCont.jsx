import { useEffect } from "react";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import svg1 from "../../Images/fileSearching.svg";
import svg2 from "../../Images/graphProjectionsSvg.svg";
import svg3 from "../../Images/liveApproval.svg";
import svg4 from "../../Images/online_stats_SVG.svg";

const SVGArray = [svg1, svg2, svg3, svg4];
const svgData = [
  {
    img: svg1,
    Descriptions: "Find you Transactions",
    style: "text-red-500 border-red-700 bg-white",
  },
  {
    img: svg2,
    Descriptions: "Give you that how much you spend",
    style: "text-blue-500 border-blue-700 bg-white",
  },
  {
    img: svg3,
    Descriptions: "Track your Approval",
    style: "text-black border-black bg-white",
  },
  {
    img: svg4,
    Descriptions: "Status of Project Cost",
    style: "text-white bg-black",
  },
];

const HomeFirst = ({ titleName, loggedUser }, props) => {
  titleName.innerHTML = "Home";
  const [svgChange, setSvgChange] = useState(0);

  // const changeTime = setInterval(() => {
  //   setSvgChange(svgChange < SVGArray.length - 1 ? svgChange + 1 : 0);
  //   clearInterval(changeTime);
  // }, 5000);

  return (
    <>
      <div className="min-h-[calc(100vh-64px)] bg-css overflow-x-hidden dark:bg-none dark:bg-[#1c2747] dark:text-white">
        <div className="">
          <div className="relative h-full upto-lab-s:px-10 scrn-mob:py-5 rounded px-44 py-20">
            <div className="text-left">
              <div className="bg-[#FCE742] dark:bg-[#ffffff] -ml-5 w-fit rounded-xl border-4 border-black shad-2">
                <p className="text-xl text-left bg-clip-text font-Orbitron text-transparent bg-gradient-to-r from-[#025159] to-[#3E848C] py-3 px-5 font-bold ">
                  Is complicated to trace your Project and personal Expenses ?
                </p>
              </div>
              <h1 className="text-7xl w-72 mb-10 text-left font-bold text-[#4EFCB1] dark:text-[#6662f6] border-l-8 border-[#4EFCB1] dark:border-[#6662f6] pl-5 pb-5 -ml-5 mt-5">
                Don't{" "}
                <span className="bg-[#4EFCB1] dark:bg-[#6662f6] text-[#FC8874] dark:text-white rounded-xl pb-1 px-2">
                  worry,
                </span>{" "}
                We are here for{" "}
                <span className="bg-[#4EFCB1] dark:bg-[#6662f6] text-[#FC8874] dark:text-white rounded-xl pb-3 px-2">
                  you...
                </span>
              </h1>
              <Link to="e-app/:id" className="w-60 relative flex justify-center gap-1 items-center text-xl border border-transparent hover:border-[#4EFCB1] text-[#FC8874] hover:text-[#4EFCB1] py-4 rounded-full bg-[#4EFCB1] dark:bg-[#6662f6] hover:bg-transparent ease-in-out duration-300">
                <span>Click here</span>{" "}
                <span className="arrowMove">
                  <BsArrowRight />
                </span>
              </Link>
            </div>
            <div className="h-3/4 rounded-lg absolute top-44 right-24 hidden scrn-4k:block">
              {svgData.map((img, idx) => {
                return (
                  <div key={idx} className="relative w-[800px]">
                    <div
                      className={`${
                        idx === svgChange
                          ? "translate-x-0 opacity-100"
                          : "translate-x-96 opacity-0"
                      } ease-out duration-1000`}
                      
                    >
                      {idx === svgChange && (
                        <>
                          <img src={svgData[svgChange].img} alt="" />
                        </>
                      )}
                    </div>
                    <div>
                      
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeFirst;
