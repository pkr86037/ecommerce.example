import { FaSearch, FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiShop } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { user } from "./data";
import { MdDelete } from "react-icons/md";
import Slider from "./slider/slider";
import "./App.css";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  console.log(cart, "cart");

  // ✅ Add to cart
  const addToCart = (card) => {
    const isItemExist = cart.find((item) => item.id === card.id);

    if (isItemExist) {
      const updatedCart = cart.map((item) =>
        item.id === card.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...card, quantity: 1 }]);
    }
  };

  // ✅ Remove item completely from cart
  const removeElement = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // ✅ Calculate total
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ✅ Increase Qty
  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  // ✅ Decrease Qty + Remove if quantity=0
  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); // remove item if qty 0
    setCart(updatedCart);
  };

  return (
    <>
      <div className="cantaner">
        <div className="fristcantaner"></div>

        <div className="hero-section"></div>

        {/* ✅ Product Section */}
        <div className="card-section">
          {user.map((card) => {
            const isInCart = cart.some((item) => item.id === card.id); // ✅ check if item in cart
            return (
              <div key={card.id}>
                <div className="card-div">
                  <div className="img">
                    <img src={card.image} alt={card.name} />
                  </div>
                  <h3>{card.name}</h3>
                  <p>Category {card.category}</p>
                  <p>Price Rs {card.price}</p>
                  <p className="rate">
                    Rating - {card.rating} <FaRegStar />
                  </p>

                  {/* ✅ Button disable only if in cart */}
                  <button
                    onClick={() => addToCart(card)}
                    disabled={isInCart}
                  >
                    {isInCart ? "Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ✅ Cart Section */}
        <div className="second">
          <div className="cart">
            <h1>CART VALUE</h1>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <div className="display-hero">
                    <div className="hero-id">
                      <p>Id {item.id}</p>
                    </div>
                    <div className="hero-name">
                      <p> Product: {item.name}</p>
                    </div>
                    <div className="hero-price">
                      <p>Rs {item.price * item.quantity}</p>
                    </div>
                    <button
                      disabled={item.quantity === 1}
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </button>{" "}
                    {item.quantity}
                    <button onClick={() => increaseQty(item.id)}>+</button>
                    
                    {/* ✅ Delete Button */}
                    <button className="del-Btn" onClick={() => removeElement(item.id)}><MdDelete /></button>
                  </div>
                </li>
              ))}
            </ul>

            <p>
              <b>Total Price: Rs {totalPrice}</b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
