import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'
import LinearProgress from '@material-ui/core/LinearProgress';
import { getTalksList }  from './TalksListPageAPI';


const useStyles = makeStyles({
  listContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  card: {
    minWidth: '40%',
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
  }
});

function TalksListPage() {
  const classes = useStyles();
  const talks = [{
    id: 1,
    title: "Доклад 1",
    rating: 7,
    time: ''
  }];

  useEffect(() => {
    getTalksList()
      .then((result) => {
        console.log(result);
      })
  })

  return (
    <>
      <Container>
        <section className={classes.listContainer}>
          {talks.map(item => (
            <Card className={classes.card} item={item} key={item.id}>
              <CardContent>
                <Typography variant="h5" component="h2" className={classes.title}>
                  {item.title}
                </Typography>
                <Typography variant="body2" component="p" className={classes.rating}>
                  <LinearProgress classes={{barColorPrimary: '#00FF00'}} className={classes.linearProgress} variant="determinate" value={item.rating} />
                </Typography>
                <Typography className={classes.time} color="textSecondary">
                  10:00 - 11:30
                </Typography>
              </CardContent>
            </Card>
          ))}
        </section>
        <Fab color="secondary" aria-label="Add" className={classes.fabButton}>
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
}

export default TalksListPage;