import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { signOutUserAsync } from "../authSlice";
import { Navigate } from "react-router-dom";

function Logout() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOutUserAsync(user.id));
  }, [dispatch]);

  return <>{!user && <Navigate to="/login"></Navigate>}</>;
}

export default Logout;
