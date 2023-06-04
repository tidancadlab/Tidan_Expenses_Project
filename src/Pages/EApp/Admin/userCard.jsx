import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";

function UserCard({ v, setActiveUser, DataApi }) {
  return (
    <>
      <div
        onClick={() => {
          setActiveUser({_id:v._id});
          DataApi(v._id)
        }}
        className=""
      >
        <div className="relative w-56 h-[300px]">
          <div>
            <img
              className="rounded-t-md hover:scale-105 ease-in-out duration-200 cursor-pointer"
              src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
              alt=""
            />
          </div>
          <div className="absolute bg-white h-20 w-full bottom-0 rounded-b-md">
            <div className="absolute right-0 -top-4 z-10">
              <div className="flex gap-1.5 text-[10px] justify-end pr-4">
                <a href="https://www.google.com/">
                  <BsWhatsapp />
                </a>
                <a href="https://www.google.com/">
                  <BsFacebook />
                </a>
                <a href="https://www.google.com/">
                  <BsInstagram />
                </a>
              </div>
              <div className="flex justify-end pr-6 pt-1.5">
                <div className="w-6 h-0.5 bg-blue-500 rounded"></div>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-end mr-4 mt-2">
                <h1 className="text-sm text-red-500">Mr. {v.userName}</h1>
                <h1 className="text-[10px]">Project Manager</h1>
                <h1 className="text-[8px]">praveen@mail.com</h1>
                <h1 className="text-[8px]">+91 99999 99999</h1>
              </div>
            </div>
          </div>
          <div className="absolute h-5 w-full bottom-20 border-b-[40px] border-l-transparent border-l-[224px] border-white"></div>
        </div>
      </div>
    </>
  );
}

export default UserCard;
