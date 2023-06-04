import { BsX, BsCalendar, BsSearch, BsArrowRepeat } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { refresh as ref } from "../../../../Store/refreshData";

function SearchInput({
  searchTran,
  searchActive,
  expendSearch,
  limitedTran,
  searchQuery,
  setExpendSearch,
  searchParams,
  SetSearchParams,
  createSearchParams,
  inputErr,
  setSearchTran,
  addBtn,
  setAddBtn,
  loggedUser,
  refresh,
}) {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={`w-full scrn-lap-S:hidden relative mb-3 p-2 ${
          !(!searchActive && !expendSearch && limitedTran.length > 0)
            ? "rounded-l-full"
            : "rounded-lg"
        } flex justify-between dark:text-white bg-[#4fecb1] border-2 dark:border-[#242323] border-[#fc8874] dark:bg-[#484f73]`}
      >
        {searchTran ? (
          <div
            // onBlur={() => setExpendSearch(true)}
            className={` ${
              !(!searchActive && !expendSearch && limitedTran.length > 0)
                ? "rounded-full"
                : "rounded-t-md border-b-transparent border-blue-500"
            } relative  min-w-[256px] bg-white flex flex-col border-black dark:border-[#242323] border dark:bg-slate-900`}
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
              <div className="bg-transparent dateInp text-black dark:text-white w-5 relative flex items-center border-transparent">
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
                className="rounded-full hover:bg-gray-800 dark:text-white text-2xl dark:border-white text-black p-1 mr-1 right-2"
              >
                <BsX />
              </button>
            </div>
            <div
              hidden={
                !(!searchActive && !expendSearch && limitedTran.length > 0)
              }
              className="absolute border border-t-0 border-[#242323] top-10 bg-white dark:bg-slate-900 w-[calc(100%+2px)] -ml-[1px] z-50 rounded-b-lg bg-opacity-40 backdrop-blur-md text-left min-h-[40px] max-h-96 px-1.5 overflow-y-auto"
            >
              {limitedTran.slice(0, 8).map((v) => (
                <p
                  key={v._id}
                  onClick={(e) => {
                    SetSearchParams(
                      createSearchParams({
                        tran: v.expItem,
                        tranDate: searchParams.get("tranDate"),
                      })
                    );
                    setExpendSearch(true);
                  }}
                  className={`px-2 my-1.5 py-1.5 border rounded-md border-black dark:border-white last:mb-2 cursor-pointer bg-[#4efcb1] dark:bg-[#444f73] hover:bg-[#fc8874] dark:hover:bg-[#6d76a6]`}
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
            className="border rounded-full border-black dark:border-[#242323] bg-[#fc8874] p-3 hover:rounded-r-md cursor-pointer"
          >
            <BsSearch />
          </div>
        )}
        <div
          className={`absolute text-3xl scrn-lap-S:hidden uppercase font-extralight top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center`}
        >
          <h1>
            List of <b>Expenses</b> made by <b>you</b>
          </h1>
        </div>
        <div className="flex gap-2">
          {!addBtn && (
            <div
              onClick={() => setAddBtn(addBtn ? false : true)}
              className={`w-20 rounded right-2 flex gap-1 dark:bg-[#242323] bg-[#fce742] border text-black hover:rounded-full border-blue-800 dark:border-transparent p-1 justify-center items-center cursor-pointer dark:text-white`}
            >
              Add
            </div>
          )}
          <button
            onClick={() => {
              dispatch(ref(false));
            }}
            className="border flex gap-1 items-center px-2 py-1 rounded bg-orange-300 border-orange-800 text-orange-800 hover:text-black backdrop-blur-md ease-in-out duration-200"
          >
            <span className={`${refresh ? "animate-spin" : "animate-none"}`}>
              <BsArrowRepeat />
            </span>{" "}
            Refresh
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchInput;
