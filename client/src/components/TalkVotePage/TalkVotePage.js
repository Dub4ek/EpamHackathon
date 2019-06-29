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

import { getQuestions, createQuestionVote }  from './TalkVotePageAPI';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  questionText: {
    marginLeft: 20
  },
  icon: {
    justifyContent: 'flex-end',
    marginRight: 20
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
  const classes = useStyles();

  const userId = localStorage.getItem('id');

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions()
      .then((result) => result.json())
      .then((data) => {
        setQuestions(data);
        console.log(data)
      })
      .catch((error) => console.log(error));
  }, []);

  const handleQuestionVote = (itemId) => {
    createQuestionVote(itemId, userId);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className={classes.voting}>
          <div className={classNames(classes.voteButton, classes.voteAgainst)}>
            <img src={thumbDown} alt="dislike"/>
          </div>
          <div className={classNames(classes.voteButton, classes.voteFor)}>
            <img src={thumbUp} alt="like"/>
          </div>
        </div>
      <List component="nav" className={classes.root} aria-label="Questions">
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