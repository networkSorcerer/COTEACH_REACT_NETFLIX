import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="spinner-area">
      <Spinner
        animation="border"
        variant="danger"
        style={{ width: "5rem", height: "5rem" }}
      />
    </div>
  );
};

export default LoadingSpinner;
