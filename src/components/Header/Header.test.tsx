// jest.mock("hooks/useProfile")

import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { GET_PROFILE } from "apollo/schemas";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

describe("<Header/>", () => {
  it("should not render banner if email verified", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_PROFILE,
            },
            result: {
              data: {
                getProfile: {
                  emailVerified: false,
                  id: 1,
                  email: "",
                  role: "",
                },
              },
            },
          },
        ]}
      >
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </MockedProvider>
    );

    await waitFor(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
    });

    expect(screen.getByText(/Please verify your email/)).toBeInTheDocument();
  });

  it("should render banner if email not verified", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_PROFILE,
            },
            result: {
              data: {
                getProfile: {
                  emailVerified: true,
                  id: 1,
                  email: "",
                  role: "",
                },
              },
            },
          },
        ]}
      >
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </MockedProvider>
    );

    await waitFor(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
    });

    expect(screen.queryByText(/Please verify your email/)).toBeNull();
  });
});
