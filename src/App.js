import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Client/Home/Home';
import ListProduct from './components/Client/ListProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dien-thoai' element={<ListProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
