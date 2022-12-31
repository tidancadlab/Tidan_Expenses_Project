import moment from "moment/moment";
import maleAvatar from "../../../Images/male_avatar.svg";

function UserProfile(props) {
  const {loggedUser, userPtyData} = props;
  return (
    <>
      <div className="m-auto flex justify-center items-center flex-col w-fit border p-20 dark:bg-opacity-50 bg-opacity-20 backdrop-blur-2xl bg-emerald-500 dark:bg-slate-800 rounded-2xl shadow-2xl text-black">
        <div className="flex items-center gap-5 text-start border px-10 py-5 rounded-lg shadow-xl bg-white">
          <div className="rounded-full w-32 h-32 flex justify-center items-center border-4 border-black">
            <img src={maleAvatar} alt="UserImg" />
          </div>
          <div>
            <p className="text-2xl">
              Mr. {loggedUser.userName || "Not Available"}{" "}
              <button className="text-xs text-blue-500"> Change</button>
            </p>
            <h1 className="text-lg">
              {userPtyData.userDesignation || "not Specified"}{" "}
              <button className="text-xs text-blue-500"> Change</button>
            </h1>
            <p className="text-sm">{loggedUser.userEmail || "N/A"}</p>
          </div>
        </div>
        <div className="mt-10 border px-10 py-5 rounded-lg shadow-xl bg-white">
          <ul className="flex gap-3 border-b border-black border-dashed mt-2 px-5">
            <li className="w-32 text-start">Level:</li>
            <li className="w-60 text-start">L-{loggedUser.userProperty.userLevel || "N/A"}</li>
          </ul>
          <ul className="flex gap-3 border-b border-black border-dashed mt-2 px-5">
            <li className="w-32 text-start">Mail ID:</li>
            <li className="w-60 text-start">{loggedUser.userEmail || "N/A"}</li>
            <li className="text-xs text-blue-500">
              <button>Change</button>
            </li>
          </ul>
          <ul className="flex gap-3 border-b border-black border-dashed mt-2 px-5">
            <li className="w-32 text-start">Mobile No.:</li>
            <li className="w-60 text-start">{loggedUser.userProperty.userMob || "N/A"}</li>
            <li className="text-xs text-blue-500">
              <button>Change</button>
            </li>
          </ul>
          <ul className="flex gap-3 border-b border-black border-dashed mt-2 px-5">
            <li className="w-32 text-start">Password:</li>
            <li className="w-60 text-start">**************</li>
            <li className="text-xs text-blue-500">
              <button>Change</button>
            </li>
          </ul>
          <ul className="flex gap-3 border-b border-black border-dashed mt-2 px-5">
            <li className="w-32 text-start">User ID:</li>
            <li className="w-60 text-start">{loggedUser.userId || "N/A"}</li>
            <li className="text-xs text-blue-500">
              {/* <button>Change</button> */}
            </li>
          </ul>
          <ul className="flex gap-3 border-b border-black border-dashed mt-2 px-5">
            <li className="w-32 text-start">Projects:</li>
            <li className="w-60 text-start">{userPtyData.projectName || "N/A"}</li>
            <li className="text-xs text-blue-500">
              {/* <button>Change</button> */}
            </li>
          </ul>
          <ul className="flex gap-3 border-b border-black border-dashed mt-2 px-5">
            <li className="w-32 text-start">User Name:</li>
            <li className="w-60 text-start">{userPtyData.userID || "N/A"}</li>
            <li className="text-xs text-blue-500">
              <button className="hover:underline">Change</button>
            </li>
          </ul>
        </div>
        <div className="flex gap-20">
          <button className="px-10 py-2 border border-black mt-10 rounded-xl dark:border-white dark:hover:bg-white hover:bg-black hover:text-white dark:hover:text-black ease-in-out duration-200">
            Save
          </button>
          <button className="px-10 py-2 border border-black mt-10 rounded-xl dark:border-white dark:hover:bg-white hover:bg-black hover:text-white dark:hover:text-black ease-in-out duration-200">
            Cancel
          </button>
        </div>
        <h1>Registered on: {moment(loggedUser.userRegisteredDate).format("dddd, DD MMM YYYY hh:mm:ss A") || "N/A"}</h1>
      </div>
    </>
  );
}

export default UserProfile;
