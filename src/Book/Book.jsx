import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Book() {
  const [bookList, setBookList] = useState([]);
  const [search, setSearch] = useState("");
  const [isLogin, setIsLogin] = useState("");
  const nav = useNavigate();
  const [originalBooks, setOriginalBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4001/book").then((res) => {
      setOriginalBooks(res.data.list);
      setFilteredBooks(res.data.list);
      setIsLogin(res.data.user);
    });
  }, []);

  function onClickBook(book) {
    if (!isLogin) {
      alert("로그인 안되어 있음");
      nav("/login");
    } else {
      nav(`/book/${book.book_id}`, {
        state: {
          id: book.book_id,
          name: book.book_name,
          inven: book.inventory,
          price: book.price,
        },
      });
    }
  }

  function onChangeSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = originalBooks.filter(book => 
      book.book_name?.toLowerCase().includes(searchTerm) ||
      book.author?.toLowerCase().includes(searchTerm)
    );
    setFilteredBooks(filtered);
  }

  console.log("현재 bookList 상태:", bookList); // 오류 수정 test

  return (
    <div>
      <h1>도서목록</h1>
      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          value={search}
          onChange={onChangeSearch}
          placeholder="도서명 또는 저자로 검색..."
          style={{ padding: "8px", width: "300px" }}
        />
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredBooks.map((book) => (
          <li
            key={book.book_id}
            onClick={() => onClickBook(book)}
            style={{
              padding: "10px",
              margin: "5px 0",
              border: "1px solid #ddd",
              cursor: "pointer",
              ":hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            {book.book_name} (재고: {book.inventory})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Book;