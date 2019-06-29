import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
    margin: '30px 8px 8px',
  },
}));


function LoginPage() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    login: '',
    password: '',
  });


  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };


  return (
    <React.Fragment>
      <Container>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="Login"
          className={classes.textField}
          value={values.login}
          onChange={handleChange('login')}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Password"
          className={classes.textField}
          type="password"
          value={values.password}
          onChange={handleChange('password')}
          margin="normal"
        />
        <Button variant="contained" color="primary" className={classes.button}>
          Sign In
        </Button>
      </form>
      </Container>
    </React.Fragment>
  );
}

export default LoginPage;