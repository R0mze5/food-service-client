import React from "react";

const ErrorTip: React.FC = ({ children }) => {
  return (
    <span role="alert" className="error">
      {children}
    </span>
  );
};

export default ErrorTip;
