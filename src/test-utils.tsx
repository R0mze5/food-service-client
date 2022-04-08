import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ApolloProvider } from "@apollo/client";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMockClient } from "mock-apollo-client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

const mockedClient = createMockClient();
const AllTheProviders: React.FC = ({ children }) => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ApolloProvider client={mockedClient}>{children}</ApolloProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render, mockedClient };
