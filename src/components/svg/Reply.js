import React from "react";

const Reply = ({themeColor}) => {
  return (
    <button style={{borderColor:`${themeColor}`}} className="reply-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        style={{ width: "20px", cursor: "pointer", color:`${themeColor}`}}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
        />
      </svg>
    </button>
  );
};

export default Reply;
