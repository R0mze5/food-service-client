import React from "react";
import { Helmet } from "react-helmet-async";

const NotFound: React.FC = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Helmet>
        <title>Page Not Found | Food Service</title>
      </Helmet>
      <h2 className="title">Page Not Found</h2>
    </div>
  );
};

export default NotFound;
