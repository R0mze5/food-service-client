import { gql } from "@apollo/client";
import {
  CATEGORY_FRAGMENT,
  DISH_FRAGMENT,
  FULL_ORDER_FRAGMENT,
  ORDER_FRAGMENT,
  RESTAURANT_FRAGMENT,
  USER_FRAGMENT,
} from "./fragments";

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
      ...UserFragment
      emailVerified
      role
    }
  }
  ${USER_FRAGMENT}
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

export const MY_RESTAURANTS = gql`
  query MyRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantFragment
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const CREATE_RESTAURANT = gql`
  mutation CreateRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      restaurantId
      ok
      error
    }
  }
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
        menu {
          ...DishFragment
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

export const MY_RESTAURANT_BY_ID = gql`
  query MyRestaurantById($input: MyRestaurantByIdInput!) {
    myRestaurantById(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantFragment
        menu {
          ...DishFragment
        }
        orders {
          ...OrderFragment
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDER_FRAGMENT}
`;

export const CREATE_DISH = gql`
  mutation CreateDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

export const CREATE_PAYMENT = gql`
  mutation CreatePayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      ok
      error
    }
  }
`;

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
      orderId
    }
  }
`;

export const GET_ORDER_QUERY = gql`
  query GetOrder($orderId: Int!) {
    getOrder(orderId: $orderId) {
      ok
      error
      order {
        ...FullOrderFragment
      }
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

export const ORDER_UPDATES_SUBSCRIPTION = gql`
  subscription OrderUpdates($input: OrderUpdatesInput!) {
    orderUpdates(input: $input) {
      ...FullOrderFragment
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

export const EDIT_ORDER_MUTATION = gql`
  mutation EditOrder($input: EditOrderInput!) {
    editOrder(input: $input) {
      ok
      error
    }
  }
`;

export const PENDING_ORDERS_SUBSCRIPTION = gql`
  subscription PendingOrders {
    pendingOrders {
      ...FullOrderFragment
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

export const COOKED_ORDERS_SUBSCRIPTION = gql`
  subscription CookedOrders {
    cookedOrders {
      ...FullOrderFragment
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

export const ACCEPT_ORDER_MUTATION = gql`
  mutation AcceptOrder($input: AcceptOrderInput!) {
    acceptOrder(input: $input) {
      ok
      error
    }
  }
`;
