import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";

import './App.css';
import TalksListPage from "./components/TalksListPage/TalksListPage";
import TalksVotePage from "./components/TalkVotePage/TalkVotePage";


function App() {
  return (
    <Router>
      <Route exact path='/' component={LoginPage}></Route>
      <Route exact path='/talksList' component={TalksListPage}></Route>
      <Route exact path='/talkVote' component={TalksVotePage}></Route>
    </Router>
  );
}

export default App;
