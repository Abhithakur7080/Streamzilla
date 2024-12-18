import React from "react";
import { Input2, Button } from "..";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { changePassword } from "../../reducers/Slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    resetField,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    dispatch(
      changePassword({
        oldPassword: data?.oldPassword,
        newPassword: data?.newPassword,
      })
    );
    resetField("oldPassword");
    resetField("newPassword");
    resetField("confirmPassword");
  };
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      navigate("/edit")
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-70 z-50 backdrop" onClick={handleOutsideClick}>
      <div className="bg-purple-600 pt-6 rounded shadow-lg w-full max-w-md scale-up-center">
        <h2 className="text-lg font-bold text-white  px-8 py-0">Change Password</h2>
        <p className="text-xs text-gray-100 px-8 mb-3">Be insure and remember before submit.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y4 bg-white text-black px-8">
          <div className="flex flex-col">
            <Input2
              label="Old Password"
              type="password"
              className="rounded"
              {...register("oldPassword", {
                required: "Old Password is required",
              })}
            />
            {errors.oldPassword && (
              <span className="text-sm text-red-500">
                {errors.oldPassword.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input2
              label="New Password"
              type="password"
              className="rounded"
              {...register("newPassword", {
                required: "New Password is required",
              })}
            />
            {errors.newPassword && (
              <span className="text-sm text-red-500">
                {errors.newPassword.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input2
              label="Confirm New Password"
              type="password"
              className="rounded"
              {...register("confirmPassword", {
                required: "Please confirm your new password",
                validate: {
                  matchesNewPassword: (value) =>
                    value === getValues("newPassword") ||
                    "Passwords do not match",
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="flex justify-around mt-4 pb-4">
            <Link
              to={"/edit"}
              className="bg-gray-500 text-black px-4 py-2 rounded"
            >
              Cancel
            </Link>
            <Button
              type="submit"
              className="bg-purple-900 text-white px-4 py-2 rounded"
            >
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
