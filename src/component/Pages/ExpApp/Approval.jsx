import { BsCaretDownFill, BsSearch, BsShop, BsX } from "react-icons/bs";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import ExpView from "./contenet/ExpView";
import notFound from "../../../Images/notFound.svg";
import ApproveExpenses from "./contenet/ApproveExpenses";
import { createSearchParams, useSearchParams } from "react-router-dom";

localStorage.setItem("notFoudImg", notFound);
const notFoundImg = localStorage.getItem("notFoundImg");

function Approval(props) {
  //<-----Variables------>
  const { titleName, loggedUser } = props;
  titleName.innerHTML = "Approval-Tidan Expenses";
  const [tran, setTran] = useState([]);
  let [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [pageRefresh, setPageRefresh] = useState(true);
  const [userPtyData, setUserPtyData] = useState({});

  //<------Fetch API----->
  useEffect(() => {
    fetch("/addExpenses")
      .then((response) => response.json())
      .then((data) => setTran(data));
  }, [pageRefresh]);

  useEffect(() => {
    if (loggedUser.userId !== undefined) {
      const { userId } = loggedUser;
      fetch("/userDataProperty", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ userId }),
      })
        .then((res) => res.json())
        .then((data) => setUserPtyData(data));
    } else {
    }
  }, [loggedUser]); 
  //<----Search Quarry --->
  const [searchInput, setSearchInput] = useState("");
  const [searchFilterResult, setSearchFilterResult] = useState([]);
  async function searchTrans() {
    const searchFilter = await tran.filter(
      (value) =>
        value.expItem.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.expVendor.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchFilterResult(await searchFilter);
  }

  /// <-------Array Filter by user------->
  const filteredTranArray = tran.filter(function (id) {
    return id.userLevel < loggedUser.userProperty.userLevel;
  });

  ///<-----------Array Search ------>
  const [searchParams, SetSearchParams] = useSearchParams("");
  const dataUrl = searchParams.get("tran");
  let searchData = filteredTranArray.filter(function (v) {
    return v.expItem.startsWith(dataUrl ? dataUrl.toLocaleLowerCase() : "");
  });


  // <----- Pages ------->

  let dataArray =
    searchFilterResult.length <= 0 ? searchData : searchFilterResult;
  const transactionPerPage = 14;
  let visitedPages = transactionPerPage * currentPageNumber;
  let pageNumber = [];

  for (
    let index = 1;
    index <= Math.ceil(searchData.length / transactionPerPage);
    index++
  ) {
    pageNumber.push(index);
  }
  let totalPages = [];
  for (let index = 0; index < dataArray.length / transactionPerPage; index++) {
    totalPages.push(index + 1);
  }

  const limitedTrans = dataArray.slice(
    visitedPages,
    visitedPages + transactionPerPage
  );

  const [idxSelectedItem, setIdxSelectedItem] = useState(0);
  const [viewDetailedExp, setViewDetailedExp] = useState(false);

  const viewTrans = (item) => {
    setIdxSelectedItem(item);
    setViewDetailedExp(true);
  };

  function nextExp() {
    setIdxSelectedItem((idxSelectedItem) =>
      idxSelectedItem < limitedTrans.length - 1
        ? idxSelectedItem + 1
        : limitedTrans.length - 1
    );
  }

  function previExp() {
    setIdxSelectedItem((idxSelectedItem) =>
      idxSelectedItem > 0 ? idxSelectedItem - 1 : 0
    );
  }
  const selectedExpenses = limitedTrans[idxSelectedItem] || 0;
 //<----------Dark Background----------->

 const darkMode = localStorage.getItem("DarkMode");

  
  return (
    <>
      {tran.length > 0 ? (
        <div className={`${darkMode === "dark"? "bg-img":"bg-img3"} min-h-screen h-full pt-16`}>
          <div className="flex justify-center">
            <div className="container p-2 border-black dark:border-white rounded-3xl">
              <div className="flex justify-between p-3 dark:text-white">
                <div>
                  <p className="text-3xl font-Kalam">Approval Sheet</p>
                </div>
                <div className="relative flex items-center h-10 rounded-full border border-dashed border-[#FC8874] dark:bg-slate-800">
                  <input
                    className="outline-none pl-5 pr-8 py-1 rounded-l-full bg-transparent font-Kalam"
                    type="text"
                    list="searchData"
                    value={dataUrl}
                    placeholder="Search"
                    onChange={(e) => {
                      SetSearchParams(
                        createSearchParams({ tran: e.target.value })
                      );
                    }}
                  />
                  <datalist id="searchData">
                    {filteredTranArray.map(v=><option key={v._id} value={v.expItem}>{v.expItem}</option>)}
                  </datalist>
                  <div className="h-full border-slate-900 border-l border-dashed w-0.5"></div>
                  <div
                  disabled={dataUrl === ""}
                    onClick={(e) => {
                      SetSearchParams(
                        createSearchParams({ tran: "" })
                      );
                    }}
                    className={`${dataUrl === ""? "opacity-0" : ""} flex h-full justify-center items-center rounded-r-full pl-2 px-4 hover:bg-slate-700`}
                  >
                    <BsX />
                  </div>
                </div>
              </div>
              {/* Data for Approval*/}
              {true ? (
                <div className="dataDiv rounded px-2 py-2 dark:text-white bg-[#FC8874] dark:bg-[#212121]">
                  <ul className="flex justify-around rounded-t py-2 items-center bg-[#FCE742] text-black divide-x divide-dashed divide-[#FC8874] dark:divide-white border-b border-dashed border-white dark:border-white">
                    <li className="cursor-pointer w-[150px]  font-Kalam">
                      Bill Date <BsCaretDownFill />
                    </li>
                    <li className=" font-Kalam w-36">Item</li>
                    <li className=" font-Kalam w-28">Amount</li>
                    <li className=" font-Kalam w-24">Attachment</li>
                    <li className=" font-Kalam w-32">Uploaded By</li>
                    <li className=" font-Kalam w-52">Remark</li>
                    <li className=" font-Kalam w-24 text-center">Approval</li>
                    <li className=" font-Kalam w-52">Remark if Reject</li>
                    <li className=" font-Kalam w-20">Action</li>
                  </ul>

                  <div>
                    {limitedTrans.map((item, idx) => {
                      return (
                        <ul
                          key={item._id}
                          className="flex text-sm testdiv font-thin justify-around items-center divide-x divide-dashed divide-black dark:divide-white border-b border-dashed border-black dark:border-white"
                        >
                          <li className="flex flex-col w-[150px]">
                            <span className=" font-Kalam">
                              {moment(item.expDate).format("DD-MMM-YY")}
                            </span>
                            <a
                              href={void 0}
                              onClick={() => viewTrans(idx)}
                              className="text-[10px] visited:text-red-500 cursor-pointer hover:underline text-sky-500 hover:text-blue-500"
                            >
                              {item._id}
                            </a>
                          </li>
                          <li className="flex flex-col gap-1 capitalize w-36">
                            <span className="truncate text-sm font-normal  font-Kalam">
                              {item.expItem}
                            </span>
                            <span className="text-xs flex gap-2 items-baseline text-orange-500">
                              <span className="text-[10px]">
                                <BsShop />
                              </span>{" "}
                              <span className="truncate">{item.expVendor}</span>
                            </span>
                          </li>
                          <li className="w-28 font-Kalam">
                            {(item.expAmount)}
                          </li>
                          <li className="w-24 text-sm">
                            <span className="text-blue-500 underline cursor-pointer">
                              {item.billFile || (
                                <span className="cursor-auto text-white no-underline">
                                  N/A
                                </span>
                              )}
                            </span>
                          </li>
                          <li className="flex flex-col w-32 capitalize">
                            <span className=" font-Kalam">
                              {item.expUploaded}
                            </span>
                            <span className="text-xs text-teal-500  font-Kalam">
                              {moment(item.expUploadedOnTime).format(
                                "DD-MM-YY hh:mm A"
                              )}
                            </span>
                          </li>
                          <li
                            title={item.expRemark}
                            className="w-52 font-Kalam capitalize"
                          >
                            {item.expRemark || "---"}
                          </li>
                          <ApproveExpenses
                            setPageRefresh={setPageRefresh}
                            pageRefresh={pageRefresh}
                            item={item}
                            // waitingBtnAnimation = {waitingBtnAnimation}
                            // setWaitingBtnAnimation = {setWaitingBtnAnimation}
                          />
                        </ul>
                      );
                    })}
                  </div>

                  {pageNumber.length > 1 && (
                    <div className="flex gap-5 justify-end bg-white text-black px-5 rounded-b-lg">
                      <button
                        disabled={currentPageNumber === 0}
                        hidden={currentPageNumber === 0}
                        onClick={() =>
                          setCurrentPageNumber(
                            currentPageNumber <= 0 ? 0 : currentPageNumber - 1
                          )
                        }
                      >
                        Previous
                      </button>
                      <div className="flex">
                        {pageNumber.length === 1 ? "Page" : "Pages"}{" "}
                        {pageNumber[currentPageNumber] || 1} of{" "}
                        {pageNumber.length}
                      </div>
                      <button
                        disabled={currentPageNumber === totalPages.length - 1}
                        hidden={currentPageNumber === totalPages.length - 1}
                        onClick={() =>
                          setCurrentPageNumber(
                            currentPageNumber < totalPages.length - 1
                              ? currentPageNumber + 1
                              : totalPages.length - 1
                          )
                        }
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
            {viewDetailedExp && (
              <ExpView
                selectedExpenses={selectedExpenses}
                setViewDetailedExp={setViewDetailedExp}
                nextExp={nextExp}
                previExp={previExp}
                limitedTran={limitedTrans}
                idxSelectedItem={idxSelectedItem}
                setIdxSelectedItem={setIdxSelectedItem}
                crPageNum={currentPageNumber}
                titleName={titleName}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex text-7xl justify-center pt-20 text-black">
          Waiting....
        </div>
      )}
    </>
  );
}

export default Approval;
