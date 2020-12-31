import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useAppState} from "../../AppState.js"
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useHistory} from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/stevenkarlott/">
        Gamer Gazebo Corps
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  text: {
    color: theme.palette.text.primary
  }
}));

const SignIn = (props) => {
  const [formData, setFormData] = React.useState({
    username: "",
    password: ""
  })
  const {history} =useHistory
  const [userData, setUserData] = React.useState(null)
  const [open, setOpen] = React.useState(false);
  const {state, dispatch} = useAppState()
  React.useEffect(() => {
    if(userData) {
            console.log(userData)
            const {token, user} =userData;
            if(user){
            dispatch({type: "auth", payload: {token, username: user.username, user_id: user.id}})
            window.localStorage.setItem("auth", JSON.stringify({token, username: user.username, user_id: user.id}))
            props.history.push(`/`)}
            else {
              setOpen(true)
            }

    }
}, [userData])
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

const login = () => {
  return fetch(state.url + "/login",{
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
}


const handleChange = (event) => {
  setFormData({...formData,[event.target.name]: event.target.value})
}
const handleSubmit = (event) => {
  event.preventDefault()
  login().then((data) => {
          setUserData(data)
  })
}
React.useEffect(() => {
  window.scrollTo(0, 0)
}, [])
  return (

    
    <Container component="main" maxWidth="xs" style={{height: "100vh"}}>
      <CssBaseline />
      <Grid container direction="column" alignItems="align">
        <Grid item xs={12} style={{textAlign: 'center'}}>

        <Typography variant="h6">
          Welcome back to Gamer Gazebo. Please sign to view your's and other's Gamer Gazebo Profile.
        </Typography>
        <Typography variant="body2">
          New features coming soon:
          </Typography>
          <Typography varient="body2">
          -Status-Feed bar
          </Typography>
          <Typography variant="body2">
          -Loginless homepage          
          </Typography>
        </Grid>
      </Grid>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            onChange={handleChange}
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>


        <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          You have entered an incorrect username or password. Please try again.
        </Alert>
        </Snackbar>
        
      </div>
      <Grid container>
            <Grid item>
              <Link to="/signup" component={RouterLink} className = {classes.text}>
                <Typography variant="overline">
                  Don't have an account? Sign Up
                  </Typography>
              </Link>
            </Grid>
          </Grid>
    </Container>
  );
}

export default SignIn