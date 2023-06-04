import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import axios from "axios";
import moment from "moment";
import tableBGImg from "../../../Images/Tabletlogin.svg";
import ProgressRound from "./contenet/PropgressRound";
import AddNewExpenses from "./contenet/AddExpensesPage";
import Skeleton from "../../js/Skeleton";
import { CardTran } from "./Expenses/CradTran";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { expensesData } from "../../js/FetchModule";
import ProgressBar from "../../Pages/ExpApp/contenet/ProgressBar";
Chart.register(CategoryScale);

function Graph({ titleName, tran, allUser }) {
  titleName.innerHTML = "DATA Graph";
  return (
    <>
      <ProgressBar/>
    </>
  );
}

export default Graph;
