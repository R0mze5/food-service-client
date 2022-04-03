import { gql, useMutation } from "@apollo/client";
import { LoginMutation, LoginMutationVariables } from "api-types";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { routerPaths } from "routers/routerPaths";
import { isLoggedInVar, jwtToken } from "apolloConfig";
import { LOCALSTORAGE_TOKEN } from "constants/constants";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      token
      ok
      error
    }
  }
`;

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
  } = useForm<AuthFormFields>();

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
            {...register("email", { required: "Email is required" })}
            type="email"
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
          <button type="submit" className="button">
            {loading ? "Loading..." : "Log In"}
          </button>
          {loginMutationData?.login.error && (
            <span className="error justify-start">
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
