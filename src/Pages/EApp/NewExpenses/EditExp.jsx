import { useEffect } from "react";
import { useState } from "react";
import { BsCloudUploadFill } from "react-icons/bs";

function EditExp({ v, allUser, setActiveEdit }) {
  const [data, setData] = useState(v);
  const [file, setFile] = useState(v.attachment);

  useEffect(() => {
    setData(v);
  }, [v]);

  const [check, setCheck] = useState({
    expDate: true,
    expItem: "",
    expVendor: "",
    expAmount: "",
    expApprovalStatus: "",
    invoiceNum: "",
    enclosed: "",
    reportingOfficer: "",
    paymentType: "",
    file: "",
  });

  async function ABC(e) {
    const { id, value } = e.target;
    if (id !== undefined && value !== undefined) {
      setCheck({ ...check, [id]: value.length === 0 ? "red" : "green" });
    }
    setData({ ...data, [id]: value });
  }
  async function fileChange(e) {
    // setFile({data:e.target.files[0]});
  }

  let av = data.expAmount
  return (
    <>
      <div
        className={`border box-border m-auto max-w-2xl bg-[#242323] rounded-xl scrn-mob:max-w-[400px] ${
          data.expApprovalStatus.toLowerCase() === "rejected"
            ? "text-red-500 -red-800 border-red-800"
            : data.expApprovalStatus.toLowerCase() === "approved"
            ? "text-green-500 -green-800 border-green-800"
            : "text-yellow-500 -yellow-800 border-yellow-800"
        } `}
      >
        <div
          className={`flex justify-between w-full rounded-t-lg items-center px-2 ${
            data.expApprovalStatus.toLowerCase()  === "rejected"
              ? "text-red-200 bg-red-800 border-red-800"
              : data.expApprovalStatus.toLowerCase() === "approved"
              ? "text-green-200 bg-green-800 border-green-800"
              : "text-yellow-200 bg-yellow-500 border-yellow-500"
          }`}
        >
          <h1 className={`text-2xl py-2 w-full scrn-mob:text-base`}>Edit Expenses ({v._id})</h1>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap gap-5 scrn-mob:gap-2 text-white">
            <div>
              <label
                className="focus-within:text-green-400 flex gap-0 flex-col items-start"
                htmlFor="expDate"
              >
                <span className="ml-2 -mb-2 bg-[#242323] z-30 px-2">Date</span>
                <input
                  onChange={ABC}
                  className="outline-none p-2 rounded-md bg-transparent border focus:border-green-400 text-white text-xl scrn-mob:text-sm"
                  value={data.expDate.slice(0, 10)}
                  type="date"
                  name=""
                  id="expDate"
                />
              </label>
            </div>
            <div>
              <label
                className="focus-within:text-green-400 flex gap-0 flex-col items-start"
                htmlFor="expItem"
              >
                <span
                  className={`ml-2 -mb-2 bg-[#242323] z-30 ${
                    "text-" + check.expItem + "-500"
                  } px-2`}
                >
                  Item
                </span>
                <input
                  onChange={ABC}
                  onFocus={ABC}
                  className={`outline-none p-2 rounded-md bg-transparent border focus:border-green-400 ${
                    "border-" + check.expItem + "-500"
                  } text-white text-xl scrn-mob:text-sm`}
                  value={data.expItem}
                  type="text"
                  name=""
                  id="expItem"
                />
              </label>
            </div>
            <div>
              <label
                className="focus-within:text-green-400 flex gap-0 flex-col items-start"
                htmlFor="expVendor"
              >
                <span
                  className={`ml-2 -mb-2 bg-[#242323] z-30 ${
                    "text-" + check.expItem + "-500"
                  } px-2`}
                >
                  Vendor / Shop
                </span>
                <input
                  onChange={ABC}
                  onFocus={ABC}
                  className={`outline-none p-2 rounded-md bg-transparent border focus:border-green-400 ${
                    "border-" + check.expVendor + "-500"
                  } text-white text-xl scrn-mob:text-sm`}
                  value={data.expVendor}
                  type="text"
                  name=""
                  id="expVendor"
                />
              </label>
            </div>
            <div>
              <label
                className="focus-within:text-green-400 flex gap-0 flex-col items-start"
                htmlFor="expAmount"
              >
                <span
                  className={`ml-2 -mb-2 bg-[#242323] z-30 ${
                    "text-" + check.expAmount + "-500"
                  } px-2`}
                >
                  Amount
                </span>
                <input
                  onChange={ABC}
                  onFocus={ABC}
                  className={`outline-none p-2 rounded-md bg-transparent border focus:border-green-400 ${
                    "border-" + check.expAmount + "-500"
                  } text-white text-xl scrn-mob:text-sm`}
                  value={av}

                  type="number"
                  name=""
                  id="expAmount"
                />
              </label>
            </div>
            <div className="flex flex-wrap scrn-mob:gap-2 gap-5">
              <div>
                <label
                  className="focus-within:text-green-400 flex gap-0 flex-col items-start"
                  htmlFor="invoiceNum"
                >
                  <span
                    className={`ml-2 -mb-2 bg-[#242323] z-30 ${
                      "text-" + check.invoiceNum + "-500"
                    } px-2`}
                  >
                    Invoice No.
                  </span>
                  <input
                    onChange={ABC}
                    onFocus={ABC}
                    className={`outline-none p-2 rounded-md bg-transparent border focus:border-green-400 ${
                      "border-" + check.invoiceNum + "-500"
                    } text-white text-xl scrn-mob:text-sm`}
                    value={data.invoiceNum}
                    type="text"
                    name=""
                    id="invoiceNum"
                  />
                </label>
              </div>
              <div className="flex items-end">
                <label
                  className="focus-within:text-green-400 flex gap-0 flex-col "
                  htmlFor="file"
                >
                  <input
                    onChange={fileChange}
                    onClick={fileChange}
                    className={`hidden`}
                    type="file"
                    name=""
                    id="file"
                  />
                  <span
                    className={`outline-none rounded-md bg-transparent border focus:border-green-400 ${
                      "border-" + check.file + "-500"
                    } text-white text-xl scrn-mob:text-sm flex justify-center items-center gap-2 min-h-[46.18px] scrn-mob:min-h-fit`}
                  >
                    <span className="bg-white text-black h-full p-3 cursor-pointer rounded-l">
                      <BsCloudUploadFill />
                    </span>
                    <span className="px-2">
                      {file.name ? file.name.slice(0,10) : "Not enclosed"}
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div className="flex items-end">
              <label
                className="focus-within:text-green-400 flex gap-0 flex-col items-start"
                htmlFor="expApprovalStatus"
              >
                <h1
                  onChange={ABC}
                  onFocus={ABC}
                  className={`outline-none p-2 rounded-md bg-transparent border focus:border-green-400 uppercase ${
                    data.expApprovalStatus === "rejected"
                      ? "text-red-500 bg-red-800 border-red-800"
                      : data.expApprovalStatus.toLowerCase() === "approved"
                      ? "text-green-500 bg-green-800 border-green-800"
                      : "text-yellow-500 bg-yellow-800 border-yellow-800"
                  } text-xl scrn-mob:text-sm`}
                  type="text"
                  name=""
                  id="expApprovalStatus"
                >
                  {data.expApprovalStatus}
                </h1>
              </label>
            </div>
            <div>
              <label
                className="focus-within:text-green-400 flex gap-0 flex-col items-start"
                htmlFor="reportingOfficer"
              >
                <span
                  className={`ml-2 -mb-2 bg-[#242323] z-30 ${
                    "text-" + check.reportingOfficer + "-500"
                  } px-2`}
                >
                  Approving Head
                </span>
                <select
                  onChange={ABC}
                  onFocus={ABC}
                  className={`outline-none p-2 rounded-md bg-transparent border focus:border-green-400 ${
                    "border-" + check.reportingOfficer + "-500"
                  } text-white text-xl scrn-mob:text-sm`}
                  value={data.reportingOfficer}
                  type="text"
                  name=""
                  id="reportingOfficer"
                >
                  {allUser.map((v) => (
                    <option
                      className="text-black"
                      value={v._id}
                      selected={v.reportingOfficer === v._id && true}
                    >
                      {v.userName}
                    </option>
                  ))}
                  <option className="text-black" value="" selected>
                    None
                  </option>
                </select>
              </label>
            </div>
            <div>
              <label
                className="focus-within:text-green-400 scrn-mob:text-xs flex gap-0 flex-col items-start"
                htmlFor="paymentType"
              >
                <span
                  className={`ml-2 -mb-2 scrn-mob:ml-1 scrn-mob:px-1 bg-[#242323] z-30 ${
                    "text-" + check.paymentType + "-500"
                  } px-2`}
                >
                  Payment Type
                </span>
                <select
                  onChange={ABC}
                  onFocus={ABC}
                  className={`outline-none p-2 rounded-md bg-transparent border focus:border-green-400 ${
                    "border-" + check.paymentType + "-500"
                  } text-white text-xl scrn-mob:text-sm`}
                  value={data.paymentType}
                  type="text"
                  name=""
                  id="paymentType"
                >
                  <option className="text-black" value={v.paymentType}>
                    {v.paymentType}
                  </option>
                  {/* {allUser.map((v) => (
                    
                  ))} */}
                  <option className="text-black" value="" selected>
                    None
                  </option>
                </select>
              </label>
            </div>
            <div className="w-full">
              <div className="flex gap-2">
                <div>
                  <button className="px-4 py-1 border rounded-xl w-fit text-black bg-white hover:bg-transparent hover:text-white ease-in-out duration-150">
                    Submit
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setActiveEdit(false);
                    }}
                    className="px-4 py-1 border rounded-xl w-fit text-black bg-white hover:bg-transparent hover:text-white ease-in-out duration-150"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditExp;
