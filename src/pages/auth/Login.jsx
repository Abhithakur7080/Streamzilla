import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Logo } from "../../components";
import { getCurrentUser, userLogin } from "../../reducers/Slices/authSlice";
import LoginSkeleton from "../../skeletons/LoginSkeleton";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  const submit = async (data) => {
    const isEmail = data.username.includes("@");
    const loginData = isEmail
      ? { email: data.username, password: data.password }
      : data;
    const response = await dispatch(userLogin(loginData));
    const user = await dispatch(getCurrentUser());
    if (user && response?.payload) {
      navigate("/");
    }
  };
  if (loading) {
    return <LoginSkeleton status="Logging in..." />;
  }
  return (
    <div className="w-full h-screen text-white flex justify-center items-start bg-img">
      <div className="flex my-auto h-fit md:max-w-5xl flex-col space-y-5 justify-center items-center md:border md:border-slate-300 p-3 shadow-inner bg-white">
        <div className="flex items-center gap-2 mt-8">
          <Logo />
        </div>
        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4  p-2 text-sm sm:w-96 w-full"
        >
          <div className="w-full relative h-64">
            <div>
              <Input
                label="Username or Email"
                type="text"
                placeholder="example123 or example@gmail.com"
                error={errors.username}
                {...register("username", {
                  required: "Username or Email is required",
                })}
                className="h-8 py-5"
              />
              {errors.username && (
                <span className="text-[#ff0000]">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="a6a76@nk4&%"
                error={errors.password}
                {...register("password", {
                  required: "Password is required",
                })}
                className="h-8 py-5"
              />
              {errors.password && (
                <span className="text-[#ff0000]">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className={`w-full py-2 mt-4 sm:py-3 text-lg text-white ${loading ? "bg-gray-600" : "bg-[#ff0000] hover:bg-[#ff2000]"}`}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
