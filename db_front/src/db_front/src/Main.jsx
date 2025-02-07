import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function Main() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4001/indexCtrl")
      .then((res) => {
        if (res.data.user) {
          setUserData(res.data);
        } else {
          setUserData(null);
        }
      })
      //에러 처리 코드
      .catch((error) => {
        console.error("Error fetching user data: ", error);
        setUserData(null);
      });
  }, []);
  //로딩 상태 관리 코드
  if (userData === null) {
    return (
      <div className="loading">
        <h2>미 로그인 상태입니다.</h2>
        <button onClick={() => navigate("/login")}>로그인 페이지로 가기</button>
      </div> 
    );
  }

  return (
    <div>
      <h1>메인입니다.</h1>
    </div>
  );
}

export default Main;