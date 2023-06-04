import { useState } from "react";
import {
  BsCashStack,
  BsFillCheckCircleFill,
  BsFillDashCircleFill,
  BsFillExclamationCircleFill,
  BsFillPatchExclamationFill,
  BsFillPatchQuestionFill,
  BsInfoCircle,
  BsX,
  BsFuelPumpFill,
  BsXCircle,
  BsShop,
  BsFuelPump,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ApprovalGraph from "../../../component/Pages/ExpApp/contenet/Graph/ApprovalGraph";
import DayExpGraph from "../../../component/Pages/ExpApp/contenet/Graph/DayExpGraph";
import PiGraph from "../../../component/Pages/ExpApp/contenet/Graph/PiGraph";
import { refresh as ref } from "../../../Store/refreshData";
const today = Date.now() + new Date().getTimezoneOffset() * -60 * 1000;

function Dbd() {
  document.title = "Dashboard - TranTracer"
  const dispatch = useDispatch();
  const abc = useSelector((state) => state);
  const tran = abc.tran.data === undefined ? [] : abc.tran.data;
  const [dateFrom, setDateFrom] = useState(
    new Date(today - 3 * 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  );
  const [dateTo, setDateTo] = useState(new Date().toISOString().slice(0, 10));
  // console.log(Date.now() + new Date().getTimezoneOffset() * -60 * 1000);
  let ra = 500000;
  let te = 0;
  let at = 0;
  let rt = 0;
  const newTran =
    dateFrom !== "" && dateTo !== ""
      ? tran.filter((i) => {
          return (
            i.expDate.slice(0, 10) >= dateFrom &&
            i.expDate.slice(0, 10) <=
              (dateTo === "" ? new Date().toISOString().slice(0, 10) : dateTo)
          );
        })
      : tran;

  for (const i of tran) {
    te += i.expAmount;
  }
  const refState = () => {
    dispatch(ref(abc.refresh ? false : true));
  };
  newTran.filter((i) => {
    switch (i.expApprovalStatus.toLowerCase()) {
      case "approved":
        at += i.expAmount;
        break;
      case "rejected":
        rt += i.expAmount;
        break;
    }
  });

  const aw = (at * 100) / te;
  const rw = (rt * 100) / te;
  const pw = ((te - at - rt) * 100) / te;
  const al = [];
  const rl = [];
  const pl = [];

  for (const element of newTran) {
    element.expApprovalStatus.toLowerCase() === "approved" &&
      al.push(element.expAmount);
    element.expApprovalStatus.toLowerCase() === "rejected" &&
      rl.push(element.expAmount);
    element.expApprovalStatus.toLowerCase() === "pending" &&
      pl.push(element.expAmount);
  }

  return (
    <>
      <div className="relative h-screen w-screen flex justify-center items-center bg-img6">
        <div className="max-w-[1142px] scrn-tab:max-w-4xl scrn-tab:w-full w-full flex flex-col gap-2 p-6 shadow-md rounded-3xl bg-yellow-300">
          <div className="flex justify-between items-center">
            <h1 className=" font-Itim text-6xl scrn-mob:text-xl">Dashboard</h1>
            <div className="flex gap-2 items-center">
              <h1 className=" font-Itim text-xl">Transaction Period:</h1>
              <div className="flex gap-2 bg-green-200 hover:bg-green-300 text-[#024327] items-center rounded-lg">
                <div className="relative">
                  <input
                    type="date"
                    size={30}
                    value={dateFrom}
                    max={dateTo || new Date().toISOString().slice(0, 10)}
                    onChange={(e) => {
                      setDateFrom(e.target.value);
                    }}
                    className="px-2 h-10 w-32 font-Itim bg-transparent outline-none rounded-lg"
                  />
                </div>
                -
                <div className="relative">
                  <input
                    type="date"
                    value={dateTo}
                    min={dateFrom}
                    max={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => {
                      setDateTo(e.target.value);
                    }}
                    className="px-2 h-10 w-32 font-Itim bg-transparent rounded-lg outline-none"
                  />
                </div>
              </div>
              <button
                disabled={dateFrom === "" && dateTo === ""}
                onClick={() => {
                  setDateFrom("");
                  setDateTo("");
                }}
                className={` ${
                  dateFrom === "" && dateTo === ""
                    ? "opacity-20"
                    : "hover:bg-green-400"
                } px-2 h-10 w-32 font-Itim rounded-lg bg-green-300 text-[#024327]`}
              >
                Clear
              </button>
              <button
                onClick={refState}
                className="px-2 h-10 w-32 font-Itim rounded-lg bg-[#47CD54] hover:bg-orange-300 text-[#024327]"
              >
                Refresh
              </button>
            </div>
          </div>
          <div className="flex gap-2 text-white">
            <div className="relative w-[268px] h-[154px] flex gap-1 rounded-lg bg-card1 ease-in-out duration-1000">
              <div className="absolute right-1.5 top-1.5 text-black z-10 cursor-pointer flip-card-ch">
                <BsInfoCircle />
              </div>
              <div className="min-w-full py-6 px-4 flex flex-col gap-2 ">
                <div className="flex justify-between items-center gap-3 py-1 px-4 rounded-lg bg-green-200 text-white bg-opacity-10 backdrop-blur-md">
                  <h2 className="flex items-center gap-2 font-Trispace font-light text-sm">
                    <BsCashStack /> Balance
                  </h2>
                  <h1 className="font-Trispace">{(ra - te + rt).toFixed(2)}</h1>
                </div>
                <div className="flex justify-between items-center gap-3 py-1 px-4 rounded-lg bg-yellow-200 text-white bg-opacity-10 backdrop-blur-md">
                  <h2 className="flex items-center gap-2 font-Trispace font-light text-sm">
                    <BsFuelPump /> Received
                  </h2>
                  <h1 className="font-Trispace">{ra.toFixed(2)}</h1>
                </div>
                <div className="flex justify-between items-center gap-3 py-1 px-4 rounded-lg bg-red-200 text-white bg-opacity-10 backdrop-blur-md">
                  <h1 className="flex items-center gap-2 font-Trispace font-light text-sm">
                    <BsShop /> Expensed
                  </h1>
                  <h1 className="font-Trispace">{(te - rt).toFixed(2)}</h1>
                </div>
              </div>
              {/* <div className="hover:visible invisible flex items-center justify-center rounded-lg p-3">
                <h1 className=" font-Trispace font-thin text-sm">
                  This is information about how much fund you have available and
                  how much you got and spend.
                </h1>
              </div> */}
            </div>
            <div className="relative bg-card1 w-[268px] h-[154px] flex justify-center items-center gap-2 rounded-lg text-white ease-in-out duration-100">
              <BsFillPatchExclamationFill />{" "}
              <h1 className="font">Data not Available</h1>
            </div>
            <div className="relative w-[268px] h-[154px] flex gap-1 rounded-lg bg-card1 ease-in-out duration-1000">
              {newTran.length !== 0 ? (
                <>
                  <div className="min-w-full py-6 px-4 flex flex-col gap-2">
                    <div className="bg-white rounded-lg">
                      <div
                        style={{ width: aw * 2.30 }}
                        className="flex justify-between items-center gap-3 py-1 rounded-lg bg-green-400 text-green-800 ease-in-out duration-1000"
                      >
                        <h2 className="flex items-center gap-2 font-Trispace font-light text-sm">
                          Approved
                        </h2>
                        <h1 className="font-Trispace">{at}</h1>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg">
                      <div
                        style={{ width: rw * 2.30 }}
                        className="flex justify-between items-center gap-3 py-1 px-4 rounded-lg bg-red-200 text-red-800 ease-in-out duration-1000"
                      >
                        <h1 className="flex items-center gap-2 font-Trispace font-light text-sm">
                          Rejected
                        </h1>
                        <h1 className="font-Trispace">{rt}</h1>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg">
                      <div
                        style={{ width: pw * 2.30 }}
                        className="flex justify-between items-center gap-3 py-1 rounded-lg bg-yellow-200 text-yellow-800 ease-in-out duration-1000"
                      >
                        <h1 className="flex items-center gap-2 font-Trispace font-light text-sm">
                          Pending
                        </h1>
                        <h1 className="font-Trispace">{te - at - rt}</h1>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <h1 className="bg-card1 w-full flex items-center justify-center rounded-lg font-Itim gap-2 text-white">
                  <BsFillPatchExclamationFill /> Data not Available
                </h1>
              )}
            </div>
            <div className="relative w-[268px] h-[154px] flex gap-1 rounded-lg text-black overflow-scroll overflow-x-hidden hiddenScrl ">
              {newTran.length !== 0 ? (
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-900 border-b text-white text-center">
                      <td className=" font-Itim">Date</td>
                      <td className=" text-left pl-2 font-Itim">Item</td>
                      <td className=" text-right pr-2 font-Itim">Amount</td>
                    </tr>
                  </thead>
                  <tbody>
                    {newTran.map((v) => (
                      <tr
                        key={v._id}
                        className={` ${v.expApprovalStatus.toLowerCase() === "approved" ? "text-green-500" : v.expApprovalStatus.toLowerCase() ===
                        "rejected" ? " text-red-500" : "text-yellow-500"} bg-[#0B1B34] border-b border-dashed pt-10 border-black hover:bg-gray-600 ease-in-out duration-75 cursor-pointer`}
                      >
                        <td className=" font-Itim">
                          {v.expDate.slice(0, 10).split("-")[2]}-
                          {v.expDate.slice(0, 10).split("-")[1]}-
                          {v.expDate.slice(0, 10).split("-")[0].slice(2, 4)}
                        </td>
                        <td>
                          <p className="truncate max-w-[110px] text-left pl-2 font-Itim">
                            {v.expItem}
                          </p>
                        </td>
                        <td className="text-right pr-2 font-Itim">
                          {v.expAmount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <h1 className="bg-card1 w-full flex items-center justify-center font-Itim gap-2 text-white">
                  <BsFillPatchExclamationFill /> Data not Available
                </h1>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex justify-between flex-col">
              <div className="relative w-[268px] h-[240px] flex flex-col items-center gap-1 rounded-lg  pt-4 border border-dashed border-gray-600 text-black bg-gray-900 ">
                {newTran.length !== 0 ? (
                  <>
                    <div className="w-full p-4 pb-2">
                      <div className="h-1 w-full rounded-full flex text-xs">
                        <div
                          style={{ width: aw * 2.36 }}
                          title={aw + "%"}
                          className={`relative h-full ${
                            rw === 0 && pw === 0
                              ? "rounded-full"
                              : "rounded-l-full"
                          }  ease-in-out duration-300 hover:border-green-700 border border-transparent bg-[#4EFCB1]`}
                        >
                          <h1 className="absolute -top-5 w-full text-[#4EFCB1]">
                            {aw !== 0 && aw.toFixed(2) + "%"}
                          </h1>
                        </div>
                        <div
                          style={{ width: rw * 2.36 }}
                          title={rw + "%"}
                          className={`relative h-full ease-in-out duration-1000 bg-[#FC8874]`}
                        >
                          <h1 className="absolute -top-5 w-full text-[#FC8874]">
                            {rw !== 0 && rw.toFixed(2) + "%"}
                          </h1>
                        </div>
                        <div
                          style={{ width: pw * 2.36 }}
                          title={pw + "%"}
                          className={`relative h-full ease-in-out duration-1000 ${
                            rw === 0 && aw === 0
                              ? "rounded-full"
                              : "rounded-r-full"
                          }  bg-[#FCE742]`}
                        >
                          <h1 className="absolute -top-5 w-full text-[#FCE742]">
                            {pw !== 0 && pw.toFixed(2) + "%"}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full text-sm divide-x divide-dashed divide-gray-600">
                      <div className="w-full">
                        <h1 className="border-y border-dashed border-gray-600 text-gray-400">
                          APPROVED
                        </h1>
                        <ul className=" overflow-scroll hiddenScrl text-right pr-2 max-h-36 text-[#4EFCB1]">
                          {al.map((v, i) => (
                            <li key={i}>₹ {v.toFixed(2)}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="w-full">
                        <h1 className="border-y border-dashed border-gray-600 text-gray-400">
                          REJECTED
                        </h1>
                        <ul className=" overflow-scroll hiddenScrl text-right pr-2 max-h-36 text-[#FC8874]">
                          {rl.map((v, i) => (
                            <li key={i}>₹ {v.toFixed(2)}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="w-full">
                        <h1 className="border-y border-dashed border-gray-600 text-gray-400">
                          PENDING
                        </h1>
                        <ul className=" overflow-scroll hiddenScrl text-right pr-2 max-h-36 text-[#FCE742]">
                          {pl.map((v, i) => (
                            <li key={i}>₹ {v.toFixed(2)}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="absolute bottom-0 h-5 w-full flex border-t border-dashed border-gray-600 text-white rounded-b-lg">
                      <div className="flex justify-around w-full text-sm">
                        <h1>₹ {at.toFixed(2)}</h1>
                        <h1>₹ {rt.toFixed(2)}</h1>
                        <h1>₹ {(te - at - rt).toFixed(2)}</h1>
                      </div>
                    </div>
                  </>
                ) : (
                  <h1 className="bg-white w-full flex items-center justify-center font-Itim gap-2 text-yellow-700">
                    <BsFillPatchExclamationFill /> Data not Available
                  </h1>
                )}
              </div>
              <div className="relative w-[268px] h-[240px] flex gap-1 rounded-lg justify-center items-center text-black bg-white ">
                {newTran.length !== 0 ? (
                  <PiGraph tran={newTran} />
                ) : (
                  <h1 className="bg-white w-full flex items-center justify-center font-Itim gap-2 text-yellow-700">
                    <BsFillPatchExclamationFill /> Data not Available
                  </h1>
                )}
              </div>
            </div>
            <div>
              <div className="relative w-[820px] scrn-tab:w-[480px] h-[486px] rounded-lg bg-white">
                {newTran.length !== 0 ? (
                  <DayExpGraph tran={newTran} />
                ) : (
                  <h1 className="bg-white w-full h-full rounded-lg flex items-center justify-center font-Itim gap-2 text-yellow-700">
                    <BsFillPatchExclamationFill /> Data not Available
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dbd;
