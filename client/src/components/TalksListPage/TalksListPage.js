import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  container: {
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
});

function TalksListPage() {
  const classes = useStyles();

  return (
    <main>
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2" className={classes.title}>
              Доклад 1
            </Typography>
            <Typography variant="body2" component="p" className={classes.rating}>
              Рейтинг
            </Typography>
            <Typography className={classes.time} color="textSecondary">
              10:00 - 11:30
            </Typography>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default TalksListPage;