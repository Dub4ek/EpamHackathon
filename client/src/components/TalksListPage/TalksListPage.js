import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'
import LinearProgress from '@material-ui/core/LinearProgress';
import { getTalksList, createTalk }  from './TalksListPageAPI';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardActionArea from '@material-ui/core/CardActionArea';
import { withRouter } from "react-router-dom";


const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#4CAF50',
  },
  barColorPrimary: {
    backgroundColor: '#EF5350',
  },
})(LinearProgress);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  listContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    minWidth: '40%',
    maxWidth: '40%',
    margin: '15px'
  },
  title: {
    marginBottom: '20px',
  },
  rating: {
    fontSize: '1.2rem',
    marginBottom: 12,
  },
  time: {
  },
  linearProgress: {
    height: '2em',
  },
  barColorPrimary: {
    color: '#00FF00'
  },
  container: {
    width: '100%',
    height: '100%',

  },
  fabButton: {
    position: 'absolute',
    bottom: '50px',
    right: '50px',
  },
  dateMinus: {
    padding: '1em',
  },
});

function TalksListPage(props) {
  const classes = useStyles();
  const [talksList, setTalksList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [talkName, setTalkName] = useState('');
  const [talkStartDate, setTalkStartDate] = useState('');
  const [talkEndDate, setTalkEndDate] = useState('');
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    requestTalksList();
    setAdmin(localStorage.getItem('isRoleAdmin'));
  }, [])

  const requestTalksList = () => {
    return getTalksList()
      .then((result) => result.json())
      .then((data) => {
        setTalksList(data);
      })
      .catch((error) => console.log(error));
  }

  const timeConvert = (value) => {
    return moment(value).format("HH:MM DD MMM") ;
  }

  const addButtonClickHandler = () => {
    setOpen(true);
  }

  const createTalkClickHandler = () => {
    const data = {
      title: '',
      start: '',
      end: '',
      user: ''
    };

    
    data.user = localStorage.getItem('id')
    data.title = talkName;
    data.start = talkStartDate;
    data.end = talkEndDate;

    createTalk(data)
      .then(() => {
        requestTalksList()
          .then(() => {
            setOpen(false);
          });
      });
  }

  const cancelTalkWindow = () => {
    setOpen(false);
  }

  const nameChangeHandler = (event, value) => {
    setTalkName(event.target.value);
  }

  const startDateChangeHandler = (event) => {
    setTalkStartDate(moment(event.target.value).valueOf());
  }

  const endDateChangeHandler = (event) => {
    setTalkEndDate(moment(event.target.value).valueOf());
  }

  const cardClickHandler = (talkId) => {
    props.history.push(`/talkVote?talkId=${talkId}`);
  };

  return (
    <main className={classes.container}>
      <Container>
        <section className={classes.listContainer}>
          {talksList.map(item => (
            <Card className={classes.card} item={item} key={item.id}>
              <CardActionArea onClick={() => cardClickHandler(item.id)}>
                <CardContent>
                  <Typography variant="h5" component="h2" className={classes.title}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" component="p" className={classes.rating}>
                      <span>Rating</span>
                    <ColorLinearProgress classes={{barColorPrimary: '#00FF00'}} className={classes.linearProgress} variant="determinate" value={item.rating} />
                  </Typography>
                  <Typography className={classes.time} color="textSecondary">
                    {timeConvert(item.start)}<span className={classes.dateMinus}>-</span>{timeConvert(item.end)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </section>
        {isAdmin == true ? <Fab color="secondary" aria-label="Add" className={classes.fabButton} onClick={addButtonClickHandler}>
        <AddIcon />
      </Fab> : null}
      </Container>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Create New Talk</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              id="standard-uncontrolled"
              label="Talk Name"
              className={classes.textField}
              margin="normal"
              fullWidth
              required
              onChange={nameChangeHandler}
            />
            <TextField
              id="standard-uncontrolled"
              label="Talk Start"
              className={classes.textField}
              margin="normal"
              type="datetime-local"
              required
              onChange={startDateChangeHandler}
            />
            <TextField
              id="standard-uncontrolled"
              label="Talk End"
              className={classes.textField}
              margin="normal"
              type="datetime-local"
              required
              onChange={endDateChangeHandler}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelTalkWindow} color="primary">
            Cancel
          </Button>
          <Button onClick={createTalkClickHandler} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}

export default withRouter(TalksListPage);