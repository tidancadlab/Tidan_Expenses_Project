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
  setEditItem,
  setActiveEdit,
}) {
  return (
    <>
      <li  title={item._id} className="flex-col  w-[130px]">
        <span className="scrn-tab:text-xs">
          {moment(item.expDate).format("DD-MMM-YYYY")}
        </span>
        <span className="text-[10px] border-t border-black border-dashed">
          {item._id}
        </span>
      </li>
      <li
        title={item.expItem}
        className="flex-col upto-lab- w-[200px] capitalize"
      >
        <p className="upto-lab-s:hid truncate">{item.expItem}</p>
        <h1 className="flex items-center gap-1 text-xs upto-lab-s:hidden border-t border-black border-dashed ">
          <p className="truncate">{item.expVendor}</p>
        </h1>
      </li>
      <li className="w-28 text-end">{currencyFormat(item.expAmount)}</li>
      <li
        title={item.attachment ? item.attachment.name + "." : "Not Enclosed"}
        className="w-36 text-sm"
      >
        {!item.attachment ||
        item.attachment.data === undefined ||
        item.attachment.data === "" ? (
          "No Attachment"
        ) : (
          <a
            href={item.attachment.data}
            download={item.attachment.name}
            className="text-blue-500 underline cursor-pointer"
          >
            {item.attachment.name !== "" && item.attachment.name.length > 15
              ? item.attachment.name.slice(item.attachment.name.length - 15)
              : item.attachment.name}
            .
            {item.attachment.type === undefined
              ? ""
              : item.attachment.type.split("/")[1]}
          </a>
        )}
      </li>
      <li className="flex-col w-36 capitalize">
        <span>{item.expUploaded}</span>
        <span className="text-xs border-t border-black border-dashed">
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
      <li className="w-28 flex justify-center text-black dark:text-white">
        <div className="w-full flex justify-between rounded">
          <button
            onClick={(e) => {
              viewExpenses(idx);
            }}
            className="px-2 py-1 rounded-l hover:bg-blue-600 active:bg-blue-300 ease-in-out duration-100"
          >
            <BsFillEyeFill />
          </button>
          {/* <span className="h-3 w-[1px] mx-[1px] bg-blue-500"></span> */}
          <button
            // disabled={
            //   moment(item.expDate).format("DD-MM-YYYY") > moreThreeDay
            //     ? false
            //     : true
            // }
            onClick={() => {
              setEditItem(item._id);
              setActiveEdit(true);
            }}
            className={`${
              moment(item.expDate).format("DD-MM-YYYY") < moreThreeDay
                ? "opacity-30"
                : "hover:bg-blue-600"
            } px-2 py-1 active:bg-blue-300 ease-in-out duration-100`}
          >
            <BsFillPencilFill />
          </button>
          {/* <span className="h-3 w-[1px] mx-[1px] bg-blue-500"></span> */}
          <button
            onClick={() => deleteItem(item._id)}
            className="px-2 py-1 rounded-r hover:bg-blue-600 active:bg-blue-300 ease-in-out duration-100"
          >
            <AiTwotoneDelete />
          </button>
        </div>
      </li>
    </>
  );
}

export default TranTable;
