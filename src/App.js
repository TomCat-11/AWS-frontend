import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './Components/Chat';
import Register from './Components/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Quiz from './Components/Quiz';
import Dict from './Components/Dict';
import Login from './Components/Login';



function App() {
  return (
    <div className="App">
     
      <Router>
        <Routes>
          {/* <Route path='/' element={<Signin/>}/> */}
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/quiz' element={<Quiz/>}/>
          <Route path='/dict' element={<Dict/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
