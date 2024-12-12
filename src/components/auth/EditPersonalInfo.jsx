import React, { useEffect } from "react";
import { Input2, Button } from "..";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../../reducers/Slices/authSlice";

const EditPersonalInfo = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth?.userData);
  useEffect(() => {
    setValue("fullName", auth?.fullName);
    setValue("email", auth?.email);
  }, [auth, setValue]);
  const saveChanges = (data) => {
    dispatch(updateUserDetails(data));
  };
  const reset = (e) => {
    e.preventDefault();
    setValue("fullName", auth?.fullName);
    setValue("email", auth?.email);
  };
  return (
    <>
      <div className="w-full text-black flex justify-center items-center mt-5">
        <div className="bg-transparent p-5 border rounded shadow-lg w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">
            Personal Information{" "}
            <p className="font-light text-xs">
              Update your personal details here.
            </p>
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(saveChanges)}>
            <div className="flex flex-col">
              <Input2
                label="Full Name"
                type="text"
                className="rounded"
                {...register("fullName", {
                  required: "Full Name is required",
                })}
              />
              {errors.fullName && (
                <span className="text-sm text-red-500">
                  {errors.fullName?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Input2
                label="Email Address"
                type="email"
                className="rounded"
                {...register("email", {
                  required: "Email Address is required",
                })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <Button
                onClick={(e) => reset(e)}
                className="bg-gray-400 text-black px-4 py-2 rounded"
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="bg-gray-400 text-black px-4 py-2 rounded"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPersonalInfo;
