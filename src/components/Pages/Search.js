import React from 'react'
import {Paper, Grid, Card,CardContent, Typography, Container, CircularProgress} from '@material-ui/core/';
import {useAppState} from '../../AppState.js'
import UserCard from '../Parts/SearchBlocks/UserCard'
import { makeStyles } from '@material-ui/core/styles';
import Collage from '../../images/profile_backgrounds/collage.png'
import Controllers from '../../images/profile_backgrounds/controllers.jpg'

const useStyles = makeStyles((theme) => ({
    paper: {
    backgroundColor: '#182611',
      height: "100vh",
      backgroundImage: `url(${Collage})`
    },paper2: {
        backgroundColor: theme.palette.secondary.dark,
          height: "100vh",
          backgroundImage: `url(${Controllers})`
        },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main
  }}));


const Search = (props) => {
    const classes = useStyles();
    const {searchData, setSearchData} = props
    const [searchResults, setSearchResults] = React.useState()
    const {state, dispatch} = useAppState()
    const {token} = state
    const [checked, setChecked] = React.useState(false);
    const getProfileInfo = async () => {
        fetch(`${state.url}/search?keyword=${searchData.setkeyword}`, {
            headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": '*',
            Authorization: "bearer " + token}})
          .then((response) => response.json())
          .then((data) => {
            setSearchResults(data)
            console.log(data)
          });
      };
React.useEffect(() => {
  window.scrollTo(0, 0)
}, [])
    React.useLayoutEffect(() => {
    getProfileInfo()

    }, [searchData.setkeyword])

const loaded =() => {
    return (
        <>

        </>
    )
} 
return (

<Container>
    <Grid container xs={12} className={classes.paper} justify="space-between" >
        <Grid item sm={1}><Paper  className={classes.paper2}/></Grid>
     
    
        <Grid container item sm={10} spacing={2} justify="center">

            {searchResults ? searchResults.map((user, index) => (
            <Grid item sm={4} style={{maxheight: '100'}} >
            <UserCard checked={checked} index={index} image={user.image} username={user.username} pronoun={user.pronoun} user_id={user.user_id} about_me={user.about_me}/></Grid>
            )) : (<CircularProgress color="secondary" />)}
        
        </Grid>

        <Grid item sm={1}><Paper  className={classes.paper2}/></Grid>

    </Grid>   
</Container>



)
}
export default Search