import { useEffect, useState } from "react";
import {
  BsPatchQuestionFill,
  BsPatchCheckFill,
  BsPatchExclamationFill,
} from "react-icons/bs";
import moment from "moment/moment";
import PropgressRound from "././contenet/PropgressRound";
import imgBGCredit from "./../../../Images/Frame2.png";
import imgBGExp from "./../../../Images/Frame1.png";
import imgBGAva from "./../../../Images/Frame3.svg";
import imgBGApp from "./../../../Images/Frame4.png";
import imgBGRej from "./../../../Images/Frame5.png";
import imgBGPen from "./../../../Images/Frame6.png";
import { useParams, useSearchParams, Link } from "react-router-dom";
const INRFormat = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

function DashBoard(props) {
  const params = useParams();
  const [searchParams, SetSearchParams] = useSearchParams();
  props.titleName.innerHTML = "Dashboard";
  const { loggedUser, setUrlParams, setTransData, transData } = props;
  const [tran, setTran] = useState(transData);
  const [tranStatus, setTranStatus] = useState("Approved");
  const [showAllExpenses, setShowAllExpenses] = useState(false);
  const receivedFund = 400000;
  let expensesFund = 0;
  let ApproveAmount = 0;
  let rejectedExpenses = 0;
  let pendingExpenses = 0;

  async function callAPI() {
    await fetch("https://tidan-e-app.onrender.com/dashBoard", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ userId: params.id }),
    })
      .then((response) => response.json())
      .then((data) => setTran(data));
  }

  setTransData(tran);

  if (loggedUser.userId === params.id && tran.length <= 0) {
    callAPI();
  }

  useEffect(() => {
    callAPI();
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

  const darkMode = localStorage.getItem("DarkMode");
  return (
    <>
      <div
        className={`pt-20 min-h-[calc(100vh)] ${
          darkMode === "dark" ? "bg-img" : "bg-img3"
        } min-h-screen h-full pt-16`}
      >
        {tran.length > 0 ? (
          <>
            <div className="container m-auto">
              <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-2xl overflow-y-hidden snap-x">
                <div className="flex justify-center items-center w-full gap-4 rounded-2xl bg-slate-600 p-4">
                  <div
                    style={{
                      backgroundImage: "url(" + imgBGPen + ")",
                      backgroundPosition: "-100px -80px",
                      backgroundSize: "600px",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="flex flex-col box-border h-24 w-52 min-w-[180px] snap-normal snap-center rounded-xl hover:animate-[wiggle_0.4s] hover:shadow-2xl border border-[#FC8874]"
                  >
                    <h1 className="text-lg rounded-t-xl bg-[#484F73] text-white border-b-2 border-[#262324] h-10 font-light">
                      <span className="flex justify-center items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                          />
                        </svg>
                        Credited
                      </span>
                    </h1>
                    <div className="flex justify-center items-center text-2xl h-full rounded-b-xl bg- text-[#fc8874]">
                      <h1>{INRFormat(receivedFund)}</h1>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundImage: "url(" + imgBGExp + ")",
                      backgroundPosition: "-100px -80px",
                      backgroundSize: "600px",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="flex flex-col box-border h-24 w-52 min-w-[180px] snap-normal snap-center rounded-xl hover:animate-[wiggle_0.4s] hover:shadow-2xl border border-[#6442FC]"
                  >
                    <h1 className="text-lg rounded-t-xl bg-[#FC8874] text-white border-b-2 border-[#6442FC] h-10 font-light">
                      <span className="flex justify-center items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                          />
                        </svg>
                        Expensed
                      </span>
                    </h1>
                    <div className="flex justify-center items-center text-2xl h-full rounded-b-xl text-[#6442FC]">
                      <h1>{INRFormat(expensesFund)}</h1>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundImage: "url(" + imgBGApp + ")",
                      backgroundPosition: "-100px -80px",
                      backgroundSize: "600px",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="flex bg-blend-normal bg-white flex-col box-border h-24 w-52 min-w-[180px] snap-normal snap-center rounded-xl hover:animate-[wiggle_0.4s] hover:shadow-2xl border border-[#FC8874]"
                  >
                    <h1 className="text-lg rounded-t-xl bg-[#a66868] text-white border-b-2 border-[#A68780] h-10 font-light">
                      <span className="flex justify-center items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                          />
                        </svg>
                        Available
                      </span>
                    </h1>
                    <div className="flex justify-center items-center text-2xl h-full rounded-b-xl text-[#4efcb1]">
                      <h1>{INRFormat(availableFund)}</h1>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center w-full gap-4 rounded-2xl bg-gray-600 p-4">
                  <div
                    style={{
                      backgroundImage: "url(" + imgBGCredit + ")",
                      backgroundPosition: "-100px -80px",
                      backgroundSize: "600px",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="flex bg-blend-normal bg-white flex-col box-border h-24 w-52 min-w-[180px] snap-normal snap-center rounded-xl hover:animate-[wiggle_0.4s] hover:shadow-2xl border border-[#FCE742]"
                  >
                    <h1 className="text-lg rounded-t-xl bg-[#4EFCB1] text-amber-900 border-b-2 border-[#FCE742] h-10 font-light">
                      <span className="flex justify-center items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-6 fill-green-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                          />
                        </svg>
                        Approved
                      </span>
                    </h1>
                    <div className="flex justify-center items-center text-2xl h-full rounded-b-xl text-[#594943]">
                      <h1>{INRFormat(ApproveAmount)}</h1>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundImage: "url(" + imgBGRej + ")",
                      backgroundPosition: "-100px -80px",
                      backgroundSize: "600px",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="flex bg-blend-normal bg-white flex-col box-border h-24 w-52 min-w-[180px] snap-normal snap-center rounded-xl hover:animate-[wiggle_0.4s] hover:shadow-2xl border border-orange-200"
                  >
                    <h1 className="text-lg rounded-t-xl bg-[#262324] text-red-300 border-b-2 border-[#BFB6AE] h-10 font-light">
                      <span className="flex justify-center items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-6 fill-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                          />
                        </svg>
                        Rejected
                      </span>
                    </h1>
                    <div className="flex justify-center items-center text-2xl h-full rounded-b-xl text-gray-400">
                      <h1>{INRFormat(rejectedExpenses)}</h1>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundImage: "url(" + imgBGAva + ")",
                      backgroundPosition: "-100px -80px",
                      backgroundSize: "600px",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="flex bg-blend-normal bg-white flex-col box-border h-24 w-52 min-w-[180px] snap-normal snap-center rounded-xl hover:animate-[wiggle_0.4s] hover:shadow-2xl border border-orange-200"
                  >
                    <h1 className="text-lg rounded-t-xl bg-[#FCE742] text-yellow-800 border-b-2 border-[#FC8874] h-10 font-light">
                      <span className="flex justify-center items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-6 fill-yellow-500 text-yellow-700"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002"
                          />
                        </svg>
                        Pending
                      </span>
                    </h1>
                    <div className="flex justify-center items-center text-2xl h-full rounded-b-xl text-yellow-700">
                      <h1>{INRFormat(pendingExpenses)}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container m-auto bg-white rounded-2xl p-8 mt-8 max-h-[500px] overflow-auto">
              <h1 className="flex relative px-2 text-white border border-black bg-black">
                <span className="text-center uppercase w-full">
                  {!showAllExpenses
                    ? "All Transactions"
                    : tranStatus + " Expenses"}
                </span>
                <span
                  onClick={() => setShowAllExpenses(false)}
                  className={`${
                    !showAllExpenses
                      ? "right-0 opacity-0"
                      : "right-5 cursor-pointer"
                  } min-w-fit absolute text-lg ease-in-out duration-300`}
                >
                  Show all
                </span>
              </h1>
              <div className="">
                <div>
                  <table className="w-full border-spacing-2">
                    <thead>
                      <tr className="bg-black text-white border-b">
                        <td>Transaction No.</td>
                        <td>Bill Date</td>
                        <td>Item</td>
                        <td>Vendor</td>
                        <td>Amount</td>
                        <td>Uploaded On</td>
                        <td>Approval Status</td>
                        {/* <td>Action</td> */}
                      </tr>
                    </thead>
                    {tran.map((item) => (
                      <tbody key={item._id}>
                        <tr className="border-b border-dashed border-black text-sm my-1">
                          <td
                            style={{ width: 100 }}
                            className="border-none text-left"
                          >
                            <Link
                              className=" text-[#0000EE] visited:text-[#551A8B] hover:underline underline-offset-4"
                              to={"/e-app/dashboard/" + item._id}
                              target="_blank"
                            >
                              {item._id}
                            </Link>
                          </td>
                          <td style={{ width: 130 }} className="text-right">
                            {moment(item.expDate).format("Do MMM YYYY")}
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
                          <td>{item.expUploaded}</td>
                          <td>
                            {item.expApprovalStatus.toLowerCase() === "approved"? <span className="text-green-500 flex items-center gap-2"><BsPatchCheckFill/>Approved</span> : item.expApprovalStatus.toLowerCase() === "rejected"? <span className="text-red-500 flex items-center gap-2"><BsPatchQuestionFill/>Reject</span> : <span className="text-yellow-500 flex items-center gap-2"><BsPatchExclamationFill/>Pending</span>}
                          </td>
                          {/* <td><button className="border border-black hover:bg-black hover:text-white px-3 py-0.5 rounded my-1">View</button></td> */}
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : (
          <PropgressRound />
        )}
      </div>
    </>
  );
}

export default DashBoard;
