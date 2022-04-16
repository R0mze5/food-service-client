import { useMutation, useQuery } from "@apollo/client";
import {
  CreateOrder,
  CreateOrderInput,
  CreateOrderItemInput,
  CreateOrderVariables,
  RestaurantById,
  RestaurantByIdVariables,
} from "api-types";
import { CREATE_ORDER_MUTATION, RESTAURANT_BY_ID } from "apollo/schemas";
import DishCard from "components/DishCard";
import RestaurantsWrapper from "components/RestaurantsWrapper";
import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { routerPaths } from "routers/routerPaths";

const RestaurantDetailsPage: React.FC = () => {
  const match = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data } = useQuery<RestaurantById, RestaurantByIdVariables>(
    RESTAURANT_BY_ID,
    {
      variables: { input: { restaurantId: Number(match.id) || -1 } },
    }
  );

  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);

  const [orderStarted, setOrderStarted] = useState(false);

  const [createOrderMutation] = useMutation<CreateOrder, CreateOrderVariables>(
    CREATE_ORDER_MUTATION
  );

  const submitOrder = () => {
    if (!orderItems.length) {
      alert("Please select at least one item");
      return;
    }
    createOrderMutation({
      variables: {
        input: {
          restaurantId: Number(match.id) || -1,
          items: orderItems,
        },
      },
      onCompleted: ({ createOrder }) => {
        if (createOrder.ok) {
          navigate(`${routerPaths.orderDetails}/${createOrder.orderId}`);
        }
      },
    });
  };

  const isDishSelected = (dishId: number) =>
    orderItems.some((item) => item.dishId === dishId);

  const getDishOptions = (dishId: number) =>
    orderItems
      .find((orderItem) => orderItem.dishId === dishId)
      ?.options?.map((option) => option.name) || [];

  const addItemToOrder = (dishId: number) => {
    if (isDishSelected(dishId)) {
      setOrderItems(orderItems.filter((item) => item.dishId !== dishId));
      return;
    }
    setOrderItems([...orderItems, { dishId, options: [] }]);
  };

  const removeItemFromOrder = (dishId: number) => {
    setOrderItems((items) => items.filter((item) => item.dishId !== dishId));
  };

  const addOptionToItem = (dishId: number, optionName: string) => {
    if (!isDishSelected(dishId)) {
      return;
    }
    let dishOptions = getDishOptions(dishId);

    if (dishOptions.includes(optionName)) {
      dishOptions = dishOptions.filter((option) => option !== optionName);
    } else {
      dishOptions.push(optionName);
    }

    removeItemFromOrder(dishId);
    setOrderItems((items) => [
      ...items,
      { dishId, options: dishOptions.map((option) => ({ name: option })) },
    ]);
  };

  return (
    <RestaurantsWrapper
      title={data?.restaurantById.restaurant?.name || "Restaurant"}
    >
      <div
        style={{
          backgroundImage: `url(${process.env.REACT_APP_API_URL}${
            data?.restaurantById.restaurant?.coverImage || ""
          })`,
        }}
        className="bg-gray-800 py-48 bg-cover bg-center bg-no-repeat px-5 mb-10"
      >
        <div className="max-w-screen-2xl bg-white md:w-1/3 py-8 p-4">
          <h4 className="text-4xl mb-4">
            {data?.restaurantById.restaurant?.name}
          </h4>
          <Link
            to={`${routerPaths.client.category}/${data?.restaurantById.restaurant?.category?.slug}`}
          >
            <h5 className="text-sm font-light mb-2 cursor-pointer hover:underline">
              {data?.restaurantById.restaurant?.category?.name}
            </h5>
          </Link>
          <address className="text-sm font-light not-italic">
            {data?.restaurantById.restaurant?.address}
          </address>
        </div>
      </div>
      <div className="wrapper">
        <div className="container">
          {!orderStarted ? (
            <button
              onClick={() => setOrderStarted(true)}
              type="button"
              className="button mb-10 ml-auto mr-0 block"
            >
              Start Order
            </button>
          ) : (
            <div className="flex justify-end mb-10">
              <button
                onClick={submitOrder}
                type="button"
                className="button mr-5"
              >
                Confirm Order
              </button>
              <button
                onClick={() => {
                  setOrderStarted(false);
                  setOrderItems([]);
                }}
                type="button"
                className="button block"
              >
                Cancel Order
              </button>
            </div>
          )}
          <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
            {data?.restaurantById.restaurant?.menu?.map((dish) => (
              <DishCard
                isCustomer
                key={dish.id}
                id={dish.id}
                name={dish.name}
                image={dish.photo}
                price={dish.price}
                description={dish.description}
                options={dish.options}
                onClick={
                  orderStarted ? () => addItemToOrder(dish.id) : undefined
                }
                onOptionClick={
                  orderStarted
                    ? (optionName: string) =>
                        addOptionToItem(dish.id, optionName)
                    : undefined
                }
                onDelete={() => removeItemFromOrder(dish.id)}
                isSelected={isDishSelected(dish.id)}
              />
            )) || <div>No Dishes yet</div>}
          </div>
        </div>
      </div>
    </RestaurantsWrapper>
  );
};

export default RestaurantDetailsPage;
