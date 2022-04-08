import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { routerPaths } from "routers/routerPaths";
import RestaurantCard from "./RestaurantCard";

const mockProps = {
  categoryName: "categoryName",
  coverImage: "coverImage",
  name: "name",
  id: 1,
};

describe("<RestaurantCard />", () => {
  it("should render with props", () => {
    render(
      <BrowserRouter>
        <RestaurantCard {...mockProps} />
      </BrowserRouter>
    );

    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.categoryName)).toBeInTheDocument();

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `${routerPaths.client.restaurant}/${mockProps.id}`
    );
  });
});
