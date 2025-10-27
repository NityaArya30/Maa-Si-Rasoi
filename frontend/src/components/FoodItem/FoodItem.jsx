import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, description, id, rating, kitchen }) => {
    const [itemCount, setItemCount] = useState(0);
    const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext);

    // ⭐ Render rating stars dynamically
    const renderStars = (ratingValue) => {
        const stars = [];
        const safeRating = ratingValue || 0;
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(safeRating)) {
                stars.push(<span key={i} className="star filled">★</span>); // Full star
            } else if (i === Math.floor(safeRating) + 1 && safeRating % 1 !== 0) {
                stars.push(<span key={i} className="star half">★</span>); // Half star
            } else {
                stars.push(<span key={i} className="star empty">★</span>); // Empty star
            }
        }
        return stars;
    };

    return (
        <div className="food-item">
            <div className="food-item-img-container">
                <img
                    className="food-item-image"
                    src={image ? url + "/images/" + image : assets.placeholder}
                    alt={name || "Food Item"}
                />

                {!cartItems[id] ? (
                    <img
                        className="add"
                        onClick={() => addToCart(id)}
                        src={assets.add_icon_white}
                        alt="Add"
                    />
                ) : (
                    <div className="food-item-counter">
                        <img
                            src={assets.remove_icon_red}
                            onClick={() => removeFromCart(id)}
                            alt="Remove"
                        />
                        <p>{cartItems[id]}</p>
                        <img
                            src={assets.add_icon_green}
                            onClick={() => addToCart(id)}
                            alt="Add More"
                        />
                    </div>
                )}
            </div>

            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <div>
                        <p className="food-item-name">{name || "Unnamed Item"}</p>

                        {/* Category Badge (safe check) */}
                        <span
                            className={`food-item-category-badge category-${(kitchen || "general")
                                .replace(/\s+/g, "")
                                .toLowerCase()}`}
                        >
                            {kitchen || "General"}
                        </span>
                    </div>

                    <div className="stars">
                        {renderStars(rating)}
                        <span className="rating-number">
                            ({rating ? rating.toFixed(1) : "0.0"})
                        </span>
                    </div>
                </div>

                <p className="food-item-desc">{description || "No description available"}</p>
                <p className="food-item-price">
                    {currency}{price || "0.00"}
                </p>
            </div>
        </div>
    );
};

export default FoodItem;
