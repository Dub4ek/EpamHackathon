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
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  voting: {
    display: 'flex',
  },
  voteButton: {

  },
  voteFor: {

  },
  voteAgainst: {

  }
}));

function TalksVotePage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className={classes.voting}>

        </div>
      <List component="nav" className={classes.root} aria-label="Questions">
        <ListItem button>
          <ListItemText primary="Текст вопроса" />
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Текст вопроса" />
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
        </ListItem>
      </List>
        <Fab color="secondary" aria-label="Add" className={classes.fabButton}>
          <AddIcon />
        </Fab>
      </Container>

    </React.Fragment>
  );
}

export default TalksVotePage;