import ConfirmEmail from "pages/ConfirmEmail";
import NotFound from "pages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateAccountPage from "../pages/CreateAccountPage";
import LoginPage from "../pages/LoginPage";
import { routerPaths } from "./routerPaths";

interface AuthFormFields {
  email: string;
  password: string;
}
interface LoggedOutRouterProps {}

const LoggedOutRouter: React.FC<LoggedOutRouterProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routerPaths.signIn} element={<LoginPage />} />
        <Route path={routerPaths.signUp} element={<CreateAccountPage />} />
        <Route path={routerPaths.confirm} element={<ConfirmEmail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default LoggedOutRouter;
