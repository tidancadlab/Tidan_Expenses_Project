import logo from "../../Images/LogoTidanDark.svg";
import Page404 from "../../Images/404Page.png";

function Error404() {
  return (
    <>
      <div className="flex items-center bg404 h-screen justify-center bg-gray-800 flex-col">
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
    </>
  );
}

export default Error404;
