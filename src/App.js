import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from "./Main";
import Header from "./components/Header/Header";
import Login from "./Login/Login";
import Book from "./Book/Book";
import Order from "./Order/Order";
import OrderList from "./Order/OrderList";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book" element={<Book />} />
          <Route path="/order" element={<Order />} />
          <Route path="/orderlist" element={<OrderList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;