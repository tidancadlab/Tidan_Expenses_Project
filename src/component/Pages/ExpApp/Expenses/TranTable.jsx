import { FcShop } from "react-icons/fc";
import {
  BsFillEyeFill,
  BsFillPencilFill,
  BsPatchQuestionFill,
  BsPatchCheckFill,
  BsPatchExclamationFill,
} from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
function TranTable({
  item,
  moment,
  currencyFormat,
  viewExpenses,
  deleteItem,
  idx,
  moreThreeDay,
}) {
  //  console.log("hello");

  return (
    <>
      <li className="flex-col  w-[130px]">
        <span className="scrn-tab:text-xs">
          {moment(item.expDate).format("DD-MMM-YYYY")}
        </span>
        <span className="text-[10px] text-green-500">{item._id}</span>
      </li>
      <li
        title={item.expItem}
        className="flex-col upto-lab-s:hidden w-[200px] capitalize"
      >
        <p className="upto-lab-s:hidden truncate">{item.expItem}</p>
        <h1 className="flex items-center gap-1 text-xs upto-lab-s:hidden text-sky-500 ">
          <span>
            <FcShop />
          </span>{" "}
          <p className="truncate">{item.expVendor}</p>
        </h1>
      </li>
      <li className="w-28 text-end">{currencyFormat(item.expAmount)}</li>
      <li title={item.billFile || "Not Enclosed"} className="w-36 text-sm">
        {item.billFile ? (
          <span className="text-blue-500 underline cursor-pointer">
            {item.billFile}
          </span>
        ) : (
          "N/A"
        )}
      </li>
      <li className="flex-col w-36 capitalize">
        <span>{item.expUploaded}</span>
        <span className="text-xs text-orange-500">
          {moment(item.expUploadedOnTime).format("DD-MM-Y hh:mm:ss A")}
        </span>
      </li>
      <li className="w-64 text-sm capitalize">
        <p title={item.expRemark.toUpperCase()} className="truncate">
          {item.expRemark || "-"}
        </p>
      </li>
      <li className="w-28 flex justify-start items-center gap-1 ">
        {item.expApprovalStatus.toLowerCase() === "pending" ? (
          <>
            {" "}
            <BsPatchQuestionFill className="text-yellow-500" />
            <span className="uppercase text-yellow-500">
              {item.expApprovalStatus}
            </span>
          </>
        ) : item.expApprovalStatus.toLowerCase() === "approved" ? (
          <>
            <BsPatchCheckFill className="text-green-500" />
            <span className="uppercase text-green-500">
              {item.expApprovalStatus}
            </span>
          </>
        ) : (
          <>
            <BsPatchExclamationFill className="text-red-500" />
            <span className="uppercase text-red-500">
              {item.expApprovalStatus}
            </span>
          </>
        )}
      </li>
      <li className="w-28 flex justify-center text-black">
        <div className="w-full flex justify-between border border-dashed border-blue-600 rounded divide-x divide-dashed divide-blue-600">
          <button
            onClick={(e) => {
              viewExpenses(idx);
            }}
            className="px-2 py-1 rounded-l hover:bg-blue-600 active:bg-blue-300 ease-in-out duration-300"
          >
            <BsFillEyeFill />
          </button>
          {/* <span className="h-3 w-[1px] mx-[1px] bg-blue-500"></span> */}
          <button
            disabled={
              moment(item.expDate).format("DD-MM-YYYY") > moreThreeDay
                ? false
                : true
            }
            className={`${
              moment(item.expDate).format("DD-MM-YYYY") < moreThreeDay
                ? "opacity-30"
                : "hover:bg-blue-600"
            } px-2 py-1 active:bg-blue-300 ease-in-out duration-300`}
          >
            <BsFillPencilFill />
          </button>
          {/* <span className="h-3 w-[1px] mx-[1px] bg-blue-500"></span> */}
          <button
            onClick={() => deleteItem(item._id)}
            className="px-2 py-1 rounded-r hover:bg-blue-600 active:bg-blue-300 ease-in-out duration-300"
          >
            <AiTwotoneDelete />
          </button>
        </div>
      </li>
    </>
  );
}

export default TranTable;
