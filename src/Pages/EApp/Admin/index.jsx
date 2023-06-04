import { useEffect } from "react";
import { useState } from "react";
import {
  BsArrowLeftShort,
  BsFacebook,
  BsFillTelephoneFill,
  BsGithub,
  BsInstagram,
  BsMailbox2,
  BsTwitter,
  BsWhatsapp,
} from "react-icons/bs";
import { VscOrganization } from "react-icons/vsc";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { expensesData } from "../../../component/js/FetchModule";
import DayExpGraph from "../../../component/Pages/ExpApp/contenet/Graph/DayExpGraph";
import PiGraph from "../../../component/Pages/ExpApp/contenet/Graph/PiGraph";
import Progress from "../../../component/Progress";
import Profile from "./profile";
import AssignedFund from "./AssignedFund";
import AssignedProject from "./AssignedProject";
import UserCard from "./userCard";
import UpdateOption from "./UpdateOption";
import OptionCard from "./OptionCard";
import ManageFund from "./fund";

function Admin() {
  const dispatch = useDispatch();
  const abc = useSelector((state) => state);
  const tran = abc.tran.data === undefined ? [] : abc.tran.data;
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [userTran, setUserTran] = useState({ data: [], code: false });
  const [activeUser, setActiveUser] = useState([]);
  const [allUser, setAllUser] = useState([]);

  const DataApi = async (v) => {
    const selectedUser = allUser.filter((u) => {
      return u._id === v;
    });
    setActiveUser(selectedUser[0]);
  };
  console.log(activeUser);
  let ra = 500000;
  let te = 0;
  let at = 0;
  let rt = 0;
  const newTran =
    dateFrom !== "" && dateTo !== ""
      ? userTran.data.filter((i) => {
          return (
            i.expDate.slice(0, 10) >= dateFrom &&
            i.expDate.slice(0, 10) <=
              (dateTo === "" ? new Date().toISOString().slice(0, 10) : dateTo)
          );
        })
      : userTran.data;

  for (const i of newTran) {
    te += i.expAmount;
  }

  newTran.filter((i) => {
    switch (i.expApprovalStatus.toLowerCase()) {
      case "approved":
        at += i.expAmount;
        break;
      case "rejected":
        rt += i.expAmount;
        break;
    }
  });

  const aw = (at * 100) / te;
  const rw = (rt * 100) / te;
  const pw = ((te - at - rt) * 100) / te;
  const al = [];
  const rl = [];
  const pl = [];

  for (const element of newTran) {
    element.expApprovalStatus.toLowerCase() === "approved" &&
      al.push(element.expAmount);
    element.expApprovalStatus.toLowerCase() === "rejected" &&
      rl.push(element.expAmount);
    element.expApprovalStatus.toLowerCase() === "pending" &&
      pl.push(element.expAmount);
  }

  useEffect(() => {
    fetch("http://localhost:8000/allUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setAllUser(data));
  }, []);

  // ----- Switch Update Option ------

  const [selectedOption, setSelectedOption] = useState("");

  let OptionService;
  switch (selectedOption) {
    case "profile":
      OptionService = <Profile  setSelectedOption={setSelectedOption}/>;
      break;
    case "fund":
      OptionService = <ManageFund  setSelectedOption={setSelectedOption}/>;
      break;

    default:
      OptionService = (
        <UpdateOption setSelectedOption={setSelectedOption} />
      );
      break;
  }

  return (
    <>
      <div className="h-screen w-screen bg-[#0B1B14]">
        <div className="max-w-[1424px] m-auto">
          <div className="border-b border-dashed">
            <h1 className="text-white text-6xl py-4">Admin Desk</h1>
          </div>
          {activeUser.length !== 0 ? (
            <>
              {/* <div className="flex mt-4 justify-center gap-10 border-b border-dashed pb-4">
                <div>
                  <label className="text-white mr-4" htmlFor="selectUser">
                    Selected User
                  </label>
                  <select
                    value={activeUser._id}
                    onChange={(e) => {
                      DataApi(e.target.value);
                    }}
                    className="px-4 py-2 rounded-md bg-slate-700 text-white"
                    id="selectUser"
                  >
                    {allUser.map((v) => {
                      return (
                        <option key={v._id} value={v._id}>
                          {v.userName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex">
                  <div className="polygon1 bg-orange-500 w-36 -ml-4 cursor-pointer hover:bg-white flex justify-center items-center">
                    <h1>Profile</h1>
                  </div>
                  <div className="polygon1 bg-violet-500 w-36 -ml-4 cursor-pointer hover:bg-white  flex justify-center items-center">
                    <h1>Fund</h1>
                  </div>
                  <div className="polygon1 bg-lime-500 w-36 -ml-4 cursor-pointer hover:bg-white  flex justify-center items-center">
                    <h1>Assign Job</h1>
                  </div>
                  <div className="polygon1 bg-sky-500 w-36 -ml-4 cursor-pointer hover:bg-white  flex justify-center items-center">
                    <h1>Assign Team</h1>
                  </div>
                  <div className="polygon1 bg-purple-500 w-36 -ml-4 cursor-pointer hover:bg-white  flex justify-center items-center">
                    <h1>Review</h1>
                  </div>
                </div>
              </div> */}
              <div className="mt-4 flex">
                <div className="flex-col flex justify-center max-w-xs px-4 py-4 bg-gray-800 rounded-2xl max-h-[714px]">
                  <div
                    title="Back"
                    onClick={() => {
                      setActiveUser([]);
                      setSelectedOption("")
                    }}
                    className="text-white cursor-pointer text-xl"
                  >
                    <BsArrowLeftShort />
                  </div>
                  <div className="flex justify-center">
                    <img
                      className="w-36 h-36 rounded-full"
                      src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                      alt="User Picture"
                    />
                  </div>
                  <div className="mb-2">
                    <h1 className="text-white text-2xl">
                      Mr. {activeUser.userName}
                    </h1>
                    <h1 className="text-white">@praveenkumar</h1>
                  </div>
                  <div className="flex gap-3 m-auto text-white">
                    <a
                      href="google.com"
                      className="hover:text-green-500 cursor-pointer"
                    >
                      <BsWhatsapp />
                    </a>
                    <a href="#" className="hover:text-[#3b5998] cursor-pointer">
                      <BsFacebook />
                    </a>
                    <a href="#" className="hover:text-[#fa7e1e] cursor-pointer">
                      <BsInstagram />
                    </a>
                    <a href="#" className="hover:text-[#00acee] cursor-pointer">
                      <BsTwitter />
                    </a>
                    <a href="#" className="hover:text-[#f34f29] cursor-pointer">
                      <BsGithub />
                    </a>
                  </div>
                  <div className="mt-4 overflow-y-scroll max-h-[480px]">
                    <div className="mt-2 text-white text-left">
                      <h1 className="flex justify-between bg-pink-500 mb-2 py-2 px-4 rounded">
                        <span className="flex items-center gap-2">
                          <VscOrganization />
                          Organization
                        </span>
                        <span>M/s Tidan Cad Lab</span>
                      </h1>
                      <h1 className="flex justify-between bg-pink-500 mb-2 py-2 px-4 rounded">
                        <span className="flex items-center gap-2">
                          <HiOutlineUserGroup /> Team
                        </span>
                        <span>Tidan Royals - 5</span>
                      </h1>
                      <h1 className="flex justify-between bg-pink-500 mb-2 py-2 px-4 rounded">
                        <span className="flex items-center gap-2">
                          <BsMailbox2 /> E-Mail
                        </span>
                        <span>praveen@mail.com</span>
                      </h1>
                      <h1 className="flex justify-between bg-pink-500 mb-2 py-2 px-4 rounded">
                        <span className="flex items-center gap-2">
                          <BsFillTelephoneFill />
                          Contact
                        </span>
                        <span>+91 99999 99999</span>
                      </h1>
                    </div>
                    <div>
                      <AssignedProject />
                    </div>
                    <div>
                      <AssignedFund />
                    </div>
                  </div>
                </div>
                <div className="w-0 ml-2 mr-2"></div>
                <div>
                  {OptionService}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-wrap gap-4 p-10 justify-center">
              {allUser.map((v, i) => {
                return (
                  <UserCard
                    key={v._id}
                    v={v}
                    setActiveUser={setActiveUser}
                    DataApi={DataApi}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;
