import { useLazyQuery } from "@apollo/client";
import {
  FindCategoryBySlug,
  FindCategoryBySlugVariables,
  RestaurantFragment,
} from "api-types";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FIND_CATEGORY_BY_SLUG } from "apollo/schemas";
import { routerPaths } from "routers/routerPaths";
import RestaurantsTemplate from "components/RestaurantsTemplate";
import RestaurantsWrapper from "components/RestaurantsWrapper";

const CategoryPage: React.FC = () => {
  const match = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const [findCategoryBySlugQuery, { data, loading }] = useLazyQuery<
    FindCategoryBySlug,
    FindCategoryBySlugVariables
  >(FIND_CATEGORY_BY_SLUG);

  useEffect(() => {
    if (match?.slug) {
      findCategoryBySlugQuery({
        variables: { input: { page, slug: match.slug } },
      });
    } else {
      navigate(routerPaths.client.restaurants, { replace: true });
    }
  }, [findCategoryBySlugQuery, match.slug, navigate, page]);

  return (
    <RestaurantsWrapper
      title={`Category ${data?.findCategoryBySlug.category?.name || ""}`}
    >
      <RestaurantsTemplate
        loading={loading}
        page={page}
        setPage={setPage}
        totalPages={data?.findCategoryBySlug.totalPages}
        restaurants={
          data?.findCategoryBySlug.restaurants as
            | RestaurantFragment[]
            | undefined
        }
      />
    </RestaurantsWrapper>
  );
};

export default CategoryPage;
