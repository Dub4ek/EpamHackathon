import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames/bind';
import thumbDown from '../../images/thumb-down.svg';
import thumbUp from '../../images/thumb-up.svg';

import { getQuestions, createTalkVote, createQuestionVote }  from './TalkVotePageAPI';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    paddingLeft: 36,
  },
  questionText: {
    paddingLeft: 20
  },
  icon: {
    justifyContent: 'flex-end',
    paddingRight: 20
  },
  voting: {
    display: 'flex',
  },
  voteButton: {
    cursor: 'pointer',
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  voteFor: {
    backgroundColor: '#008000'
  },
  voteAgainst: {
    backgroundColor: '#FF0000'
  },
  questionVotes: {
    lineHeight: '24px',
    marginLeft: '6px',
    fontSize: '16px'
  }
}));

function TalksVotePage() {
  const getParameterByName = (name) => {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };
  const talkID = getParameterByName('talkId') ? getParameterByName('talkId') : 1;

  const classes = useStyles();
  const userId = localStorage.getItem('id');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions(talkID)
      .then((result) => result.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleQuestionVote = (questionId) => {
    createQuestionVote(questionId, userId);

    getQuestions(talkID)
      .then((result) => result.json())
      .then((data) => {
        setQuestions(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const handleTalkVote = (positive) => {
    createTalkVote(talkID, positive, '', userId);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <h2 className={classes.title}>Liked this talk?</h2>
        <div className={classes.voting}>
          <div onClick={() => {handleTalkVote(false)}} className={classNames(classes.voteButton, classes.voteAgainst)}>
            <img src={thumbDown} alt="dislike"/>
          </div>
          <div onClick={() => {handleTalkVote(true)}} className={classNames(classes.voteButton, classes.voteFor)}>
            <img src={thumbUp} alt="like"/>
          </div>
        </div>
      <List component="nav" className={classes.root} aria-label="Questions">
        <h3 className={classes.title}>Current questions:</h3>
        {questions.map(item => (
        <ListItem button item={item} key={item.id}>
          <ListItemText className={classes.questionText} primary={item.title} />
          <ListItemIcon className={classes.icon}>
            <StarIcon onClick={() => handleQuestionVote(item.id)} />
            <div className={classes.questionVotes}>
              {item.rating}
            </div>
          </ListItemIcon>
        </ListItem>
        ))}
      </List>
        <Fab color="secondary" aria-label="Add" className={classes.fabButton}>
          <AddIcon />
        </Fab>
      </Container>
    </React.Fragment>
  );
}

export default TalksVotePage;