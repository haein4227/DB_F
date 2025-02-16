import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [groupedItems, setGroupedItems] = useState({});
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4001/cart")
      .then(res => {
        const grouped = res.data.reduce((acc, item) => {
          const date = new Date(item.added_date).toLocaleDateString();
          acc[date] = acc[date] || [];
          acc[date].push(item);
          return acc;
        }, {});
        setGroupedItems(grouped);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4001/cart.js").then((res) => {
      const sumPrice = res.data.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotal(sumPrice);

      const sumQuan = res.data.reduce((acc, item) => acc + item.quantity, 0);
      setQuantity(sumQuan);
    });
  }, []);

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
    nav("/order", { state: { list: groupedItems, total, quantity, type: "cart" } });
  }

  return (
    <div>
      <h1>장바구니</h1>
      {Object.entries(groupedItems).map(([date, items]) => (
        <div key={date}>
          <h3>{date}</h3>
          <ul>
            {items.map(item => (
              <li key={item.cart_inven_id}>
                {item.book_name} - {item.amount}개 
                ({(item.price * item.amount).toLocaleString()}원)
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>총 수량: {quantity}</div>
      <div>총액: {total.toLocaleString()}</div>
      <button onClick={onClickBuy}>구매하기</button>
    </div>
  );
}

export default Cart;