/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProfile
// ====================================================

export interface GetProfile_getProfile {
  __typename: "User";
  id: number;
  email: string;
  emailVerified: boolean;
  role: UserRole;
}

export interface GetProfile {
  getProfile: GetProfile_getProfile;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VerifyEmail
// ====================================================

export interface VerifyEmail_verifyEmail {
  __typename: "VerifyEmailOutput";
  ok: boolean;
  error: string | null;
}

export interface VerifyEmail {
  verifyEmail: VerifyEmail_verifyEmail;
}

export interface VerifyEmailVariables {
  input: VerifyEmailInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditProfile
// ====================================================

export interface EditProfile_editProfile {
  __typename: "EditProfileOutput";
  ok: boolean;
  error: string | null;
}

export interface EditProfile {
  editProfile: EditProfile_editProfile;
}

export interface EditProfileVariables {
  input: EditProfileInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRestaurants
// ====================================================

export interface GetRestaurants_restaurants_restaurants_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface GetRestaurants_restaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: GetRestaurants_restaurants_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface GetRestaurants_restaurants {
  __typename: "RestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: GetRestaurants_restaurants_restaurants[] | null;
}

export interface GetRestaurants_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  image: string | null;
  slug: string;
  restaurantCount: number;
}

export interface GetRestaurants_allCategories {
  __typename: "AllCategoriesOutput";
  error: string | null;
  ok: boolean;
  categories: GetRestaurants_allCategories_categories[];
}

export interface GetRestaurants {
  restaurants: GetRestaurants_restaurants;
  allCategories: GetRestaurants_allCategories;
}

export interface GetRestaurantsVariables {
  input: RestaurantsInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchRestaurant
// ====================================================

export interface SearchRestaurant_searchRestaurant_restaurants_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface SearchRestaurant_searchRestaurant_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: SearchRestaurant_searchRestaurant_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface SearchRestaurant_searchRestaurant {
  __typename: "SearchRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: SearchRestaurant_searchRestaurant_restaurants[] | null;
}

export interface SearchRestaurant {
  searchRestaurant: SearchRestaurant_searchRestaurant;
}

export interface SearchRestaurantVariables {
  input: SearchRestaurantInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindCategoryBySlug
// ====================================================

export interface FindCategoryBySlug_findCategoryBySlug_restaurants_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface FindCategoryBySlug_findCategoryBySlug_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: FindCategoryBySlug_findCategoryBySlug_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface FindCategoryBySlug_findCategoryBySlug_category {
  __typename: "Category";
  id: number;
  name: string;
  image: string | null;
  slug: string;
  restaurantCount: number;
}

export interface FindCategoryBySlug_findCategoryBySlug {
  __typename: "FindCategoryBySlugOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: FindCategoryBySlug_findCategoryBySlug_restaurants[];
  category: FindCategoryBySlug_findCategoryBySlug_category | null;
}

export interface FindCategoryBySlug {
  findCategoryBySlug: FindCategoryBySlug_findCategoryBySlug;
}

export interface FindCategoryBySlugVariables {
  input: FindCategoryBySlugInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RestaurantById
// ====================================================

export interface RestaurantById_restaurantById_restaurant_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface RestaurantById_restaurantById_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: RestaurantById_restaurantById_restaurant_category | null;
  address: string;
  isPromoted: boolean;
}

export interface RestaurantById_restaurantById {
  __typename: "RestaurantByIdOutput";
  ok: boolean;
  error: string | null;
  restaurant: RestaurantById_restaurantById_restaurant | null;
}

export interface RestaurantById {
  restaurantById: RestaurantById_restaurantById;
}

export interface RestaurantByIdVariables {
  input: RestaurantByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateAccountMutation
// ====================================================

export interface CreateAccountMutation_createAccount {
  __typename: "CreateAccountOutput";
  ok: boolean;
  error: string | null;
}

export interface CreateAccountMutation {
  createAccount: CreateAccountMutation_createAccount;
}

export interface CreateAccountMutationVariables {
  createAccountInput: CreateAccountInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login {
  __typename: "LoginOutput";
  token: string | null;
  ok: boolean;
  error: string | null;
}

export interface LoginMutation {
  login: LoginMutation_login;
}

export interface LoginMutationVariables {
  loginInput: LoginInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RestaurantFragment
// ====================================================

export interface RestaurantFragment_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface RestaurantFragment {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: RestaurantFragment_category | null;
  address: string;
  isPromoted: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CategoryFragment
// ====================================================

export interface CategoryFragment {
  __typename: "Category";
  id: number;
  name: string;
  image: string | null;
  slug: string;
  restaurantCount: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: VerifyProfile
// ====================================================

export interface VerifyProfile {
  __typename: "User";
  emailVerified: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EditedUser
// ====================================================

export interface EditedUser {
  __typename: "User";
  emailVerified: boolean;
  email: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface FindCategoryBySlugInput {
  page?: number | null;
  slug: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RestaurantByIdInput {
  restaurantId: number;
}

export interface RestaurantsInput {
  page?: number | null;
}

export interface SearchRestaurantInput {
  page?: number | null;
  query: string;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
