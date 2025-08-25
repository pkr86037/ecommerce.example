import { useEffect, useState } from "react";
import "./Slider.css";



export default function Slider() {
 const images = [
  {
    id: 1,
    name: "Smartphone",
    price: 15999,
    img: ""
  },
  {
    id: 2,
    name: "Headphones",
    price: 2999,
    img: "https://source.unsplash.com/400x400/?headphones,earphones"
  },
  {
    id: 3,
    name: "Laptop",
    price: 55999,
    img: "https://source.unsplash.com/400x400/?laptop,computer"
  },
  {
    id: 4,
    name: "Shoes",
    price: 1999,
    img: "https://source.unsplash.com/400x400/?shoes,sneakers"
  },
  {
    id: 5,
    name: "Wrist Watch",
    price: 1499,
    img: "https://source.unsplash.com/400x400/?watch,wristwatch"
  },
  {
    id: 6,
    name: "Backpack",
    price: 999,
    img: "https://source.unsplash.com/400x400/?backpack,bag"
  },
  {
    id: 7,
    name: "Camera",
    price: 32999,
    img: "https://source.unsplash.com/400x400/?camera,photography"
  },
  {
    id: 8,
    name: "Sunglasses",
    price: 799,
    img: "https://source.unsplash.com/400x400/?sunglasses,glasses"
  },
  {
    id: 9,
    name: "T-Shirt",
    price: 499,
    img: "https://source.unsplash.com/400x400/?tshirt,clothes"
  },
  {
    id: 10,
    name: "Smart Watch",
    price: 2499,
    img: "https://source.unsplash.com/400x400/?smartwatch"
  }
];
 
 

  const [current, setCurrent] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    
    <div className="slider">
        <h1>Hello wolrd</h1>
      {images.map((img, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
        >
          <img src={img} alt="banner" />
          
        </div>
        
      ))}

      {/* Dots Navigation */}
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={index === current ? "dot active" : "dot"}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
