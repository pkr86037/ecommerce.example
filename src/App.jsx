import { FaRegStar } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown,MdOutlineShoppingCart } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { user } from "./data";
import { MdDelete } from "react-icons/md";

import "./App.css";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  console.log(cart, "cart");

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

  const removeElement = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  return (
    <>
    <header>
      <div className="nav-logo">
        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" alt=""/>
      </div>
      <div className="input-search">
        <input type="text" placeholder="Search for Products, brand and More"/>
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

        <div className="card-section">
          {user.map((card) => {
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

                  <button className="add-btn" onClick={() => addToCart(card)} disabled={isInCart}>
                    {isInCart ? "Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

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
