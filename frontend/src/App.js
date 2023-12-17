import React from "react";
import Payment from "./components/Payment";
import Form from "./components/Form";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
};

export default App;
