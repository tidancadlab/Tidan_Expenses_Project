import { Doughnut, Pie } from "react-chartjs-2";
import { BsFillPatchExclamationFill } from "react-icons/bs";

function ApprovalGraph({ tran }) {
  let a = 0;
  let b = 0;
  let c = 0;
  const darkMode = localStorage.getItem("DarkMode");
  let mode = darkMode !== "light" ? "white" : "white";
  tran.filter((i) => {
    if (i.paymentHead) {
      switch (i.paymentHead.toLowerCase()) {
        case "grocery":
          a += i.expAmount;
          break;
        case "site local":
          b += i.expAmount;
          break;
        case "office":
          c += i.expAmount;
          break;
      }
    }
  });
  //   console.log(tran);

  if (!a && !b && !c)
    return (
      <h1 className="bg-white w-full flex items-center justify-center rounded-lg font-Itim gap-2 text-yellow-700">
        <BsFillPatchExclamationFill /> Data not Available
      </h1>
    );
  return (
    <>
      <div>
        <div className="bg-white rounded">
          <Doughnut
            data={{
              labels: ["Grocery", "Local", "Office"],
              datasets: [
                {
                  label: "Approved",
                  data: [a, b, c],
                  borderWidth: 3,
                  borderColor: mode,
                  backgroundColor: ["#fc7d42", "rgb(22, 196, 120)", "#FCE742"],
                  borderRadius: 4,
                  hoverBorderColor: ["#e26429", "rgb(13, 170, 102)", "#d6c120"],
                  // pointBorderWidth: 4,
                  //   pointBorderColor: "black",
                  tension: 0.5,
                },
              ],
            }}
            height={240}
            width={240}
            options={{
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                  align: "center",
                  labels: {
                    font: {
                      size: 10,
                    },
                    boxHeight: 10,
                    boxWidth: 10,
                  },
                },
                title: {
                  text: "Category wise total",
                  display: true,
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ApprovalGraph;
