import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import constructPageImg from "../../../../Images/constructPage.svg";

function ConstructPage() {

 
  return (
    <>
      <div className="m-auto flex flex-col gap-10 justify-center items-center h-[calc(100vh-64px)] bg-gray-600">
        <img src={constructPageImg} alt="" />
        <h1 className="text-xl text-white scrn-mob:text-2xl scrn-lap-L:text-xs font-thin">Thinking Code... </h1>
      </div>
    </>
  );
}

export default ConstructPage;
