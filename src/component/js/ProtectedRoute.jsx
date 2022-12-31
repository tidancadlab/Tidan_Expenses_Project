import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProtectedRoute(props) {
  const { Component, loggedUser } = props;
  const Navigate = useNavigate();
  const params = useParams()
  console.log(params);
  useEffect(() => {
    if (params.id !== loggedUser.userId) {
      Navigate("/login");
    }
  });

  return (
    <>
      <Component />
    </>
  );
}

export default ProtectedRoute;
