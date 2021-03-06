import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'
import {useAppState} from '../../../AppState.js'
import {Paper, Grid, Card,CardContent, Typography,CircularProgress} from '@material-ui/core/';
import FavoriteCard from '../HomePage/favoriteCard'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14)
},
}));

const Favorites = (props) => {
  const {state, dispatch} = useAppState()
  const {token} = state
  const classes = useStyles();
  const theme = useTheme();
  const [favoritesResults, setFavoriteResults] = React.useState()
  const {pronoun, username, about_me, user_id, index, image} = props
  const preventDefault = (event) => event.preventDefault();
  const history = useHistory(); 
  const [checked, setChecked] = React.useState(false);

  const getFollowInfo = async () => {
       const auth = JSON.parse(window.localStorage.getItem("auth"))
       if(auth != null) {
       await fetch(`https://gamergazeboapi.herokuapp.com/follows/?user_id=${auth.user_id}`, {
        headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        Authorization: "bearer " + auth.token}})
        .then((response) => response.json())
        .then((data) => {
            setFavoriteResults(data)
                })
    }}

React.useEffect(() => {
      getFollowInfo()
}, [])

// check_followers = () => {
//   if(favoritesResults.length == 0) {
//     return <Typography variant="subtitle2"> Uh-Oh. Looks like you are not following anyone. Go</Typography>
//   }else{
//     return favoritesResults.map((user, index) => (
//       <Grid item xs={5} sm={6}>
//           <FavoriteCard checked={checked} index={index} image={user.image} username={user.username} pronoun={user.pronoun} user_id={user.user_id} about_me={user.about_me}/>
//       </Grid>))}
//   }
// }

  return (
        <>
            {favoritesResults && favoritesResults.length != 0 ? favoritesResults.map((user, index) => (
                <Grid item xs={5} sm={6} style={{marginTop: '10'}}>
                    <FavoriteCard checked={checked} index={index} image={user.image} username={user.username} pronoun={user.pronoun} user_id={user.user_id} about_me={user.about_me}/>
                </Grid>
        )) : (<Typography style={{marginTop: 20}} variant="subtitle2"> Uh-Oh. Looks like you are not following anyone. Search for gamers at the top to follow.</Typography>)}
        </>
            )
        }

export default Favorites