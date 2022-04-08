import React from "react";
import { render, waitFor } from "@testing-library/react";
import { isLoggedInVar } from "apollo/config";
import App from "./App";

const mockLoggedInRouterFn = jest.fn();
jest.mock(
  "./routers/LoggedInRouter",
  (): React.FC => (props) => {
    mockLoggedInRouterFn(props);
    return <div data-testid="LoggedInRouter" />;
  }
);

const mockLoggedOutRouterFn = jest.fn();
jest.mock(
  "./routers/LoggedOutRouter",
  (): React.FC => (props) => {
    mockLoggedOutRouterFn(props);
    return <div data-testid="LoggedOutRouter" />;
  }
);

describe("<App />", () => {
  it("should render LoggedOutRouter", () => {
    render(<App />);

    expect(mockLoggedOutRouterFn).toBeCalled();
  });
  it("should render LoggedInRouter", async () => {
    render(<App />);

    await waitFor(() => {
      isLoggedInVar(true);
    });

    expect(mockLoggedInRouterFn).toBeCalled();
  });
});
