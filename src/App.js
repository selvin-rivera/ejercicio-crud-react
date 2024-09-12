import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Usuarios from './Components/Usuarios';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Usuarios/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
