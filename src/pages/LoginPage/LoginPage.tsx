import { gql, useMutation } from "@apollo/client";
import { LoginMutation, LoginMutationVariables } from "api-types";
import React from "react";
import { useForm } from "react-hook-form";

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

const LoginPage = (props: LoginPageProps) => {
  const [loginMutation] = useMutation<LoginMutation, LoginMutationVariables>(
    LOGIN_MUTATION
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormFields>();

  const onSubmit = async (value: AuthFormFields) => {
    const { data } = await loginMutation({ variables: { loginInput: value } });
    if (data?.login.ok && data?.login.token) {
      console.log(data);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
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
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
