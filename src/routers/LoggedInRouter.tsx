import Header from "components/Header";
import { useProfile } from "hooks/useProfile";
import CategoryPage from "pages/client/CategoryPage";
import RestaurantDetailsPage from "pages/client/RestaurantDetailsPage";
import RestaurantsPage from "pages/client/RestaurantsPage";
import SearchPage from "pages/client/SearchPage";
import ConfirmEmail from "pages/ConfirmEmail";
import EditProfilePage from "pages/EditProfilePage";
import NotFound from "pages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routerPaths } from "./routerPaths";

const ClientRoutes = (
  <>
    <Route
      path={routerPaths.client.restaurants}
      element={<RestaurantsPage />}
    />
    <Route path={routerPaths.client.search} element={<SearchPage />} />
    <Route
      path={`${routerPaths.client.category}/:slug`}
      element={<CategoryPage />}
    />
    <Route
      path={`${routerPaths.client.restaurant}/:id`}
      element={<RestaurantDetailsPage />}
    />
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
