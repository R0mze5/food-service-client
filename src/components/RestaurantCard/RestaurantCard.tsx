import React from "react";
import { Link } from "react-router-dom";
import { routerPaths } from "routers/routerPaths";

interface RestaurantCardProps {
  coverImage: string | null;
  categoryName: string | null;
  name: string;
  id: number;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  categoryName,
  coverImage,
  name,
  id,
}) => {
  return (
    <Link
      className="flex flex-col"
      to={`${routerPaths.client.restaurant}/${id}`}
    >
      <div
        className="py-28 bg-cover bg-center mb-3"
        style={{
          backgroundImage: `url(${coverImage || undefined})`,
        }}
      />
      <h3 className="text-lg font-medium">{name}</h3>
      <span className="border-t pt-2 mt-3 block border-t-gray-200 text-xs opacity-50">
        {categoryName}
      </span>
    </Link>
  );
};

export default RestaurantCard;
