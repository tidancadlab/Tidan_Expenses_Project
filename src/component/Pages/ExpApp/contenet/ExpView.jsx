import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import noAttachment from "../../../../Images/noAttachment.png";

function ExpView(props) {
  const {
    selectedExpenses,
    setViewDetailedExp,
    nextExp,
    previExp,
    limitedTran,
    idxSelectedItem,
    setIdxSelectedItem,
    crPageNum,
    titleName
  } = props;
  console.log(selectedExpenses.expComments.length);
titleName.innerHTML = selectedExpenses.expItem || "View Expenses"
  return (
    <>
      <div
        tabIndex={1}
        className={`absolute max-w-screen w-[1200px] h-fit -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2 px-0.5 py-0.5 rounded-md flex justify-center items-center ${
          selectedExpenses.expApprovalStatus.toLowerCase() === "approved" ||
          undefined
            ? "border-green-500"
            : selectedExpenses.expApprovalStatus.toLowerCase() === "rejected" ||
              undefined
            ? "border-red-500"
            : "border-slate-700"
        } z-50 ease-in-out border bg-black duration-300`}
      >
        <div className="absolute -top-3 -right-3">
          <button
            onClick={() => setViewDetailedExp(false) || undefined}
            className=" rounded-full border w-8 h-8 bg-white"
          >
            X
          </button>
        </div>
        <div className="bg-white dark:bg-slate-900 dark:text-white w-full h-full px-3 rounded-md">
          <div className="border-b border-dashed border-black dark:border-white text-3xl uppercase py-4">
            <h1>Transaction Details of Page No. {crPageNum + 1}</h1>
          </div>

          <div className="flex flex-row w-full h-full">
            <div className="expViewTable w-[600px] flex divide-x divide-dashed divide-black dark:divide-white pl-5">
              <ul className="flex mr-1 flex-col font-light text-end min-w-fit divide-y divide-dashed dark:divide-solid divide-black dark:divide-white">
                <li className="textnormal min-h-[35px] py-1.5">
                  <p>Transaction ID</p>
                </li>
                <li>
                  <p>Bill Date</p>
                </li>
                <li>
                  <p>Item Description</p>
                </li>
                <li>
                  <p>Vender Name</p>
                </li>
                <li>
                  <p>Bill Amount</p>
                </li>
                <li>
                  <p>Expensed By</p>
                </li>
                <li>
                  <p>Uploaded On</p>
                </li>
                <li>
                  <p>Project Name</p>
                </li>
                <li className="h-32">
                  <p>Remark</p>
                </li>
                <li>
                  <p>Approval Status</p>
                </li>
                <li>
                  <p>Approved By</p>
                </li>
                <li>
                  <p>Approved On</p>
                </li>
                <li className="h-32">
                  <p>Comment</p>
                </li>
              </ul>
              <ul className="text-start max-w-[436px] w-full pl-1 font-thin divide-y divide-dashed dark:divide-solid divide-black dark:divide-white">
                <li className="textnormal">
                  <p className="min-h-[35px] py-1.5">
                    {selectedExpenses._id || "#########"}
                  </p>
                </li>
                <li>
                  <p>{selectedExpenses.expDate || "Not Available"}</p>
                </li>
                <li>
                  <p className="truncate">
                    {selectedExpenses.expItem || "Not Available"}
                  </p>
                </li>
                <li>
                  <p className="truncate">
                    {selectedExpenses.expVendor || "Not Available"}
                  </p>
                </li>
                <li>
                  <p>{selectedExpenses.expAmount || "Not Available"}</p>
                </li>
                <li>
                  <p>{selectedExpenses.expUploaded || "Not Available"}</p>
                </li>
                <li>
                  <p>{selectedExpenses.expUploadedOnTime || "Not Available"}</p>
                </li>
                <li>
                  <p>{selectedExpenses.expUnderProject || "Not Available"}</p>
                </li>
                <li className="h-32">
                  <p className="text-clip fiveLineText">
                    {selectedExpenses.expRemark || "-------"}
                  </p>
                </li>
                <li
                  className={`${
                    selectedExpenses.expApprovalStatus.toLowerCase() ===
                      "approved" || undefined
                      ? "text-green-500"
                      : selectedExpenses.expApprovalStatus.toLowerCase() ===
                          "rejected" || undefined
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  <p>{selectedExpenses.expApprovalStatus || "Not Available"}</p>
                </li>
                <li>
                  <p>{selectedExpenses.expApprovedBy || "Still Pending"}</p>
                </li>
                <li>
                  <p>{selectedExpenses.expApprovedOn || "Still Pending"}</p>
                </li>
                <li className="h-32">
                  <p>{selectedExpenses ? selectedExpenses.expComments :  "----"}</p>
                </li>
              </ul>
            </div>
            <div className="my-2 flex justify-center items-center rounded-md border border-dashed border-blue-600">
              {!selectedExpenses || undefined ? (
                <div>
                  <img src={noAttachment} alt="" />
                </div>
              ) : (
                <div className="flex flex-col text-xl text-[#083863] dark:text-white underline underline-offset-4 gap-5 uppercase">
                  <img src={noAttachment} alt="" />
                  <span>No Attachment Found</span>
                </div>
              )}
            </div>
            <button
              onClick={nextExp || null}
              className="absolute top-1/2 right-1.5 text-white"
            >
              <BsArrowRightCircle className=" w-6 h-6" />
            </button>
            <button
              onClick={previExp || null}
              className="absolute top-1/2 left-1.5 text-white"
            >
              <BsArrowLeftCircle className=" w-6 h-6" />
            </button>
            <div className="absolute flex gap-2 bottom-1.5 left-1/2 bg-gray-600 py-1 rounded-full bg-opacity-50 px-3 -translate-x-1/2">
              {limitedTran.map((item, idx) => {
                return (
                  <div
                    onClick={() => {
                      setIdxSelectedItem(idx);
                    }}
                    key={idx}
                  >
                    <div
                      className={` ${
                        idxSelectedItem === idx
                          ? "bg-black border-black"
                          : "bg-white"
                      } hover:bg-black cursor-pointer border ease-in-out duration-500 rounded-full w-3 h-3`}
                    ></div>
                  </div>
                );
              })}
            </div>
            <div className="absolute top-10">
              {idxSelectedItem + 1} / {limitedTran.length}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExpView;
