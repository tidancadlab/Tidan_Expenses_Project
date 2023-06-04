import moment from "moment/moment";
import { Bar } from "react-chartjs-2";

function ApprovalGraph({ tran }) {
  let allData = [];
  let color = [];
  let bColor = [];
  let date = [];
  const darkMode = localStorage.getItem("DarkMode");
  let mode = darkMode !== "light" ? "white" : "#242323";
  for (const i of tran) {
    allData.push(
      parseInt(
        i.expApprovalStatus.toLowerCase() === "pending"
          ? i.expAmount
          : i.expApprovalStatus.toLowerCase() === "rejected" && i.expAmount
      )
    );
    color.push(
      i.expApprovalStatus.toLowerCase() === "pending"
        ? "#FCE742"
        : i.expApprovalStatus.toLowerCase() === "rejected"
        ? "#fc7d42"
        : "rgb(42, 224, 145)"
    );
    bColor.push(
      i.expApprovalStatus.toLowerCase() === "pending"
        ? "#dfc81a"
        : i.expApprovalStatus.toLowerCase() === "rejected"
        ? "#e26429"
        : "rgb(22, 196, 120)"
    );
    date.push(
      i.expApprovalStatus.toLowerCase() === "pending"
        ? moment(i.expDate.slice(0, 10)).format("Do MMM YYYY") + " (Pending)"
        : i.expApprovalStatus.toLowerCase() === "rejected"
        ? moment(i.expDate.slice(0, 10)).format("Do MMM YYYY") + " (Rejected)"
        : moment(i.expDate.slice(0, 10)).format("Do MMM YYYY") + " (Approved)"
    );
  }

  return (
    <>
      <div className="bg-white">
        <Bar
          data={{
            labels: date,
            datasets: [
              {
                label: "Rs.",
                data: allData,
                borderWidth: 0,
                borderColor: bColor,
                backgroundColor: color,
                borderRadius: 10,
                // hoverBorderColor: ["blue"],
                hoverBackgroundColor: mode,
                // pointBorderWidth: 4,
                //   pointBorderColor: "black",
                tension: 0.5,
                hoverBorderWidth: 2,
              },
            ],
          }}
          height={380}
          width={750}
          options={{
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                text: "Approval Status Day Wise",
                display: true,
              },
            },
            scales: {
              x: { display: false },
              y: { display: false, max: 2000 },
            },
          }}
        />
      </div>
    </>
  );
}

export default ApprovalGraph;
