import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    email
  }
`;

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

export const DISH_FRAGMENT = gql`
  fragment DishFragment on Dish {
    id
    name
    slug
    price
    photo
    description
    options {
      name
      extra
      choices {
        name
        extra
      }
    }
  }
`;

export const ORDER_FRAGMENT = gql`
  fragment OrderFragment on Order {
    id
    total
    status
    createdAt
  }
`;

export const FULL_ORDER_FRAGMENT = gql`
  fragment FullOrderFragment on Order {
    ...OrderFragment
    customer {
      ...UserFragment
    }
    driver {
      ...UserFragment
    }
    restaurant {
      name
    }
  }
  ${ORDER_FRAGMENT}
  ${USER_FRAGMENT}
`;
