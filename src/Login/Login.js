import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function LoginPopup({ onClose, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async () => {
    try {
      // 유효성 검사
      if (!username || !password) {
        setError("아이디와 비밀번호를 모두 입력해주세요.");
        return;
      }

      // API 요청
      const response = await axios.post("http://localhost:4001/indexCtrl", {
        username,
        password
      });

      // 로그인 성공 처리
      if (response.data && response.data.userId) {
        sessionStorage.setItem("userId", response.data.userId);
        sessionStorage.setItem("userToken", response.data.token); // JWT 토큰이 있다고 가정

        setSuccessMessage("로그인 성공!");
        setError("");

        setTimeout(() => {
          onLoginSuccess(response.data.userId);
          onClose();
        }, 1000);
      } else {
        setError("유효한 사용자 정보를 찾을 수 없습니다.");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message ||
        "로그인에 실패했습니다. 다시 시도해주세요.";
      setError(errorMessage);
      setSuccessMessage("");
      console.error("로그인 오류:", err.response || err.message);
    }
  };

  return (
    <div className="login-popup-backdrop">
      <div className="login-popup">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>로그인</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button">
          <button onClick={handleLogin}>로그인</button>
          <button onClick={onClose}>취소</button>
        </div>
        {error && <p className="er-m">{error}</p>}
        {successMessage && <p className="suc-m">{successMessage}</p>}
      </div>
    </div>
  );
}

export default Login;