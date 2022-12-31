
import { FcShop } from "react-icons/fc";
function NewExpEntry({handleSubmit, moment, expensesData, handleChange}) {
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <ul className="flex px-1 justify-between items-center border-b border-dashed text-black border-black bg-white py-1 divide-x divide-dashed divide-black">
            <li className="flex-col w-[130px] p-0">
              <input
                className="w-full outline-none px-3 py-1 rounded bg-slate-400"
                type="date"
                value={moment(expensesData.expDate).format("YYYY-MM-DD")}
                min="2022-11-02"
                name="expDate"
                id="date"
                onChange={handleChange}
              />
            </li>
            <li className="w-[200px] gap-0 flex-col">
              <input
                className="w-full outline-none border-b placeholder-slate-700 bg-slate-400 rounded px-2 "
                type="text"
                value={expensesData.expItem}
                name="expItem"
                id=""
                onChange={handleChange}
                placeholder="Item Description"
              />
              <span className="flex-row flex text-xs pl-2 gap-1">
                <FcShop />
                {""}
                <input
                  className="w-full outline-none bg-slate-400 placeholder-slate-700 rounded px-2 "
                  type="text"
                  name="expVendor"
                  id=""
                  onChange={handleChange}
                  placeholder="Vender Name"
                />
              </span>
            </li>
            <li className="w-28 pl-1">
              <span>₹</span>
              <input
                className="w-full outline-none rounded placeholder-slate-700 bg-slate-400 px-1 "
                type="number"
                value={expensesData.expAmount}
                name="expAmount"
                id=""
                onChange={handleChange}
                placeholder="Amount"
              />
              <span>/-</span>
            </li>
            <li className="w-36">
              <input
                className="w-full rounded outline-none placeholder-slate-700 bg-slate-400 px-2 file:flex file:h-6 file:text-green-500 file: file:text-sm text-sm file:py- file:px-4"
                type="file"
                name="file"
                id=""
                onChange={handleChange}
              />
            </li>
            <li className="w-36 flex-col">
              <p
                className="w-full outline-none rounded placeholder-slate-700 bg-slate-400 px-2 "
                type="text"
                name="expUploaded"
                onChange={handleChange}
                placeholder="Expense By"
              >{expensesData.expUploaded}</p>
              <span className="text-xs text-orange-500">
                {moment(Date()).format("DD-MM-Y hh:mm:ss A")}
              </span>
            </li>
            <li className="w-64">
              <input
                className="w-full outline-none rounded placeholder-slate-700 bg-slate-400 px-2 "
                type="text"
                name="expRemark"
                value={expensesData.expRemark}
                onChange={handleChange}
                placeholder="Remark"
              />
            </li>
            <li className="w-28">
              <input
                className="w-full outline-none rounded placeholder-slate-700 bg-slate-400 px-2 "
                placeholder="Approval"
                type="text"
              />
            </li>
            <li className="w-28">
              <button className="button-48 ">
                <span className="text ">Submit</span>
              </button>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
}

export default NewExpEntry;
