import moment from "moment";
import { useState } from "react";
import {
  BsArrowsAngleExpand,
  BsCalendar,
  BsCart,
  BsCheck,
  BsCheck2,
  BsCheck2All,
  BsExclamationTriangle,
  BsPencil,
  BsShop,
  BsTrash,
  BsX,
} from "react-icons/bs";

export function CardTran({ v, allUser, deleteItem , setActiveEdit , setEditItem}) {
  const INRFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  return (
    <>
      <div
        className={`min-w-[305px] mx-0.5 relative box-border ${
          v.expApprovalStatus.toLowerCase() === "approved"
            ? "border-[#4EFCB1]"
            : v.expApprovalStatus.toLowerCase() === "rejected"
            ? "border-[#FC8874]"
            : "border-[#FCE742]"
        } bg-slate-900 border text-white m-auto my-2 rounded-xl`}
      >
        <div
          className={`w-[calc(100%+2px)] h-5 flex justify-between px-2 items-center ${
            v.expApprovalStatus.toLowerCase() === "approved"
              ? "bg-[#4EFCB1]"
              : v.expApprovalStatus.toLowerCase() === "rejected"
              ? "bg-[#FC8874]"
              : "bg-[#FCE742]"
          } rounded-t-xl -ml-px -mt-px text-black`}
        >
          <p className="text-xs">{v._id}</p>
          <p className="text-xs">
            {moment(v.expUploadedOnTime).format("D MMM YY hh:mm A")}
          </p>
        </div>
        <div className="flex py-2 gap-2">
          <div className="flex flex-col gap-1 text-left ml-2 w-full">
            <h1 className="text-sm flex items-center gap-2">
              <BsCalendar /> {moment(v.expDate).format("Do MMM YYYY")}
            </h1>
            <h1 className="text-sm flex items-center gap-2">
              <BsCart /> {v.expItem}
            </h1>
            <h1 className="text-sm flex items-center gap-2">
              <BsShop /> {v.expVendor}
            </h1>
          </div>
          <div className="flex flex-col w-full mr-2 text-right">
            <h1 className="text-4xl">{INRFormat(v.expAmount)}</h1>
            {v.expRemark !== "" && (
              <p title={v.expRemark} className="text-xs">
                {v.expRemark.length >= 52
                  ? v.expRemark.slice(0, 32) + "..."
                  : v.expRemark}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-5 w-full items-center justify-between rounded-b-xl px-2 pb-2">
          <div className="flex gap-2">
            {v.reportingOfficer ? (
              <div
                className={` ${
                  v.expApprovalStatus.toLowerCase() === "approved"
                    ? "bg-[#11a062]"
                    : v.expApprovalStatus.toLowerCase() === "rejected"
                    ? "bg-[#e74b30]"
                    : "bg-[#ac9807]"
                } h-fit flex items-center gap-1 max-w-fit w-full px-2 py-px rounded-full text-white font-thin text-xs`}
              >
                {v.expApprovalStatus.toLowerCase() === "approved" ? (
                  <BsCheck2All />
                ) : v.expApprovalStatus.toLowerCase() === "rejected" ? (
                  <BsExclamationTriangle />
                ) : (
                  <BsCheck />
                )}{" "}
                {allUser.map((u) => v.reportingOfficer === u._id && u.userName)}
              </div>
            ) : (
              <div className="h-full flex items-center gap-1 max-w-fit w-full px-2 py-px rounded-full bg-black text-white font-thin text-xs">
                <BsCheck2 /> {"L" + (v.userLevel + 1) + " +"}
              </div>
            )}
            {v.projectName && (
              <div className="h-full flex items-center gap-2 max-w-fit w-full px-2 py-px rounded-full bg-green-600 text-white font-thin text-xs">
                {v.projectName.slice(0, 8)}
              </div>
            )}
          </div>
          <div className="flex justify-between w-full max-w-[100px]">
            <button
            disabled={v.expApprovalStatus.toLowerCase() === "approved"}
            onClick={()=>{
              setActiveEdit(true);
              setEditItem(v._id)
            }} className={`${v.expApprovalStatus.toLowerCase() === "approved" ? "opacity-20" : "opacity-100"} p-2 rounded-full bg-blue-500 text-white font-thin text-xs`}>
              <BsPencil />
            </button>
            <button
            disabled={v.expApprovalStatus.toLowerCase() === "approved"}
              onClick={() => deleteItem(v._id)}
              className={`${v.expApprovalStatus.toLowerCase() === "approved" ? "opacity-20" : "opacity-100"} p-2 rounded-full bg-red-500 text-white font-thin text-xs`}
            >
              <BsTrash />
            </button>
            <div className="p-2 rounded-full bg-violet-500 text-white font-thin text-xs">
              <BsArrowsAngleExpand />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export function CardApprove({ v, allUser, deleteItem }) {
  const [isReject, setIsReject] = useState(false);
  const INRFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  function ifReject() {
    setIsReject(true);
  }

  return (
    <>
      <div
        className={`min-w-[305px] mx-0.5 relative box-border ${
          v.expApprovalStatus.toLowerCase() === "approved"
            ? "border-[#4EFCB1]"
            : v.expApprovalStatus.toLowerCase() === "rejected"
            ? "border-[#FC8874]"
            : "border-[#FCE742]"
        } bg-slate-900 border text-white m-auto my-2 rounded-xl`}
      >
        <div
          className={`w-[calc(100%+2px)] h-5 flex justify-between px-2 items-center ${
            v.expApprovalStatus.toLowerCase() === "approved"
              ? "bg-[#4EFCB1]"
              : v.expApprovalStatus.toLowerCase() === "rejected"
              ? "bg-[#FC8874]"
              : "bg-[#FCE742]"
          } rounded-t-xl -ml-px -mt-px text-black`}
        >
          <p className="text-xs">{v._id}</p>
          <p className="text-xs">
            {moment(v.expUploadedOnTime).format("D MMM YY hh:mm A")}
          </p>
        </div>
        <div className="flex py-2 gap-2">
          <div className="flex flex-col gap-1 text-left ml-2 w-full">
            <h1 className="text-sm flex items-center gap-2">
              <BsCalendar /> {moment(v.expDate).format("Do MMM YYYY")}
            </h1>
            <h1 className="text-sm flex items-center gap-2">
              <BsCart /> {v.expItem}
            </h1>
            <h1 className="text-sm flex items-center gap-2">
              <BsShop /> {v.expVendor}
            </h1>
          </div>
          <div className="flex flex-col w-full mr-2 text-right">
            <h1 className="text-4xl">{INRFormat(v.expAmount)}</h1>
            {v.expRemark !== "" && (
              <p title={v.expRemark} className="text-xs">
                {v.expRemark.length >= 52
                  ? v.expRemark.slice(0, 32) + "..."
                  : v.expRemark}
              </p>
            )}
          </div>
        </div>
        {!isReject ? (
          <div className="flex gap-5 w-full items-center justify-between rounded-b-xl px-2 pb-2">
            <div className="flex gap-2">
              {v.reportingOfficer ? (
                <div
                  className={` bg-gray-700 h-fit flex items-center gap-1 max-w-fit w-full px-2 py-px rounded-full text-white font-thin text-xs`}
                >
                  {allUser.map((u) => v.userId === u._id && u.userName)}
                </div>
              ) : (
                <div className="h-full flex items-center gap-1 max-w-fit w-full px-2 py-px rounded-full bg-black text-white font-thin text-xs">
                  <BsCheck2 /> {"L" + (v.userLevel + 1) + " +"}
                </div>
              )}
              {v.projectName && (
                <div className="h-full flex items-center gap-2 max-w-fit w-full px-2 py-px rounded-full bg-blue-600 text-white font-thin text-xs">
                  {v.projectName.slice(0, 8)}
                </div>
              )}
            </div>
            <div className="flex justify-between w-full max-w-[150px]">
              <button className="px-2 rounded-full bg-green-600 text-white font-thin text-xs">
                Approve
              </button>
              <button
                onClick={ifReject}
                className="px-2 rounded-full bg-red-600 text-white font-thin text-xs"
              >
                Reject
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex px-2 pb-2 gap-2 items-center">
            <button onClick={()=> setIsReject(false)} className="border p-1 rounded-full"><BsX/></button>
            <input placeholder="Comment if any" className="rounded w-full text-black outline-none px-1" />
            <button className="border p-1 rounded-full"><BsCheck/></button>
          </div>
        )}
      </div>
    </>
  );
}

export function CardTranSkelton() {
  return (
    <>
      <div
        className={`min-w-[305px] mx-0.5 relative bg-slate-900 m-auto border border-gray-600 my-2 rounded-xl`}
      >
        {/* <div
          className={`w-full h-5 flex justify-between px-2 items-center bg-slate-900 rounded-t-lg text-black`}
        ></div> */}
        <div className="flex py-2 h-24 gap-2">
          <div className="flex flex-col gap-1 text-left ml-2 w-full">
            <div className="text-sm bg-gray-500 h-5 rounded-full flex items-center gap-2"></div>
            <div className="text-sm bg-gray-500 h-5 rounded-full flex items-center gap-2"></div>
            <div className="text-sm bg-gray-500 h-5 rounded-full flex items-center gap-2"></div>
          </div>
          <div className="flex flex-col w-full mr-2 gap-2 text-right">
            <div className="text-xl h-10 bg-gray-500 rounded-full"></div>
            <div className="text-xl h-5 bg-gray-500 rounded-full"></div>
          </div>
        </div>
        <div className="flex gap-5 w-full items-center justify-between rounded-b-xl px-2 pb-2">
          <div className="flex gap-2 rounded w-full">
            <div
              className={` bg-gray-500 h-4 items-center gap-1 w-full px-2 py-px rounded-full text-white font-thin text-xs`}
            ></div>
            <div className="bg-gray-500 h-4 items-center gap-2  w-20 px-2 py-px rounded-full text-white font-thin text-xs"></div>
          </div>
          <div className="flex justify-between w-full max-w-[100px]">
            <div className="p-2 rounded-full bg-blue-500 text-white font-thin text-xs"></div>
            <button className="p-2 rounded-full bg-red-500 text-white font-thin text-xs"></button>
            <div className="p-2 rounded-full bg-violet-500 text-white font-thin text-xs"></div>
          </div>
        </div>
      </div>
    </>
  );
}
