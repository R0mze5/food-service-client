import { RestaurantFragment } from "api-types";
import RestaurantCard from "components/RestaurantCard";
import React from "react";

interface RestaurantsTemplateProps {
  page: number;
  setPage: (page: number) => void;
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
  const onNextPageClick = () => setPage(page + 1);
  const onPrevPageClick = () => setPage(page - 1);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-5 mt-8">
      <div className="max-w-screen-2xl mx-auto">
        {children}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-16">
          {restaurants?.map((restaurant) => {
            return (
              <RestaurantCard
                key={restaurant.id}
                coverImage={restaurant.coverImage}
                categoryName={restaurant.category?.name || null}
                name={restaurant.name}
                id={restaurant.id}
              />
            );
          })}
        </div>

        {Boolean(totalPages) && (
          <div className="flex justify-center items-center mt-10">
            {page > 1 && (
              <button
                onClick={onPrevPageClick}
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
                onClick={onNextPageClick}
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
