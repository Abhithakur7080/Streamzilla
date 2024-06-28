import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAccount, userLogin } from "../../reducers/Slices/authSlice";
import LoginSkeleton from "../../skeletons/LoginSkeleton";
import { Button, GetImagePreview, Input, Logo } from "../../components";

const Signup = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  const submit = (data) => {
    const response = dispatch(createAccount(data));
    if (response?.payload?.success) {
      const username = data?.username;
      const password = data?.password;
      const loginResult = dispatch(userLogin({ username, password }));
      if (loginResult?.type === "login/fullfilled") {
        navigate("/terms&conditions");
      } else {
        navigate("/login");
      }
    }
  };
  if (loading) {
    return <LoginSkeleton status="Registering.." />;
  }
  return (
    <div className="w-full h-screen text-black flex justify-center items-start bg-img">
      <div className="w-screen md:w-fit sm:max-w-5xl flex flex-col p-3 space-y-2 mt-5 md:mt-12 justify-center items-center md:border md:border-gray-200 md:bg-white">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4 p-2 text-sm sm:w-96 w-full"
        >
          <div className="w-full flex flex-col gap-6 relative h-28 bg-neutral-300">
            <div className="w-full h-full">
              <GetImagePreview
                name={"coverImage"}
                control={control}
                className={"w-full h-28 object-cover"}
                cameraIcon
              />
              <div className="text-sm absolute right-2 bottom-2 font-bold cursor-default">
                Cover Image
              </div>
              {errors.avatar && (
                <div className="text-red-500">{errors.avatar.message}</div>
              )}
            </div>
            <div className="absolute left-2 bottom-2 rounded-full border-2">
              <GetImagePreview
                name={"avatar"}
                control={control}
                className={"object-cover rounded-full h-20 w-20 outline-none"}
                cameraIcon={true}
                cameraSize={15}
                rules={{ required: "Avatar is required" }}
              />
            </div>
          </div>
          <div>
            <Input
              label="Username"
              type="text"
              placeholder="Enter username"
              error = {errors.username}
              {...register("username", {
                required: "username is required",
              })}
              className="h-8"
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          </div>
          <div>
            <Input
              label="Email"
              type="text"
              placeholder="Enter email"
              error = {errors.email}
              {...register("email", {
                required: "email is required",
              })}
              className="h-8"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              error = {errors.password}
              {...register("password", {
                required: "password is required",
              })}
              className="h-8"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-2 sm:py-3 bg-red-500 hover:bg-red-600 text-lg text-white hover:scale-100"
          >
            Signup
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
