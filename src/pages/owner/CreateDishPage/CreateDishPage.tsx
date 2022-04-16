import { useApolloClient, useMutation } from "@apollo/client";
import { CreateDish, CreateDishVariables } from "api-types";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { CREATE_DISH, MY_RESTAURANT_BY_ID } from "apollo/schemas";
import RestaurantsWrapper from "components/RestaurantsWrapper";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { routerPaths } from "routers/routerPaths";

interface CreateDishFormFields {
  name: string;
  description: string;
  files: FileList;
  price: string;
  options: CreateDishVariables["input"]["options"];
}

const CreateDishPage: React.FC = () => {
  const client = useApolloClient();
  const navigate = useNavigate();

  const match = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateDishFormFields>();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "options", // unique name for your Field Array
    }
  );

  const [isUploading, setIsUploading] = useState(false);

  const [createDishMutation, { loading, data: createDishMutationData }] =
    useMutation<CreateDish, CreateDishVariables>(CREATE_DISH, {
      refetchQueries: [
        {
          query: MY_RESTAURANT_BY_ID,
          variables: { input: { id: Number(match.id) || -1 } },
        },
      ],
    });

  const isLoading = isUploading || loading;

  const onSubmit = async ({ files, ...formValues }: CreateDishFormFields) => {
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
        body: formData,
      }).then((response) => response.json());

      if (request?.url && match.id) {
        await createDishMutation({
          variables: {
            input: {
              ...formValues,
              price: Number(formValues.price),
              photo: request.url,
              restaurantId: Number(match.id),
              options: fields.map((field) => ({
                name: field.name,
                extra: Number(field.extra),
              })),
            },
          },
          onCompleted: ({ createDish }) => {
            if (createDish.ok) {
              navigate(`${routerPaths.owner.restaurant}/${match.id}`);
            }
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsUploading(false);
  };

  return (
    <RestaurantsWrapper title="Create Dish">
      <div className="wrapper pt-8">
        <div className="container">
          <h1 className="title mb-3 text-center">Create Dish</h1>
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
              {...register("description")}
              type="string"
              placeholder="Description"
              className="input"
            />
            {errors.description && (
              <span className="error">{errors.description.message}</span>
            )}
            <input
              {...register("price")}
              type="number"
              placeholder="Price"
              className="input"
              min={0}
            />
            {errors.price && (
              <span className="error">{errors.price.message}</span>
            )}
            <div>
              <h4 className="font-medium mb-1 text-lg">Dish Options</h4>
              {fields.length > 0 && (
                <div className="mb-2">
                  {fields.map((field, index) => {
                    return (
                      <div className="mb-2 last:mb-0" key={field.id}>
                        <input
                          className="input mr-2"
                          type="text"
                          placeholder={`Option ${index} Name`}
                          {...register(`options.${index}.name` as const)}
                        />
                        <input
                          className="input mr-2"
                          type="number"
                          placeholder={`Extra ${index} Price`}
                          {...register(`options.${index}.extra` as const)}
                        />
                        <button type="button" onClick={() => remove(index)}>
                          Delete Option
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              <button
                className="cursor-pointer text-white bg-gray-900 py-1 px-2"
                onClick={() => {
                  append({ name: "", extra: 0 });
                }}
                type="button"
              >
                Add Dish Option
              </button>
            </div>

            <div className="mb-5">
              <h4 className="font-medium mb-1 text-lg">Dish Photo</h4>
              <input type="file" {...register("files")} accept={"image/*"} />
            </div>
            <button type="submit" className="button">
              {isLoading ? "Loading..." : "Create Dish"}
            </button>
            {createDishMutationData?.createDish.error && (
              <span className="error justify-start">
                {createDishMutationData.createDish.error}
              </span>
            )}
          </form>
        </div>
      </div>
    </RestaurantsWrapper>
  );
};

export default CreateDishPage;
