import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function TalksVotePage() {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="Contacts">
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Текст вопроса" />
      </ListItem>
      <ListItem button>
        <ListItemText inset primary="Текст вопроса" />
      </ListItem>
    </List>
  );
}

export default TalksVotePage;