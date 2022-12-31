import logo from "../../Images/LogoTidanDark.svg";
import Page404 from "../../Images/404Page.png";

function Error404({ titleName }) {
  titleName.innerHTML = "Page Not Found ☹️";
  return (
    <>
      <div className="min-h-[calc(100vh-64px)] pt-28 bg-gray-800">
        <div className="flex pb-32 items-center bg404 justify-center flex-col">
          <img className="mb-20" src={logo} alt="" />
          <div className="relative">
            <img className=" bg-blue-300 rounded-2xl" src={Page404} alt="" />
            <h2 className="text-3xl absolute bottom-20 text-red-500 left-1/2 -translate-x-1/2">
              Page Not Found
            </h2>
          </div>
          <a
            className="border border-blue-900 rounded bg-blue-300 text-blue-700 p-4 mt-5"
            href="/"
          >
            Please click here to redirect on home page
          </a>
        </div>
        <div className="h-96 bg-black"></div>
      </div>
    </>
  );
}

export default Error404;
