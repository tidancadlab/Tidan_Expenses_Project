import moment from "moment/moment";
import { useState } from "react";
import { Line } from "react-chartjs-2";

function DayExpGraph({ tran }) {
  let date = [];
  let amount = [];
  const darkMode = localStorage.getItem("DarkMode");
  let mode = darkMode !== "light" ? "#243232" : "#243232";

  let a = {};
  if (tran.length > 0) {
    for (const element of tran) {
      if (a[element.expDate.slice(0, 10)]) {
        a[element.expDate.slice(0, 10)] =
          a[element.expDate.slice(0, 10)] + element.expAmount;
      } else {
        a[element.expDate.slice(0, 10)] = element.expAmount;
      }
    }
  }
  if (a) {
    let newData = JSON.stringify(a)
      .replace("{", "")
      .replace("}", "")
      .split(",");

    for (const element of newData) {
      const d = moment(element.slice(1, 11)).format("YYYY-MM-DD");
      date.push(d);
      amount.push(Number(element.slice(13)));
    }
  }

  return (
    <>
      <div className="relative pt-5">
        <div className="absolute flex w-[98%] justify-between gap-2 right-2 top-1 text-black text-sm">
          <div className="w-full flex justify-center items-center text-lg font-medium uppercase">
            <h1 className="font-Itim">Day wise total expenses</h1>
          </div>
        </div>
        <div className="">
          <Line
            data={{
              labels: date,
              datasets: [
                {
                  label: "Amount",
                  data: amount,
                  borderWidth: 1,
                  borderColor: mode,
                  backgroundColor: ["#fc7d42", "rgb(22, 196, 120)", "#FCE742"],
                  borderRadius: 4,
                  hoverBorderColor: ["#e26429", "rgb(13, 170, 102)", "#d6c120"],
                  // pointBorderWidth: 4,
                  //   pointBorderColor: "black",
                  tension: 0.4,
                },
              ],
            }}
            height={466}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  text: "Day wise total",
                  display: false,
                },
              },
              scales: {
                x: {
                  display: true,
                },
                y: { display: true },
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

export default DayExpGraph;
