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

import { getQuestions, createQuestionVote, createTalkVote, createQuestion, getTalksVotes }  from './TalkVotePageAPI';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

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
    backgroundColor: '#4CAF50'
  },
  voteAgainst: {
    backgroundColor: '#B00020'
  },
  questionVotes: {
    lineHeight: '24px',
    marginLeft: '6px',
    fontSize: '16px'
  },
  fabButton: {
    position: 'absolute',
    bottom: '50px',
    right: '50px',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const [openDialog, setOpenDialog] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [commentVoteText, setCommentVoteText] = useState('');
  const [talkReaction, setTalkReaction] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    getQuestions(talkID)
      .then((result) => result.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => console.log(error));
  };

  const handleQuestionVote = (questionId) => {
    createQuestionVote(questionId, userId);

    loadQuestions();
  };

  const handleTalkVote = (positive) => {
    setTalkReaction(positive);
    setOpenCommentDialog(true);
  };

  const addQuestionClickHandler = () => {
    setOpenDialog(true);
  };

  const questionTextChangeHandler = (event) => {
    setQuestionText(event.target.value);
  };

  const createQuestionClickHandler = () => {
    const questionData = {
      title: null,
      talk: talkID,
      user: userId
    };

    questionData.title = questionText;
    createQuestion(questionData)
      .then(() => loadQuestions())
      .then(() => setOpenDialog(false))
      .catch((error) => console.log(error));
  };

  const cancelQuestionWindow = (event) => {
    setQuestionText('');
    setOpenDialog(false);
  };

  const commentTextChangeHandler = (event) => {
    setCommentVoteText(event.target.value);
  };

  const cancelCommentWindow = () => {
    setCommentVoteText('');
    setOpenCommentDialog(false);
  };

  const createCommentVoteClickHandler = () => {
    getTalksVotes(userId, talkID)
      .then((result) => result.json())
      .then((result) => {
        if(result.length === 0) {
          return createTalkVote(talkID, talkReaction, commentVoteText, userId)
        } else {
          setOpenCommentDialog(false);
        }
      })
      .then(() => setOpenCommentDialog(false));
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
            <StarIcon color={true ? 'secondary' : 'action'} onClick={() => handleQuestionVote(item.id)} />
            <div className={classes.questionVotes}>
              {item.rating}
            </div>
          </ListItemIcon>
        </ListItem>
        ))}
      </List>
        <Fab color="secondary" aria-label="Add" className={classes.fabButton} onClick={addQuestionClickHandler}>
          <AddIcon />
        </Fab>
      </Container>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Ask a question?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              id="standard-uncontrolled"
              label="Question"
              className={classes.textField}
              margin="normal"
              fullWidth
              multiline={4}
              required
              onChange={questionTextChangeHandler}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelQuestionWindow} color="primary">
            Cancel
          </Button>
          <Button onClick={createQuestionClickHandler} color="primary">
            Ask
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openCommentDialog}
        TransitionComponent={Transition}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Are you sure to vote for the talk?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              id="standard-uncontrolled"
              label="Comment"
              className={classes.textField}
              margin="normal"
              fullWidth
              multiline={4}
              required
              onChange={commentTextChangeHandler}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelCommentWindow} color="primary">
            Cancel
          </Button>
          <Button onClick={createCommentVoteClickHandler} color="primary">
            Vote
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default TalksVotePage;