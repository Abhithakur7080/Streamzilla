import React from "react";
import { Button } from "../components";
import { useDispatch } from "react-redux";
import { userLogout } from "../reducers/Slices/authSlice";

const Homepage = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(userLogout())} type="button" >
        Logout
      </button>
    </div>
  );
};

export default Homepage;
