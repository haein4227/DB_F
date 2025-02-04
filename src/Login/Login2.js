import axios from "axios";
import React, { useState } from "react";

axios.defaults.withCredentials = true;

function Login() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    pw: "",
  });

  function onChangeLogin(e) {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  }
//API 요청
  function onClickLogin() {
    try {
      axios
        .post("http://localhost:4001/indexCtrl", { user: userInfo })
        .then((res) => {
          console.log(res.data);
          window.location.replace("/");
        });
    } catch (err) {
      const errorMessage = err.response?.data?.message ||
        "로그인에 실패했습니다. 다시 시도해주세요.";
      setError(errorMessage);
      setSuccessMessage("");
      console.error("로그인 오류:", err.response || err.message);
    }
  };

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