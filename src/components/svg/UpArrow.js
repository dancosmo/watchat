import React from "react";

const UpArrow = ({ themeColor, display }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      width="25px"
      color={themeColor}
      display={display}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
      />
    </svg>
  );
};

export default UpArrow;
