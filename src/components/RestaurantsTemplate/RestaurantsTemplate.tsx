import { RestaurantFragment } from "api-types";
import RestaurantCard from "components/RestaurantCard";
import React from "react";

interface RestaurantsTemplateProps {
  page?: number;
  setPage?: (page: number) => void;
  loading: boolean;
  totalPages?: number | null;
  restaurants?: RestaurantFragment[] | undefined;
}

const RestaurantsTemplate: React.FC<RestaurantsTemplateProps> = ({
  page,
  setPage,
  loading,
  totalPages,
  restaurants,
  children,
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wrapper pt-8">
      <div className="container">
        {children}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-16">
          {restaurants?.length
            ? restaurants?.map((restaurant) => {
                return (
                  <RestaurantCard
                    key={restaurant.id}
                    coverImage={restaurant.coverImage}
                    categoryName={restaurant.category?.name || null}
                    name={restaurant.name}
                    id={restaurant.id}
                  />
                );
              })
            : "No restaurants found"}
        </div>

        {Boolean(totalPages) && page && setPage && (
          <div className="flex justify-center items-center mt-10">
            {page > 1 && (
              <button
                onClick={() => setPage(page - 1)}
                className="button"
                type="button"
              >
                &larr;
              </button>
            )}
            <span className="mx-5">
              Page {page} of {totalPages}
            </span>
            {page < (totalPages || 0) && (
              <button
                onClick={() => setPage(page + 1)}
                className="button"
                type="button"
              >
                &rarr;
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantsTemplate;
