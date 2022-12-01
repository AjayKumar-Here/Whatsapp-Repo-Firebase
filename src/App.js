import React from "react";
import { Chatbar } from './Components/Chatbar/Chatbar';
import { Sidebar } from './Components/Sidebar/Sidebar';
import  Login  from './Components/Login/Login';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { useStateValue } from "./Components/StateProvider";
import './App.css';

function App() {

  const [{ user }] = useStateValue();

  return (
    <div className ="app">
     {!user ? (
      <Login />
    ):(
      <div className="appbody">
        <Router>
          <Sidebar/>
          <Routes>
            <Route path="/" element={ <Chatbar />} />
            <Route exact path="/rooms/:roomId" element={ <Chatbar />} />
          </Routes>
        </Router>
         
      </div>
    )}
    </div>
  );
}

export default App;
