import Nav from "../../../js/Nav";
import loginImg from "../../../../Images/loginImg.jpg";
import { Link } from "react-router-dom";
function LoginAgain() {
  return (
    <>
      <div className="dark:bg-gray-900 h-screen">
        <div className="dark:text-white flex justify-end items-center">
            <div className=" flex flex-col gap-10 justify-center items-center w-full animate-bounce">
                {/* <h1 className="text-5xl">Please Login</h1> */}
                <Link to="/Login" className="px-14 py-2 border border-black dark:border-white rounded-md ease-in-out duration-200 hover:bg-white hover:text-black">Login</Link>
            </div>
          <img className="h-[calc(100vh)] rounded-l-xl" src={loginImg} alt="" />
        </div>
      </div>
    </>
  );
}

export default LoginAgain;
