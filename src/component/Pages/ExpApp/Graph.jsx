import { useState } from "react";

function Graph() {
  const [crpto, setCrpto] = useState([]);
  fetch("https://techcrunch.com/wp-json/wp/v2/posts?per_page=100&context=embed")
    .then((response) => response.json())
    .then((data) => setCrpto(data))
    .catch((error) => console.log("error", error));

    // console.log(crpto);
  return (
    <>
      <div className="flex flex-wrap">
        {crpto.map(data => {
          return (
            <>
            <div className="flex w-[600px] h-[300px] m-auto">
            <img className=" " src={data.jetpack_featured_media_url} alt="" />
            </div>
            </>
          )
        })}
      </div>
    </>
  );
}

export default Graph;
