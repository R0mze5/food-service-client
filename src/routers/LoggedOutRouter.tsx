import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateAccountPage from "../pages/CreateAccountPage";
import LoginPage from "../pages/LoginPage";

interface AuthFormFields {
  email: string;
  password: string;
}
interface LoggedOutRouterProps {}

const LoggedOutRouter: React.FC<LoggedOutRouterProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default LoggedOutRouter;
