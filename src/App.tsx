import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";
import LoggedInRouter from "./routers/LoggedInRouter";
import LoggedOutRouter from "./routers/LoggedOutRouter";
import "./index.css";

// const IS_LOGGED_IN = gql`
//   query isLoggedIn {
//     isLoggedIn @client
//   }
// `;

function App() {
  // const { data } = useQuery<{ isLoggedIn: boolean }>(IS_LOGGED_IN);

  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
