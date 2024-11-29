import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Companies from "./pages/Company";
import Transaction from "./pages/Transaction";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import "./assets/styles/App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/company/customer/:customerId" element={<Companies />} />
            <Route path="/transaction/account/:accountId" element={<Transaction />} /> 
            <Route path="/pages/Dashboard/:customerId" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
