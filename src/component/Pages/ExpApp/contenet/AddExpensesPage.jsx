import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import {
  BsDistributeVertical,
  BsFillCalendarEventFill,
  BsFillCartFill,
  BsFillChatLeftQuoteFill,
  BsFillEaselFill,
  BsFillFileEarmarkBinaryFill,
  BsFillFileEarmarkPdfFill,
  BsFillPieChartFill,
  BsPersonBadgeFill,
  BsShop,
  BsX,
} from "react-icons/bs";
import { HiCurrencyRupee } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import ProgressBar from "./ProgressBar";

function AddNewExpenses(props) {
  const { setAddBtn, moment } = props
  const [file, setFile] = useState("");
  const [user, setUser] = useState([]);
  const [inputErr, setInputErr] = useState("");
  const params = useParams();

  useEffect(() => {
    fetch("https://tidan-e-app.onrender.com/userDataProperty", {
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

  const expData = {
    expAmount: "",
    expDate: "",
    expFile: file,
    invoiceNum: "",
    expItem: "",
    paymentHead: "",
    paymentType: "",
    projectName: "",
    expRemark: "",
    reportingOfficer: "",
    expVendor: "",
    uploadTime: "",
    expComments: "",
    userLevel: 0,
    userId: "",
    expUploaded: "",
  };
  const [expensesData, setExpensesData] = useState(expData);
  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setExpensesData({ ...expensesData, [id]: value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    let {
      uploadTime,
      expAmount,
      expDate,
      expItem,
      expRemark,
      expVendor,
      expComments,
      userLevel,
      userId,
      expUploaded,
      expFile,
    } = expensesData;
    uploadTime = Date();
    userLevel =
      user.userProperty === undefined ? "" : user.userProperty.userLevel;
    userId = user._id;
    expUploaded = user.userName;
    expFile = file;
    expComments = "";
    if (expensesData.expDate.length === 0) {
      setInputErr("")
      // new Audio(successClick).play();
      return setInputErr(
        <div>
          <ProgressBar
            cssColor={"bg-[#dc3545]"}
            message={"Please select Item Bill Date"}
            cssMessage={"text-red-500"}
          />
        </div>
      );
    }
    if (expensesData.expItem.length === 0) {
      // new Audio(successClick).play();
      return setInputErr(
        <div>
          <ProgressBar
            cssColor={"bg-[#dc3545]"}
            message={"Please enter Item Details"}
            cssMessage={"text-red-500"}
          />
        </div>
      );
    }
    if (expensesData.expAmount.length === 0) {
      // new Audio(buttonClick).play();
      return setInputErr(
        <div>
          <ProgressBar
            cssColor={"bg-red-500"}
            message={"Please Enter Amount"}
            cssMessage={"text-red-500"}
          />
        </div>
      );
    } else {
      await fetch("https://tidan-e-app.onrender.com/addNewExpenses/add", {
        method: "POST",
        crossDomain: true,
        timeOut:1000,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          uploadTime,
          expAmount,
          expDate,
          expItem,
          expRemark,
          expVendor,
          expComments,
          userLevel,
          userId,
          expUploaded,
        }),
      })
        .then(async (res) => {
          let dataResult = await res.json();
          if (res.status === 200) {
            setInputErr(
              <div>
                <ProgressBar
                  cssColor={"bg-green-500"}
                  cssMessage={"text-green-500 lowercase"}
                  message={
                    "Registered Successfully (id No. is " + dataResult._id + ")"
                  }
                />
              </div>
            );
            setFile("");
            setExpensesData({
              expAmount: "",
              expDate: "",
              invoiceNum: "",
              expItem: "",
              paymentHead: "",
              paymentType: "",
              projectName: "",
              expRemark: "",
              reportingOfficer: "",
              expVendor: "",
              uploadTime: "",
            });
          } else {
            setInputErr(
              <div>
                <ProgressBar
                  cssColor={"bg-red-500"}
                  cssMessage={"text-red-500"}
                  message={"Something Went Wrong"}
                />
              </div>
            );
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
      console.log(expensesData);
    }
  };
  return (
    <>
      <div className="absolute bg-opacity-70 h-screen w-[calc(100vw-68px)] right-0 flex bg-black z-50">
        <div className="m-auto ">
          <div>{inputErr}</div>
          <div className="flex flex-row relative">
            <button
              onClick={() => {
                setAddBtn(false);
              }}
              className=" absolute -right-8 -top-8 w-8 h-8 border border-transparent rounded-full flex justify-center items-center bg-blue-500 text-white text-2xl"
            >
              <BsX />
            </button>

            <div className="p-8 bg-orange-400 dark:bg-[#212121] dark:text-white rounded-xl">
              <form
                onSubmit={handleSubmit}
                className="flex gap-5 flex-wrap w-[640px] addExpForm border border-dashed p-5"
              >
                <div className="flex gap-5 w-full">
                  <div className="relative flex flex-col text-left gap-2">
                    <label
                      htmlFor="expDate"
                      className="flex gap-2 items-center ml-2 text-sm"
                    >
                      <BsFillCalendarEventFill className="text-sm" /> Date
                    </label>
                    <input
                      type="date"
                      id="expDate"
                      min={moment(new Date(Date.now() - 550000000)).format("YYYY-MM-DD")}
                      max={moment(new Date(Date.now() + 1980000)).format("YYYY-MM-DD")}
                      onChange={handleChange}
                      value={expensesData.expDate ? moment(expensesData.expDate).format("YYYY-MM-DD") : moment(Date()).format("YYYY-MM-DD")}
                      className="rounded p-1 text-black outline-blue-400"
                    />
                  </div>
                  <div className="flex flex-col text-left gap-2 w-full">
                    <label
                      htmlFor="expItem"
                      className="flex gap-2 items-center ml-2 text-sm"
                    >
                      <BsFillCartFill /> Item Description
                    </label>
                    <input
                      onChange={handleChange}
                      value={expensesData.expItem}
                      type="text"
                      id="expItem"
                      placeholder="Example Item"
                      className="rounded px-2 py-1 text-black outline-blue-400"
                    />
                  </div>
                </div>
                <div className="flex gap-5 w-full">
                  <div className="flex flex-col text-left gap-2 w-full">
                    <label
                      htmlFor="expVendor"
                      className="flex gap-2 items-center ml-2 text-sm"
                    >
                      <BsShop /> Vender
                    </label>
                    <input
                      onChange={handleChange}
                      value={expensesData.expVendor}
                      type="text"
                      id="expVendor"
                      placeholder="Purchased from"
                      className="rounded px-2 py-1 text-black outline-blue-400"
                    />
                  </div>
                  <div className="flex flex-col text-left gap-2 max-w-[150px]">
                    <label
                      htmlFor="expAmount"
                      className="flex gap-2 items-center ml-2 text-sm"
                    >
                      <HiCurrencyRupee /> Amount
                    </label>
                    <input
                      onChange={handleChange}
                      value={expensesData.expAmount}
                      type="number"
                      id="expAmount"
                      placeholder="5210.01"
                      className="rounded px-2 py-1 text-black outline-blue-400"
                    />
                  </div>
                </div>
                <div className="flex gap-5 w-full">
                  <div className="flex flex-col text-left gap-2 max-w-[200px]">
                    <label
                      htmlFor="invoiceNum"
                      className="flex gap-2 items-center ml-2 text-sm"
                    >
                      <BsFillFileEarmarkBinaryFill /> Invoice Number
                    </label>
                    <input
                      onChange={handleChange}
                      value={expensesData.invoiceNum}
                      type="text"
                      id="invoiceNum"
                      className="rounded px-2 py-1 text-black outline-blue-400"
                    />
                  </div>
                  <div className="flex flex-col text-left gap-2 min-w-fit">
                    <label
                      htmlFor="head"
                      className="flex gap-2 items-center ml-2 text-sm pr-5"
                    >
                      <BsFillPieChartFill /> Payment Head
                    </label>
                    <select
                      onChange={handleChange}
                      value={expensesData.paymentHead}
                      id="paymentHead"
                      className="rounded px-2 py-1 text-black outline-blue-400 h-8"
                    >
                      <option value="null" hidden selected>
                        Select
                      </option>
                      <option value="grocery">Grocery</option>
                      <option value="site local">Site Local</option>
                      <option value="office">Office</option>
                    </select>
                  </div>
                  <div className="flex flex-col text-left gap-2 max-w-[200px]">
                    <label
                      htmlFor="project"
                      className="flex gap-2 items-center ml-2 text-sm"
                    >
                      <BsFillEaselFill /> Project Name
                    </label>
                    <input
                      onChange={handleChange}
                      list="projectList"
                      className="rounded max-w-fit px-2 py-1 text-black outline-blue-400 h-8"
                      type="text"
                      name="project"
                      id="projectName"
                    />
                    <datalist id="projectList">
                      <option value="RBPL">RBPL</option>
                      <option value="BCPL">BCPL</option>
                      <option value="IHPL">IHPL</option>
                      <option value="DSPL">DSPL</option>
                      <option value="PAJPL">PAJPL</option>
                      <option value="Barnala MDPE">Barnala MDPE</option>
                      <option value="Doraha MDPE">Doraha MDPE</option>
                    </datalist>
                  </div>
                </div>
                <div className="flex gap-5 w-full">
                  <div className="flex flex-col text-left gap-2 w-full">
                    <label
                      htmlFor="paymentType"
                      className="flex gap-2 items-center ml-2 text-sm"
                    >
                      <BsDistributeVertical /> Payment Type
                    </label>
                    <select
                      onChange={handleChange}
                      value={expensesData.paymentType}
                      id="paymentType"
                      className="rounded px-2 py-1 text-black outline-blue-400 h-8"
                    >
                      <option value="null" hidden selected>
                        Select
                      </option>
                      <option value="project Purchase">Project Purchase</option>
                      <option value="Vender Payment">Vender Payment</option>
                      <option value="Contractor Payment">
                        Contractor Payment
                      </option>
                    </select>
                  </div>
                  <div className="flex flex-col text-left gap-2 w-full">
                    <label
                      htmlFor="reportingOfficer"
                      className="flex gap-2 items-center ml-2 text-sm"
                    >
                      <BsPersonBadgeFill /> Reporting Officer
                    </label>
                    <select
                      onChange={handleChange}
                      value={expensesData.reportingOfficer}
                      id="reportingOfficer"
                      className="rounded px-2 py-1 text-black outline-blue-400 h-8"
                    >
                      <option value="null" hidden selected>
                        Select
                      </option>
                      <option value="Praveen Kuamr">Praveen Kumar</option>
                      <option value="AR Dash">AR Dash</option>
                      <option value="Pradeep Ojha">Pradeep Ojha</option>
                    </select>
                  </div>
                  <div className="flex flex-col text-left gap-2 w-full">
                    {file === "" ? (
                      <>
                        <label
                          htmlFor="file"
                          className="flex gap-2 items-center px-5 bg-white text-black h-full rounded-lg"
                        >
                          <BsFillFileEarmarkPdfFill /> Upload Bill
                        </label>
                        <input
                          onChange={(e) => setFile(e.target.value)}
                          type="file"
                          id="file"
                          placeholder="Select"
                          className="hidden"
                          accept="image/png, image/jpeg, .pdf"
                        />{" "}
                      </>
                    ) : (
                      <div
                        title={file.slice(12)}
                        className="flex flex-col gap-2 h-full"
                      >
                        <span className="flex gap-2 items-center ml-2 text-sm pr-5">
                          <BsFillFileEarmarkPdfFill /> Enclosed Bill
                        </span>
                        <span className="bg-violet-300 relative text-sm text-violet-800 h-8 flex items-center px-2 rounded">
                          {file.slice(
                            file.length > 28 ? file.length - 19 : 12,
                            file.length
                          )}{" "}
                          <span
                            onClick={() => setFile("")}
                            className="absolute right-2 flex justify-center items-center cursor-pointer text-lg rounded h-4 w-4"
                          >
                            <BsX />
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col text-left gap-2 w-full">
                  <label
                    htmlFor="expRemark"
                    className="flex gap-2 items-center ml-2 text-sm pr-5"
                  >
                    <BsFillChatLeftQuoteFill className="mt-1" /> Remark
                  </label>
                  <textarea
                    onChange={handleChange}
                    value={expensesData.expRemark}
                    type="text"
                    id="expRemark"
                    className="rounded p-2 min-h-[100px] text-black outline-blue-400"
                  />
                </div>
                <button className="border w-full py-2 bg-white dark:bg-blue-500 dark:border-transparent rounded">
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
