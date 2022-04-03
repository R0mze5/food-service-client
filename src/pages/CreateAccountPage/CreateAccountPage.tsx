/* eslint-disable no-useless-escape */
import { gql, useMutation } from "@apollo/client";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
  UserRole,
} from "api-types";

import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { routerPaths } from "routers/routerPaths";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;
interface AuthFormFields {
  email: string;
  password: string;
  role: UserRole;
}
type CreateAccountPageProps = {};

enum Roles {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

const CreateAccountPage: React.FC<CreateAccountPageProps> = () => {
  const navigate = useNavigate();
  const [createAccountMutation, { loading, data: createAccountMutationData }] =
    useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
      CREATE_ACCOUNT_MUTATION,
      {}
    );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormFields>({
    defaultValues: { role: Roles.Client as unknown as UserRole.Client },
  });

  const onSubmit = async (value: AuthFormFields) => {
    if (loading) return;
    await createAccountMutation({
      variables: { createAccountInput: value },
      onCompleted: ({ createAccount }) => {
        const { ok } = createAccount;
        if (ok) {
          navigate(routerPaths.signIn);
        }
      },
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <Helmet>
        <title>Create Account | Food Service</title>
      </Helmet>
      <div className="bg-white w-full max-w-lg pt-5 pb-7 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Let&lsquo;s get started</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 px-5"
        >
          <input
            {...register("email", {
              required: "Email is required",
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            placeholder="Email"
            className="input"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
          <select
            className="input appearance-none"
            {...register("role", { required: "Role is required" })}
          >
            {Object.keys(Roles).map((role) => (
              <option value={role} key={role}>
                {role}
              </option>
            ))}
          </select>
          <button type="submit" className="button">
            {loading ? "Loading..." : "Create account"}
          </button>
          {createAccountMutationData?.createAccount.error && (
            <span className="error justify-start">
              {createAccountMutationData.createAccount.error}
            </span>
          )}
          <div>
            Already have an account?{" "}
            <Link className="underline" to={routerPaths.signIn}>
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;
