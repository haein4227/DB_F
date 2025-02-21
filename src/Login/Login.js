import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function Login() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    pw: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const res = await axios.post("http://localhost:4001/login", {
        id: userInfo.id,
        pw: userInfo.pw
      }, {
        withCredentials: true //명시적 설정.
      });
      
      console.log('Login response:', res.data);
      
      if (res.data.success) { //서버에 맞게 수정.
        navigate('/', { replace: true });
      } else {
        setError(res.data.message || "로그인 실패");
      }
    } catch (err) {
      setError(err.response?.data?.message || "서버 연결 실패");
      console.error('Login error:', err);
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