import { gql, useApolloClient, useMutation } from "@apollo/client";
import { VerifyEmail, VerifyEmailVariables } from "api-types";
import { useProfile } from "hooks/useProfile";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { routerPaths } from "routers/routerPaths";
import { VERIFY_EMAIL } from "apollo/schemas";

const ConfirmEmail: React.FC = () => {
  const client = useApolloClient();
  const { data: profileData } = useProfile();

  const onCompleted = (data: VerifyEmail) => {
    if (data.verifyEmail.ok && profileData?.getProfile.id) {
      client.writeFragment({
        id: `User:${profileData.getProfile.id}`,
        fragment: gql`
          fragment VerifyProfile on User {
            emailVerified
          }
        `,
        data: {
          emailVerified: true,
        },
      });
    }
  };

  const [verifyEmailMutation] = useMutation<VerifyEmail, VerifyEmailVariables>(
    VERIFY_EMAIL,
    { onCompleted }
  );

  const { search } = useLocation();
  const navigate = useNavigate();

  const verifyEmail = async () => {
    const urlParams = new URLSearchParams(search);
    const code = urlParams.get("code");
    if (code) {
      await verifyEmailMutation({ variables: { input: { code } } });
    }

    navigate(routerPaths.home, { replace: true });
  };

  useEffect(() => {
    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Helmet>
        <title>Confirm Email | Food Service</title>
      </Helmet>
      <h3 className="text-lg mb-1 font-medium">Confirming email...</h3>
      <h4 className="text-gray-700 text-sm">
        Please wait, dont close this page...
      </h4>
    </div>
  );
};

export default ConfirmEmail;
