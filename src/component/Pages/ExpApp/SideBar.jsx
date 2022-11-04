import { AiFillDashboard } from "react-icons/ai";
import { GiPayMoney, GiHelp } from "react-icons/gi";
import { BsReception3, BsCheck2All } from "react-icons/bs";
import { Link, Outlet, useMatch, useResolvedPath } from "react-router-dom";

function SideBar(props) {
  const sideNavItem = props.data.sideBarItem;
  const sideBarExtendBtn = props.sideBarExtendBtn;

  function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
      <Link
        className={` ${
          isActive
            ? "dark:border-black border-orange-600 bg-violet-600 upto-lab-s:bg-transparent text-white upto-lab-s:text-orange-600 upto-lab-s:rounded-none rounded-lg upto-lab-s:shadow-none shadow-md upto-lab-s:translate-x-0 translate-x-5"
            : "border-transparent text-black hover:bg-gray-900 hover:upto-lab-s:bg-gray-300"
        } upto-lab-s:border-t-2 upto-lab-s:w-16 ease-in-out duration-300`}
        to={to}
        {...props}
      >
        {" "}
        {children}{" "}
      </Link>
    );
  }
  return (
    <>
      <div
        className={`upto-lab-s:bottom-0 upto-lab-s:fixed upto-lab-s:w-full ease-in-out duration-300 fixed`}
      >
        <div
          className={`h-[calc(100vh-64px)] upto-lab-s:justify-around upto-lab-s:items-stretch items-center upto-lab-s:p-0 ease-in-out duration-100 flex flex-col bg-blue-100 dark:bg-gray-800 upto-lab-s:w-full upto-lab-s:h-fit upto-lab-s:pt-1 py-5`}
        >
          <div className="flex flex-col upto-lab-s:justify-around upto-lab-s:flex-row text-white dark:text-black upto-lab-s:gap-1 upto-lab-s:p-0">
            {sideNavItem.map((item, index) => {
              return (
                <CustomLink to={item.link} key={index}>
                  <ul
                    className={`upto-lab-s:py-1 p-4 upto-lab-s:justify-center justify-center  flex`}
                  >
                    <li
                      className={`ease-in duration-100 flex flex-col justify-center items-center dark:text-white`}
                    >
                      {item.Name === "Dashboard" ? (
                        <AiFillDashboard className="text-3xl upto-lab-s:text-xl" />
                      ) : item.Name === "Approval" ? (
                        <BsCheck2All className="text-3xl upto-lab-s:text-xl" />
                      ) : item.Name === "Expenses" ? (
                        <GiPayMoney className="text-3xl upto-lab-s:text-xl" />
                      ) : item.Name === "Graph" ? (
                        <BsReception3 className="text-3xl upto-lab-s:text-xl" />
                      ) : (
                        item.Name === "Help" && (
                          <GiHelp className="text-3xl upto-lab-s:text-xl" />
                        )
                      )}
                      <span className={`upto-lab-s:`}>{item.Name}</span>
                    </li>
                  </ul>
                </CustomLink>
              );
            })}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default SideBar;
