import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProfile } from "hooks/useProfile";
import React from "react";
import { Link } from "react-router-dom";
import { routerPaths } from "routers/routerPaths";

const Header: React.FC = () => {
  const { data } = useProfile();

  return (
    <>
      {!data?.getProfile.emailVerified && (
        <div className="p-3 text-center text-xs bg-red-700 text-white">
          <span>Please verify your email</span>
        </div>
      )}
      <header className="py-4 px-5">
        <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
          <Link to={routerPaths.home} aria-label="Logo" className="w-24">
            Logo
          </Link>
          <span className="text-xs">
            <Link to={routerPaths.editProfile} aria-label="Edit Profile">
              <FontAwesomeIcon icon={faUser} className="text-xl" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};

export default Header;
