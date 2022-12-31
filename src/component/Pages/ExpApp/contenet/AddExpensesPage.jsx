import { useEffect } from "react";
import { useState } from "react";
import {
  BsFillCalendarEventFill,
  BsFillCartFill,
  BsFillChatLeftQuoteFill,
  BsFillEaselFill,
  BsFillFileEarmarkBinaryFill,
  BsFillFileEarmarkPdfFill,
  BsFillPieChartFill,
  BsShop,
} from "react-icons/bs";
import { HiCurrencyRupee } from "react-icons/hi";
import { useParams } from "react-router-dom";

function AddNewExpenses() {
  const [file, setFile] = useState("");
  const [user, setUser] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch("/userDataProperty", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ userId: params.id }),
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const expData = {};
  const [newExpData, setNewExpData] = useState(expData);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setNewExpData({ ...newExpData, [id]: value });
  };
  return (
    <>
      <div className="bg-img p-10 rounded-2xl">
        <div className="">
          <div className="flex flex-row m-auto">
            {user && (
              <div className="bg-[#fc8874] w-72 py-6 rounded-l-xl">
                <h1 className="text-2xl">
                  Mr. {user.userName} (L-{})
                </h1>
                <h2></h2>
              </div>
            )}
            <div className="p-8 bg-orange-400 dark:bg-[#212121] dark:text-white rounded-r-xl">
              <form
                onChange={handleSubmit}
                className="flex gap-5 flex-wrap w-[640px] addExpForm border border-dashed p-5"
              >
                <div className="flex gap-5 w-full">
                  <div className="flex flex-col text-left gap-1">
                    <label
                      htmlFor="date"
                      className="flex gap-2 items-center ml-2"
                    >
                      <BsFillCalendarEventFill className="text-sm" /> Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="rounded p-1 min-w-[147px] text-black uppercase outline-none"
                    />
                  </div>
                  <div className="flex flex-col text-left gap-1 w-full">
                    <label
                      htmlFor="item"
                      className="flex gap-2 items-center ml-2"
                    >
                      <BsFillCartFill /> Item Description
                    </label>
                    <input
                      type="text"
                      id="item"
                      placeholder="Example Item"
                      className="rounded px-2 py-1 text-black outline-red-500"
                    />
                  </div>
                </div>
                <div className="flex gap-5 w-full">
                  <div className="flex flex-col text-left gap-1 w-full">
                    <label
                      htmlFor="vender"
                      className="flex gap-2 items-center ml-2"
                    >
                      <BsShop /> Vender
                    </label>
                    <input
                      type="text"
                      id="vender"
                      placeholder="Purchased from"
                      className="rounded px-2 py-1 text-black outline-none"
                    />
                  </div>
                  <div className="flex flex-col text-left gap-1 max-w-[150px]">
                    <label
                      htmlFor="amount"
                      className="flex gap-2 items-center ml-2"
                    >
                      <HiCurrencyRupee /> Amount
                    </label>
                    <input
                      type="number"
                      id="amount"
                      placeholder="5210.01"
                      className="rounded px-2 py-1 text-black outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-5 w-full">
                  <div className="flex flex-col text-left gap-1 max-w-[200px]">
                    <label
                      htmlFor="invoiceNum"
                      className="flex gap-2 items-center ml-2"
                    >
                      <BsFillFileEarmarkBinaryFill /> Invoice Number
                    </label>
                    <input
                      type="text"
                      id="invoiceNum"
                      className="rounded px-2 py-1 text-black outline-none"
                    />
                  </div>
                  <div className="flex flex-col text-left gap-1 min-w-fit box-border">
                    <label
                      htmlFor="head"
                      className="flex gap-2 items-center ml-2 pr-5"
                    >
                      <BsFillPieChartFill /> Payment Head
                    </label>
                    <select
                      id="paymentHead"
                      className="rounded px-2 py-1 text-black outline-none h-8"
                    >
                      <option value="null" hidden selected>
                        Select
                      </option>
                      <option value="grocery">grocery</option>
                      <option value="site purchase">site</option>
                      <option value="office">office</option>
                    </select>
                  </div>
                  <div className="flex flex-col text-left gap-1 max-w-[200px]">
                    <label
                      htmlFor="project"
                      className="flex gap-2 items-center ml-2"
                    >
                      <BsFillEaselFill /> Project Name
                    </label>
                    <input
                      className="rounded max-w-fit px-2 py-1 text-black outline-none h-8"
                      type="text"
                      name="project"
                      id="projectName"
                    />
                  </div>
                </div>
                <div className="flex gap-5 w-full">
                  <div className="flex flex-col text-left gap-1">
                    <label htmlFor="paymentType" className="">
                      Payment Type
                    </label>
                    <select
                      id="paymentType"
                      className="rounded px-2 py-1 text-black outline-none h-8"
                    >
                      <option value="null" hidden selected>
                        Select
                      </option>
                      <option value="Local Purchase">Local Purchase</option>
                      <option value="Vender Payment">Vender Payment</option>
                      <option value="Contractor Payment">
                        Contractor Payment
                      </option>
                    </select>
                  </div>
                  <div className="flex flex-col text-left gap-1">
                    <label htmlFor="reportingOfficer" className="">
                      Reporting Officer
                    </label>
                    <select
                      id="reportingOfficer"
                      className="rounded px-2 py-1 text-black outline-none h-8"
                    >
                      <option value="null" hidden selected>
                        Select
                      </option>
                      <option value="Praveen Kuamr">Praveen Kumar</option>
                      <option value="AR Dash">AR Dash</option>
                      <option value="Pradeep Ojha">Pradeep Ojha</option>
                    </select>
                  </div>
                  <div className="flex flex-col text-left gap-1 max-w-[235px]">
                    {file === "" ? (
                      <>
                        <label
                          htmlFor="file"
                          className="flex gap-2 items-center px-5 bg-white text-black h-full rounded-lg"
                        >
                          <BsFillFileEarmarkPdfFill /> Upload Bill
                        </label>
                        <input
                          type="file"
                          id="file"
                          placeholder="Select"
                          className="hidden"
                          accept="image/png, image/jpeg, .pdf"
                          onChange={(e) => setFile(e.target.value)}
                        />{" "}
                      </>
                    ) : (
                      <div
                        title={file.slice(12)}
                        className="flex flex-col gap-1 h-full"
                      >
                        <span className="flex gap-2 items-center ml-2 pr-5">
                          <BsFillFileEarmarkPdfFill /> Enclosed Bill
                        </span>
                        <span className="bg-white text-sm text-black h-8 flex items-center px-2 rounded gap-1">
                          {file.slice(
                            file.length > 28 ? file.length - 22 : 12,
                            file.length
                          )}{" "}
                          <span
                            onClick={() => setFile("")}
                            className="px-1.5 flex justify-center items-center border-black rounded-full border"
                          >
                            X
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col text-left gap-1 w-full">
                  <label
                    htmlFor="remark"
                    className="flex gap-2 items-center ml-2 pr-5"
                  >
                    <BsFillChatLeftQuoteFill className="mt-1" /> Remark
                  </label>
                  <textarea
                    type="text"
                    id="remark"
                    className="rounded p-2 min-h-[100px] text-black outline-none"
                  />
                </div>
                <button
                type="submit"
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log(newExpData);
                  }}
                  className="border w-full py-2 bg-white rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewExpenses;
