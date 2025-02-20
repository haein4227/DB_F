import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

function Header() {
  const nav = useNavigate();
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4001/state")
      .then((res) => {
        setIsLogIn(res.data.loggedIn);
      })
      .catch(() => setIsLogIn(false));
  }, []);

  function onClickMain() {
    nav("/");
  }

  function onClickLogin() {
    axios.get("http://localhost:4001/state").then((res) => {
      if (res.data.loggedIn) {
        alert("이미 로그인 된 상태입니다");
      } else {
        nav("/login");
      }
    });
  }

  function onClickLogout() {
    axios.post("http://localhost:4001/logout").then((res) => {
      window.location.reload();
    });
  }

  function onClickBook() {
    nav("/book");
  }

  function onClickCart() {
    const returnUrl = encodeURIComponent('/cart');
    nav(`/login?returnUrl=${returnUrl}`);
  }

  function onClickMyPage() {
    if (isLogIn) {
      nav("/mypage");
    } else {
      alert("로그인 해야합니다");
      nav("/login");
    }
  }

  function onClickOrderList() {
    if (isLogIn) {
      nav("/orderlist");
    } else {
      alert("로그인 해야합니다");
      nav("/login");
    }
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <span onClick={onClickMain}>메인</span>
      </div>
      <div>
        {isLogIn ? (
          <>
            <span onClick={onClickLogout}>로그아웃</span>
            <span onClick={onClickMyPage}>마이페이지</span>
          </>
        ) : (
          <>
            <span onClick={() => nav("/register")}>회원가입</span>
            <span onClick={onClickLogin}>로그인</span>
          </>
        )}
        <span onClick={onClickBook}>도서목록</span>
        <span onClick={onClickCart}>장바구니</span>
        <span onClick={onClickOrderList}>주문목록</span>
      </div>
    </div>
  );
}

export default Header;