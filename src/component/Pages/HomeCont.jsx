import { useState, useEffect } from "react";
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

    //<----------Dark Background----------->

    const darkMode = localStorage.getItem("DarkMode");

  return (
    <>
      <div className={`${darkMode === "dark"? "bg-img4":"bg-img5"} min-h-[calc(100vh)] pt-[4%] overflow-x-hidden dark:text-white`}>
        <div className="">
          <div className="relative h-full upto-lab-s:px-10 scrn-mob:py-5 rounded px-44 py-20">
            <div className="text-left">
              <div className="bg-[#FCE742] dark:bg-[#ffffff] -ml-5 w-fit rounded-x border-4 border-white shad-2">
                <p className="text-xl text-left bg-clip-text font-Orbitron text-transparent bg-[#013440] py-3 px-5 font-bold ">
                  Is complicated to trace your Project and personal Expenses ?
                </p>
              </div>
              <h1 className="text-7xl w-72 rounded-bl-2xl mb-10 text-left font-thin text-[#013440] dark:text-white border-4 border-[#013440] dark:border-white pl-5 pb-5 -ml-5 mt-5">
                Don't{" "}
                <span className="bg-[#013440] dark:bg-white text-[#fff] dark:text-[#262324] w-[280px] pb-1 px-8 pr-12 -ml-5">
                  worry,
                </span>{" "}
                We are here for{" "}
                <span className="bg-[#013440] dark:bg-white text-[#fff] dark:text-[#262324] min-w-[80px] pb-4 px-8 pr-20 -ml-5 rounded-bl-lg">
                  you...
                </span>
              </h1>
              <Link to="e-app/:id" className="w-60 relative flex justify-center gap-1 items-center text-xl border border-transparent hover:border-[#013440] text-[#FC8874] hover:text-[#013440] py-4 rounded-full bg-[#013440] dark:bg-white hover:bg-transparent ease-in-out duration-300">
                <span>Click here</span>{" "}
                <span className="arrowMove">
                  <BsArrowRight />
                </span>
              </Link>
            </div>
            <div className="h-1/2 -mt-28 rounded-lg absolute top-44 right-24 hidden scrn-4k:block">
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
