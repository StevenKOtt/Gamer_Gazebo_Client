import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {TextField, Grid, CircularProgress, Card,CardActionArea, CardMedia,List,MenuItem,ListItemText,ListItem,Avatar,ListItemAvatar, CardContent,Divider} from '@material-ui/core/';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {useAppState} from "../../../AppState.js"
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import PersonIcon from '@material-ui/icons/Person';
import Playstation from './../../../images/Game_Card_Backgrounds/playstation.png'
import GameCard from '../Profile/GazeboSquare'




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

const FormGS = (props) => {
const {product, screenname, currently_playing, id, handleEditClose, getGamerCards, handleNewClose, action} = props
const {state, dispatch} = useAppState()
const {token} = state
const classes = useStyles();
const [formData, setFormData] = React.useState({
      product: product,
      screenname: screenname,
      currently_playing: currently_playing,
      user_id: state.user_id
    })

const editGazeboSquare = async () => {
  return await fetch(state.url + `/game_cards/${id}`,{
    method: "put",
    headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
}

const newGazeboSquare = async () => {
  return await fetch(state.url + `/game_cards/`,{
    method: "post",
    headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
}


const handleChange = (event) => {
  setFormData({...formData,[event.target.name]: event.target.value})
}
const handleSubmit = async (event) => {
  event.preventDefault()
  if(action == 'edit') {
    await editGazeboSquare()
    handleEditClose()
    getGamerCards()
  }
  else if (action == 'new') {
    await newGazeboSquare()
    handleNewClose()
    getGamerCards()
  }
}


  return (
    <Grid container item xs={10} alignItems="center" justify="center">
      {/* Editing Card */}
      <Grid item xs={12} sm={6}>  
          <form onSubmit={handleSubmit}>

              <TextField
              variant="outlined"
              margin="normal"
              required
              select
              defaultValue={product}
              onChange={handleChange}
              name="product"
              label="Select Service:"
              id="product"
            >
            <MenuItem key="Playstation" value="Playstation">
            Playstation
            </MenuItem>
            <MenuItem key="Xbox" value="Xbox">
            Xbox
            </MenuItem> 
            <MenuItem key="Steam" value="Steam">
            Steam
            </MenuItem> 
            <MenuItem key="Nintendo" value="Nintendo">
            Nintendo
            </MenuItem>
            <MenuItem key="BattleNet" value="BattleNet">
            BattleNet
            </MenuItem>
            <MenuItem key="Origin" value="Origin">
            Origin
            </MenuItem>
            <MenuItem key="Epic Games" value="Epic Games">
            Epic Games
            </MenuItem>
            <MenuItem key="Other" value="Other">
            Other
            </MenuItem>
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              onChange={handleChange}
              name="screenname"
              label="Screenname"
              id="screenname"
              defaultValue={screenname}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              onChange={handleChange}
              name="currently_playing"
              label="Currently Playing"
              id="currently_playing"
              defaultValue={currently_playing}
            />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save Changes
          </Button>
          </form>
      </Grid>
      <Grid item sm={1}>
      </Grid>
      <Grid item sm={5} xs={12}>
        {formData ? (<GameCard product={formData.product} screenname={formData.screenname} currently_playing={formData.currently_playing}/>) : (<CircularProgress color="secondary" />)}
      </Grid>
    </Grid>
  )
}

export default FormGS