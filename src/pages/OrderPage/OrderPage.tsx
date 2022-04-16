import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  EditOrder,
  EditOrderVariables,
  GetOrder,
  GetOrderVariables,
  GetProfile,
  OrderStatus,
  OrderUpdates,
  OrderUpdatesVariables,
} from "api-types";
import {
  EDIT_ORDER_MUTATION,
  GET_ORDER_QUERY,
  GET_PROFILE,
  ORDER_UPDATES_SUBSCRIPTION,
} from "apollo/schemas";
import RestaurantsWrapper from "components/RestaurantsWrapper";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const OrderPage: React.FC = () => {
  const match = useParams<{ id: string }>();
  const id = Number(match.id) || -1;

  const { data: userData } = useQuery<GetProfile>(GET_PROFILE);

  console.log(userData);

  const { data, subscribeToMore } = useQuery<GetOrder, GetOrderVariables>(
    GET_ORDER_QUERY,
    {
      variables: { orderId: id },
    }
  );

  const [editOrderMutation] = useMutation<EditOrder, EditOrderVariables>(
    EDIT_ORDER_MUTATION
  );

  // useEffect(() => {
  //   if (data?.getOrder.ok) {
  //     subscribeToMore({
  //       document: ORDER_UPDATES_SUBSCRIPTION,
  //       variables: { input: { id } },
  //       updateQuery: (prev, { subscriptionData }) => {
  //         if (!subscriptionData.data) return prev;
  //         const { orderUpdates } = subscriptionData.data as unknown as {
  //           orderUpdates: OrderUpdates;
  //         };
  //         return {
  //           ...prev,
  //           order: {
  //             ...prev.getOrder,
  //             ...orderUpdates,
  //           },
  //         };
  //       },
  //     });
  //   }
  // }, [data, id, match.id, subscribeToMore]);

  useSubscription<OrderUpdates, OrderUpdatesVariables>(
    ORDER_UPDATES_SUBSCRIPTION,
    {
      variables: { input: { id } },
    }
  );

  const updateStatus = (status: OrderStatus) => {
    editOrderMutation({
      variables: {
        input: {
          id,
          status,
        },
      },
    });
  };
  // console.log(subscription.data?.orderUpdates);

  return (
    <RestaurantsWrapper title={`Order #${match.id}`}>
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="border-gray-800 border w-full max-w-lg rounded-lg text-center">
          <h1 className="bg-gray-800 text-2xl text-white pt-5 pb-7">{`Order #${match.id}`}</h1>
          <p className="p-5 text-2xl">${data?.getOrder.order?.total}</p>
          <ul className="text-left px-5">
            <li className="border-t border-gray-700 py-3">
              Prepared By:{" "}
              <span className="font-medium">
                {data?.getOrder.order?.restaurant?.name}
              </span>
            </li>
            <li className="border-t border-gray-700 py-3">
              Deliver To:{" "}
              <span className="font-medium">
                {data?.getOrder.order?.customer?.email}
              </span>
            </li>
            <li className="border-t border-b border-gray-700 py-3">
              Driver:{" "}
              <span className="font-medium">
                {data?.getOrder.order?.driver?.email}
              </span>
            </li>
          </ul>
          {userData?.getProfile.role === "Client" && (
            <div className="text-green-800 text-xl font-medium p-5">
              Status: {data?.getOrder.order?.status}
            </div>
          )}
          {userData?.getProfile.role === "Owner" && (
            <div className="text-green-800 text-xl font-medium p-5">
              {data?.getOrder.order?.status?.toLowerCase() === "pending" && (
                <button
                  type="button"
                  className="button"
                  onClick={() => updateStatus("Cooking" as OrderStatus)}
                >
                  Accept Order
                </button>
              )}
              {data?.getOrder.order?.status?.toLowerCase() === "cooking" && (
                <button
                  type="button"
                  className="button"
                  onClick={() => updateStatus("Cooked" as OrderStatus)}
                >
                  Order Cooked
                </button>
              )}
              {data?.getOrder.order?.status?.toLowerCase() !== "pending" &&
                data?.getOrder.order?.status?.toLowerCase() !== "cooking" && (
                  <div className="text-green-800 text-xl font-medium p-5">
                    Status: {data?.getOrder.order?.status}
                  </div>
                )}
            </div>
          )}
          {userData?.getProfile.role === "Delivery" && (
            <div className="text-green-800 text-xl font-medium p-5">
              {data?.getOrder.order?.status?.toLowerCase() === "cooked" && (
                <button
                  type="button"
                  className="button"
                  onClick={() => updateStatus("PickedUp" as OrderStatus)}
                >
                  Pick Up Order
                </button>
              )}
              {data?.getOrder.order?.status?.toLowerCase() === "pickedup" && (
                <button
                  type="button"
                  className="button"
                  onClick={() => updateStatus("Delivered" as OrderStatus)}
                >
                  Order Delivered
                </button>
              )}
              {data?.getOrder.order?.status?.toLowerCase() !== "cooked" &&
                data?.getOrder.order?.status?.toLowerCase() !== "pickedup" && (
                  <div className="text-green-800 text-xl font-medium p-5">
                    Status: {data?.getOrder.order?.status}
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </RestaurantsWrapper>
  );
};

export default OrderPage;
