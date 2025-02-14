import axios from "axios";
import React, { useEffect, useState } from "react";

function MyPage() {
  const [userName, setUserName] = useState("");
  const [cardInfo, setCardInfo] = useState([]);
  const [addrInfo, setAddrInfo] = useState([]);
  const [userCard, setUserCard] = useState({
    cardId: "",
    period: "",
    company: "",
  });
  const [userAddr, setUserAddr] = useState({
    zipCode: "",
    basic: "",
    detail: "",
  });

  useEffect(() => {
    axios.get("http://localhost:4001/main.js").then((res) => {
      if (res.data.message) {
        setUserName(res.data.name);
        alert(res.data.message);
      } else {
        setUserName(res.data.name);

        if (res.data.card) {
          const cardData = res.data.card.map((card) => ({
            cardId: card.card_id,
            period: card.period,
            company: card.company,
          }));
          setCardInfo(cardData);
        }

        if (res.data.addr) {
          const addrData = res.data.addr.map((addr) => ({
            zipCode: addr.zip_code,
            basic: addr.basic,
            detail: addr.detail,
          }));
          setAddrInfo(addrData);
        }
        setPay(res.data.pay[0].creadit);
      }
    });
  }, []);

  function onChangeCard(e) {
    const { name, value } = e.target;
    setUserCard({ ...userCard, [name]: value });
  }

  function onChangeAddr(e) {
    const { name, value } = e.target;
    setUserAddr({ ...userAddr, [name]: value });
  }

  function onClickCard() {
    axios.post("http://localhost:4001/indexCtrl", { card: userCard });
    console.log(userCard);
    window.location.reload();
  }

  function onClickAddr() {
    axios.post("http://localhost:4001/indexCtrl", { addr: userAddr });
    window.location.reload();
  }

  return (
    <div>
      <h1>{userName}님의 페이지</h1>
      <div>페이 잔액: {pay}원</div>

      <div>카드 정보</div>
      <ul>
        {cardInfo.map((card, idx) => (
          <li key={idx}>
            카드 번호: {card.cardId} <br />
            유효기간: {card.period} <br />
            카드사: {card.company}
          </li>
        ))}
      </ul>
      <div>배송지 정보</div>
      <ul>
        {addrInfo.map((addr, idx) => (
          <li key={idx}>
            우편번호: {addr.zipCode} <br />
            기본주소: {addr.basic} <br />
            상세주소: {addr.detail}
          </li>
        ))}
      </ul>
      <hr />
      <div>카드 정보 기입</div>
      <input
        type="text"
        placeholder="카드번호"
        onChange={onChangeCard}
        name="cardId"
        value={userCard.cardId}
      />
      <input
        type="text"
        placeholder="유효기간"
        onChange={onChangeCard}
        name="period"
        value={userCard.period}
      />
      <input
        type="text"
        placeholder="카드사"
        onChange={onChangeCard}
        name="company"
        value={userCard.company}
      />
      <button onClick={onClickCard}>기입하기</button>
      <hr />
      <div>배송지 정보 기입</div>
      <input
        type="text"
        placeholder="우편번호"
        onChange={onChangeAddr}
        name="zipCode"
        value={userAddr.zipCode}
      />
      <input
        type="text"
        placeholder="기본주소"
        onChange={onChangeAddr}
        name="basic"
        value={userAddr.basic}
      />
      <input
        type="text"
        placeholder="상세주소"
        onChange={onChangeAddr}
        name="detail"
        value={userAddr.detail}
      />
      <button onClick={onClickAddr}>가입하기</button>
    </div>
  );
}

export default MyPage;