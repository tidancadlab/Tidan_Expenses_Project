import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropgressRound from "../../../component/Pages/ExpApp/contenet/PropgressRound";
import ApprovalGraph from "../../../component/Pages/ExpApp/contenet/Graph/ApprovalGraph";
import PiGraph from "../../../component/Pages/ExpApp/contenet/Graph/PiGraph";
import DayExpGraph from "../../../component/Pages/ExpApp/contenet/Graph/DayExpGraph";
import WaitingRoundAnimation from "../../../component/Pages/ExpApp/contenet/WaitningRoundAnimation";
import { refresh as ref } from "../../../Store/refreshData";
import {
  BsPatchQuestionFill,
  BsPatchCheckFill,
  BsPatchExclamationFill,
  BsArrowRepeat,
  BsExclamationTriangleFill,
  BsWallet2,
  BsShop,
  BsWalletFill,
  BsEmojiHeartEyes,
  BsEmojiFrown,
  BsEmojiSmile,
} from "react-icons/bs";

const INRFormat = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

function DashBoard(props) {
  props.titleName.innerHTML = "Dashboard";
  const darkMode = localStorage.getItem("DarkMode");
  const dispatch = useDispatch();
  const abc = useSelector((state) => state);
  const tran = abc.tran.data === undefined ? [] : abc.tran.data;
  const [refresh, setRefresh] = useState(false);
  const [tranStatus, setTranStatus] = useState(
    abc.tran.code !== undefined ? true : abc.tran.code
  );
  const receivedFund = 400000;
  let expensesFund = 0;
  let ApproveAmount = 0;
  let rejectedExpenses = 0;
  let pendingExpenses = 0;

  const refState = () => {
    dispatch(ref(abc.refresh ? false : true));
    setRefresh(true);
  };

  useEffect(() => {
    setRefresh(false);
  }, [abc.tran]);

  useEffect(() => {
    refState();
  }, []);

  for (const i of tran) {
    expensesFund += i.expAmount;
  }

  tran.filter((Item) => {
    switch (Item.expApprovalStatus.toLowerCase()) {
      case "approved":
        ApproveAmount += Item.expAmount;
        break;
      case "rejected":
        rejectedExpenses += Item.expAmount;
        break;
      case "pending":
        pendingExpenses += Item.expAmount;
        break;
    }
  });

  let availableFund = receivedFund - expensesFund + rejectedExpenses;
  expensesFund = expensesFund - rejectedExpenses;

  const [allUser, setAllUser] = useState([]);
  useEffect(() => {
    fetch("https://tidan-e-app.onrender.com/allUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setAllUser(data));
  }, []);

  // <-------Page -------->

  // let cuPage = 0;
  // const totalPage = Math.ceil(tran.length/11);
  // console.log(totalPage)
  // for(const i = 0; i < totalPage; i++){
  //   console.log(i)
  // }

  const pageTran = tran.slice(0, 15);

  return (
    <>
      <div
        className={`min-h-screen h-full pt-16 scrn-lap-L:pl-20 scrn-mob:pl-0 `}
      >
        {tran.length > 0 ? (
          <>
            <div className=" md:container m-auto">
              <div className=" text-right w-full mb-2">
                <button
                  disabled={refresh}
                  onClick={refState}
                  className={`${
                    !refresh
                      ? "hover:bg-transparent hover:text-white"
                      : " opacity-70 "
                  } border bg-white border-white flex gap-1 items-center px-5 py-2 rounded mr-4 backdrop-blur-md ease-in-out duration-200`}
                >
                  <span
                    className={`${refresh ? "animate-spin" : "animate-none"}`}
                  >
                    <BsArrowRepeat />
                  </span>{" "}
                  {refresh ? "Refreshing" : "Refresh"}
                </button>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-wrap scrn-mob:flex-wrap gap-2 container">
                  <div className="scrn-mob:flex scrn-mob:gap-1 bg-white">
                    <div className="flex justify-around flex-wrap gap-1 p-1 pb-1 rounded-t">
                      <div className="flex flex-col h-20 w-48 bg-[#45214A] text-white rounded">
                        <h1 className="text-lg h-10 font-light border-b border-white">
                          <span className="flex justify-center items-center gap-2">
                            <BsWallet2 />
                            Credited
                          </span>
                        </h1>
                        <div className="flex justify-center items-center text-2xl h-full">
                          <h1>{INRFormat(receivedFund)}</h1>
                        </div>
                      </div>
                      <div className="flex flex-col h-20 w-48 bg-[#323050] text-white rounded">
                        <h1 className="text-lg h-10 font-light border-b border-white">
                          <span className="flex justify-center items-center gap-2">
                            <BsShop />
                            Total expensed
                          </span>
                        </h1>
                        <div className="flex justify-center items-center text-2xl h-full">
                          <h1>{INRFormat(expensesFund)}</h1>
                        </div>
                      </div>
                      <div className="flex flex-col h-20 w-48 bg-[#21445B] text-white rounded">
                        <h1 className="text-lg h-10 font-light border-b border-white">
                          <span className="flex justify-center items-center gap-2">
                            <BsWalletFill />
                            Available
                          </span>
                        </h1>
                        <div className="flex justify-center items-center text-2xl h-full">
                          <h1>{INRFormat(availableFund)}</h1>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-around flex-wrap gap-1 p-1 pt-1 rounded-b">
                      <div className="flex flex-col h-20 w-48 bg-green-400 text-green-900 rounded">
                        <h1 className="text-lg h-10 font-light border-b border-dashed border-green-700">
                          <span className="flex justify-center items-center gap-2">
                            <BsEmojiHeartEyes />
                            Approved
                          </span>
                        </h1>
                        <div className="flex justify-center items-center text-2xl h-full">
                          <h1>{INRFormat(ApproveAmount)}</h1>
                        </div>
                      </div>
                      <div className="flex flex-col h-20 w-48 bg-red-400 text-red-900 rounded">
                        <h1 className="text-lg h-10 font-light border-b border-dashed border-red-700">
                          <span className="flex justify-center items-center gap-2">
                            <BsEmojiFrown />
                            Rejected
                          </span>
                        </h1>
                        <div className="flex justify-center items-center text-2xl h-full">
                          <h1>{INRFormat(rejectedExpenses)}</h1>
                        </div>
                      </div>
                      <div className="flex flex-col h-20 w-48 bg-yellow-400 text-yellow-900 rounded">
                        <h1 className="text-lg h-10 font-light border-b border-dashed border-yellow-600">
                          <span className="flex justify-center items-center gap-2">
                            <BsEmojiSmile />
                            Pending
                          </span>
                        </h1>
                        <div className="flex justify-center items-center text-2xl h-full">
                          <h1>{INRFormat(pendingExpenses)}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded">
                    <ApprovalGraph tran={tran} />
                  </div>
                  <div className="bg-white rounded">
                    <PiGraph tran={tran} />
                  </div>
                  <div className="bg-white rounded">
                    <DayExpGraph tran={tran} />
                  </div>
                  <div className="flex justify-around flex-wrap gap-2 bg-white rounded text-xs p-0.5">
                    <div className="overflow-scroll max-h-44">
                      <table className="min-w-[265px]">
                        <thead>
                          <tr className="bg-black text-white text-left font-medium">
                            <td>Date</td>
                            <td>Item</td>
                            <td>Amount</td>
                          </tr>
                        </thead>
                        <tbody>
                          {tran.map((v) => (
                            <tr
                              key={v._id}
                              className={`
                                ${
                                  v.expApprovalStatus.toLowerCase() ===
                                  "approved"
                                    ? "bg-green-300"
                                    : v.expApprovalStatus.toLowerCase() ===
                                      "rejected"
                                    ? "bg-red-300"
                                    : "bg-yellow-300"
                                }
                                  border-b border-dashed
                              `}
                            >
                              <td>{v.expDate.slice(0, 10).split("-")[2]}-{v.expDate.slice(0, 10).split("-")[1]}-{v.expDate.slice(0, 10).split("-")[0]}</td>
                              <td>
                                <p className="truncate max-w-[110px] text-left pl-2">
                                  {v.expItem}
                                </p>
                              </td>
                              <td className="text-right pr-1">{v.expAmount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container scrn-lap-S:hidden m-auto bg-white mt-2 rounded-md">
              <div className="">
                <div>
                  <table className="w-full">
                    <thead className="bg-purple-500 rounded text-black ">
                      <tr className="">
                        <td>Transaction No.</td>
                        <td>Bill Date</td>
                        <td>Item</td>
                        <td>Vendor</td>
                        <td>Amount</td>
                        <td>Approval Authority</td>
                        <td>Approval Status</td>
                      </tr>
                    </thead>
                    <tbody className=" max-h-[300px] overflow-auto">
                      {pageTran.map((item) => (
                        <tr
                          key={item._id}
                          className="border-b border-dashed border-black text-sm my-1"
                        >
                          <td
                            style={{ width: 100 }}
                            className="border-none text-left"
                          >
                            <Link
                              className=" text-[#0000EE] visited:text-[#551A8B] hover:underline underline-offset-4"
                              // to={"/e-app/dashboard/" + item._id}
                              // target="_blank"
                            >
                              {item._id}
                            </Link>
                          </td>
                          <td style={{ width: 130 }} className="text-right">
                            {item.expDate ? item.expDate.slice(0, 10) : ""}
                          </td>
                          <td title={item.expItem} className="">
                            <p className="truncate max-w-[400px] text-start">
                              {item.expItem}
                            </p>
                          </td>
                          <td>
                            <p className="truncate max-w-[250px] text-start">
                              {item.expVendor}
                            </p>
                          </td>
                          <td className="text-right">
                            {INRFormat(item.expAmount)}
                          </td>
                          <td>
                            {item.reportingOfficer ? (
                              <div>
                                {allUser.length !== 0 ? (
                                  <span>
                                    {allUser.map(
                                      (a) =>
                                        a._id === item.reportingOfficer && (
                                          <span>{a.userName}</span>
                                        )
                                    )}
                                  </span>
                                ) : (
                                  <span>
                                    <WaitingRoundAnimation />
                                  </span>
                                )}
                              </div>
                            ) : (
                              "Not Specify"
                            )}
                          </td>
                          <td>
                            {item.expApprovalStatus.toLowerCase() ===
                            "approved" ? (
                              <span className="text-green-500 flex items-center gap-2">
                                <BsPatchCheckFill />
                                Approved
                              </span>
                            ) : item.expApprovalStatus.toLowerCase() ===
                              "rejected" ? (
                              <span className="text-red-500 flex items-center gap-2">
                                <BsPatchQuestionFill />
                                Rejected
                              </span>
                            ) : (
                              <span className="text-yellow-500 flex items-center gap-2">
                                <BsPatchExclamationFill />
                                Pending
                              </span>
                            )}
                          </td>
                          {/* <td><button className="border border-black hover:bg-black hover:text-white px-3 py-0.5 rounded my-1">View</button></td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <ul className="flex justify-end px-4 py-2">
                  <li>
                    <button className="flex justify-center items-center m-0.5 rounded bg-white px-1 h-6 border border-black">
                      prv
                    </button>
                  </li>
                  {["1", "2", "3"].map((v) => (
                    <li>
                      <button className="flex justify-center items-center m-0.5 rounded bg-white w-6 h-6 border border-black">
                        {v}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button className="flex justify-center items-center m-0.5 rounded bg-white px-1 h-6 border border-black">
                      nxt
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center bg-transparent backdrop-blur-2xl">
            {!tranStatus ? (
              <div className="w-full mb-4 flex justify-center flex-col gap-5 items-center">
                <span className="border flex gap-2 rounded-md border-red-500 border-l-8 p-4 text-3xl bg-red-300 text-red-500">
                  {" "}
                  <BsExclamationTriangleFill /> Records not found
                </span>
                <div className="border hover:first:rounded-full bg-white">
                  <button
                    onClick={refState}
                    className="flex gap-1 items-center px-5 py-2"
                  >
                    <span
                      className={`${
                        !refresh ? "animate-spin" : "animate-none"
                      } ease-in-out duration-200`}
                    >
                      <BsArrowRepeat />
                    </span>{" "}
                    Refresh
                  </button>
                </div>
                or
                <button
                  onClick={() => {
                    // setRefresh(false);
                    setTranStatus(true);
                  }}
                  className="border flex gap-1 items-center px-5 py-2 rounded-full mr-4 bg-white"
                >
                  Add
                </button>
              </div>
            ) : (
              <PropgressRound />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default DashBoard;
