/* eslint-disable no-useless-escape */
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { EditProfile, EditProfileVariables } from "api-types";
import { useProfile } from "hooks/useProfile";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { EDIT_PROFILE } from "apollo/schemas";

interface EditProfileFormFields {
  email?: string;
  password?: string;
}

const EditProfilePage: React.FC = () => {
  const client = useApolloClient();
  const { data: profileData } = useProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<EditProfileFormFields>({
    defaultValues: { email: profileData?.getProfile.email },
  });

  const onCompleted = (data: EditProfile) => {
    const { email } = getValues();

    if (
      email &&
      email !== profileData?.getProfile.email &&
      data.editProfile.ok &&
      profileData?.getProfile.id
    ) {
      client.writeFragment({
        id: `User:${profileData.getProfile.id}`,
        fragment: gql`
          fragment EditedUser on User {
            emailVerified
            email
          }
        `,
        data: {
          emailVerified: false,
          email,
        },
      });
    }
  };

  const [editProfileMutation, { loading, data: editProfileMutationData }] =
    useMutation<EditProfile, EditProfileVariables>(EDIT_PROFILE, {
      onCompleted,
    });

  const onSubmit = ({ email, password }: EditProfileFormFields) => {
    if (loading || (email === profileData?.getProfile.email && !password))
      return;
    editProfileMutation({
      variables: {
        input: {
          email: email === profileData?.getProfile.email ? undefined : email,
          password: password || undefined,
        },
      },
      onCompleted,
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Helmet>
        <title>Edit Profile | Food Service</title>
      </Helmet>
      <h4 className="title mb-3">Edit Profile </h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-3 mt-5 px-5 w-full max-w-screen-sm"
      >
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="input"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
        <input
          {...register("password", {
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          type="password"
          placeholder="Password"
          className="input"
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
        <button type="submit" className="button">
          {loading ? "Loading..." : "Update profile"}
        </button>
        {editProfileMutationData?.editProfile.error && (
          <span className="error justify-start">
            {editProfileMutationData.editProfile.error}
          </span>
        )}
      </form>
    </div>
  );
};

export default EditProfilePage;
