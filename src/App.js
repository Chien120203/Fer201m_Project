import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Client/Home/Home";
import ListProduct from "./components/Client/ListProduct";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Client/Home/Home";
import Login from "./components/common/Login/Login";
import Signup from "./components/common/Register/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dien-thoai" element={<ListProduct />} />

        <Route path="/" element={<Home />} />
        {/* <Route path='/about' element={<About />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
