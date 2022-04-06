import { useQuery } from "@apollo/client";
import { RestaurantById, RestaurantByIdVariables } from "api-types";
import { RESTAURANT_BY_ID } from "apollo/schemas";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { routerPaths } from "routers/routerPaths";

const RestaurantDetailsPage: React.FC = () => {
  const match = useParams<{ id: string }>();

  const { data } = useQuery<RestaurantById, RestaurantByIdVariables>(
    RESTAURANT_BY_ID,
    {
      variables: { input: { restaurantId: Number(match.id) || -1 } },
    }
  );

  return (
    <div>
      <Helmet>
        <title>Restaurant</title>
      </Helmet>
      <div
        style={{
          backgroundImage: `url(${
            data?.restaurantById.restaurant?.coverImage || ""
          })`,
        }}
        className="bg-gray-800 py-48 bg-cover bg-center bg-no-repeat px-5"
      >
        <div className="max-w-screen-2xl bg-white md:w-1/3 py-8 p-4">
          <h4 className="text-4xl mb-4">
            {data?.restaurantById.restaurant?.name}
          </h4>
          <Link
            to={`${routerPaths.client.category}/${data?.restaurantById.restaurant?.category?.slug}`}
          >
            <h5 className="text-sm font-light mb-2 cursor-pointer hover:underline">
              {data?.restaurantById.restaurant?.category?.name}
            </h5>
          </Link>
          <address className="text-sm font-light not-italic">
            {data?.restaurantById.restaurant?.address}
          </address>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
