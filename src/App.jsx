import { FaSearch, FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiShop } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { user } from "./data"
import Slider from "./slider/slider";
import './App.css'
import { useState } from "react";

function App() {

  const [cart, setCart] = useState([])

  const addToCart = (card) => {
    setCart([...cart, card]);
  }

  const totalPrice = cart.reduce((curr, accu) => (curr + accu.price), 0)


  return (
    <>
      <div className="main-section">
        <header>
          <div className="logo">
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" alt="" />
          </div>
          <div className="serach-section">
            <input type="text" placeholder="Search for products Brand and More" />
            <FaSearch />
          </div>
          <div className="login-section">
            <h2> < FaRegUserCircle /> Login <IoIosArrowDown /></h2>
          </div>
          <div className="cart">
            <h2> <AiOutlineShoppingCart />Cart</h2>
          </div>
          <div className="seller-section">
            <h2> <CiShop /> Become a Seller</h2>
          </div>
        </header>
      </div>

      <div className="hero-section">
        < Slider />

      </div>

      <div className="card-section">
        {user.map((card) => {
          return <div key={card.id}>
            <div className="card-div">
              <div className="img">
                <img src="{card.image}" alt="" />
              </div>
              <h3>{card.name}</h3>
              <p>Rating {card.category}</p>
              <p>Price {card.price}</p>
              <p className="rate">rating - {card.rating} <FaRegStar /></p>
              <button onClick={() => addToCart(card)}>Add to Cart</button>
            </div>

          </div>
        })}
      </div>

      <div className="cart">
        <h1>CART VALUE</h1>
        <ul>
          {cart.map((item) => (
            <li key={item}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
        <p>Total Price {totalPrice}</p>
      </div>



    </>
  )
}

export default App
