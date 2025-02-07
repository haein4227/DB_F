import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4001/indexCtrl").then((res) => {
      setList(res.data);

      const sumPrice = res.data.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotal(sumPrice);

      const sumQuan = res.data.reduce((acc, item) => acc + item.quantity, 0);
      setQuantity(sumQuan);
    });
  }, []);

  console.log("cart: ", list);
  console.log("총 금액: ", total, "총 수량: ", quantity);

  function onClickMinus(cart) {
    axios.post("http://localhost:4001/indexCtrl", {
      state: "minus",
      book: cart.book_id,
    });
    window.location.reload();
  }

  function onClickPlus(cart) {
    axios.post("http://localhost:4001/indexCtrl", {
      state: "plus",
      book: cart.book_id,
      inven: cart.inventory,
    });
    window.location.reload();
  }

  function onClickBuy() {
    nav("/order", { state: { list, total, quantity, type: "cart" } });
  }

  return (
    <div>
      <h1>장바구니</h1>
      <ul>
        {list.map((cart) => (
          <li key={cart.cart_list_id}>
            도서명: {cart.book_name} <br />
            가격: {cart.quantity * cart.price} <br />
            수량: {cart.quantity}
            <button onClick={() => onClickPlus(cart)}>+</button>
            <button onClick={() => onClickMinus(cart)}>-</button>
          </li>
        ))}
      </ul>
      <div>총 수량: {quantity}</div>
      <div>총액: {total.toLocaleString()}</div>
      <button onClick={onClickBuy}>구매하기</button>
    </div>
  );
}

export default Cart;