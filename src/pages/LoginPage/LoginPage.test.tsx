/* eslint-disable testing-library/no-wait-for-side-effects */
import { ApolloProvider } from "@apollo/client";
// import { createMockClient } from "@apollo/client/testing";
import { createMockClient } from "mock-apollo-client";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { LOGIN_MUTATION } from "apollo/schemas";
import { LOCALSTORAGE_TOKEN } from "constants/constants";
import LoginPage from "./LoginPage";

describe("<LoginPage />", () => {
  const mockedClient = createMockClient();

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <HelmetProvider>
        <BrowserRouter>
          <ApolloProvider client={mockedClient}>
            <LoginPage />
          </ApolloProvider>
        </BrowserRouter>
      </HelmetProvider>
    );
  });
  it("should render title", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Login | Food Service");
    });
  });

  it("display email validation errors", async () => {
    const emailInput = screen.getByPlaceholderText(/Email/i);

    expect(screen.queryByRole("alert")).toBeNull();

    userEvent.type(emailInput, "test");
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/Wrong email/i);
    });

    userEvent.clear(emailInput);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/Email is required/i);
    });
  });

  it("display password validation errors", async () => {
    const emailInput = screen.getByPlaceholderText(/Email/i);
    userEvent.type(emailInput, "test@test.com");

    const button = screen.getByRole("button");

    expect(screen.queryByRole("alert")).toBeNull();

    userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        /Password is required/i
      );
    });
  });

  it("submit form and call mutation", async () => {
    const formData = {
      email: "test@test.com",
      password: "test",
    };

    const mockResponse = {
      ok: true,
      token: "test",
      error: "error",
    };

    const mockMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: mockResponse,
      },
    });

    mockedClient.setRequestHandler(LOGIN_MUTATION, mockMutationResponse);

    jest.spyOn(Storage.prototype, "setItem");

    const emailInput = screen.getByPlaceholderText(/Email/i);

    const passwordInput = screen.getByPlaceholderText(/password/i);

    const button = screen.getByRole("button");

    expect(screen.queryByRole("alert")).toBeNull();

    // act(() => {
    //   userEvent.click(button);
    // });
    await waitFor(() => {
      userEvent.type(emailInput, formData.email);
      userEvent.type(passwordInput, formData.password);
      userEvent.click(button);
    });

    expect(mockMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockMutationResponse).toHaveBeenCalledWith({ loginInput: formData });

    expect(screen.getByRole("alert")).toHaveTextContent(
      new RegExp(mockResponse.error)
    );

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      LOCALSTORAGE_TOKEN,
      mockResponse.token
    );
  });
});
