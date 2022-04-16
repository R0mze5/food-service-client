import React, { useCallback, useEffect, useRef, useState } from "react";
import GoogleMapReact, { Position } from "google-map-react";
import { useMutation, useSubscription } from "@apollo/client";
import {
  ACCEPT_ORDER_MUTATION,
  COOKED_ORDERS_SUBSCRIPTION,
} from "apollo/schemas";
import {
  AcceptOrder,
  AcceptOrderVariables,
  CookedOrders,
  OrderUpdatesInput,
} from "api-types";
import { Link, useNavigate } from "react-router-dom";
import { routerPaths } from "routers/routerPaths";

// const PointerItem = () => {
//   return <div className="text-lg">🚘</div>;
// };

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: cookedOrdersData } = useSubscription<CookedOrders>(
    COOKED_ORDERS_SUBSCRIPTION
  );

  const [acceptOrderMutation] = useMutation<AcceptOrder, AcceptOrderVariables>(
    ACCEPT_ORDER_MUTATION
  );

  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<typeof google.maps>();

  const [driverPosition, setDriverPosition] = useState<Position | null>(null);

  const onSuccess: PositionCallback = (position) => {
    setDriverPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  const onError: PositionErrorCallback = (position) => {
    console.log(position);
  };

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier, new-cap
    if( map && maps && driverPosition) {
      const location = new maps.LatLng(driverPosition.lat, driverPosition.lng);

      map?.panTo(location);

      const geocoder = new maps.Geocoder();
      geocoder.geocode({ location }, (results, status) => {
        console.log(results, status);
      });
    }
  }, [driverPosition, map, maps]);

  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);

  const onApiLoaded = (api: {
    map: google.maps.Map;
    maps: typeof google.maps;
    ref: Element | null;
  }) => {
    setMap(api.map);
    setMaps(api.maps);
  };

  const makeRoute = useCallback(
    (order: CookedOrders) => {
      if (maps && map && driverPosition) {
        const directionsService = new maps.DirectionsService();
        const directionsDisplay = new maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        directionsService.route(
          {
            origin: {
              location: new maps.LatLng(driverPosition.lat, driverPosition.lng),
            },
            destination: {
              location: new maps.LatLng(
                // order location
                driverPosition.lat + 0.05,
                driverPosition.lng + 0.05
              ),
            },
            travelMode: maps.TravelMode.DRIVING,
          },
          (result) => {
            directionsDisplay.setDirections(result);
          }
        );
      }
    },
    [driverPosition, map, maps]
  );

  useEffect(() => {
    if (cookedOrdersData?.cookedOrders?.id) {
      makeRoute(cookedOrdersData);
    }
  }, [cookedOrdersData, makeRoute]);

  const acceptOrder = async (id: OrderUpdatesInput["id"]) => {
    const { data } = await acceptOrderMutation({
      variables: { input: { id } },
    });
    if (data?.acceptOrder.ok) {
      navigate(`${routerPaths.orderDetails}/${id}`);
    }
  };

  return (
    <div>
      <div className="bg-gray-800 w-full h-96 max-h-full">
        {driverPosition && (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_API_GOOGLE_MAPS_KEY || "",
            }}
            defaultCenter={driverPosition}
            defaultZoom={16}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={onApiLoaded}
          />
        )}
      </div>
      <div className="wrapper">
        <div className="container">
          {cookedOrdersData?.cookedOrders?.id ? (
            <>
              <h2 className="block mb-3">
                New cooked order from{" "}
                {cookedOrdersData?.cookedOrders?.restaurant?.name} restaurant!
              </h2>
              <button
                className="button"
                onClick={() => acceptOrder(cookedOrdersData?.cookedOrders?.id)}
                type="button"
              >
                Accept Order &rarr;
              </button>
            </>
          ) : (
            <h2 className="block">There is no Orders yet...</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
