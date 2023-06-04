import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

function AddressData({ setSelectedOption }) {
  const [APIData, setAPIData] = useState([]);
  const [cityState, setCitySate] = useState({});

  const countryState = (e) => {
    setCitySate({ ...cityState, [e.id]: e.value });
  };

  useEffect(() => {
    if (cityState.Pincode !== undefined && cityState.Pincode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${cityState.Pincode}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((result) => {
          if (result[0].PostOffice !== null) {
            setAPIData(result[0].PostOffice);
            setCitySate(result[0].PostOffice[0]);
          }
        })
        .catch((error) => {
          console.log("error", error);
          alert(error + ", Please connect with Internet!");
        });
    }
  }, [cityState.Pincode !== undefined && cityState.Pincode.length === 6]);

  let block = [];
  APIData.filter(function (v) {
    APIData.length !== 0 && block.push(v.Block);
  });

  // ---- Remove duplicate from array ----
  block = [...new Set(block)];

  // ----Filter for Select area based on Block ---

  const area = APIData.filter((v) => {
    return v.Block === cityState.Block;
  });

  console.log(cityState);
  return (
    <>
      <div className="address flex flex-wrap gap-4 p-8">
        <div className="relative">
          <label
            htmlFor="addressLine_1"
            className="absolute -top-2.5 left-3 bg-blue-500 px-1 rounded text-sm"
          >
            House / Building No.
          </label>
          <input
            className="bg-slate-600 border-2 p-2 outline-none rounded-lg focus:border-blue-500 hover:border-blue-500 border-transparent ease-in-out duration-200 text-white"
            type="text"
            name=""
            id="addressLine_1"
            value={cityState.addressLine_1}
            onChange={(e) => {
              countryState(e.target);
            }}
            required
          />
        </div>
        <div className="relative">
          <label
            htmlFor="addressLine_2"
            className="absolute -top-2.5 left-3 bg-blue-500 px-1 rounded text-sm"
          >
            Street / Ward No.
          </label>
          <input
            className="bg-slate-600 border-2 p-2 outline-none rounded-lg focus:border-blue-500 hover:border-blue-500 border-transparent ease-in-out duration-200 text-white"
            type="text"
            name=""
            id="addressLine_2"
            value={cityState.addressLine_2}
            onChange={(e) => {
              countryState(e.target);
            }}
            required
          />
        </div>
        <div className="relative">
          <label
            htmlFor="fName"
            className="absolute -top-2.5 left-3 bg-blue-500 px-1 rounded text-sm"
          >
            Village / Sector / Area
          </label>
          <select
            className="bg-slate-600 border-2 p-2 outline-none rounded-lg focus:border-blue-500 hover:border-blue-500 border-transparent ease-in-out duration-200 text-white"
            type="text"
            name=""
            id="Name"
            value={cityState.Name}
            onChange={(e) => {
              countryState(e.target);
            }}
            required
          >
            <option selected value="" disabled>
              {APIData.length !== 0
                ? "---Please Select ---"
                : "---Please Enter PinCode---"}
            </option>
            {APIData.length !== 0 &&
              APIData.map((v, i) => {
                return (
                  <option key={i} value={v.Name}>
                    {v.Name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="relative">
          <label
            htmlFor="fName"
            className="absolute -top-2.5 left-3 bg-blue-500 px-1 rounded text-sm"
          >
            Block / Thasil
          </label>
          <select
            className="bg-slate-600 border-2 p-2 outline-none rounded-lg focus:border-blue-500 hover:border-blue-500 border-transparent ease-in-out duration-200 text-white"
            type="text"
            name=""
            id="Block"
            value={cityState.Block}
            onChange={(e) => {
              countryState(e.target);
            }}
            required
          >
            <option selected value="" disabled>
              {APIData.length !== 0
                ? "---Please Select ---"
                : "---Please Enter PinCode---"}
            </option>
            {APIData.length !== 0 &&
              block.map((v, i) => {
                return (
                  <option key={i} value={v}>
                    {v}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="relative">
          <label
            htmlFor="fName"
            className="absolute -top-2.5 left-3 bg-blue-500 px-1 rounded text-sm"
          >
            District
          </label>
          <select
            className="bg-slate-600 border-2 p-2 outline-none rounded-lg focus:border-blue-500 hover:border-blue-500 border-transparent ease-in-out duration-200 text-white"
            type="text"
            name=""
            id="District"
            value={cityState.District}
            onChange={(e) => {
              countryState(e.target);
            }}
            required
          >
            <option selected={APIData.length === 0} value="" disabled>
              ---Please Enter PinCode---
            </option>
            {APIData.length !== 0 && (
              <option value={APIData[0].District}>{APIData[0].District}</option>
            )}
          </select>
        </div>
        <div className="relative">
          <label
            htmlFor="fName"
            className="absolute -top-2.5 left-3 bg-blue-500 px-1 rounded text-sm"
          >
            State
          </label>
          <select
            className="bg-slate-600 border-2 p-2 outline-none rounded-lg focus:border-blue-500 hover:border-blue-500 border-transparent ease-in-out duration-200 text-white"
            type="text"
            name=""
            id="State"
            value={cityState.State}
            onChange={(e) => {
              countryState(e.target);
            }}
            required
          >
            <option selected={APIData.length === 0} value="" disabled>
              ---Please Enter PinCode---
            </option>
            {APIData.length !== 0 && (
              <option selected={APIData.length !== 0} value={APIData[0].State}>
                {APIData[0].State}
              </option>
            )}
          </select>
        </div>
        <div className="relative">
          <label
            htmlFor="fName"
            className="absolute -top-2.5 left-3 bg-blue-500 px-1 rounded text-sm"
          >
            Country
          </label>
          <select
            className="bg-slate-600 border-2 p-2 outline-none rounded-lg focus:border-blue-500 hover:border-blue-500 border-transparent ease-in-out duration-200 text-white"
            type="text"
            name=""
            id="Country"
            value={cityState.Country}
            onChange={(e) => {
              countryState(e.target);
            }}
            required
          >
            <option selected={APIData.length === 0} value="" disabled>
              ---Please Enter PinCode---
            </option>
            {APIData.length !== 0 && (
              <option value={APIData[0].Country}>{APIData[0].Country}</option>
            )}
          </select>
        </div>
        <div className="relative">
          <label
            htmlFor="fName"
            className="absolute -top-2.5 left-3 bg-blue-500 px-1 rounded text-sm"
          >
            Pin Code
          </label>
          <input
            className="bg-slate-600 border-2 p-2 outline-none rounded-lg focus:border-blue-500 hover:border-blue-500 border-transparent ease-in-out duration-200 text-white"
            type="number"
            name=""
            id="Pincode"
            maxLength={6}
            value={cityState.Pincode}
            onChange={(e) => {
              countryState(e.target);
            }}
            required
          />
        </div>
        <button onClick={()=> {setSelectedOption("")}} type="button" className="mb-2 bg-red-500 px-8 rounded-lg">
          Cancel
        </button>
        <button className="mb-2 bg-green-500 px-8 rounded-lg">Update</button>
      </div>
    </>
  );
}

export default AddressData;
