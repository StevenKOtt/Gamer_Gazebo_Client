import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { ListItem, ListItemIcon, LinearProgress, Icon, ListItemText,List, Modal} from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import Playstation from './../../../images/Game_Card_Backgrounds/playstation.png'
import Xbox from './../../../images/Game_Card_Backgrounds/xbox.png'
import Nintendo from './../../../images/Game_Card_Backgrounds/nintendo.png'
import Steam from './../../../images/Game_Card_Backgrounds/steam.png'
import BattleNet from './../../../images/Game_Card_Backgrounds/Battlenet.jpg'
import EpicGames from './../../../images/Game_Card_Backgrounds/epicgames.jpg'
import Origin from './../../../images/Game_Card_Backgrounds/origin.jpg'
import Other from './../../../images/Game_Card_Backgrounds/other.png'
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import PlaystationSVG from '../../../images/icons_svg/Playstation.svg'
import XboxIcon from '../../../images/icons_svg/Xbox.png'
import SwitchIcon from '../../../images/icons_svg/switch.png'
import PCIcon from '../../../images/icons_svg/computer.png'
import parse from 'html-react-parser';


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
    bacgrkoundColor: '#0f0f0f'
  },
  media: {
    height: 140,
  },
}));
 

const GameInfo =(props) => {
  const classes = useStyles();
  const [specificGameDetails, setSpecificGameDetails] = React.useState()
  const  {specificGame} = props


  const gameDetails = async () => {
    await fetch(`https://api.rawg.io/api/games/${specificGame[0].id}?key=d60c391b55cf416eb0d4e9f83c4a6a69`, {
      headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",   
      }})
    .then((response) => response.json())
    .then((data) => {
      setSpecificGameDetails({
        description: data.description,
        website: data.website,
        additional_photo: data.background_image_additional,
        id: data.id
      })
      console.log(data)
    });
  };


React.useEffect(() => {
  if(specificGame[0].id != specificGame.id)
    gameDetails()
           }, [specificGame])



 
 

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


  const getSymbol = (name) => {
   if (name === "PlayStation" || name == "PlayStation 2" || name == "PlayStation 3" || name == "PlayStation 4" || name == "PlayStation 5")
    {
      return ( 
      <Icon>
        <img src={PlaystationSVG} height={25} width={25}/>
      </Icon>)
    }
    else if (name === "Xbox One" || name === "Xbox" || name === "Xbox 360") {
      return (
        <Icon>
          <img src={XboxIcon} height={25} width={25}/>
        </Icon>)
    }
    else if (name === "Nintendo Switch" || name === "Switch") {
      return (
        <Icon>
          <img src={SwitchIcon} height={25} width={25}/>
        </Icon>)
    }
    else if (name === "PC" || name === "macOS") {
      return (
        <Icon>
          <img src={PCIcon} height={25} width={25}/>
        </Icon>)
    }
    else {
        return (<VideogameAssetIcon />)
      }
   
  }
  
  return (
    <Card className={classes.root}>
    <CardActionArea onClick={()=> window.open(specificGameDetails.website, "_blank") }>
    <CardMedia
    component="img"
    className={classes.media}
    src={specificGame[0].background_image}
  />
  <CardContent>
    <Typography gutterBottom variant="h3" component="h2">
      {specificGame[0].name}
    </Typography>
    <Typography gutterBottom variant="h6" component="h2">
      Metacritic: {specificGame[0].metacritic}
    </Typography>
    <Typography varivnt="body2" color="textSecondary" component="p">
      {specificGameDetails ? parse(specificGameDetails.description) : (<LinearProgress color="secondary" />)}
    </Typography>
    <Typography gutterBottom variant="h5" component="h2">
      Platforms:
      </Typography>
    <List dense='true'>
      {specificGame[0].platforms ? specificGame[0].platforms.map((platform)=>(
        <ListItem>
        <ListItemIcon>
          {getSymbol(platform.platform.name)}
        </ListItemIcon>
        <ListItemText
          primary={platform.platform.name}
        />
      </ListItem>
      )) : (<LinearProgress color="secondary" />)}
   </List>
    <Typography gutterBottom variant="h5" component="h2">
      Genres:
      </Typography>
      <List dense={true}>
      {specificGame[0].genres ? specificGame[0].genres.map((genre) => (
         <ListItem>
         <ListItemText
           primary={genre.name}
         />
         </ListItem>
      )) : (<LinearProgress color="secondary" />) }
      </List>
    <Typography gutterBottom variant="h5" component="h2">
    </Typography>
    <Typography gutterBottom variant="h5" component="h2">
    </Typography>
  </CardContent>
  {specificGameDetails ? (<CardMedia
    component="img"
    className={classes.media}
    src={specificGameDetails.additional_photo}
  />) : (<LinearProgress color="secondary" />)}
</CardActionArea>
</Card>
    
  );
}

export default GameInfo