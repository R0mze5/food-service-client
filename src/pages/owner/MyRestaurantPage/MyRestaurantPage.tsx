import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  CreatePayment,
  CreatePaymentVariables,
  MyRestaurantById,
  MyRestaurantByIdVariables,
  PendingOrders,
} from "api-types";
import {
  CREATE_PAYMENT,
  MY_RESTAURANT_BY_ID,
  PENDING_ORDERS_SUBSCRIPTION,
} from "apollo/schemas";
import DishCard from "components/DishCard";
import RestaurantsWrapper from "components/RestaurantsWrapper";
import React from "react";
import {
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryZoomContainer,
} from "victory";
import { Link, useParams } from "react-router-dom";
import { routerPaths } from "routers/routerPaths";

const MyRestaurantPage: React.FC = () => {
  const match = useParams<{ id: string }>();

  const { data: createdOrder } = useSubscription<PendingOrders>(
    PENDING_ORDERS_SUBSCRIPTION
  );

  const { data } = useQuery<MyRestaurantById, MyRestaurantByIdVariables>(
    MY_RESTAURANT_BY_ID,
    {
      variables: { input: { id: Number(match.id) || -1 } },
    }
  );

  console.log(createdOrder);

  const [createPaymentMutation] = useMutation<
    CreatePayment,
    CreatePaymentVariables
  >(CREATE_PAYMENT, { refetchQueries: [MY_RESTAURANT_BY_ID] });

  const triggerPaddle = () => {
    if (!match.id) return;
    createPaymentMutation({
      variables: {
        input: {
          restaurantId: Number(match.id),
          transactionId: new Date().getTime().toString(),
        },
      },
    });
  };

  return (
    <RestaurantsWrapper
      title={data?.myRestaurantById.restaurant?.name || "My Restaurant"}
    >
      <div
        style={{
          backgroundImage: `url(${process.env.REACT_APP_API_URL}${
            data?.myRestaurantById.restaurant?.coverImage || ""
          })`,
        }}
        className="bg-gray-800 py-48 bg-cover bg-center bg-no-repeat px-5 mb-5"
      >
        <div className="max-w-screen-2xl bg-white md:w-1/3 py-8 p-4">
          <h4 className="text-4xl mb-4">
            {data?.myRestaurantById.restaurant?.name}
          </h4>
          <Link
            to={`${routerPaths.client.category}/${data?.myRestaurantById.restaurant?.category?.slug}`}
          >
            <h5 className="text-sm font-light mb-2 cursor-pointer hover:underline">
              {data?.myRestaurantById.restaurant?.category?.name}
            </h5>
          </Link>
          <address className="text-sm font-light not-italic">
            {data?.myRestaurantById.restaurant?.address}
          </address>
        </div>
      </div>
      <div className="wrapper">
        <div className="container flex mb-16">
          <Link
            className="button block mr-5"
            to={`${routerPaths.owner.restaurant}/${match.id}${routerPaths.owner.createDish}`}
          >
            Add Dish &rarr;
          </Link>
          {!data?.myRestaurantById?.restaurant?.isPromoted && (
            <button
              className="button block mr-5"
              onClick={triggerPaddle}
              type="button"
            >
              Buy Promotion &rarr;
            </button>
          )}
          {createdOrder?.pendingOrders.id && (
            <Link
              className="button block mr-5"
              to={`${routerPaths.orderDetails}/${createdOrder?.pendingOrders.id}`}
            >
              To Order &rarr;
            </Link>
          )}
        </div>
        <div className="container pt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
          {data?.myRestaurantById.restaurant?.menu?.map((dish) => (
            <DishCard
              key={dish.id}
              id={dish.id}
              name={dish.name}
              image={dish.photo}
              price={dish.price}
              description={dish.description}
            />
          )) || <div>No Dishes yet</div>}
        </div>
        <div className="container">
          <h2 className="text-center text-2xl font-medium">Sales</h2>
          <div className="max-w-lg w-full mx-auto">
            <VictoryChart
              domainPadding={30}
              containerComponent={<VictoryZoomContainer />}
            >
              <VictoryLine
                interpolation="natural"
                labels={({ datum }) => `${datum.y}`}
                labelComponent={<VictoryLabel renderInPortal dy={-20} />}
                data={data?.myRestaurantById.restaurant?.orders.map((order) => {
                  const date = new Intl.DateTimeFormat("en-GB").format(
                    new Date(order.createdAt)
                  );

                  return {
                    x: date,
                    y: `$${order.total}`,
                  };
                })}
              />
              {/* <VictoryAxis
                tickFormat={(value) => `$${value / 1000}K`}
                label="Order Amount"
                dependentAxis
              />
              <VictoryAxis
                padding={30}
                tickFormat={(value) => `Day ${value}`}
              />
              <VictoryBar data={chardData} /> */}
            </VictoryChart>
          </div>
        </div>
      </div>
    </RestaurantsWrapper>
  );
};

export default MyRestaurantPage;
