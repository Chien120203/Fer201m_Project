import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Client/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        {/* <Route path='/about' element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
