import { useState } from "react";
import { BsCaretDownFill } from "react-icons/bs";

function Approval(props) {
const [inpDate, setInpDate] = useState('2022-10-06')
let dAte = (new Date(inpDate));
console.log(dAte);

  return (
    <>
      <div className="min-h-[calc(100vh-56px)] h-full w-screen bg-gray-300 dark:bg-gray-900">
        <div className="flex justify-center py-24">
          <div className="container p-2 border border-black dark:border-white rounded-3xl">
            <div className="p-3 dark:text-white">
              <h1 className="text-3xl">Detailed Approval Status</h1>
            </div>
            <div>
              <div>
                <div>
                  <input onChange={(e)=>{setInpDate((new Date(e.target.value)).getTime())}} type="date" name="" id="" />
                </div>
                <div>
                  <h1 className="text-white text-4xl">{dAte}</h1>
                </div>
              </div>
            </div>
            <div className="dataDiv border dark:text-white">
              <ul className="flex justify-between px-4 items-center bg-violet-600">
                <li>ID</li>
                <li className="cursor-pointer">
                  Bill Date <BsCaretDownFill />
                </li>
                <li>Vendor</li>
                <li>Item</li>
                <li>Amount</li>
                <li>Attachment</li>
                <li>Uploaded on</li>
                <li>Uploaded by</li>
                <li>Remark</li>
                <li>Action</li>
              </ul>

              {props.expTransaction.map((item, idx) => {
                return (
                  <ul
                    key={idx}
                    className="flex justify-between px-4 items-center py-1"
                  >
                    <li>{item.id}</li>
                    <li>{item.Date}</li>
                    <li>{item.Biller}</li>
                    <li>{item.Item}</li>
                    <li>{item.Amount}</li>
                    <li>{item.billFile}</li>
                    <li>{item.uploadedOn}</li>
                    <li>{item.uploadedBy}</li>
                    <li>{item.Remark}</li>
                    <li>
                      <button className="px-2 py-1 mx-1 rounded bg-blue-600 text-white ">
                        Edit
                      </button>
                      <button className="px-2 py-1 mx-1 rounded bg-blue-600 text-white ">
                        Delete
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
