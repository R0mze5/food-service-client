import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "./NotFound";

describe("<NotFound />", () => {
  it("should render", async () => {
    const { asFragment } = render(
      <HelmetProvider>
        <NotFound />
      </HelmetProvider>
    );

    await waitFor(async () => {
      expect(document.title).toBe("Page Not Found | Food Service");
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
