import {
  BsFillPlusCircleFill,
  BsX,
  BsArrowLeft,
  BsArrowRight,
  BsCalendar,
  BsTextLeft,
  BsShop,
  BsFileEarmarkPdf,
  BsPersonBoundingBox,
  BsCalendarEvent,
  BsBlockquoteRight,
  BsCheck2Square,
  BsFillMouse3Fill,
  BsSearch,
} from "react-icons/bs";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import dataNotFoundImg from "../../../Images/2451354.jpg";
import ExpView from "./contenet/ExpView";
import ProgressBar from "./contenet/ProgressBar";
import successClick from "../../../Music/successClick.mp3";
import TranTable from "./Expenses/TranTable";
import { expensesData } from "../../js/FetchModule";
import {
  createSearchParams,
  useParams,
  useSearchParams,
} from "react-router-dom";
import AddNewExpenses from "./contenet/AddExpensesPage";

const currencyFormat = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

function AddExpenses({ titleName, loggedUser, transData }) {
  titleName.innerHTML = "Expenses-Tidan Expenses";
  const [addBtn, setAddBtn] = useState(false);
  const [tran, setTran] = useState(transData);
  const [inputErr, setInputErr] = useState("");
  const [searchTran, setSearchTran] = useState(false);
  const [expendSearch, setExpendSearch] = useState(true);
  const [updateData, setUpdateData] = useState();
  const params = useParams();


  const DataApi = async () => {
    const rs = await expensesData(
      `https://tidan-e-app.onrender.com/dashBoard`,
      params.id
    );
    rs.json().then((a) => setTran(a));
    setUpdateData(rs.status)
  };

  if (params.id === undefined && !updateData) {
    DataApi();
  }

  useEffect(() => {
    if (!updateData) {
      return;
    } else {
      DataApi();
    }
  }, [searchTran, inputErr, loggedUser, addBtn]);

  if (inputErr.length >= 1 || inputErr.length === undefined) {
    const errTimer = setTimeout(() => {
      setInputErr("");
      clearTimeout(errTimer);
    }, 10000);
  }

  function deleteItem(id) {
    fetch("https://tidan-e-app.onrender.com/addExpenses/" + id, {
      method: "DELETE",
    }).then((result) => {
      result.json().then(async (resp) => {
        new Audio(successClick).play();
        await setInputErr(
          <ProgressBar
            cssColor={"bg-green-500"}
            cssMessage={"text-green-500 lowercase"}
            message={"Successfully Deleted ID no. " + resp._id}
          />
        );
      });
    });
  }

  /// <-------Array Filter by user------->

  const [searchParams, SetSearchParams] = useSearchParams("");
  const dataUrl = searchParams.get("tranDate");
  let searchData = tran.filter(function (v) {
    if (dataUrl === null) {
      return v.expDate.includes("");
    } else {
      return v.expDate.includes(dataUrl);
    }
  });

  const expURL = searchParams.get("tran");
  searchData = searchData.filter(function (v) {
    return v.expItem.includes(expURL ? expURL.toLocaleLowerCase() : "");
  });

  searchData = searchData.sort(
    (a, b) => new Date(b.expDate) - new Date(a.expDate)
  );
  const [crPageNum, setCrPageNum] = useState(0);
  const transactionPerPage = 11;
  const visitedPage = crPageNum * transactionPerPage;

  let pageNumber = [];

  for (
    let index = 1;
    index <= Math.ceil(searchData.length / transactionPerPage);
    index++
  ) {
    pageNumber.push(index);
  }
  const maximumBtnSeen = 5;
  pageNumber = pageNumber.slice(0, maximumBtnSeen);

  const limitedTran = searchData.slice(
    visitedPage,
    visitedPage + transactionPerPage
  );

  const [idxSelectedItem, setIdxSelectedItem] = useState(0);
  const [viewDetailedExp, setViewDetailedExp] = useState(false);

  const viewExpenses = (item) => {
    setIdxSelectedItem(item);
    setViewDetailedExp(true);
  };

  function nextExp() {
    setIdxSelectedItem((idxSelectedItem) =>
      idxSelectedItem < limitedTran.length - 1
        ? idxSelectedItem + 1
        : limitedTran.length - 1
    );
  }

  function previExp() {
    setIdxSelectedItem((idxSelectedItem) =>
      idxSelectedItem > 0 ? idxSelectedItem - 1 : 0
    );
  }

  const selectedExpenses = limitedTran[idxSelectedItem] || 0;

  let searchSelect = [];
  for (const dataObj of searchData) {
    searchSelect.push(dataObj.expItem);
    searchSelect.push(dataObj.expVendor);
  }
  function removeDuplicates(searchSelect) {
    return searchSelect.filter(
      (item, index) => searchSelect.indexOf(item) === index
    );
  }

  searchSelect = removeDuplicates(searchSelect);
  searchSelect = searchSelect.sort();
  searchSelect = searchSelect.slice(1);

  let searchActive =
    (searchParams.get("tran") === null ? 0 : searchParams.get("tran").length) <=
    0;

  //<----------Dark Background----------->

  const darkMode = localStorage.getItem("DarkMode");

  ///<-------Search Query --->

  const searchQuery = (e) => {
    const { name, value } = e.target;

    SetSearchParams(
      createSearchParams({
        tran: name === "item" ? value : searchParams.get("tran") || "",
        tranDate: name === "date" ? value : searchParams.get("tranDate") || "",
      })
    );
  };

  return (
    <>
      {addBtn && <AddNewExpenses moment={moment} setAddBtn={setAddBtn} />}
      <div
        className={`${
          darkMode === "dark" ? "bg-img" : "bg-img3"
        } min-h-screen h-full pt-16`}
      >
        <div className="flex ml-32 upto-lab-s:ml-0 justify-center">
          {loggedUser ? (
            <div className="container mt-9 p-2 border-black dark:border-white rounded-3xl">
              <div className="w-full relative mb-3 p-2 rounded flex justify-between dark:text-white bg-blue-100">
                {searchTran ? (
                  <div
                    // onBlur={() => setExpendSearch(true)}
                    className={` ${
                      !(
                        !searchActive &&
                        !expendSearch &&
                        limitedTran.length > 0
                      )
                        ? "rounded-md"
                        : "rounded-t-md border-b-transparent border-blue-500"
                    } shadow-xl relative  min-w-[256px] bg-white flex flex-col border-black dark:border-orange-500 border dark:bg-transparent`}
                  >
                    <div className="flex items-center z-30 flex-row h-10 w-">
                      <input
                        onChange={searchQuery}
                        onFocus={() => setExpendSearch(false)}
                        className=" max-w-lg w-[218px] px-4 scrn-mob:max-w-fit outline-none bg-transparent text-black dark:text-white"
                        type="text"
                        value={searchParams.get("tran") || ""}
                        name="item"
                        placeholder="Search Transaction..."
                        id=""
                      />
                      <div className="border w-5 relative border-black flex rounded-lg items-center dark:bg-slate-800 border-transparent">
                        <label htmlFor="dateSearch">
                          <BsCalendar />
                        </label>
                        <input
                          className={`opacity-0`}
                          onChange={searchQuery}
                          value={searchParams.get("tranDate") || ""}
                          defaultValue="2022-10-10"
                          type="date"
                          name="date"
                          id="dateSearch"
                        />
                      </div>
                      <button
                        hidden={
                          (searchParams.get("tran") === null ||
                          searchParams.get("tranDate") === null
                            ? 0
                            : searchParams.get("tran").length) <= 0 &&
                          searchParams.get("tranDate") <= 0
                        }
                        onClick={() => {
                          SetSearchParams(createSearchParams({ tran: "" }));
                        }}
                        className="rounded-full hover:bg-gray-400 dark:border-white dark:text-white p-2 mr-1 right-2"
                      >
                        <BsX />
                      </button>
                    </div>
                    <div
                      hidden={
                        !(
                          !searchActive &&
                          !expendSearch &&
                          limitedTran.length > 0
                        )
                      }
                      className="absolute border border-t-0 border-blue-500 top-10 bg-white dark:bg-slate-900 w-[calc(100%+2px)] -ml-[1px] z-50 rounded-b-lg bg-opacity-40 backdrop-blur-md shadow-2xl text-left min-h-[40px] max-h-96 px-1.5 overflow-y-auto"
                    >
                      {limitedTran.slice(0, 8).map((v) => (
                        <p
                          key={v._id}
                          onClick={(e) => {
                            SetSearchParams(
                              createSearchParams({ tran: v.expItem })
                            );
                            setExpendSearch(true);
                          }}
                          className={`px-2 my-1.5 py-1.5 rounded-md border-black dark:border-orange-400 last:mb-2 cursor-pointer bg-[#4efcb1] dark:bg-[#444f73] hover:bg-[#fc8874] dark:hover:bg-[#6d76a6]`}
                        >
                          <span className="flex items-center gap-3">
                            <BsSearch className="text-xs" /> {v.expItem}
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setSearchTran(true)}
                    className="border border-black dark:border-orange-500 hover:border-blue-600 hover:text-blue-600 p-3 rounded-md cursor-pointer"
                  >
                    <BsSearch />
                  </div>
                )}
                <div
                  className={`${
                    inputErr.length !== 0 ? "opacity-100 " : "opacity-0"
                  } uppercase ease-in-out duration-300 px-2 h-7 flex items-center shad-1 rounded`}
                >
                  {inputErr}
                </div>
                {!addBtn && (
                  <div
                    onClick={() => setAddBtn(addBtn ? false : true)}
                    className={`w-20 rounded right-2 flex gap-1 bg-blue-300 border text-blue-800 border-blue-800 p-1 justify-center items-center cursor-pointer dark:text-black`}
                  >
                    Add
                  </div>
                )}
              </div>
              <div className="dataDiv p-2 min-h-[610px] rounded shadow-xl dark:shadow-2xl dark:shadow-black ease-in-out duration-500 bg-white dark:bg-black dark:bg-opacity-30 dark:backdrop-blur-3xl bg-opacity-60 backdrop-blur-3xl">
                <ul className="flex justify-between px-1 py-1 uppercase items-center rounded-t dark:text-white text-black border-b border-dashed border-white divide-x divide-dashed divide-white dark:bg-black bg-white bg-opacity-60">
                  <li className="flex-col w-[130px]">
                    <span className="flex items-center gap-1">
                      <BsCalendar /> Date
                    </span>
                    <span className="text-xs">Transaction ID</span>
                  </li>
                  <li className="w-[200px] flex-col">
                    <span className="flex items-center gap-1">
                      <BsTextLeft /> Item Description
                    </span>
                    <span className="text-xs flex items-start gap-2">
                      <BsShop /> Vender Name
                    </span>
                  </li>
                  <li className="w-28 flex-col">
                    <span>₹ Amount</span>
                  </li>
                  <li className="w-36 flex items-center gap-1">
                    <BsFileEarmarkPdf />
                    File
                  </li>
                  <li className="w-36 flex-col">
                    <span className="flex items-center gap-1">
                      <BsPersonBoundingBox />
                      Expensed By
                    </span>
                    <span className="text-xs flex items-center gap-2">
                      <BsCalendarEvent /> Uploaded On
                    </span>
                  </li>
                  <li className="w-64 flex items-center gap-1">
                    <BsBlockquoteRight /> Remark
                  </li>
                  <li className="w-28 flex items-center gap-1">
                    <BsCheck2Square /> Approval
                  </li>
                  <li className="w-28 flex items-center gap-1">
                    <BsFillMouse3Fill /> Action
                  </li>
                </ul>
                {/* {addBtn && (
                  <NewExpEntry
                    handleSubmit={handleSubmit}
                    moment={moment}
                    expensesData={expensesData}
                    handleChange={handleChange}
                  />
                )} */}
                {limitedTran.length !== 0 ? (
                  <div className=" ">
                    {limitedTran.map((item, idx) => {
                      return (
                        <ul
                          key={item._id}
                          className="flex last:border-none align-top px-1 py-1 divide-x divide-dashed dark:divide-white divide-black border-b border-dashed border-black dark:border-white justify-between items-center text-black dark:text-white bg-transparent "
                        >
                          <TranTable
                            item={item}
                            idx={idx}
                            moment={moment}
                            currencyFormat={currencyFormat}
                            viewExpenses={viewExpenses}
                            deleteItem={deleteItem}
                            // moreThreeDay={moreThreeDay}
                          />
                        </ul>
                      );
                    })}
                  </div>
                ) : (
                  <p className="mt-5 text-5xl border p-2 border-orange-400 w-fit m-auto rounded-md text-orange-700 bg-orange-300">
                    {tran.length <= 0 ? "Loading" : "No Data Found"}
                  </p>
                )}
              </div>
              <div className="flex justify-end max-w-[1500px] m-auto items-center gap-1 text-black dark:text-white mt-10">
                <div
                  hidden={crPageNum <= 0}
                  onClick={() =>
                    setCrPageNum((crPageNum) =>
                      crPageNum > 1 ? crPageNum - 1 : 0
                    )
                  }
                  className={` border border-black dark:border-white w-7 h-7 rounded  hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black active:bg-slate-300 ease-in-out duration-200`}
                >
                  <button className="w-full h-full flex justify-center items-center">
                    <BsArrowLeft />
                  </button>
                </div>
                {pageNumber.map((pageNumber, idx) => {
                  return (
                    <div
                      key={idx}
                      className={` ${
                        crPageNum === pageNumber - 1
                          ? "bg-black dark:bg-white dark:text-black text-white"
                          : "bg-none"
                      } border border-black dark:border-white w-7 h-7 rounded cursor-pointer dark:hover:bg-white dark:hover:text-black active:bg-slate-300 ease-in-out duration-200`}
                    >
                      <button
                        className="h-full w-full"
                        onClick={() => {
                          setCrPageNum(pageNumber - 1);
                          setIdxSelectedItem(0);
                        }}
                      >
                        {pageNumber}
                      </button>
                    </div>
                  );
                })}
                {/* <div className="border w-7 h-7 rounded  hover:bg-white hover:text-black active:bg-slate-300">
                <div>...</div>
              </div> */}
                <div
                  hidden={crPageNum >= pageNumber.length - 1}
                  onClick={() =>
                    setCrPageNum((crPageNum) =>
                      crPageNum < pageNumber.length - 1
                        ? crPageNum + 1
                        : pageNumber.length - 1
                    )
                  }
                  className={` ${
                    crPageNum < pageNumber.length - 1 ? "" : "opacity-20"
                  } border w-7 h-7 rounded  hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black active:bg-slate-300 ease-in-out duration-300 `}
                >
                  <button className="w-full h-full flex justify-center items-center">
                    <BsArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex relative justify-center items-center dark:text-white h-36 w-36 rounded-full dark:border-gray-800 animate-bounce border-4 mt-72">
              {" "}
              loading...
              <div className="absolute top-[-4px] left-[-4px] h-[144px] w-[144px] border-4 border-transparent animate-spin border-b-red-400 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
      {viewDetailedExp && (
        <ExpView
          selectedExpenses={selectedExpenses}
          setViewDetailedExp={setViewDetailedExp}
          nextExp={nextExp}
          previExp={previExp}
          limitedTran={limitedTran}
          idxSelectedItem={idxSelectedItem}
          setIdxSelectedItem={setIdxSelectedItem}
          crPageNum={crPageNum}
          titleName={titleName}
        />
      )}
    </>
  );
}

export default AddExpenses;
