import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Book() {
  const [bookList, setBookList] = useState([]);
  const [search, setSearch] = useState("");
  const [isLogin, setIsLogin] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4001/indexCtrl").then((res) => {
      setBookList(res.data.list);
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
    setSearch(e.target.value);
  }

  const filterBookName = bookList.filter((book) =>
    book.book_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>도서목록</h1>
      <input
        type="text"
        value={search}
        onChange={onChangeSearch}
        placeholder="도서명을 입력해 주세요..."
      />
      <ul>
        {filterBookName.map((book) => (
          <li key={book.book_id} onClick={() => onClickBook(book)}>
            {book.book_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Book;