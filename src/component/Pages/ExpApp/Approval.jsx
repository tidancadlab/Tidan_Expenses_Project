import {
  BsCaretDownFill,
  BsFillEyeFill,
  BsFillPencilFill,
} from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import moment from "moment/moment";
import { useEffect, useState } from "react";

function Approval(props) {
  const [tran, setTran] = useState([]);

  useEffect(() => {
    fetch("/addExpenses")
      .then((response) => response.json())
      .then((data) => setTran(data));
  }, [tran]);

  return (
    <>
      <div className="min-h-[calc(100vh-56px)] h-full w-screen bg-gray-300 dark:bg-gray-900">
        <div className="flex justify-center">
          <div className="container p-2 border-black dark:border-white rounded-3xl">
            <div className="p-3 dark:text-white"></div>
            <div className="dataDiv rounded-b-3xl dark:text-white">
              <ul className="flex justify-between p-4 rounded items-center bg-violet-600">
                <li className="cursor-pointer w-[200px]">
                  Bill Date <BsCaretDownFill />
                </li>
                <li className="w-[300px]">Item</li>
                <li className="w-20">Amount</li>
                <li className="w-36">Attachment</li>
                <li className="w-36">Uploaded By</li>
                <li className="w-64">Remark</li>
                <li className="w-28">Action</li>
              </ul>
              {tran.map((item, idx) => {
                return (
                  <ul
                    key={idx}
                    className="flex px-4 justify-between items-center my-2 rounded dark:bg-opacity-10 bg-opacity-50 text-rose-500 dark:border-white dark:border-opacity-20 dark:text-white border border-rose-500 bg-rose-200 dark:bg-white py-1"
                  >
                    <li className="flex-col  w-[200px]">
                      <span>{moment(item.expDate).format("DD-MM-Y")}</span>
                      <span className="text-[10px]">{item._id}</span>
                    </li>
                    <li className="flex-col upto-lab-s:hidden w-[300px]">
                      <span className="upto-lab-s:hidden">{item.expItem}</span>
                      <span className="text-xs upto-lab-s:hidden">
                        from {item.expVendor}
                      </span>
                    </li>
                    <li className="w-20">{item.expAmount}</li>
                    <li className="w-36 text-sm">
                      {item.billFile ? (
                        <span className="text-blue-500 underline cursor-pointer">
                          {item.billFile}
                        </span>
                      ) : (
                        "Not Available"
                      )}
                    </li>
                    <li className="flex-col w-36">
                      <span>{item.expUploaded}</span>
                      <span className="text-xs">
                        {moment(item.expDate).format("DD-MM-Y hh:mm:ss A")}
                      </span>
                    </li>
                    <li className="w-64">{item.expRemark}</li>
                    <li className="rounded-md flex items-center border border-blue-600 pl-0">
                      <button className="px-2 py-1 rounded-l hover:bg-blue-600 text-blue-900 dark:text-white active:bg-blue-300 ease-in-out duration-300">
                        <BsFillEyeFill />
                      </button>
                      <span className="h-3 w-[1px] mx-[1px] bg-blue-500"></span>
                      <button className="px-2 py-1 hover:bg-blue-600 text-blue-900 dark:text-white active:bg-blue-300 ease-in-out duration-300">
                        <BsFillPencilFill />
                      </button>
                      <span className="h-3 w-[1px] mx-[1px] bg-blue-500"></span>
                      <button className="px-2 py-1 rounded-r hover:bg-blue-600 text-blue-900 dark:text-white active:bg-blue-300 ease-in-out duration-300">
                        <AiTwotoneDelete />
                      </button>
                    </li>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Approval;
