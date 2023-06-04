import { useState } from "react";
import WaitingRoundAnimation from "./WaitningRoundAnimation";

function ApproveExpenses({ item, setPageRefresh }) {
  const expData = {
    expApprovalStatus: "",
    expComments: "",
  };

  const [waitingBtnAnimation, setWaitingBtnAnimation] = useState(true);
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [expUpdateData, setExpUpdateData] = useState(expData);

  if (!waitingBtnAnimation) {
    const animationTimeOut = setTimeout(() => {
      setWaitingBtnAnimation(true);
      setSubmitBtn("Retry");
      clearTimeout(animationTimeOut);
    }, 10000);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setExpUpdateData({ ...expUpdateData, [name]: value });
  }
  async function approveTransaction(id) {
    setWaitingBtnAnimation(false);
    if (
      expUpdateData.expApprovalStatus === "Approved" ||
      expUpdateData.expApprovalStatus === "Rejected"
    ) {
      await fetch(`https://tidan-e-app.onrender.com/approval/${id}`, {
        method: "PATCH",
        timeout: 0,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expUpdateData),
      })
        .then((res) => {
          console.log(res.json());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return console.warn("Please check Data");
    }

    await setPageRefresh((pageRefresh) =>
      pageRefresh === true ? false : true
    );
  }

  return (
    <>
      <li className="w-24 text-center text-black">
        {item.expApprovalStatus.toLowerCase() === "approved" ||
        item.expApprovalStatus.toLowerCase() === "rejected" ? (
          <span
            className={`${
              item.expApprovalStatus.toLowerCase() === "rejected"
                ? "text-red-500"
                : "text-green-500"
            } uppercase`}
          >
            {item.expApprovalStatus}
          </span>
        ) : (
          <select
            name="expApprovalStatus"
            value={expUpdateData.expApprovalStatus}
            onChange={handleChange}
            id="abc"
            className={`${
              true ? "cursor-pointer" : "opacity-10"
            } outline-none rounded border border-black dark:border-none`}
          >
            <option value={null} hidden>
              {"--Select--"}
            </option>
            <option value="Approved">Approve</option>
            <option value="Rejected">Reject</option>
          </select>
        )}
      </li>
      <li className="w-52 flex justify-center items-center py-1">
        {item.expApprovalStatus === "pending" ? (
          <textarea
            value={expUpdateData.expComments}
            onChange={handleChange}
            className={`${
              expUpdateData.expApprovalStatus !== ""
                ? "cursor-text text-black"
                : "opacity-10"
            } rounded px-2 py-[2px] leading-4 w-full min-h-[32px] max-h-32 border focus:outline-none focus:bg-green-300 dark:border-none border-black ease-in-out duration-200`}
            disabled={expUpdateData.expApprovalStatus === ""}
            type="text"
            name="expComments"
            id=""
          />
        ) : (
          <p>{item.expComments !== " " ? item.expComments : "----"}</p>
        )}
      </li>
      <li className="w-20 dark:text-black text-white">
        {item.expApprovalStatus.toLowerCase() === "rejected" ? (
          <button className="cursor-pointer bg-black hover:bg-white hover:text-black dark:bg-white dark:hover:bg-black dark:hover:text-white dark:hover:border-white w-full py-1 rounded border border-transparent hover:border-black">
            Edit
          </button>
        ) : item.expApprovalStatus.toLowerCase() === "approved" ? (
          <button className="cursor-pointer bg-black hover:bg-white hover:text-black dark:bg-white dark:hover:bg-black dark:hover:text-white dark:hover:border-white w-full py-1 rounded border border-transparent hover:border-black">
            View
          </button>
        ) : (
          <button
            disabled={expUpdateData.expApprovalStatus === ""}
            onClick={() => {
              approveTransaction(item._id);
            }}
            className={`bg-blue-500  dark:bg-blue-400  w-full py-1 rounded border border-transparent  ${
              expUpdateData.expApprovalStatus === ""
                ? "opacity-20"
                : "opacity-100 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white dark:hover:border-blue-700 hover:border-black"
            }`}
          >
            {!waitingBtnAnimation ? <WaitingRoundAnimation /> : submitBtn}
          </button>
        )}
      </li>
    </>
  );
}

export default ApproveExpenses;
