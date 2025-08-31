import { FaRegStar, FaRegUserCircle } from "react-icons/fa";
import {
  MdKeyboardArrowDown,
  MdOutlineShoppingCart,
  MdDelete,
} from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { user } from "./data";
import "./App.css";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // search state

  // Add to cart
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

  // Remove from cart
  const removeElement = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // Total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Increase qty
  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  // Decrease qty
  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  // Filtered products based on search
  const filteredProducts = user.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header>
        <div className="nav-logo">
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
            alt=""
          />
        </div>

        {/* Search Bar */}
        <div className="input-search">
          <input
            type="text"
            placeholder="Search for Products, brand and More"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IoIosSearch />
        </div>

        <div className="login">
          <FaRegUserCircle /> Login <MdKeyboardArrowDown />
        </div>
        <div className="cart-value">
          <MdOutlineShoppingCart /> Cart
        </div>
        <div className="seller">
          <BsShop /> Become a seller
        </div>
        <div className="side-option">
          <CiMenuKebab />
        </div>
      </header>

      <div className="cantaner">
        <div className="fristcantaner"></div>
        <div className="hero-section"></div>

        {/* Product Cards */}
        <div className="card-section">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((card) => {
              const isInCart = cart.some((item) => item.id === card.id);
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
                    <button
                      className="add-btn"
                      onClick={() => addToCart(card)}
                      disabled={isInCart}
                    >
                      {isInCart ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No products found!</p>
          )}
        </div>

        {/* Cart Section */}
        <div className="second">
          <div className="cart">
            <h1>CART VALUE</h1>
            <ol>
              {cart.map((item) => (
                <li key={item.id}>
                  <div className="display-hero">
                    <div className="hero-id">
                      <p>Id {item.id}</p>
                    </div>
                    <div className="hero-name">
                      <p>{item.name}</p>
                    </div>
                    <div className="hero-price">
                      <p>Rs/- {item.price * item.quantity}</p>
                    </div>
                    <button
                      disabled={item.quantity === 1}
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </button>{" "}
                    {item.quantity}
                    <button onClick={() => increaseQty(item.id)}>+</button>
                    <button
                      className="del-Btn"
                      onClick={() => removeElement(item.id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </li>
              ))}
            </ol>

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
