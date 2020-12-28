import React from 'react';
import ProfileInfo from '../Parts/Profile/ProfileInfo'
import GameCard from '../Parts/Profile/GazeboSquare'
import {Paper, Grid, Card,CardContent,Slide, Typography,CircularProgress, Avatar, Divider,Tooltip,IconButton,Modal,Backdrop,Fade} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import UserProfilePhoto from '../../images/profilepictest.png'
import {useAppState} from '../../AppState.js'
import { CenterFocusStrong } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import FormGS from '../Parts/Profile/FormGS'
import Collage from '../../images/profile_backgrounds/collage.png'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      color: theme.palette.text.primary,
      background:theme.palette.secondary.dark,
      marginTop: 10,
      paddingBottom: 10

    },
    paperComponents: {
        background: '#39203C',
        padding: theme.spacing()
    },
    grid: {
     marginTop: 15,
    },
    large: {
        width: theme.spacing(17),
        height: theme.spacing(17)
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
  }));


const Profile = (props) => {
    const classes = useStyles();
    const {state, dispatch} = useAppState()
    const {token} = state
    const userInfo = props.match.params.id
    const [profileData, setProfileData] = React.useState()
    const [gameCardData, setGameCardData] = React.useState()

    const getProfileInfo = async () => {
        return fetch(`${state.url}/basic_user_infos/${userInfo}`, {
            headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Credentials" : true,   
            Authorization: "bearer " + token}})
          .then((response) => response.json())
          .then((data) => {
            setProfileData(data);
            console.log(data)
          });
      };

      const getGamerCards = async () => {
        return fetch(`${state.url}/game_cards/?user_id=${userInfo}`, {
            headers: {
            Authorization: "bearer " + token}})
          .then((response) => response.json())
          .then((data) => {
            setGameCardData(data);
            console.log(data)
          });
      };

      React.useEffect(() => {
        getProfileInfo()
        getGamerCards()
      }, [userInfo])
      const [openNew, setNewOpen] = React.useState(false);

      const handleNewOpen = () => {
        setNewOpen(true);
      };
    
      const handleNewClose = () => {
        setNewOpen(false);
      };
    
    
    const loaded = () => {
        return (
        <>
        <Grid container item direction="column" alignItems='center' spacing={2}>
            <Grid item xs={12}>
                    <Avatar alt="Steven Ott" src={`${state.url}/${profileData.image}`} className={classes.large} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h3">
                    {profileData.username}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                    <Typography variant="button">
                        PRONOUNS: <Typography variant="body2" display="inline">
                                {profileData.pronoun}
                                </Typography>
                    </Typography>
            </Grid>
            <Grid item xs={12}>
                    <Typography variant="body1">
                        {profileData.about_me}
                    </Typography>

            </Grid>
        </Grid>
        </>
        )
    }

    return (

    <div className={classes.root}>
    <Grid container justify='space-around' className={classes.grid} spacing={2}>
        <Grid item  sm={1}></Grid>
        <Grid container item direction= "column" xs={12} sm={10} spacing ={4}>
            <Slide in={'true'} direction={"right"} timeout={500}>
            <Paper className = {classes.paperComponents} elevation={6} style={{backgroundImage: `url(${Collage})`}}>
            {profileData ? loaded():(<CircularProgress color="secondary" />)}
            </Paper>
            </Slide>
            <Grid container item xs={12} alignItems="center" justify="center" spacing={3}>
                    {(gameCardData && profileData) ? gameCardData.map((card, index) => (
                        <Grid item xs={6} sm={4} lg={3}>
                        <GameCard getGamerCards={getGamerCards} product ={card.product} screenname={card.screenname} username={profileData.username}currently_playing={card.currently_playing} index={index} id={card.id}/>
                        </Grid>
                    )) : (<CircularProgress color="secondary" />)}
                    <Grid item xs={6} sm={4} lg={3}>
                    <Tooltip title="Add">
                        <IconButton aria-label="add" onClick={handleNewOpen} style={{ fontSize: 50 }}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                    <Modal
                    className={classes.modal}
                    open={openNew}
                    onClose={handleNewClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    >
                    <Fade in={openNew}>
                        <Grid container className={classes.paper} sm={10}>
                            <FormGS handleNewClose={handleNewClose} getGamerCards={getGamerCards} product="" screenname="" currently_playing="" action='new'/>     
                        </Grid>
                    </Fade>
            </Modal>
                    </Grid>
            
            </Grid>
        </Grid>
        <Grid item  sm={1}></Grid>
    </Grid>
    </div>
    )
}

export default Profile