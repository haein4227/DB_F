import axios from "axios";
import React, { useState, useEffect } from "react";

axios.defaults.withCredentials = true;

function Login() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    pw: "",
  });
  const [error, setError] = useState("");

  // useEffect(() => {
  //   axios.get("http://localhost:4001/loginCtrl")
  //     .then(res => {
  //       if(res.data.loggedIn) {
  //         window.location.replace("/");
  //       }
  //     });
  // }, []);

  function onChangeLogin(e) {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  }
//API 요청
  async function onClickLogin() {
    try {
      const res = await axios.post("http://localhost:4001/login", userInfo);
      if(res.data.msg === "로그인 완료, 세션 저장") {
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('returnUrl') || '/';
        window.location.href = returnUrl;
      }
    } catch (err) {
      setError("로그인 실패: 유효하지 않은 계정 정보");
    }
  };
//로그인 기능
  function onClose() {
    window.history.back(); // 단순히 이전 페이지로 이동
  }

  return (
    <div>
      <h1>로그인</h1>
      <input
        type="text"
        placeholder="아이디"
        onChange={onChangeLogin}
        name="id"
        value={userInfo.id}
      />
      <br />
      <input
        type="password"
        placeholder="비밀번호"
        onChange={onChangeLogin}
        name="pw"
        value={userInfo.pw}
      />
      <br />
      <button onClick={onClickLogin}>로그인</button>
      <button onClick={onClose}>취소</button>
    </div>
  );
}

export default Login;