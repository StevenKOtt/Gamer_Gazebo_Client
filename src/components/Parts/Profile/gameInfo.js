import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { ListItem, Grow, LinearProgress, ListItemAvatar, ListItemText,Divider, Avatar, Grid, Tooltip, IconButton,Backdrop,Fade, Modal} from '@material-ui/core/';
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
import FormGS from './FormGS'

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
  ,root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));
 

const GameInfo =(props) => {

  const classes = useStyles();
  const [specificGame, setSpecificGame] = React.useState()
 
 const {index, gameData, id, getGamerCards, username} = props

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

const gameApiCall = async () => {
     fetch(`https://api.rawg.io/api/games?key=d60c391b55cf416eb0d4e9f83c4a6a69&search=${gameData}&page_size=2&page=1&search_precise=true`, {
        headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",   
        }})
      .then((response) => response.json())
      .then((data) => {
        setSpecificGame(data)
        console.log(data)
      });
  };

  React.useEffect(() => {
    gameApiCall()
  }, [gameData])

const loaded = () => {
      return (
        <Grid item xs={12}>
          <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          className={classes.media}
          src={specificGame.results[0].background_image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
        </Grid>
      )
}
  return (

    <Grow in={true} timeout={1000+(index*500)}> 
    <Grid container direction="column" alignItems="center">
        {specificGame ? loaded() : <LinearProgress color="secondary" />}
    </Grid>

    </Grow>
    
  );
}

export default GameInfo