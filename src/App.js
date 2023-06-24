import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ListProduct from "./components/Client/ListProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Client/Home/Home";
import Login from "./components/common/Login/Login";
import Signup from "./components/common/Register/Register";
import ProductDetail from "./components/Client/ProductDetail";
import ShoppingCard from "./components/Client/ShoppingCard";
import Logout from "./components/common/Logout/Logout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dien-thoai" element={<ListProduct />}></Route>
        <Route path="/dien-thoai/:catId" element={<ListProduct />}></Route>
        <Route
          path="dien-thoai/product-detail/:ID"
          element={<ProductDetail />}
        />
        <Route path="/" element={<Home />} />
        {/* <Route path='/about' element={<About />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shoppingcard" element={<ShoppingCard />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
