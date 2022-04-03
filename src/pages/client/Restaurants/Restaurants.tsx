import { useQuery } from "@apollo/client";
import { GetRestaurants, GetRestaurantsVariables } from "api-types";
import React from "react";
import { GET_RESTAURANTS } from "schemas";

const Restaurants: React.FC = (props) => {
  const { data } = useQuery<GetRestaurants, GetRestaurantsVariables>(
    GET_RESTAURANTS,
    { variables: { input: { page: 1 } } }
  );

  console.log(data);
  return <h1>Restaurants</h1>;
};

export default Restaurants;
