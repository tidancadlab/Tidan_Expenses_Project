import { useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link, Route, Routes } from "react-router-dom";
// import svg1 from "../../Images/fileSearching.svg";
// import svg2 from "../../Images/graphProjectionsSvg.svg";
// import svg3 from "../../Images/liveApproval.svg";
// import svg4 from "../../Images/online_stats_SVG.svg";

// const SVGArray = [svg1, svg2, svg3, svg4];
// const svgData = [
//   {
//     img: svg1,
//     Descriptions: "Find you Transactions",
//     style: "text-red-500 border-red-700 bg-white",
//   },
//   {
//     img: svg2,
//     Descriptions: "Give you that how much you spend",
//     style: "text-blue-500 border-blue-700 bg-white",
//   },
//   {
//     img: svg3,
//     Descriptions: "Track your Approval",
//     style: "text-black border-black bg-white",
//   },
//   {
//     img: svg4,
//     Descriptions: "Status of Project Cost",
//     style: "text-white bg-black",
//   },
// ];

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
      <div
        className={`bg-[#023E73] min-h-[calc(100vh)] overflow-x-hidden text-white relative`}
      >
        <div className="box-border absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <div className="relative h-full w-full upto-lab-s:px-10 scrn-mob:py-5 rounded  flex items-center justify-center">
            <div>
              <section>
                <div className="text-6xl font-bold mt-10">
                  <h1>Get started with us</h1>
                </div>
                <div className="text-xl font-thin mt-14">
                  <p>
                    Trancer is a Transaction Tracer app which is build and
                    design for <br /> help to track your personal or
                    professional expenses on live update.
                  </p>
                </div>
                <div className="mt-10 flex justify-center items-center gap-6">
                  <Link
                    to={`/e-app/${loggedUser.userId}`}
                    className="w-fit px-4 py-2 bg-white text-blue-700 text-2xl rounded-xl border-4 border-white hover:bg-transparent hover:text-white ease-linear duration-100"
                  >
                    Try it Free
                  </Link>
                  <div className="w-6 rounded h-0.5 bg-black dark:bg-white"></div>
                  <h1 className="text-xl">It's Free</h1>
                  <div></div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeFirst;
