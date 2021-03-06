import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { ListItem, Grow, List, ListItemAvatar, ListItemText,Divider, Avatar, Grid, Tooltip, IconButton,Backdrop,Fade, Modal} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography';
import Playstation from './../../../images/Game_Card_Backgrounds/playstation.png'
import Xbox from './../../../images/Game_Card_Backgrounds/xbox.png'
import Nintendo from './../../../images/Game_Card_Backgrounds/nintendo.png'
import Steam from './../../../images/Game_Card_Backgrounds/steam.png'
import BattleNet from './../../../images/Game_Card_Backgrounds/Battlenet.jpg'
import EpicGames from './../../../images/Game_Card_Backgrounds/epicgames.jpg'
import Origin from './../../../images/Game_Card_Backgrounds/origin.jpg'
import Other from './../../../images/Game_Card_Backgrounds/other.png'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import FormGS from '../Profile/FormGS'
import {useAppState} from '../../../AppState.js'

const useStyles = makeStyles((theme)=> ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    margin: theme.spacing(0,3,0,3)
  }
}));
 const GameCard =(props) => {
    const {state, dispatch} = useAppState()
    const {token} = state
  const classes = useStyles();
  const [openEdit, setEditOpen] = React.useState(false);

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const deleteGazeboSquare = async () => {
    return await fetch(state.url + `/game_cards/${id}`,{
      method: "delete",
      headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token
      }
  })
}
  
 
 const {product, screenname, index, setGameData,setDrawer,
    currently_playing, id, getGamerCards, username} = props

 const type_of_name =(productType) => {
    if(productType == "Playstation")
        return "PSN"
    else if(productType =="Xbox")
        return "GAMERTAG"
    else if(productType =="Steam")
        return "STEAM ID"
    else if(productType =="Nintendo")
        return "NINTENDO ID"
    else if(productType =="BattleNet")
        return "BattleNet ID"
    else if(productType =="Origin")
        return "Public ID"
    else if(productType =="Epic Games")
        return "Display Name"
    else 
        return "OTHER"
}
const type_of_background =(productType) => {
    if(productType == "Playstation")
        return Playstation
    else if(productType =="Xbox")
        return Xbox
    else if(productType =="Steam")
        return Steam
    else if(productType =="Nintendo")
        return Nintendo
    else if(productType =="BattleNet")
        return BattleNet
    else if(productType =="Origin")
        return Origin
    else if(productType =="Epic Games")
        return EpicGames
    else
        return Other
}
const type_of_color =(productType) => {
    if(productType == "Playstation")
        return '#001d53'
    else if(productType =="Xbox")
        return '#083308'
    else if(productType =="Steam")
        return "#1b2838"
    else if(productType =="Nintendo")
        return "#4B000E"
    else if(productType =="BattleNet")
        return "#242A49"
    else if(productType =="Origin")
        return "#744714"
    else if(productType =="Epic Games")
        return "#24232F"
    else
        return "#424242"

}
const deleteClicked = async () => {
    await deleteGazeboSquare()
    getGamerCards()
}

const editdeletButtons = () => {
    return (
        <>
        <Grid item xs={2}>
            <Tooltip title="Edit">
                <IconButton aria-label="edit" onClick={handleEditOpen}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Modal
            className={classes.modal}
            open={openEdit}
            onClose={handleEditClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
              }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
            <Fade in={openEdit}>
                <Grid container className={classes.paper} sm={10}>
                    <FormGS handleEditClose={handleEditClose} action='edit' getGamerCards={getGamerCards} product={product} screenname={screenname} currently_playing={currently_playing} id={id}/>     
                 </Grid>
            </Fade>
            </Modal>
            </Grid>
            <Grid item item xs={2}>
            <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={deleteClicked}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            </Grid>
            </>
    )
}

const GameSet = () => {
    setGameData(currently_playing)
    setDrawer(true)
}

  return (
    <Grow in={true} timeout={1000+(index*500)}> 
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img" 
          alt="Contemplative Reptile"
          height="40"
          src={type_of_background(product)}
          title="Contemplative Reptile"
        />
        <CardContent style={{backgroundColor: type_of_color(product)}}>
        <Typography gutterBottom variant="h6" align="center">
            {product}
        </Typography>
        <List>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <PersonIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={type_of_name(product)} secondary={screenname}/>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <SportsEsportsIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Currently Playing:" secondary={currently_playing}/>
            </ListItem>
        </List>
        <Grid container alignItems="flex-start" justify="flex-end" >
            <Grid item xs={12} sm={12}>
            <Button variant="containted" size="small" name={currently_playing} onClick={GameSet} >
                more about {currently_playing}
            </Button>
            </Grid>
            {JSON.parse(window.localStorage.getItem('auth')).username
===username ? (editdeletButtons()) : null}
        </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grow> 
  );
}

export default GameCard