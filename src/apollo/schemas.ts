import { gql } from "@apollo/client";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "./fragments";

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      token
      ok
      error
    }
  }
`;

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      id
      email
      emailVerified
      role
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation EditProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

export const GET_RESTAURANTS = gql`
  query GetRestaurants($input: RestaurantsInput!) {
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantFragment
      }
    }
    allCategories {
      error
      ok
      categories {
        ...CategoryFragment
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

export const SEARCH_RESTAURANTS = gql`
  query SearchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantFragment
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const FIND_CATEGORY_BY_SLUG = gql`
  query FindCategoryBySlug($input: FindCategoryBySlugInput!) {
    findCategoryBySlug(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantFragment
      }
      category {
        ...CategoryFragment
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

export const RESTAURANT_BY_ID = gql`
  query RestaurantById($input: RestaurantByIdInput!) {
    restaurantById(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantFragment
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;
