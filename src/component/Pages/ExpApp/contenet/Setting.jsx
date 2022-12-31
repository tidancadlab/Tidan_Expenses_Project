import WaitingRoundAnimation from "./WaitningRoundAnimation";
import React from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import HomeFirst from "../../HomeCont";
import ProgressRound from "./PropgressRound";
import { useEffect } from "react";
import { useState } from "react";

function Setting({ history }) {
  const params = useParams();
  const [tran, setTran] = useState([]);
  const rupee = new Intl.NumberFormat('en-in',{
    currency:"INR",
    style:"currency",
    notation:"compact"
  })

  console.log(rupee.format(326));
  function DataAPI() {
    fetch("/viewExp", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ _id: params.id }),
    })
      .then((response) => response.json())
      .then((data) => setTran(data));
  }

  useEffect(() => {
    if (tran.length === 0) {
      if (params.id.length > 0) {
        DataAPI();
      }
    } else {
      return;
    }
  }, [tran]);

  return (
    <>
      {tran && <div className="pt-96 flex justify-center items-center flex-col">
        <div className=" px-10 py-5 bg-slate-500 w-fit mb-10 rounded-md cursor-pointer">
          {tran.map((item) => (
            <div key={item._id}>
              <p>{item._id}</p>
              <p>{item.expDate}</p>
              <p>{item.expItem}</p>
              <p>{item.expAmount}</p>
              <p>{item.expApprovalStatus}</p>
              <p>{item.expUploaded}</p>
            </div>
          ))}
        </div>
        {/* <ProgressRound/> */}
      </div>}
    </>
  );
}

export default Setting;
