import React from 'react'
import {Paper, Grid, Card,CardContent, Typography, Container, CircularProgress} from '@material-ui/core/';
import {useAppState} from '../../AppState.js'
import UserCard from '../Parts/SearchBlocks/UserCard'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
    backgroundColor: theme.palette.primary.dark,
      height: "100vh"
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
<Paper className={classes.paper}>
    <Grid container item xs={12} >
        <Grid item sm={2}></Grid>
    
    
        <Grid container item sm={8} spacing={2} justify="center">

            {searchResults ? searchResults.map((user, index) => (
            <Grid item sm={6} style={{maxheight: '100'}} >
            <UserCard checked={checked} index={index} image={user.image} username={user.username} pronoun={user.pronoun} user_id={user.user_id} about_me={user.about_me}/></Grid>
            )) : (<CircularProgress color="secondary" />)}
        
        </Grid>

        <Grid item sm={2}></Grid>

    </Grid>
</Paper>    
</Container>



)
}
export default Search