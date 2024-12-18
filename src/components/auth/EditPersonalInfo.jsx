import React, { useEffect } from "react";
import { Input2, Button } from "..";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../../reducers/Slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const EditPersonalInfo = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      navigate("/edit")
    }
  };
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-70 z-50 backdrop" onClick={handleOutsideClick}>
        <div className="bg-purple-600 pt-6 rounded shadow-lg w-full max-w-md scale-up-center">
          <h2 className="text-lg font-bold text-white  px-8 py-0">Personal Information</h2>
          <p className="text-xs text-gray-100 px-8 mb-3">Update your personal details here.</p>
          <form className="space-y-4 bg-white text-black px-8" onSubmit={handleSubmit(saveChanges)}>
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
            <div className="flex justify-between mt-4 pb-4">
              <Button
                onClick={(e) => reset(e)}
                className="bg-gray-400 text-black px-4 py-2 rounded"
              >
                Reset
              </Button>
              <Link
                to={"/edit"}
                className="bg-gray-400 text-black px-4 py-2 rounded ml-auto mr-2"
              >
                Cancel
              </Link>
              <Button
                type="submit"
                className="bg-purple-900 text-white px-4 py-2 rounded"
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
