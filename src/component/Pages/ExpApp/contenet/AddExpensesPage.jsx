import { useEffect, useState } from "react";
import {
  BsDistributeVertical,
  BsFillCalendarEventFill,
  BsFillCartFill,
  BsFillChatLeftQuoteFill,
  BsFillEaselFill,
  BsFillFileEarmarkBinaryFill,
  BsFillFileEarmarkPdfFill,
  BsFillPieChartFill,
  BsPersonCheckFill,
  BsShop,
  BsX,
  BsXCircle,
} from "react-icons/bs";
import { HiCurrencyRupee } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { expensesData as userData } from "../../../js/FetchModule";
import ProgressBar from "./ProgressBar";

function AddNewExpenses(props) {
  const abc = useSelector((state) => state);
  const { setAddBtn, moment, optData, setOptData } = props;
  const [file, setFile] = useState(0);
  const [imgData, setImgData] = useState("");
  const [user, setUser] = useState([]);
  const [inputErr, setInputErr] = useState("");
  const [allUser, setAllUser] = useState(optData);
  let [opt, setOpt] = useState([]);
  let base64 = convertToBase64(file === 0 ? null : file);
  base64 = base64 === undefined ? "" : base64;
  if (base64 !== "") {
    Promise.resolve(base64).then((a) => setImgData(a));
  }
  const params = useParams();

  useEffect(() => {
    userData("https://tidan-e-app.onrender.com/userDataProperty", params.id)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [params.id]);
  const expData = {
    expAmount: "",
    expDate: new Date(Date.now()).getTime(),
    attachment: {
      name: "",
      size: 0,
      data: "",
      lastModified: "",
    },
    invoiceNum: "",
    expItem: "",
    paymentHead: "",
    paymentType: "",
    projectName: "",
    expRemark: "",
    reportingOfficer: "",
    expVendor: "",
    expComments: "",
    userLevel: "",
    userId: user._id,
    expUploaded: "",
  };
  const [expensesData, setExpensesData] = useState(expData);
  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setExpensesData({ ...expensesData, [id]: value });
  };

  let d = { p: [], ph: [], pt: [] };
  const optUpdate = async () => {
    const da = await abc.userProperty.paymentOpt.filter((v) => {
      return v;
    });
    for (const e of da) {
      e.projects && d.p.push(e.projects);
      e.paymentHead && d.ph.push(e.paymentHead);
      e.paymentType && d.pt.push(e.paymentType);
    }
    setOpt(d);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    expensesData.userLevel =
    abc.userProperty.userProperty === undefined ? "" : abc.userProperty.userProperty.userLevel;
    expensesData.attachment = {
      name: file === 0 ? "" : "T-" + expensesData.invoiceNum,
      size: file === 0 ? "" : file.size,
      type: file === 0 ? "" : file.type,
      lastModified: file === 0 ? "" : file.lastModified,
      data: file === 0 ? "" : imgData,
    };
    expensesData.expUploaded = abc.userProperty.userName;
    expensesData.userId = abc.userProperty._id;

    checkData(
      opt,
      expensesData.paymentHead,
      expensesData.paymentType,
      expensesData.projectName
    );

    {
      if (expensesData.expDate.length === 0) {
        setInputErr("");
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
      }
      if (expensesData.attachment.size > 71000) {
        return setInputErr(
          <div>
            <ProgressBar
              cssColor={"bg-red-500"}
              message={"Attachment is more then 70 kb"}
              cssMessage={"text-red-500"}
            />
          </div>
        );
      } else {
        await fetch("https://tidan-e-app.onrender.com/addNewExpenses/add", {
          method: "POST",
          crossDomain: true,
          timeOut: 1000,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(expensesData),
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
                      "Registered Successfully (id No. is " +
                      dataResult._id +
                      ")"
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
      }
    }
    return true;
  };
  const checkData = (opt, x, y, z) => {
    let p = false;
    let ph = false;
    let pt = false;
    for (let i of opt.p) {
      i === z && (p = true);
    }
    for (let i of opt.ph) {
      i === x && (ph = true);
    }
    for (let i of opt.pt) {
      i === y && (pt = true);
    }
    console.log(p, ph, pt);

    // fetch("https://tidan-e-app.onrender.com/updateOpt?_id=" + params.id, {
    //   method: "PUT",
    //   mode: "cors",
    //   cache: "no-cache",
    //   credentials: "same-origin",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ projects: z, paymentHead: x, paymentType: y }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  };

  useEffect(() => {
    optUpdate();
  }, [user, allUser]);

  useEffect(() => {
    fetch("https://tidan-e-app.onrender.com/allUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setAllUser(data));
  }, []);
  const [newOpt, setNewOpt] = useState(false);
  return (
    <>
      <div className="absolute bg-opacity-70 h-screen scrn-lap-S:w-screen w-[calc(100vw-68px)] right-0 flex bg-black z-50">
        <div className="m-auto ">
          <div>{inputErr}</div>
          <div className="flex flex-row relative">
            <div className="p-8 pt-0 scrn-lap-S:p-2 bg-orange-400 dark:bg-[#212121] dark:text-white rounded-xl">
              <h1 className="text-white mb-1 uppercase">
                {abc.userProperty.userName}
              </h1>
              <form
                onSubmit={handleSubmit}
                className="flex gap-5 scrn-lap-S:gap-1 flex-wrap w-[640px] scrn-lap-S:w-[400px] addExpForm border border-dashed scrn-lap-S:p-1 p-5"
              >
                <div className="flex scrn-lap-S:flex-wrap gap-5 scrn-lap-S:gap-1 w-full">
                  <div className="relative flex flex-col text-left gap-2 scrn-lap-S:gap-1">
                    <label
                      htmlFor="expDate"
                      className="flex gap-2 items-center ml-2 text-sm"
                    >
                      <BsFillCalendarEventFill className="text-sm" /> Date
                    </label>
                    <input
                      type="date"
                      id="expDate"
                      // min={moment(new Date(Date.now() - 550000000)).format(
                      //   "YYYY-MM-DD"
                      // )}
                      max={moment(new Date(Date.now() + 1980000)).format(
                        "YYYY-MM-DD"
                      )}
                      onChange={handleChange}
                      value={moment(expensesData.expDate).format("YYYY-MM-DD")}
                      className="rounded p-1 text-black outline-blue-400"
                    />
                  </div>
                  <div className="flex flex-col text-left gap-2 w-max scrn-lap-S:gap-1">
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
                <div className="flex scrn-lap-S:flex-wrap gap-5 scrn-lap-S:gap-1 w-full">
                  <div className="flex flex-col text-left gap-2 w-full scrn-lap-S:gap-1">
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
                  <div className="flex flex-col text-left gap-2 max-w-[150px] scrn-lap-S:gap-1">
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
                      placeholder="Bill amount"
                      min={1}
                      className="rounded px-2 py-1 text-black outline-blue-400"
                    />
                  </div>
                </div>
                <div className="flex scrn-lap-S:flex-wrap gap-5 scrn-lap-S:gap-1 w-full">
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
                      htmlFor="paymentHead"
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
                      {opt.ph !== undefined &&
                        opt.ph.length > 0 &&
                        opt.ph.map((p, i) => (
                          <option key={i} value={p}>
                            {p}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex relative flex-col text-left gap-2 max-w-[200px]">
                    <label
                      htmlFor="projectName"
                      className="flex gap-2 items-center ml-2 text-sm"
                    >
                      <BsFillEaselFill /> Project Name
                    </label>
                    <select
                      onChange={handleChange}
                      value={expensesData.paymentHead}
                      id="projectName"
                      className="rounded px-2 py-1 text-black outline-blue-400 h-8"
                    >
                      {opt.p !== undefined &&
                        opt.p.length > 0 &&
                        opt.p.map((p, i) => (
                          <option key={i} value={p}>
                            {p}
                          </option>
                        ))}
                      <option value="">nothing</option>
                    </select>
                  </div>
                </div>
                <div className="flex scrn-lap-S:flex-wrap gap-5 scrn-lap-S:gap-1 w-full">
                  {!newOpt ? (
                    <div className="flex flex-col text-left gap-2 w-full">
                      <label
                        htmlFor="paymentType"
                        className="flex justify-between items-center ml-2 text-sm"
                      >
                        <span className="flex gap-2 items-center">
                          <BsDistributeVertical /> Payment Type
                        </span>
                        <span
                          onClick={() => {
                            setNewOpt(true);
                          }}
                          className="cursor-pointer rotate-45 text-green-500"
                        >
                          <BsXCircle />
                        </span>
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
                        <option value="personal">1. Personal Expenses</option>
                        <option value="project expenses">
                          2. Project Expenses
                        </option>
                        <option value="Vender Payment">
                          3. Vender Payment
                        </option>
                        <option value="Contractor Payment">
                          4. Contractor Payment
                        </option>
                        {opt.pt !== undefined &&
                          opt.pt.length > 0 &&
                          opt.pt.map((p, i) => (
                            <option key={i} value={p}>
                              {i + 5}
                              {". "}
                              {p}
                            </option>
                          ))}
                      </select>
                    </div>
                  ) : (
                    <div className="flex flex-col text-left gap-2 w-full">
                      <label
                        htmlFor="addOpt"
                        className="flex justify-between items-center ml-2 text-sm"
                      >
                        <span className="flex gap-2">
                          <BsDistributeVertical /> Add New Payment Type
                        </span>
                        <span
                          onClick={() => {
                            setNewOpt(false);
                          }}
                          className="cursor-pointer mr-2 text-red-500"
                        >
                          <BsXCircle />
                        </span>
                      </label>
                      <input
                        onChange={handleChange}
                        value={expensesData.paymentType}
                        id="paymentType"
                        list="pt"
                        className="rounded px-2 py-1 text-black outline-blue-400 h-8"
                        type="text"
                        name="pt"
                      />
                      <datalist id="pt">
                        {opt.pt !== undefined &&
                          opt.pt.length > 0 &&
                          opt.pt.map((p, i) => (
                            <option key={i} value={p}>
                              {p}
                            </option>
                          ))}
                      </datalist>
                    </div>
                  )}
                  <div className="flex flex-col text-left gap-2 w-full">
                    <label
                      htmlFor="reportingOfficer"
                      className="flex gap-2 items-center ml-2 text-sm"
                    >
                      <BsPersonCheckFill /> Approval Authority
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
                      {allUser.map(
                        (v) =>
                          user._id !== v._id && (
                            <option
                              className="uppercase font-thin"
                              title={v && v._id.slice(20, 24)}
                              value={v._id}
                            >
                              {v.userName}
                            </option>
                          )
                      )}
                      <option value="None">None</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    {file.name === undefined ? (
                      <>
                        <label
                          htmlFor="file"
                          className="flex  justify-center cursor-pointer hover:bg-violet-300 active:bg-violet-700 ease-in-out duration-100 gap-2 items-center px-5 bg-white text-black h-full rounded-lg"
                        >
                          <BsFillFileEarmarkPdfFill /> Upload Bill <br /> (max
                          -70Kb)
                        </label>
                        <input
                          onChange={(e) => {
                            if (e.target.files[0].size > 2166022) {
                              alert(
                                "file size is more then 2 Mb, Please select again upto 2 Mb only. (" +
                                  e.target.files[0].size / 1000000 +
                                  ")"
                              );
                            } else {
                              setFile(e.target.files[0]);
                            }
                          }}
                          type="file"
                          id="file"
                          data-max-size="2048"
                          placeholder="Select"
                          className="hidden"
                          accept="image/png, image/jpeg, .pdf"
                        />{" "}
                      </>
                    ) : (
                      <div
                        title={file.name}
                        className="flex flex-col gap-2 h-full"
                      >
                        <span className="flex gap-2 items-center ml-2 text-sm pr-5">
                          <BsFillFileEarmarkPdfFill /> Enclosed Bill
                        </span>
                        <span className="bg-violet-300 relative text-sm text-violet-800 h-8 flex items-center px-2 rounded">
                          {file.name}{" "}
                          <span
                            onClick={() => setFile(0)}
                            className="absolute right-2 flex justify-center items-center cursor-pointer text-lg rounded h-4 w-4"
                          >
                            <BsX />
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex scrn-lap-S:flex-wrap flex-col text-left gap-2 w-full">
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
                <div className="flex justify-around w-full gap-3">
                  <button className="border w-full py-2 bg-white dark:bg-blue-500 dark:border-transparent rounded">
                    Submit
                  </button>
                  <button
                    onClick={() => {
                      setAddBtn(false);
                    }}
                    className="border w-full py-2 bg-white dark:bg-red-500 dark:border-transparent rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewExpenses;

const convertToBase64 = (file) => {
  if (!file) return;
  else
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
};
