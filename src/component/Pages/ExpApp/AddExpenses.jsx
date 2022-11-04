import {
  BsCaretDownFill,
  BsFillEyeFill,
  BsFillPencilFill,
} from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import moment from "moment/moment";
import { useEffect, useState } from "react";
const currencyFormat = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

function AddExpenses(props) {
  const [addBtn, setAddBtn] = useState(false);
  const [tran, setTran] = useState([]);
  const exData = {
    expDate: Math.floor(new Date().getTime() / 1000.0 + 19800),
    expItem: "",
    expVendor: "",
    expAmount: Number,
    expRemark: "",
    expUploaded: "",
    expApprovalStatus: "Pending",
  };
  const [expensesData, setExpensesData] = useState(exData);
  console.log();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpensesData({ ...expensesData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/addExpenses", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(expensesData),
    }).then((res) => {
    });
  };
  useEffect(() => {
    fetch("/addExpenses")
      .then((response) => response.json())
      .then((data) => setTran(data))
      .catch(error => console.log('error', error))
  }, []);

  return (
    <>
      <div className="min-h-[calc(100vh-56px)] -z-50 h-full w-screen bg-gray-300 dark:bg-gray-900">
        <div className="flex justify-center">
          <div className="container relative mt-10 p-2 border-black dark:border-white rounded-3xl">
            <div className="p-3 dark:text-white"></div>
            <div className="dataDiv rounded-b-3xl dark:text-white">
              <div
                onClick={() => setAddBtn(addBtn ? false : true)}
                className="absolute border rounded-xl hover:bg-orange-400 cursor-pointer -mt-14 border-black dark:border-white dark:text-white w-fit px-5 py-2 right-2 mb-3"
              >
                Add Expenses
              </div>
              <ul className="flex justify-between p-4 rounded items-center bg-violet-600">
                <li className="cursor-pointer w-[115px]">
                  Bill Date <BsCaretDownFill />
                </li>
                <li className="w-[200px]">Item</li>
                <li className="w-20">Amount</li>
                <li className="w-36">Attachment</li>
                <li className="w-36">Uploaded By</li>
                <li className="w-64">Remark</li>
                <li className="w-28">Action</li>
              </ul>
              {addBtn ? (
                <form onSubmit={handleSubmit}>
                  <ul className="flex px-4 justify-between items-center my-2 rounded dark:bg-opacity-100 bg-opacity-100 text-white dark:text-black dark:border-white border border-black bg-black dark:bg-white py-1">
                    <li className="flex-col text-sm w-[115px]">
                      <input
                        className="w-full outline-none border-black rounded bg-transparent "
                        type="date"
                        value={expensesData.expDate}
                        min="2022-11-02"
                        name="expDate"
                        id="date"
                        onChange={handleChange}
                      />
                      <span className="text-[10px]">
                        {new Date().getTime()}
                      </span>
                    </li>
                    <li className="w-[200px] gap-1 flex-col">
                      <input
                        className="w-full outline-none border border-white dark:border-black rounded bg-transparent px-2 "
                        type="text"
                        value={expensesData.expItem}
                        name="expItem"
                        id=""
                        onChange={handleChange}
                        placeholder="Item Description"
                      />
                      <span className="flex-row flex text-xs border border-white dark:border-black rounded pl-2 gap-1">
                        From:{""}
                        <input
                          className="w-full outline-none bg-transparent px-2 "
                          type="text"
                          name="expVendor"
                          id=""
                          onChange={handleChange}
                          placeholder="Vender Name"
                        />
                      </span>
                    </li>
                    <li className="w-28">
                      <input
                        className="w-full outline-none border border-black rounded bg-transparent px-2 "
                        type="number"
                        value={expensesData.expAmount}
                        name="expAmount"
                        id=""
                        onChange={handleChange}
                        placeholder="Amount"
                      />
                    </li>
                    <li className="w-36">
                      <input
                        className="w-full outline-none border border-black rounded bg-transparent px-2 file:flex file:h-6 file:text-green-500 file:rounded file:text-sm text-sm file:py- file:px-4"
                        type="file"
                        name="file"
                        id=""
                        onChange={handleChange}
                      />
                    </li>
                    <li className="w-36 flex-col">
                      <input
                        className="w-full outline-none border border-black rounded bg-transparent px-2 "
                        type="text"
                        name="expUploaded"
                        value={expensesData.expUploaded}
                        onChange={handleChange}
                        placeholder="Expenses By"
                      />
                      <span className="text-xs">
                        {moment(Date()).format("DD-MM-Y hh:mm:ss A")}
                      </span>
                    </li>
                    <li className="w-64">
                      <input
                        className="w-full outline-none border border-black rounded bg-gray-600 dark:bg-transparent px-2 "
                        type="text"
                        name="expRemark"
                        value={expensesData.expRemark}
                        onChange={handleChange}
                        placeholder="Remark"
                      />
                    </li>
                    <li className="w-28 active-btn rounded">
                      <button className="">Submit</button>
                    </li>
                  </ul>
                </form>
              ) : null}

              {tran.map((item, idx) => {
                return (
                  <ul
                    key={idx}
                    className="flex px-4 justify-between items-center my-2 rounded dark:bg-opacity-10 bg-opacity-50 text-rose-500 dark:border-white dark:border-opacity-20 dark:text-white border border-rose-500 bg-rose-200 dark:bg-white py-1"
                  >
                    <li className="flex-col  w-[115px]">
                      <span>{moment(item.expDate).format("DD-MM-Y")}</span>
                      <span className="text-[10px]">{item._id}</span>
                      <span className="hidden upto-lab-s:flex">
                        {item.expItem}
                      </span>
                    </li>
                    <li className="flex-col upto-lab-s:hidden w-[200px]">
                      <span className="upto-lab-s:hidden">{item.expItem}</span>
                      <span className="text-xs upto-lab-s:hidden">
                        from {item.expVendor}
                      </span>
                    </li>
                    <li className="w-28">{currencyFormat(item.expAmount)}</li>
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

export default AddExpenses;
