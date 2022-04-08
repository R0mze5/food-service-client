/* eslint-disable no-useless-escape */
import { gql, useMutation } from "@apollo/client";
import { LoginMutation, LoginMutationVariables } from "api-types";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { routerPaths } from "routers/routerPaths";
import { isLoggedInVar, jwtToken } from "apollo/config";
import { LOCALSTORAGE_TOKEN } from "constants/constants";
import { LOGIN_MUTATION } from "apollo/schemas";
import ErrorTip from "components/ErrorTip";

interface AuthFormFields {
  email: string;
  password: string;
}
type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = () => {
  const [loginMutation, { loading, data: loginMutationData }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormFields>({ mode: "onChange" });

  const onCompleted = ({ login }: LoginMutation) => {
    const { ok, token } = login;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      jwtToken(token);
      isLoggedInVar(true);
    }
  };

  const onSubmit = async (value: AuthFormFields) => {
    if (loading) return;
    await loginMutation({
      variables: { loginInput: value },
      onCompleted,
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <Helmet>
        <title>Login | Food Service</title>
      </Helmet>
      <div className="bg-white w-full max-w-lg pt-5 pb-7 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Login</h3>
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
            // type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email && (
            <ErrorTip>
              {errors.email.type === "pattern"
                ? "Wrong email"
                : errors.email.message}
            </ErrorTip>
          )}
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password && <ErrorTip>{errors.password.message}</ErrorTip>}
          <button type="submit" className="button">
            {loading ? "Loading..." : "Log In"}
          </button>
          {loginMutationData?.login.error && (
            <span role="alert" className="error justify-start">
              {loginMutationData.login.error}
            </span>
          )}
          <div>
            New user?{" "}
            <Link className="underline" to={routerPaths.signUp}>
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
