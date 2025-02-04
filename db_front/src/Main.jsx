import axios from "axios";
import React, { useState, useEffect } from "react";

axios.defaults.withCredentials = true;

function Main() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4001")
      .then((res) => {
        if (res.data.user) {
          setUserData(res.data);
        } else {
          setUserData(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching user data: ", err);
        setUserData(null);
      });
  }, []);

  if (userData === null) {
    return (
      <div className="loading">
        <h2>미 로그인 상태입니다.</h2>
        <button onClick={() => navigate("/login")}>로그인 페이지로 가기</button>
      </div>
    );
  }

  return (
    <div className="main">
      <h1>환영합니다.</h1>{" "}
      <div className="data-section">
        <div className="data-item">User: {userData.user}</div>
        <div className="data-item">Type: {userData.type}</div>
      </div>
    </div>
  );
}

export default Main;