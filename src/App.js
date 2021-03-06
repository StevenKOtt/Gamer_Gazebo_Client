import logo from './logo.svg';
import './App.css';
import React from 'react'
import {Grid, Paper} from "@material-ui/core"
import Header from './components/Header'
import Signin from './components/Auth/Signin'
import Signup from './components/Auth/Signup'
import Profile from './components/Pages/UserProfile'
import Home from './components/Pages/Home'
import Loading from './components/Pages/Loading'
import Search from './components/Pages/Search'
import BasicInfoFirst from './components/Auth/BasicInfo'
import { Route, Link, Switch } from "react-router-dom";
import {useAppState} from './AppState.js'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'


const theme = createMuiTheme({
  palette: {
    type: 'dark',

    primary: {
      light: '#337066',
      main: '#004d40',
      dark: '#00352c'
    },
    secondary: {
      light: '#6e43a3',
      main: '#4a148c',
      dark: '#330e62'
    }
  }
})

const useStyles = makeStyles((theme) => ({
  top: {
    marginTop: theme.spacing(12)
  }
}));


export default function App(props){
  const history = useHistory(); 
  const {state, dispatch} = useAppState()
  const {token} = state

  React.useEffect(() => {
    const auth = JSON.parse(window.localStorage.getItem("auth"))
    if (auth){
        dispatch({type: "auth", payload: auth})
        history.push(`/`)
     } else {
      history.push(`/login`)
  }
  }, [])
  const classes = useStyles();

  const [searchData, setSearchData] = React.useState({
    keyword: "",
    setkeyword: ""
  })


  return (
    <ThemeProvider theme={theme}>
      <Paper style={{background: '#18191A'}}>
        <Grid container direction="column">
          <Grid item>
          {/* The NavBar */}
            <Header  searchData={searchData} setSearchData={setSearchData} history= {props.history} /> 
          </Grid>
          
          <Switch>
          <Grid className={classes.top}>
          <Route exact path="/" render={(rp) => ( <Home {...rp}/>)}/>
          <Route exact path="/loading" render={(rp) => ( <Loading {...rp}/>)}/>
          <Route exact path="/login" render={(rp) => ( <Signin {...rp}/>)}
            />
            <Route exact path="/signup" render={(rp) => ( <Signup {...rp}/>)}
            />
            <Route exact path="/user/new/info/:id" render={(rp) => ( <BasicInfoFirst {...rp}/>)}
            />
            <Route exact path="/user/search" render={(rp) => ( <Search {...rp} searchData={searchData} setSearchData={setSearchData}/>)}
            />
            <Route exact path="/user/profile/:id" render={(rp) => ( <Profile {...rp}/>)}
            />
          </Grid>
          </Switch>
        </Grid>
      </Paper>
    </ThemeProvider>
  )
}

