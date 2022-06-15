import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// import Home from '@React/Pages/Home';
import Login from '@React/Pages/Login';
import Register from '@React/Pages/Register';

class App extends React.Component{
  render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;