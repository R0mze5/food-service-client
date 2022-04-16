import { useApolloClient, useMutation } from "@apollo/client";
import {
  CreateRestaurant,
  CreateRestaurantVariables,
  MyRestaurants,
} from "api-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CREATE_RESTAURANT, MY_RESTAURANTS } from "apollo/schemas";
import RestaurantsWrapper from "components/RestaurantsWrapper";
import { Navigate, useNavigate } from "react-router-dom";
import { routerPaths } from "routers/routerPaths";

interface CreateRestaurantFormFields {
  name: string;
  address: string;
  files: FileList;
  categoryName: string;
}

const CreateRestaurantPage: React.FC = () => {
  const client = useApolloClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRestaurantFormFields>();

  const [isUploading, setIsUploading] = useState(false);

  const [
    createRestaurantMutation,
    { loading, data: createRestaurantMutationData },
  ] = useMutation<CreateRestaurant, CreateRestaurantVariables>(
    CREATE_RESTAURANT,
    {
      // refetchQueries: [{ query: MY_RESTAURANTS }],
    }
  );

  const isLoading = isUploading || loading;

  const onSubmit = async ({
    files,
    ...formValues
  }: CreateRestaurantFormFields) => {
    if (isLoading || !files.length) {
      return;
    }

    setIsUploading(true);
    const file = files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/uploads`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data", // - call this when using formData
        // },
        body: formData,
      }).then((response) => response.json());

      if (request?.url) {
        const input = { ...formValues, coverImage: request.url };
        await createRestaurantMutation({
          variables: { input },
          onCompleted: ({ createRestaurant }: CreateRestaurant) => {
            if (createRestaurant.ok && createRestaurant.restaurantId) {
              const queryResult = client.readQuery<MyRestaurants>({
                query: MY_RESTAURANTS,
              });

              if (queryResult?.myRestaurants?.restaurants) {
                const newRestaurants = [
                  ...queryResult.myRestaurants.restaurants,
                  {
                    id: createRestaurant.restaurantId,
                    coverImg: input.coverImage,
                    isPromoted: false,
                    address: input.address,
                    __typename: "Restaurant",
                    category: {
                      __type: "Category",
                      __proto__: Object,
                      name: input.categoryName,
                    },
                  },
                ];

                client.writeQuery({
                  query: MY_RESTAURANTS,
                  data: {
                    myRestaurants: {
                      ...queryResult.myRestaurants,
                      restaurants: newRestaurants,
                    },
                  },
                });
              }
            }

            navigate(routerPaths.owner.restaurants);
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsUploading(false);
  };

  return (
    <RestaurantsWrapper title="Create Restaurant">
      <div className="wrapper pt-8">
        <div className="container">
          <h1 className="title mb-3 text-center">Create Restaurant</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-3 mt-5 px-5 max-w-screen-sm mx-auto"
          >
            <input
              {...register("name")}
              type="name"
              placeholder="Name"
              className="input"
            />
            {errors.name && (
              <span className="error">{errors.name.message}</span>
            )}
            <input
              {...register("categoryName")}
              type="string"
              placeholder="Category Name"
              className="input"
            />
            {errors.categoryName && (
              <span className="error">{errors.categoryName.message}</span>
            )}
            <input
              {...register("address")}
              type="address"
              placeholder="Address"
              className="input"
            />
            {errors.categoryName && (
              <span className="error">{errors.categoryName.message}</span>
            )}
            <div>
              <input type="file" {...register("files")} accept={"image/*"} />
            </div>
            <button type="submit" className="button">
              {isLoading ? "Loading..." : "Create Restaurant"}
            </button>
            {createRestaurantMutationData?.createRestaurant.error && (
              <span className="error justify-start">
                {createRestaurantMutationData.createRestaurant.error}
              </span>
            )}
          </form>
        </div>
      </div>
    </RestaurantsWrapper>
  );
};

export default CreateRestaurantPage;
