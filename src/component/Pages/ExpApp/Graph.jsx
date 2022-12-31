import React from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import axios from "axios";
import moment from "moment";
import tableBGImg from "../../../Images/Tabletlogin.svg";
import ProgressRound from "./contenet/PropgressRound";
import AddNewExpenses from "./contenet/AddExpensesPage";
Chart.register(CategoryScale);

let date = [];
let amount = [];

axios
  .get("/addExpenses")
  .then((res) => {
    for (const dataObj of res.data) {
      date.push(moment(dataObj.expDate).format("DD/M"));
      amount.push(parseInt(dataObj.expAmount));
    }
  })
  .catch((err) => {
    console.log("Server not working to push the data", err.response.status);
  });

function Graph({ titleName }) {
  titleName.innerHTML = "DATA Graph";



  return (
    <>
      <div className="m-auto w-screen h-screen flex justify-center bg-black">
        {/* <Line
          data={{
            labels: date,
            datasets: [
              {
                label: "Expenses",
                data: amount,
                borderWidth: 0.5,
                borderColor: "black",
                hoverBorderColor: ["red","green"],
                pointBorderWidth: 4,
                pointBorderColor: "black",
                // tension: 0.5,
              },
            ],
          }}
          height={800}
          width={840}
          options={{
            maintainAspectRatio: true,
          }}
        /> */}
        <div className=" m-auto flex">
          <AddNewExpenses/>
        </div>
      </div>
    </>
  );
}

export default Graph;
