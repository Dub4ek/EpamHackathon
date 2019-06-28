import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";

import './App.css';


function App() {
  return (
    <Router>
      <Route exact path='/' component={LoginPage()}></Route>
    </Router>
  );
}

export default App;
