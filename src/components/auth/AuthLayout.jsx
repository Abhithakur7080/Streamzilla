import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginPopup } from "..";

const AuthLayout = ({ children, authentication }) => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    if (!authentication && authStatus !== authentication) {
      return;
    }
  }, [authStatus, authentication, navigate]);

  if (authentication && authStatus !== authentication && !loading) {
    return <LoginPopup />;
  }
  return children;
};

export default AuthLayout;
