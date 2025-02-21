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
    const checkLoginState = async () => {
      try {
        const res = await axios.get("http://localhost:4001/state");
        console.log('Session check:', res.data); // 응답 구조 확인용
        if(res.data.isLoggedIn && res.data.userInfo) { // 서버 응답 구조에 맞게 수정
          setUserData(res.data.userInfo);
        } else {
          setUserData(null); // 초기값을 null로 통일
        }
      } catch (err) {
        setUserData(null);
        console.error('Session check error:', err);
      }
    };
    checkLoginState();
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

  const handleAddToCart = async (book) => {
    if(!userData) {
      alert('로그인이 필요합니다');
      return navigate('/login');
    }
    
    try {
      await axios.post('http://localhost:4001/cart', {
        book_num: book.num,
        amount: quantities[book.num] || 1
      });
      alert('장바구니에 추가되었습니다');
    } catch (err) {
      alert('추가 실패: ' + err.response?.data?.msg);
    }
  };

  //로딩 상태 관리 코드
  if (userData === null) {
    return (
      <div className="loading">
        <h2>로그인 상태를 확인하는 중입니다...</h2>
      </div>
    );
  }

  if (userData === false) {
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