import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {TextField, MenuItem, FormHelperText} from '@material-ui/core/';
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
import { DirectUpload } from 'activestorage';
import {useHistory} from 'react-router-dom'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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
    height: "100vh"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const BasicInfoFirst = (props) => {
const {state, dispatch} = useAppState()
const {history} = useHistory
const {token} = state
const classes = useStyles();
const [done, setDone] = React.useState(false)
const [formData, setFormData] = React.useState({
      pronoun: "",
      username: state.username,
      country: "",
      about_me: "",
      user_id: state.user_id,
      birthdate: null,
      image: {}
    })

    const uploadFile = (file, user) => {
      const upload = new DirectUpload(file, `${state.url}/rails/active_storage/direct_uploads`)
      upload.create((error, blob) => {
        if (error) {
          console.log(error)
        } else {
          return fetch(`${state.url}/basic_user_infos/${state.user_id}`, {
            method: 'PUT',
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + token,
              'Accept': 'application/json',
              "Access-Control-Allow-Origin": '*',
              "Access-Control-Allow-Credentials" : true 
            },
            body: JSON.stringify({image: blob.signed_id})
          }) 
          // .then(response => response.json())
          // .then(result => console.log(result))
        }
      })
    }



const handleChange = (event) => {
  if (event.target.name === "image") {
    console.log(event.target.files[0])
    setFormData({...formData,[event.target.name]: event.target.files[0]})

  }
  else{
      setFormData({...formData,[event.target.name]: event.target.value})
  }
}

const handleSubmit = (event) => {
  event.preventDefault()
   fetch(state.url + "/basic_user_infos",{
    method: "post",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        Authorization: "bearer " + token
    },
    body: JSON.stringify({
      pronoun: formData.pronoun,
      username: formData.username,
      country: formData.country,
      about_me: formData.about_me,
      user_id: formData.user_id,
      birthdate: formData.birthdate,
      })
})
.then(response => response.json())
.then(data => uploadFile(formData.image, data)
)
props.history.push("/")
}
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            onChange={handleChange}
            name="image"
            type="file"
            id="image"
          />
          <FormHelperText id="image">Upload a Profile Photo</FormHelperText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="pronoun"
            onChange={handleChange}
            select
            label="Select"
            name="pronoun"
            helperText="Please select your Pronouns"
          >
            <MenuItem key="he" value="he">
            he
            </MenuItem>
            <MenuItem key="she" value="she">
            she
            </MenuItem> 
            <MenuItem key="they" value="they">
            they
            </MenuItem> 
            <MenuItem key="other" value="other">
            other
            </MenuItem>        
          </TextField>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            name="country"
            label="Country"
            type="country"
            id="country"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            name="about_me"
            label="About Me"
            type="about_me"
            id="about_me"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            name="birthdate"
            type="date"
            id="about_me"
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
            Complete Sign-Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default BasicInfoFirst