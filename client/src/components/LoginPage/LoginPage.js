import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {createUser} from './LoginPageAPI';
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  parentContainer: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    overflow: 'auto',
  },
  container: {
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  button: {
    margin: '30px 8px 8px',
  },
  title: {
    fontSize: '3em',
  },
}));


function LoginPage(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    email: '',
  });


  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const loginUser = (values) => {
    createUser(values)
      .then(() => {
        props.history.push('/talksList');
      });
  };

  return (
    <React.Fragment>
      <Container className={classes.parentContainer}>
      <form className={classes.container} noValidate autoComplete="off">
        <h1 className={classes.title}>Cobby</h1>
        <TextField
          id="standard-name"
          label="Name"
          className={classes.textField}
          value={values.name}
          onChange={handleChange('name')}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Email"
          className={classes.textField}
          value={values.email}
          onChange={handleChange('email')}
          margin="normal"
        />
        <Button onClick={() => loginUser(values)} variant="contained" color="primary" className={classes.button}>
          Sign In
        </Button>
      </form>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(LoginPage);