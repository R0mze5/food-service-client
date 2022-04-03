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

export interface LoginInput {
  email: string;
  password: string;
}

export interface RestaurantsInput {
  page?: number | null;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
