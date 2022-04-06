import { gql } from "@apollo/client";

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantFragment on Restaurant {
    id
    name
    coverImage
    category {
      name
      slug
    }
    address
    isPromoted
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    id
    name
    image
    slug
    restaurantCount
  }
`;

// export const PAGINATION_FRAGMENT = gql`
//   fragment PaginationFragment on PaginationOutput {
//     ok
//     error
//     totalPages
//     totalResults
//   }
// `;
