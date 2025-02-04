import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Header.css";

function Header() {

  useEffect(() => {
    axios.get("http://localhost:4001").then((res) => {
      setUserInfo(res.data.user); 
      setType(res.data.type); 
    });
  }, []);

  function onClickLogOut() {
    axios.post("http://localhost:4001/logout").then((res) => {
      alert(res.data.msg);
      setUserInfo(null);
      setType("");
      nav("/");
      window.location.reload();
    });
  }
}

export default Header;