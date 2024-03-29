import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import TalksListPage from "./components/TalksListPage/TalksListPage";
import TalkVotePage from "./components/TalkVotePage/TalkVotePage";

import './App.css';


function App() {
  return (
    <Router>
      <Route exact path='/' component={LoginPage}></Route>
      <Route exact path='/talksList' component={TalksListPage}></Route>
      <Route exact path='/talkVote' component={TalkVotePage}></Route>
    </Router>
  );
}

export default App;
