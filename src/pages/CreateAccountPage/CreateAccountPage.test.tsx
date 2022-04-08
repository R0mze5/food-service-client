/* eslint-disable testing-library/no-wait-for-side-effects */
import { act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CREATE_ACCOUNT_MUTATION } from "apollo/schemas";
import { useNavigate } from "react-router-dom";
import { routerPaths } from "routers/routerPaths";
import { render, waitFor, screen, mockedClient } from "test-utils";
import CreateAccountPage from "./CreateAccountPage";

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useNavigate: jest.fn(),
  };
});

describe("<CreateAccountPage />", () => {
  it("should render title", async () => {
    render(<CreateAccountPage />);
    await waitFor(() => {
      expect(document.title).toBe("Create Account | Food Service");
    });
  });

  it("display email validation errors", async () => {
    render(<CreateAccountPage />);
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
    render(<CreateAccountPage />);
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
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<CreateAccountPage />);
    const formData = {
      email: "test@test.com",
      password: "test",
      role: "Client",
    };

    const mockResponse = {
      ok: true,
      token: "test",
      error: "error",
    };

    const mockMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: mockResponse,
      },
    });

    mockedClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      mockMutationResponse
    );

    const emailInput = screen.getByPlaceholderText(/Email/i);

    const passwordInput = screen.getByPlaceholderText(/password/i);

    const button = screen.getByRole("button");

    // jest.spyOn(window, "alert").mockImplementation(() => null);
    await waitFor(() => {
      userEvent.type(emailInput, formData.email);
      userEvent.type(passwordInput, formData.password);
      userEvent.click(button);
    });

    expect(mockMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockMutationResponse).toHaveBeenCalledWith({
      createAccountInput: formData,
    });

    expect(screen.getByRole("alert")).toHaveTextContent(
      new RegExp(mockResponse.error)
    );

    expect(mockNavigate).toHaveBeenCalledWith(routerPaths.signIn);

    // expect(window.alert).toHaveBeenCalledWith(expect.any(String))
  });
});

afterAll(() => {
  jest.clearAllMocks();
});
