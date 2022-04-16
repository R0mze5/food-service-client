import { CreateOrderInput, DishFragment_options } from "api-types";
import React from "react";

type DishCardProps = {
  id: number;
  name: string;
  description: string;
  image: string | null;
  price: number;
  isCustomer?: boolean;
  options?: DishFragment_options[] | null;
  onClick?: () => void;
  onOptionClick?: (option: string) => void;
  onDelete?: () => void;
  isSelected?: boolean;
};

const DishCard: React.FC<DishCardProps> = ({
  image,
  name,
  price,
  description,
  isCustomer,
  options,
  onClick,
  onDelete,
  isSelected,
  onOptionClick,
}) => {
  const handleClick = () => {
    if (typeof onClick === "function") {
      onClick();
    } else if (isSelected && typeof onDelete === "function") {
      onDelete();
    }
  };

  const handleOptionClick = (
    e: React.MouseEvent | React.KeyboardEvent,
    option: string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (typeof onOptionClick === "function") {
      onOptionClick(option);
    }
  };
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={`w-full justify-between border p-3 hover:border-gray-800 focus-visible:border-gray-800 cursor-pointer transition-all ${
        isSelected ? "border-lime-800" : ""
      }`}
      role="button"
      tabIndex={onClick ? 0 : -1}
      onClick={handleClick}
      // onKeyDown={handleClick}
    >
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg font-medium mb-2">{name}</h3>
          <h4>{description}</h4>
          <p className="mt-auto">${price}</p>
        </div>
        <div
          className="p-16 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              `${process.env.REACT_APP_API_URL}${image}` || undefined
            })`,
          }}
        />
      </div>
      {isCustomer && options && (
        <div>
          <h5 className="my-1 font-medium">Dish Options:</h5>
          {options.map((option) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
              className="flex items-center"
              role="button"
              tabIndex={onClick ? 0 : -1}
              key={option.name}
              onClick={(e) => handleOptionClick(e, option.name)}
              // onKeyDown={(e) => handleOptionClick(e, option.name)}
            >
              <h6 className="mr-2">{option.name}</h6>
              <p className="text-sm opacity-75">(${option.extra})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DishCard;
