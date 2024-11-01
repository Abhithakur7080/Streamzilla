import React from "react";
import { useForm } from "react-hook-form";
import { icons } from "../../assets";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "..";

const SearchForSmallScreen = ({ openSearch, setOpenSearch }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const search = (data) => {
    const query = data?.query;
    navigate(`/search/${query}`);
    setOpenSearch((prev) => !prev);
  };
  return (
    <>
      {openSearch && (
        <div className="fixed inset-0 h-screen w-full bg-[#ff0000]  flex items-start justify-start slide-top">
          <div className="sm:p-8 p-4 relative w-full">
            <div className="absolute top-5 right-5 cursor-pointer">
              <icons.IoCloseCircleOutline
                size={30}
                onClick={() => setOpenSearch((prev) => !prev)}
              />
            </div>
            <form
              className="flex items-center mt-10"
              onSubmit={handleSubmit(search)}
            >
              <Input type={'text'} placeholder="Search..." className="px-4 py-2 border-white focus:outline-none" {...register("query", {required: true})} />

              <Button type="submit" className="px-4 py-2 border border-white bg-transparent text-white font-semibold hover:bg-[#ff0000] focus:outline-none focus:ring-blue-500 focus:ring-opacity-50 duration-0" >Search</Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchForSmallScreen;
