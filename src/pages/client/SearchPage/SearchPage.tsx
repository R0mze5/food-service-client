import { useQuery } from "@apollo/client";
import {
  RestaurantFragment,
  SearchRestaurant,
  SearchRestaurantVariables,
} from "api-types";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SEARCH_RESTAURANTS } from "apollo/schemas";
import RestaurantsTemplate from "components/RestaurantsTemplate";
import RestaurantsWrapper from "components/RestaurantsWrapper";

const SearchPage: React.FC = () => {
  const [urlParams] = useSearchParams();

  const [page, setPage] = useState(1);

  const { data, loading } = useQuery<
    SearchRestaurant,
    SearchRestaurantVariables
  >(SEARCH_RESTAURANTS, {
    variables: { input: { page, query: urlParams.get("s") || "" } },
  });

  return (
    <RestaurantsWrapper title="Search">
      <RestaurantsTemplate
        loading={loading}
        page={page}
        setPage={setPage}
        totalPages={data?.searchRestaurant.totalPages}
        restaurants={
          data?.searchRestaurant.restaurants as RestaurantFragment[] | undefined
        }
      />
    </RestaurantsWrapper>
  );
};

export default SearchPage;
