import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {IconButton, Grid, Button, Link} from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import {useAppState} from '../AppState.js'
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import {AccountCircle} from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import Logo from '../images/gazebo.png'
import {Redirect, useHistory } from "react-router-dom"
import { Link as RouterLink } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  name: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    marginRight: theme.spacing(2)
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
    
  },
  profileIcon: {
    marginLeft: 0
  }
  
}));

const Header = (props) => {
  const classes = useStyles();
  const {setSearchData, searchData} = props
  const {state, dispatch} = useAppState()
  const history = useHistory();


  const handleChange = (event) => {
    setSearchData({...searchData,[event.target.name]: event.target.value})
  }
  return (
   
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item sm={2} md={1} lg={1}>

          {state.user_id != 0 ? (<Link to="/" component={RouterLink}><img className={classes.name} src={Logo}/></Link>) : (<Link to="/login" component={RouterLink}><img className={classes.name} src={Logo}/></Link>)}    
           
            </Grid>
            <Grid item sm={3}>
            {state.token ? (    
            <div className={classes.search}>
            <div className={classes.searchIcon}>
            <SearchIcon /> 
            </div>
            <InputBase
              placeholder="Search gamers"
              name="keyword"
              onChange={handleChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setSearchData({...searchData,["setkeyword"]: ""})
                  setSearchData({...searchData,["setkeyword"]: searchData.keyword})
                  console.log('Enter key pressed');
                  history.push('/user/search')

                }}}
            />
          </div>
            ) : null}
            </Grid>
            
            <Grid item>
            <div>
           {!state.token ? (
            <>
               <Button variant="contained" component={RouterLink} to={'/login'} color="success">
                  Login
              </Button>
              <Button variant="contained" color="secondary" component={RouterLink} to={'/signup'}>
                  Sign-Up
              </Button></>):(
              <><IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                component={RouterLink} to={`/user/profile/${state.user_id}`}
              >
                <AccountCircle/>
              </IconButton>
              <Button variant="contained" component={RouterLink} to={'/login'} color="secondary" onClick={()=> {
        dispatch({type: "logout"})
      }}>
                  Log-Out
              </Button></>)}
            </div>
            </Grid>
          </Grid>
        
        </Toolbar>
      </AppBar>
  );
}
export default Header





