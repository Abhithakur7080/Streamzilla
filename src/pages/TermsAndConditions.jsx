import React, { useState } from "react";
import { Logo } from "../components";
import { Link, useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className=" mx-auto flex justify-center items-center h-screen bg-gray-900 w-screen">
      <div className="bg-white p-8 border border-gray-500 text-black rounded-lg shadow-lg w-screen scale-up-center overflow-y-auto md:w-fit h-screen md:h-fit">
        <div className="mb-5">
          <Logo />
        </div>
        <h1 className="text-2xl mb-4 font-bold">Terms and Conditions</h1>
        <div className="mb-4">
          <ul className="list-disc list-inside">
            <li>
              By using this platform, you agree to these terms and conditions.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account information.
            </li>
            <li>
              You are solely responsible for any content you upload to the
              platform.
            </li>
            <li>
              This platform may suspend or terminate your access if you violate
              these terms and conditions.
            </li>
            <li>
              Uploading content that infringes any third-party intellectual
              property rights.
            </li>
            <li>Sharing illegal, harmful, or offensive material.</li>
            <li>
              Attempting to bypass security measures or gain unauthorized access
              to other accounts.
            </li>
            <li>
              Changes to these terms and conditions may be made at any time.
            </li>
            <li>
              By continuing to use this platform, you acknowledge that you have
              read, understand, and agree to these terms and conditions.
            </li>
            <li>
              For any questions or concerns, please contact our customer support
              team.
            </li>
          </ul>
        </div>
        <div className="flex items-center mb-4 gap-2">
          <input
            type="checkbox"
            id="terms"
            checked={isChecked}
            onChange={(e) => setIsChecked(!isChecked)}
          />
          <label htmlFor="terms" className="font-bold">
            I have read and agree to the terms and conditions
          </label>
        </div>
        <div className="">
          <button
            onClick={handleClick}
            className={`${
              isChecked
                ? "bg-purple-900 hover:bg-purple-700 text-white"
                : "bg-gray-400 text-black"
            } w-fit py-2 px-4 font-bold text-lg rounded  shadow-inner}`}
            disabled={!isChecked}
          >
            Continue
          </button>
        </div>
        <p className="text-sm text-red-600 mt-4">This project is made for showcasing my skills in web developement. Do not use it for illegal purposes. Do not upload videos greater than 100 MB</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
