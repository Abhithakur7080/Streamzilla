import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
  const user = useSelector((state) => state.auth?.userData);
  //if user already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const submit = async (data) => {
    const response = await dispatch(createAccount(data));
    if (response?.type === "register/fulfilled") {
      const username = data?.username;
      const password = data?.password;
      const loginResult = await dispatch(userLogin({ username, password }));
      console.log(loginResult?.type === "Login/fulfilled");
      if (loginResult) {
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
    <div className="w-full h-screen text-black flex justify-center items-start bg-gray-900">
      <div className="w-fit sm:max-w-5xl flex flex-col p-3 space-y-2 justify-center items-center md:border-2 md:border-purple-900 bg-gray-50 my-auto scale-up-center">
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
                <div className="text-[#ff0000]">{errors.avatar.message}</div>
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
              error={errors.username}
              {...register("username", {
                required: "Username is required",
              })}
              className="h-8"
            />
            {errors.username && (
              <span className="text-[#ff0000]">{errors.username.message}</span>
            )}
          </div>
          <div>
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter full name"
              error={errors.fullName}
              {...register("fullName", {
                required: "full name is required",
              })}
              className="h-8"
            />
            {errors.username && (
              <span className="text-[#ff0000]">{errors.fullName.message}</span>
            )}
          </div>
          <div>
            <Input
              label="Email"
              type="text"
              placeholder="Enter email"
              error={errors.email}
              {...register("email", {
                required: "Email is required",
              })}
              className="h-8"
            />
            {errors.email && (
              <span className="text-[#ff0000]">{errors.email.message}</span>
            )}
          </div>
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              error={errors.password}
              {...register("password", {
                required: "Password is required",
              })}
              className="h-8"
            />
            {errors.password && (
              <span className="text-[#ff0000]">{errors.password.message}</span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-2 sm:py-3 text-lg text-white bg-purple-900 hover:bg-purple-700"
          >
            Signup
          </Button>
          <p className="text-sm text-black text-center mt-3">
            Already have an account? <Link to={"/login"}>Login</Link> here.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
