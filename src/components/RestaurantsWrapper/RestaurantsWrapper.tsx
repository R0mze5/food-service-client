import React from "react";
import { Helmet } from "react-helmet-async";

interface RestaurantsWrapperProps {
  title: string;
}

const RestaurantsWrapper: React.FC<RestaurantsWrapperProps> = ({
  title = "",
  children,
}) => {
  return (
    <div className="pb-20">
      <Helmet>
        <title>{title} | Food Service</title>
      </Helmet>
      {children}
    </div>
  );
};

export default RestaurantsWrapper;
