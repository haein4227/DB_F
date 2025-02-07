import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

function BookDetail() {
  const loc = useLocation();
  const nav = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(loc.state?.price);
  const [bookInfo, setBookInfo] = useState({
    id: loc.state?.id,
    name: loc.state?.name,
    inven: loc.state?.inven,
    price: loc.state?.price,
  });
  function onClickBookToCart() {
    axios
      .post("http://localhost:4001/indexCtrl", {
        book: bookInfo,
        quantity: quantity,
      })
      .then((res) => {
        console.log(res.data);
      });
    alert("장바구니 담기 완료");
  }
  function onClickDirect() {
    nav("/order", {
      state: { list: bookInfo, type: "direct", quantity, total },
    });
  }

  function onClickPlus() {
    if (bookInfo.inven <= quantity) {
      alert("재고량을 초과 하였습니다.");
    } else {
      console.log(bookInfo.inven);
      setQuantity(quantity + 1);
    }
  }
  function onClickminus() {
    setQuantity(quantity - 1);
  }

  useEffect(() => {
    setTotal(bookInfo.price * quantity);
  }, [onClickPlus, onClickminus]);

  return (
    <div>
      <h1>도서상세페이지</h1>
      <ul>
        <li>
          도서명: {bookInfo.name} <br />
          재고량: {bookInfo.inven} <br />
          판매가: {bookInfo.price}
        </li>
      </ul>
      <div>수량: {quantity}</div>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickminus}>-</button>
      <div>금액: {total}</div>
      <button onClick={onClickBookToCart}>장바구니에 담기</button>
      <button onClick={onClickDirect}>바로 주문하기</button>
    </div>
  );
}

export default BookDetail;