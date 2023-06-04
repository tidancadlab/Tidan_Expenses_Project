import {
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
  BsArrowRepeat,
} from "react-icons/bs";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import ExpView from "../../../component/Pages/ExpApp/contenet/ExpView";
import ProgressBar from "../../../component/Pages/ExpApp/contenet/ProgressBar";
import successClick from "../../../Music/successClick.mp3";
import TranTable from "../../../component/Pages/ExpApp/Expenses/TranTable";
import { refresh as ref } from "../../../Store/refreshData";
import {
  createSearchParams,
  useParams,
  useSearchParams,
} from "react-router-dom";
import AddNewExpenses from "../../../component/Pages/ExpApp/contenet/AddExpensesPage";
import SearchInput from "../../../component/Pages/ExpApp/contenet/SearchInput";
import Skeleton from "../../../component/js/Skeleton";
import {
  CardTran,
  CardTranSkelton,
} from "../../../component/Pages/ExpApp/Expenses/CradTran";
import EditExp from "./EditExp";
import { useDispatch, useSelector } from "react-redux";

const currencyFormat = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

function AddExpenses({ loggedUser, transData }) {
  document.title = "Expenses-Tidan Expenses";
  const abc = useSelector((state) => state);
  const tranData = useSelector((state) => state.tran);
  const [addBtn, setAddBtn] = useState(false);
  const tran = tranData.data === undefined ? [] : tranData.data;
  const [inputErr, setInputErr] = useState("");
  const [searchTran, setSearchTran] = useState(false);
  const [editItem, setEditItem] = useState(0);
  const [expendSearch, setExpendSearch] = useState(true);
  const [activeEdit, setActiveEdit] = useState(false);
  const [updateData, setUpdateData] = useState({ status: tranData.code !== undefined ? true : tranData.code, upT: 4 });
  const [refresh, setRefresh] = useState(false);
  const params = useParams();

  const [allUser, setAllUser] = useState([]);
  const dispatch = useDispatch();
  const refState = () => {
    dispatch(ref(abc.refresh ? false : true));
    setRefresh(true);
  };
  useEffect(() => {
    setRefresh(false);
  }, [tranData]);

  useEffect(() => {
    refState();
  }, []);
  useEffect(() => {
    fetch("https://tidan-e-app.onrender.com/allUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setAllUser(data));
  }, []);

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

  const sortData = () => {};
  searchData = searchData.sort(
    (a, b) => new Date(b.expUploadedOnTime) - new Date(a.expUploadedOnTime)
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
  const [optData, setOptData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/allUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setOptData(data));
  }, []);
  let SkeltonAnimate = [];
  let SkeltonCard = [];
  for (let i = 0; i < 11; i++) {
    SkeltonAnimate.push(<Skeleton className="px-2 container m-auto" key={i} />);
    SkeltonCard.push(<CardTranSkelton key={i} />);
  }

  const editExp = tran.filter((v, i) => {
    return v._id === editItem;
  });

  return (
    <>
      {addBtn && (
        <AddNewExpenses
          moment={moment}
          setAddBtn={setAddBtn}
          optData={optData}
          setOptData={setOptData}
        />
      )}
      <div
        className={`${
          darkMode === "dark" ? "bg-img" : "bg-img3"
        } min-h-screen h-full scrn-lap-S:pt-0 pt-16`}
      >
        <div
          id="name"
          className="hidden scrn-lap-S:block text-white pt-3 bg-black h-12 fixed z-50 w-full ease-in-out duration-300"
        >
          <h1>
            List of <b>Expenses</b> made by <b>you</b>
          </h1>
        </div>
        <div className="flex scrn-lap-S:m-0 ml-16 upto-lab-s:ml-0 justify-center scrn-lap-S:backdrop-blur-xl scrn-lap-S:bg-black scrn-lap-S:bg-opacity-10">
          {loggedUser ? (
            <div className="container scrn-lap-S:min-w-full scrn-lap-S:mt-4 mt-9 p-2 border-black dark:border-white rounded-3xl">
              <SearchInput
                searchTran={searchTran}
                loggedUser={loggedUser}
                searchActive={searchActive}
                expendSearch={expendSearch}
                limitedTran={limitedTran}
                searchQuery={searchQuery}
                setExpendSearch={setExpendSearch}
                searchParams={searchParams}
                SetSearchParams={SetSearchParams}
                createSearchParams={createSearchParams}
                inputErr={inputErr}
                setSearchTran={setSearchTran}
                addBtn={addBtn}
                setAddBtn={setAddBtn}
                refresh={refresh}
              />
              <div className="dataDiv scrn-lap-S:hidden min-h-[610px] rounded-xl dark:shadow-black bg-white border-4 dark:border-[#484f73] border-[#fc8874] dark:bg-[#242323]">
                <ul className="flex justify-between p-1 uppercase items-center rounded-t dark:text-white text-black divide-x divide-dashed dark:divide-white divide-black dark:bg-[#484f73] bg-[#fc8874]">
                  <li className="flex-col w-[130px]">
                    <span
                      onClick={sortData}
                      id="Date"
                      className="flex items-center gap-1"
                    >
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
                {(limitedTran.length === 0) &&
                  SkeltonAnimate}
                {updateData.status || limitedTran.length !== 0 ? (
                  <div className=" ">
                    {limitedTran.map((item, idx) => {
                      return (
                        <ul
                          key={item._id}
                          className={`flex ${
                            item.expApprovalStatus.toLowerCase() === "pending"
                              ? "text-black dark:bg-transparent"
                              : item.expApprovalStatus.toLowerCase() ===
                                "approved"
                              ? "bg-green-500 bg-opacity-30 dark:bg-transparent"
                              : "bg-red-500 bg-opacity-30 dark:bg-transparent"
                          } dark:text-white last:border-none align-top px-1 py-1 divide-x divide-dashed dark:divide-white divide-black border-b border-dashed border-black dark:border-white justify-between items-center `}
                        >
                          <TranTable
                            item={item}
                            idx={idx}
                            moment={moment}
                            setEditItem={setEditItem}
                            setActiveEdit={setActiveEdit}
                            currencyFormat={currencyFormat}
                            viewExpenses={viewExpenses}
                            deleteItem={deleteItem}
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
              <div className="hidden scrn-lap-S:block mt-10">
                <div className="flex justify-between w-full">
                  <div className="flex justify-end pr-1">
                    <button
                      onClick={() => setAddBtn(true)}
                      className="w-fit px-4 py-1  rounded-full bg-[#428CFC] hover:bg-blue-600"
                    >
                      New
                    </button>
                  </div>
                  <div className=" text-right">
                    <button
                      onClick={refState}
                      className="border flex gap-1 items-center px-2 py-1 rounded bg-orange-500 hover:bg-transparent hover:text-black backdrop-blur-md ease-in-out duration-200"
                    >
                      <span
                        className={`${
                          refresh ? "animate-spin" : "animate-none"
                        }`}
                      >
                        <BsArrowRepeat />
                      </span>{" "}
                      Refresh
                    </button>
                  </div>
                </div>
                {limitedTran.length !== 0 ? (
                  <div className="mb-14">
                    {tran.map((v, idx) => (
                      <CardTran
                        v={v}
                        key={v._id}
                        allUser={allUser}
                        deleteItem={deleteItem}
                        setActiveEdit={setActiveEdit}
                        setEditItem={setEditItem}
                        idx={idx}
                      />
                    ))}
                  </div>
                ) : (
                  <div>{SkeltonCard}</div>
                )}
              </div>
              <div className="flex scrn-lap-S:hidden justify-end max-w-[1500px] m-auto items-center gap-1 text-black dark:text-white mt-10">
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
        />
      )}
      {activeEdit && editExp.length !== 0 && allUser !== 0 ? (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="flex relative">
            <EditExp
              v={editExp[0]}
              allUser={allUser}
              setActiveEdit={setActiveEdit}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AddExpenses;
