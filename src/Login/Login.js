import axios from "axios";
import React, { useState, useEffect } from "react";

axios.defaults.withCredentials = true;

function Login() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    pw: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4001/loginCtrl")
      .then(res => {
        if(res.data.loggedIn) {
          window.location.replace("/");
        }
      });
  }, []);

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
      const res = await axios.post("http://localhost:4001/login", { 
        id: userInfo.id,
        pw: userInfo.pw
      });
      window.location.reload(); // 세션 갱신을 위한 강제 새로고침
    } catch (err) {
      const errorMessage = err.response?.data?.message ||
        "로그인에 실패했습니다. 다시 시도해주세요.";
      setError(errorMessage);
      setSuccessMessage("");
      console.error("로그인 오류:", err.response || err.message);
    }
  };
//로그인 기능
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