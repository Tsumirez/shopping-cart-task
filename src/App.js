import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const [qty, setQty] = useState(0);
  const [shipping, setShipping] = useState(23.8);
  const [subTotal, setSubTotal] = useState(0);
  const [total, settotal] = useState(subTotal + shipping);

  const itemDiv = useRef(null);

  const item = { name: "Headphones", price: 11.9 };

  const changeQty = (e, amount) => {
    e.preventDefault();
    setQty((prev) => (prev + amount >= 0 ? prev + amount : prev));
  };

  const update = () => {
    setSubTotal(qty * item.price);
  };

  const hide = (e) => {
    itemDiv.current.style.display='none'
    setSubTotal(0)
  }

  useEffect(() => {
    if (subTotal > 100 || subTotal===0) {
      setShipping(0);
    } else {
      setShipping(23.8);
    }
  }, [subTotal]);

  useEffect(() => {
    settotal(subTotal + shipping);
  }, [subTotal, shipping]);

  return (
    <div className="App">
      <div id="cart">
        <h1>Shopping Cart</h1>
        <div className="cart-items">
          <h3>Product Name</h3>
          <h3>Price</h3>
          <h3>Qty</h3>

          <hr />
          <div className="item" ref={itemDiv}>
            <img src="./images/x-img.png" alt="" onClick={hide}/>
            <img src="./images/headphones.png" alt="" />
            <span>{item.name}</span>
            <strong>${item.price}</strong>
            <span className="quantity">
              <a href="/" onClick={(e) => changeQty(e, -1)}>
                -
              </a>
              <input type="text" name="" readOnly={true} value={qty} id="" />
              <a href="/" onClick={(e) => changeQty(e, 1)}>
                +
              </a>
              <img src="./images/edit-img.png" alt="" onClick={update} />
            </span>
          </div>
          <hr />
          <button onClick={update}>Updata Shopping Cart</button>
        </div>
      </div>
      <div id="summary">
        <button>Proceed to Checkout</button>
        <h2 className="apart">
          SHIPPING <b>${shipping.toFixed(2)}</b>
        </h2>
        <h2 className="apart">CART TOTALS</h2>
        <div className="summary-body">
          <p className="apart">
            Subtotal: <b>${subTotal.toFixed(2)}</b>
          </p>
          <p className="apart">
            Grand Total: <b>${total.toFixed(2)}</b>
          </p>
          <button>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default App;