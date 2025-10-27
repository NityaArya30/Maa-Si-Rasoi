import React, { useContext } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';

const FoodDisplay = ({ kitchen }) => {
  const { food_list } = useContext(StoreContext);

  // ✅ Filter food items safely
  const filteredFood =
    kitchen === "All"
      ? food_list
      : food_list.filter((item) => item.kitchen?.name === kitchen);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes From Different Kitchens</h2>
      <div className="food-display-list">
        {filteredFood.length > 0 ? (
          filteredFood.map((item) => (
            <FoodItem
              key={item._id}
              image={item.image}
              name={item.name}
              description={item.description}
              price={item.price}
              id={item._id}
              rating={item.rating}
              kitchen={item.kitchen?.name || "Unknown Kitchen"} // ✅ Safe fallback
            />
          ))
        ) : (
          <p className="no-food-msg">No dishes available in this kitchen.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
