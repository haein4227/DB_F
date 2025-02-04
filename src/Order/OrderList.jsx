import axios from "axios";
import React, { useEffect, useState } from "react";
axios.defaults.withCredentials = true;

function OrderList() {
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:4001/indexCtrl").then((res) => {
      const groupedData = groupByDateTime(res.data);
      setOrderData(groupedData);
    });
  }, []);

  /*날짜 그룹화 함수*/
  function groupByDateTime(data) {
    return data.reduce((acc, cur) => {
      const dateTime = cur.order_date;
      if (!acc[dateTime]) {
        acc[dateTime] = [];
      }
      acc[dateTime].push(cur);
      return acc;
    }, {});
  }

  return (
    <div>
      <h1>주문 내역</h1>
      {Object.keys(orderData).map((dateTime) => (
        <div key={dateTime}>
          <h3>{dateTime}</h3>
          <ul>
            {orderData[dateTime].map((order, idx) => (
              <li key={idx}>
                도서명: {order.book_name} <br />
                가격: {order.price} <br />
                수량: {order.quantity} <br />
                배송지: {order.basic} {order.detail} <br />
                카드번호: {order.card_id}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default OrderList;