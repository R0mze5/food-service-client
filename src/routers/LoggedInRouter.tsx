import Header from "components/Header";
import { useProfile } from "hooks/useProfile";
import Restaurants from "pages/client/Restaurants/Restaurants";
import ConfirmEmail from "pages/ConfirmEmail";
import EditProfilePage from "pages/EditProfilePage";
import NotFound from "pages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routerPaths } from "./routerPaths";

const ClientRoutes = (
  <>
    <Route path={routerPaths.client.restaurants} element={<Restaurants />} />
    <Route path={routerPaths.client.restaurants} element={<Restaurants />} />
  </>
);

const LoggedInRouter: React.FC = () => {
  const { data, error, loading } = useProfile();

  if (loading || error || !data?.getProfile) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {data?.getProfile.role === "Client" && ClientRoutes}
        <Route path={routerPaths.editProfile} element={<EditProfilePage />} />
        <Route path={routerPaths.confirm} element={<ConfirmEmail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default LoggedInRouter;
