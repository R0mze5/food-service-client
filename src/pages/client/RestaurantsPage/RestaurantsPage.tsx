import { useQuery } from "@apollo/client";
import {
  GetRestaurants,
  GetRestaurantsVariables,
  RestaurantFragment,
} from "api-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { routerPaths } from "routers/routerPaths";
import { GET_RESTAURANTS } from "apollo/schemas";
import RestaurantsWrapper from "components/RestaurantsWrapper";
import RestaurantsTemplate from "components/RestaurantsTemplate";

interface SearchFormData {
  search: string;
}

const RestaurantsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data, loading } = useQuery<GetRestaurants, GetRestaurantsVariables>(
    GET_RESTAURANTS,
    { variables: { input: { page } } }
  );

  const { register, handleSubmit } = useForm<SearchFormData>({
    defaultValues: { search: "" },
  });

  const onSubmit = (value: SearchFormData) => {
    navigate(`${routerPaths.client.search}?s=${value.search}`);
  };

  return (
    <RestaurantsWrapper title="Home">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 w-full py-40 flex items-center justify-center "
      >
        <input
          className="input w-3/4 md:w-3/12 "
          type="search"
          placeholder="Search Restaurants..."
          {...register("search", { required: true, min: 1 })}
        />
      </form>
      <RestaurantsTemplate
        loading={loading}
        page={page}
        setPage={setPage}
        totalPages={data?.restaurants.totalPages}
        restaurants={
          data?.restaurants.restaurants as RestaurantFragment[] | undefined
        }
      >
        {!loading && (
          <div className="flex justify-center">
            {data?.allCategories.categories.map((category) => (
              <Link
                key={category.id}
                className="mx-3 w-14 flex flex-col items-center cursor-pointer group"
                to={`${routerPaths.client.category}/${category.slug}`}
              >
                <div
                  className="w-14 h-14 rounded-full bg-contain group-hover:bg-gray-300"
                  style={{
                    backgroundImage: `url(${category.image || undefined})`,
                  }}
                />
                <span className="text-sm font- mt-1">{category.name}</span>
              </Link>
            ))}
          </div>
        )}
      </RestaurantsTemplate>
    </RestaurantsWrapper>
  );
};

export default RestaurantsPage;
