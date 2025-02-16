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
  const [pay, setPay] = useState(0);
  const [isLogIn, setIsLogIn] = useState(false);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4001/mypage").then((res) => {
      if (res.data.msg) {
        alert(res.data.msg);
        return;
      }
      setUserName(res.data.name);
      setCardInfo(res.data.card || []);
      setAddrInfo(res.data.home || []);
      setPay(res.data.pay?.[0]?.credit || 0);
    }).catch(err => {
      console.error(err);
      alert("처리 중 오류 발생");
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4001/state").then((res) => {
      setIsLogIn(!!res.data);
    }).catch(err => {
      console.error(err);
      alert("처리 중 오류 발생");
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4001/order/history")
      .then(res => {
        const groupedData = groupByDateTime(res.data);
        setOrderData(groupedData);
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
    axios.post("http://localhost:4001/indexCtrl", { card: userCard })
      .then(() => {
        console.log(userCard);
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
        alert("처리 중 오류 발생");
      });
  }

  function onClickAddr() {
    axios.post("http://localhost:4001/indexCtrl", { addr: userAddr })
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
        alert("처리 중 오류 발생");
      });
  }

  // 카드 삭제 핸들러
  function onClickDeleteCard(cardId) {
    axios.delete(`http://localhost:4001/mypage/card/${cardId}`)
      .then(() => {
        setCardInfo(prev => prev.filter(card => card.cardId !== cardId));
      });
  }

  // 주소 삭제 핸들러
  function onClickDeleteAddr(addrId) {
    axios.delete(`http://localhost:4001/mypage/addr/${addrId}`)
      .then(() => {
        setAddrInfo(prev => prev.filter(addr => addr.id !== addrId));
      });
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
            <button onClick={() => onClickDeleteCard(card.cardId)}>삭제</button>
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
            <button onClick={() => onClickDeleteAddr(addr.id)}>삭제</button>
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