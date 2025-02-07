import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

function Order() {
  const loc = useLocation();
  const nav = useNavigate();
  const [cartBook, setCartBook] = useState({
    arr: loc.state?.list,
    total: loc.state?.total,
    quan: loc.state?.quantity,
  });

  const [cardInfo, setCardInfo] = useState([]);
  const [addrInfo, setAddrInfo] = useState([]);
  const [selcetAddr, setSelectAddr] = useState("");
  const [selcetCard, setSelectCard] = useState("");
  const type = loc.state?.type;
  console.log(type);

  useEffect(() => {
    axios.get("http://localhost:4001/indexCtrl").then((res) => {
      console.log(res.data);
      if (res.data.msg) {
        alert(res.data.msg);
        nav("/mypage");
      } else {
        const userAddr = res.data.addr.map((addr) => ({
          id: addr.addr_id.toString(),
          basic: addr.basic,
          detail: addr.detail,
          zipCode: addr.zip_code,
        }));
        setAddrInfo(userAddr);
        const userCard = res.data.card.map((card) => ({
          cardId: card.card_id.toString(),
          period: card.period,
          company: card.company,
        }));
        setCardInfo(userCard);
      }
    });
  }, [nav]);

  function onChangeCard(e) {
    setSelectCard(e.target.value);
    console.log(selcetCard);
  }

  function onChangeAddr(e) {
    setSelectAddr(e.target.value);
    console.log(selcetAddr);
  }

  function onClickOrder() {
    const selectedCardInfo = cardInfo.find(
      (card) => card.cardId === selcetCard
    );
    const selectedAddrInfo = addrInfo.find((addr) => addr.id === selcetAddr);
    if (!selectedAddrInfo || !selcetCard) {
      alert("배송지나 카드 선택안됨");
    } else {
      axios.post("http://localhost:4001/indexCtrl", {
        book: cartBook,
        addr: selcetAddr,
        card: selcetCard,
        type: type,
      });
      alert("주문 완료. 메인으로 이동합니다.");
      nav("/");
    }
  }

  return (
    <div>
      <h1>주문 페이지</h1>
      <h3>주문도서 정보</h3>
      <ul>
        {/* 배열일 경우 처리 */}
        {Array.isArray(cartBook.arr) ? (
          cartBook.arr.length > 0 ? (
            cartBook.arr.map((arr, idx) => (
              <li key={idx}>
                도서명: {arr.book_name} <br />
                수량: {arr.quantity}권 <br />
                가격: {arr.price * arr.quantity}원
              </li>
            ))
          ) : (
            <li>도서 정보가 없습니다.</li>
          )
        ) : /* 객체일 경우 처리 */
        cartBook.arr ? (
          <li>
            도서명: {cartBook.arr.name} <br />
          </li>
        ) : (
          <li>도서 정보가 없습니다.</li>
        )}
      </ul>
      <div>총 수량: {cartBook.quan}권</div>
      <div>총 가격: {cartBook.total}원</div>
      <h3>카드정보</h3>
      {cardInfo.map((card, idx) => (
        <div key={idx}>
          <input
            type="radio"
            value={card.cardId}
            name="card"
            onChange={onChangeCard}
            checked={card.cardId === selcetCard}
          />
          <label>
            카드번호: {card.cardId} / 유효기간: {card.period} / 카드사:
            {card.company}
          </label>
        </div>
      ))}
      <h3>배송지정보</h3>
      {addrInfo.map((addr, idx) => (
        <div key={idx}>
          <input
            type="radio"
            value={addr.id}
            name="addr"
            onChange={onChangeAddr}
            checked={addr.id === selcetAddr}
          />
          <label>
            우편번호: {addr.zipCode} / 기본주소: {addr.basic} / 상세주소:{" "}
            {addr.detail}
          </label>
        </div>
      ))}
      <hr />
      <button onClick={onClickOrder}>주문하기</button>
    </div>
  );
}

export default Order;