import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './Components/Users';



function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Users/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
