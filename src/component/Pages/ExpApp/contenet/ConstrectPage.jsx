import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import constructPageImg from "../../../../Images/constructPage.svg";

function ConstructPage() {
  return (
    <>
      <div className="m-auto flex flex-col gap-10 justify-center items-center h-[calc(100vh)] bg-gray-600">
        <div className="relative">
          <img src={constructPageImg} alt="" />
          <div className="p-1 bg-white rounded-full absolute bottom-20 right-28">
            <h1 className="text-red-700 text-3xl font-thin bg-red-200 border border-red-700 px-8 py-2 rounded-full">
              Constricting
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConstructPage;
