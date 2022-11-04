import { useEffect } from "react";
import { useState } from "react";

const HomeFirst = ({}) => {
  const [nextBtn, setNextBtn] = useState(1);
  const [prvBtn, setPrvBtn] = useState(1);

  const [crpto, setCrpto] = useState([]);
  fetch("https://techcrunch.com/wp-json/wp/v2/posts?per_page=100&context=embed")
    .then((response) => response.json())
    .then((data) => setCrpto(data))
    .catch((error) => console.log("error", error));
  console.log(crpto);

  const nxtBtn = () => {
    setNextBtn((nextBtn) => (nextBtn > 80 ? 1 : nextBtn + 1));
  };
  const prv_Btn = () => {
    setNextBtn((nextBtn) => (nextBtn > 80 ? 80 : nextBtn - 1));
  };

  return (
    <>
      <div className="min-h-[calc(100vh-64px)] bg-gray-300 dark:bg-gray-600 dark:text-white">
        <div className="">
          <div className=" relative h-full upto-lab-s:px-10 scrn-mob:py-5 rounded px-40 py-20">
            {crpto.map((img, indx) => {
              return (
                <div
                  key={indx}
                  className={
                    nextBtn === indx
                      ? `ease-in-out duration-[1000ms] block`
                      : `${"opacity-0"} block rounded-3xl `
                  }
                >
                  {indx === nextBtn && (
                    <>
                      <img
                        className="rounded-3xl m-auto h-[700px]"
                        src={img.jetpack_featured_media_url}
                        alt="img"
                      />
                      <div className="hover:text-blue-600 "><a href={img.canonical_url}>{img.canonical_url}</a></div>
                    </>
                  )}
                </div>
              );
            })}
            <div>
              <button onClick={nxtBtn} className="absolute top-1/2 right-2">
                <code>nxt</code>
              </button>
              <button onClick={prv_Btn} className="absolute top-1/2 left-2">
                prv
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeFirst;
