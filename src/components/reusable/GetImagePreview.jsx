import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { icons } from "../../assets";

const GetImagePreview = ({
  name,
  control,
  label,
  defaulValue = "",
  className,
  cameraIcon = false,
  cameraSize = 20,
  image,
  rules={}
}) => {
  const [preview, setPreview] = useState(null);
  const handlePreview = (e) => {
    const files = e.target.files;
    setPreview(URL.createObjectURL(files[0]));
    return files;
  };
  return (
    <div className="w-full group">
      <label
        htmlFor={name}
        className="cursor-pointer relative flex flex-col justify-center items-start"
      >
        {label && <label className="inline-block mb-2 pl-1">{label}</label>}
        <img src={preview || image} className={className} />
        {cameraIcon && (
          <icons.FaCamera
            size={cameraSize}
            className={`absolute justify-center items-center w-full ${
              preview ? "hidden group-hover:inline-flex" : "inline-block"
            }`}
          />
        )}
        <Controller
          name={name}
          control={control}
          defaultValue={defaulValue || ""}
          render={({ field: { onChange } }) => (
            <input
              id={name}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                onChange(handlePreview(e));
              }}
            />
          )}
          rules={rules}
        />
      </label>
    </div>
  );
};

export default GetImagePreview;
