import { gql } from "@apollo/client";

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
      restaurants {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
    allCategories {
      error
      ok
      categories {
        id
        name
        image
        slug
        restaurantCount
      }
    }
  }
`;
