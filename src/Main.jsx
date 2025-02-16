import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function Main() {
  const [bookList, setBookList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4001/state")
      .then((res) => {
        if(res.data.loggedIn) {
          setUserData(res.data.user);
        } else {
          setUserData(null);
        }
      })
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4001/book")
      .then((res) => setBookList(res.data.list))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const handleQuantityChange = (bookId, value) => {
    setQuantities((prev) => ({ ...prev, [bookId]: Number(value) }));
  };

  const handleAddToCart = (book) => {
    axios
      .post("http://localhost:4001/cart", {
        book_num: book.num,
        amount: quantities[book.num] || 1,
      })
      .then(() => alert("장바구니 추가 성공"))
      .catch((err) => alert("추가 실패: " + err.response?.data?.msg));
  };

  //로딩 상태 관리 코드
  if (userData === null) {
    return (
      <div className="loading">
        <h2>미 로그인 상태입니다.</h2>
        <button onClick={() => navigate("/login")}>로그인 페이지로 가기</button>
      </div>
    );
  }

  return (
    <div>
      <h1>도서 목록</h1>
      <ul>
        {bookList.map((book) => (
          <li key={book.num}>
            {book.name} - {book.price}원 (재고: {book.inventory})
            <input
              type="number"
              min="1"
              max={book.inventory}
              value={quantities[book.num] || 1}
              onChange={(e) => handleQuantityChange(book.num, e.target.value)}
            />
            <button onClick={() => handleAddToCart(book)}>장바구니 추가</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Main;