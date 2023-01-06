import { useState } from "react";
import { Navigate, Route, Routes, useParams, useMatch } from "react-router-dom";
import ProtectedRoute from "../../js/ProtectedRoute";
import AddExpenses from "./AddExpenses";
import Approval from "./Approval";
import AppSearchBar from "./AppSearchBar";
import Setting from "./contenet/Setting";
import DashBoard from "./Dashboard";
import Graph from "./Graph";
import Help from "./Help";
import SideBar from "./SideBar";

function RoutPage({ titleName, loggedUser }) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<DashBoard titleName={titleName} loggedUser={loggedUser} />}
        >
        {/* <Route
            path="/"
            element={<Navigate to={`/dashboard`} />}
          /> */}
        <Route
          path={`/expenses`}
          element={<AddExpenses titleName={titleName} />}
        />
        <Route path="/approval" element={<Approval titleName={titleName} />} />
        <Route path="/graph" element={<Graph titleName={titleName} />} />
        <Route
          path="/help"
          element={
            <ProtectedRoute
              titleName={titleName}
              Component={Help}
              loggedUser={loggedUser}
            />
          }
        />
        <Route path="/setting" element={<Setting titleName={titleName} />} />
        </Route>
      </Routes>
    </>
  );
}

export default RoutPage;
