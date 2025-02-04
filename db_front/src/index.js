import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from "axios";
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);



// import {useEffect, useState} from "react";


// function App() (
// const{signUpInfo, setSignUpInfo} = useState({
//     id: "",
//     pw: "",
//     name: ""
// })

// const{signUpInfo, setSignUpInfo} = useState({

// id: "",

// pw: ""

// })

// useEffect(()->{

// axious.get().then((res)->)

// })

// function onClickSignUp(){

// console.log(setSignUpInfo)

// axios.post("http://localhost:4001/indexCtrl",(user: signUpInfo)).then   ((res)->{
//     console.log(res.data.mas)
//     })
// }

// function onClickLogin(){

// axios.post("http://localhost:4001/indexCtrl",(user: signUpInfo)).then((res)-> {
// console.log(res.data.mas)
// })
// }

// return (
//     <div className="App">
//         <div className="container">
//             <div className="box">
//                 <input type="text" placeholder="아이디" anme="id" value={signUpInfo.id} onChange={onChangeSignUp}/>
//                 <input type="password" placeholder="비밀번호" anme="pw" value={signUpInfo.pw} onChange={onChangeSignUp}/>
//                 <input type="text" placeholder="아이디" anme="id" value={signUpInfo.id} onChange={onChangeSignUp}/>
//             </div>
//         </div>
//     </div>
//     <div className="box">
//     </div>
// )

// )