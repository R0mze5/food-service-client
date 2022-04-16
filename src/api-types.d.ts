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
// GraphQL query operation: MyRestaurants
// ====================================================

export interface MyRestaurants_myRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface MyRestaurants_myRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: MyRestaurants_myRestaurants_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface MyRestaurants_myRestaurants {
  __typename: "MyRestaurantsOutput";
  ok: boolean;
  error: string | null;
  restaurants: MyRestaurants_myRestaurants_restaurants[] | null;
}

export interface MyRestaurants {
  myRestaurants: MyRestaurants_myRestaurants;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateRestaurant
// ====================================================

export interface CreateRestaurant_createRestaurant {
  __typename: "CreateRestaurantOutput";
  restaurantId: number | null;
  ok: boolean;
  error: string | null;
}

export interface CreateRestaurant {
  createRestaurant: CreateRestaurant_createRestaurant;
}

export interface CreateRestaurantVariables {
  input: CreateRestaurantInput;
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

export interface RestaurantById_restaurantById_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface RestaurantById_restaurantById_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: RestaurantById_restaurantById_restaurant_menu_options_choices[] | null;
}

export interface RestaurantById_restaurantById_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  slug: string;
  price: number;
  photo: string | null;
  description: string;
  options: RestaurantById_restaurantById_restaurant_menu_options[] | null;
}

export interface RestaurantById_restaurantById_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: RestaurantById_restaurantById_restaurant_category | null;
  address: string;
  isPromoted: boolean;
  menu: RestaurantById_restaurantById_restaurant_menu[];
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
// GraphQL query operation: MyRestaurantById
// ====================================================

export interface MyRestaurantById_myRestaurantById_restaurant_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface MyRestaurantById_myRestaurantById_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface MyRestaurantById_myRestaurantById_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: MyRestaurantById_myRestaurantById_restaurant_menu_options_choices[] | null;
}

export interface MyRestaurantById_myRestaurantById_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  slug: string;
  price: number;
  photo: string | null;
  description: string;
  options: MyRestaurantById_myRestaurantById_restaurant_menu_options[] | null;
}

export interface MyRestaurantById_myRestaurantById_restaurant_orders {
  __typename: "Order";
  id: number;
  total: number | null;
  status: OrderStatus;
  createdAt: any;
}

export interface MyRestaurantById_myRestaurantById_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: MyRestaurantById_myRestaurantById_restaurant_category | null;
  address: string;
  isPromoted: boolean;
  menu: MyRestaurantById_myRestaurantById_restaurant_menu[];
  orders: MyRestaurantById_myRestaurantById_restaurant_orders[];
}

export interface MyRestaurantById_myRestaurantById {
  __typename: "MyRestaurantByIdOutput";
  ok: boolean;
  error: string | null;
  restaurant: MyRestaurantById_myRestaurantById_restaurant | null;
}

export interface MyRestaurantById {
  myRestaurantById: MyRestaurantById_myRestaurantById;
}

export interface MyRestaurantByIdVariables {
  input: MyRestaurantByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateDish
// ====================================================

export interface CreateDish_createDish {
  __typename: "CreateDishOutput";
  ok: boolean;
  error: string | null;
}

export interface CreateDish {
  createDish: CreateDish_createDish;
}

export interface CreateDishVariables {
  input: CreateDishInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePayment
// ====================================================

export interface CreatePayment_createPayment {
  __typename: "CreatePaymentOutput";
  ok: boolean;
  error: string | null;
}

export interface CreatePayment {
  createPayment: CreatePayment_createPayment;
}

export interface CreatePaymentVariables {
  input: CreatePaymentInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateOrder
// ====================================================

export interface CreateOrder_createOrder {
  __typename: "CreateOrderOutput";
  ok: boolean;
  error: string | null;
  orderId: number | null;
}

export interface CreateOrder {
  createOrder: CreateOrder_createOrder;
}

export interface CreateOrderVariables {
  input: CreateOrderInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrder
// ====================================================

export interface GetOrder_getOrder_order_customer {
  __typename: "User";
  id: number;
  email: string;
}

export interface GetOrder_getOrder_order_driver {
  __typename: "User";
  id: number;
  email: string;
}

export interface GetOrder_getOrder_order_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface GetOrder_getOrder_order {
  __typename: "Order";
  id: number;
  total: number | null;
  status: OrderStatus;
  createdAt: any;
  customer: GetOrder_getOrder_order_customer | null;
  driver: GetOrder_getOrder_order_driver | null;
  restaurant: GetOrder_getOrder_order_restaurant | null;
}

export interface GetOrder_getOrder {
  __typename: "GetOrderOutput";
  ok: boolean;
  error: string | null;
  order: GetOrder_getOrder_order | null;
}

export interface GetOrder {
  getOrder: GetOrder_getOrder;
}

export interface GetOrderVariables {
  orderId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: OrderUpdates
// ====================================================

export interface OrderUpdates_orderUpdates_customer {
  __typename: "User";
  id: number;
  email: string;
}

export interface OrderUpdates_orderUpdates_driver {
  __typename: "User";
  id: number;
  email: string;
}

export interface OrderUpdates_orderUpdates_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface OrderUpdates_orderUpdates {
  __typename: "Order";
  id: number;
  total: number | null;
  status: OrderStatus;
  createdAt: any;
  customer: OrderUpdates_orderUpdates_customer | null;
  driver: OrderUpdates_orderUpdates_driver | null;
  restaurant: OrderUpdates_orderUpdates_restaurant | null;
}

export interface OrderUpdates {
  orderUpdates: OrderUpdates_orderUpdates;
}

export interface OrderUpdatesVariables {
  input: OrderUpdatesInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditOrder
// ====================================================

export interface EditOrder_editOrder {
  __typename: "EditOrderOutput";
  ok: boolean;
  error: string | null;
}

export interface EditOrder {
  editOrder: EditOrder_editOrder;
}

export interface EditOrderVariables {
  input: EditOrderInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: PendingOrders
// ====================================================

export interface PendingOrders_pendingOrders_customer {
  __typename: "User";
  id: number;
  email: string;
}

export interface PendingOrders_pendingOrders_driver {
  __typename: "User";
  id: number;
  email: string;
}

export interface PendingOrders_pendingOrders_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface PendingOrders_pendingOrders {
  __typename: "Order";
  id: number;
  total: number | null;
  status: OrderStatus;
  createdAt: any;
  customer: PendingOrders_pendingOrders_customer | null;
  driver: PendingOrders_pendingOrders_driver | null;
  restaurant: PendingOrders_pendingOrders_restaurant | null;
}

export interface PendingOrders {
  pendingOrders: PendingOrders_pendingOrders;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: CookedOrders
// ====================================================

export interface CookedOrders_cookedOrders_customer {
  __typename: "User";
  id: number;
  email: string;
}

export interface CookedOrders_cookedOrders_driver {
  __typename: "User";
  id: number;
  email: string;
}

export interface CookedOrders_cookedOrders_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface CookedOrders_cookedOrders {
  __typename: "Order";
  id: number;
  total: number | null;
  status: OrderStatus;
  createdAt: any;
  customer: CookedOrders_cookedOrders_customer | null;
  driver: CookedOrders_cookedOrders_driver | null;
  restaurant: CookedOrders_cookedOrders_restaurant | null;
}

export interface CookedOrders {
  cookedOrders: CookedOrders_cookedOrders;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AcceptOrder
// ====================================================

export interface AcceptOrder_acceptOrder {
  __typename: "AcceptOrderOutput";
  ok: boolean;
  error: string | null;
}

export interface AcceptOrder {
  acceptOrder: AcceptOrder_acceptOrder;
}

export interface AcceptOrderVariables {
  input: AcceptOrderInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserFragment
// ====================================================

export interface UserFragment {
  __typename: "User";
  id: number;
  email: string;
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
// GraphQL fragment: DishFragment
// ====================================================

export interface DishFragment_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface DishFragment_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: DishFragment_options_choices[] | null;
}

export interface DishFragment {
  __typename: "Dish";
  id: number;
  name: string;
  slug: string;
  price: number;
  photo: string | null;
  description: string;
  options: DishFragment_options[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrderFragment
// ====================================================

export interface OrderFragment {
  __typename: "Order";
  id: number;
  total: number | null;
  status: OrderStatus;
  createdAt: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullOrderFragment
// ====================================================

export interface FullOrderFragment_customer {
  __typename: "User";
  id: number;
  email: string;
}

export interface FullOrderFragment_driver {
  __typename: "User";
  id: number;
  email: string;
}

export interface FullOrderFragment_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface FullOrderFragment {
  __typename: "Order";
  id: number;
  total: number | null;
  status: OrderStatus;
  createdAt: any;
  customer: FullOrderFragment_customer | null;
  driver: FullOrderFragment_driver | null;
  restaurant: FullOrderFragment_restaurant | null;
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

export enum OrderStatus {
  Cancel = "Cancel",
  Cooked = "Cooked",
  Cooking = "Cooking",
  Delivered = "Delivered",
  Pending = "Pending",
  PickedUp = "PickedUp",
}

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface AcceptOrderInput {
  id: number;
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateDishInput {
  name: string;
  price: number;
  photo?: string | null;
  description: string;
  restaurantId: number;
  options?: DishOptionInputType[] | null;
}

export interface CreateOrderInput {
  restaurantId: number;
  items: CreateOrderItemInput[];
}

export interface CreateOrderItemInput {
  dishId: number;
  options?: OrderItemOptionInputType[] | null;
}

export interface CreatePaymentInput {
  transactionId: string;
  restaurantId: number;
}

export interface CreateRestaurantInput {
  name: string;
  coverImage: string;
  address: string;
  categoryName: string;
}

export interface DishChoiceInputType {
  name: string;
  extra?: number | null;
}

export interface DishOptionInputType {
  name: string;
  choices?: DishChoiceInputType[] | null;
  extra?: number | null;
}

export interface EditOrderInput {
  id: number;
  status: OrderStatus;
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

export interface MyRestaurantByIdInput {
  id: number;
}

export interface OrderItemOptionInputType {
  name: string;
  choice?: string | null;
  extra?: number | null;
}

export interface OrderUpdatesInput {
  id: number;
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
