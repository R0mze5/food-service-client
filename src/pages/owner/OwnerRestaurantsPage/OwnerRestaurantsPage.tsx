import { useQuery } from "@apollo/client";
import { MyRestaurants, RestaurantFragment } from "api-types";
import React from "react";
import { Link } from "react-router-dom";
import { routerPaths } from "routers/routerPaths";
import { MY_RESTAURANTS } from "apollo/schemas";
import RestaurantsWrapper from "components/RestaurantsWrapper";
import RestaurantsTemplate from "components/RestaurantsTemplate";

const OwnerRestaurantsPage: React.FC = () => {
  const { data, loading } = useQuery<MyRestaurants>(MY_RESTAURANTS);

  return (
    <RestaurantsWrapper title="My Restaurants">
      <div className="wrapper mt-16">
        <Link to={routerPaths.owner.createRestaurant}>
          Create restaurant &rarr;
        </Link>
      </div>
      <RestaurantsTemplate
        loading={loading}
        restaurants={
          data?.myRestaurants.restaurants as RestaurantFragment[] | undefined
        }
      />
    </RestaurantsWrapper>
  );
};

export default OwnerRestaurantsPage;
