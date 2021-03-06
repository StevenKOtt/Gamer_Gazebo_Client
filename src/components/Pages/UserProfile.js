import React from 'react';
import GameCard from '../Parts/Profile/GazeboSquare'
import GameInfo from '../Parts/Profile/gameInfo'
import Drawer from '@material-ui/core/Drawer';
import {Paper, Grid, Button,LinearProgress,Slide,CssBaseline,Container, Typography,CircularProgress, Avatar,Tooltip,Fab,Modal,Backdrop,Fade} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import {useAppState} from '../../AppState.js'
import AddIcon from '@material-ui/icons/Add';
import FormGS from '../Parts/Profile/FormGS'
import Collage from '../../images/profile_backgrounds/collage.png'
import Collage2 from '../../images/profile_backgrounds/collage2.jpg'
import Curves from '../../images/profile_backgrounds/curves.jpg'



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      color: theme.palette.text.primary,
      background:theme.palette.primary.dark,
      backgroundImage: `url(${Curves})`,
      marginTop: 10,
      paddingBottom: 10,

    },
    absolute: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
  },
    paperComponents: {
        background: '#39203C',
        padding: theme.spacing(),
        
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
      },
      list: {
        width: 250,
      },
      fullList: {
        width: 'auto',
      }
  }));


const Profile = (props) => {
    const classes = useStyles();
    const {state, dispatch} = useAppState()
    const {token} = state
    const userInfo = props.match.params.id
    const [profileData, setProfileData] = React.useState()
    const [gameCardData, setGameCardData] = React.useState()
    const [gameData, setGameData] = React.useState()
    const [randomBackground,setRandomBackground] = React.useState()
    const [specificGame, setSpecificGame] = React.useState()
    const [followedData, setFollowedData] = React.useState(false)
    const [followData, setFollowData] = React.useState(
        {
            user_id: state.user_id,
            following: userInfo
        }
    )


const rand_Background =() =>{
    const rand = Math.floor(Math.random() * 10)
    if (rand%2 == 0) {
         setRandomBackground(Collage)
    }
    else {
        setRandomBackground(Collage2)
    }
}   
    React.useEffect(() => {
  window.scrollTo(0, 0)
  rand_Background()
}, [])


    const checkFollow = async () => {
        await fetch(state.url + `/followings/check/?user_id=${state.user_id}&follow_id=${userInfo}`,{
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + token
            },
        })
        .then(response => response.json())
        .then((data) => {
            if(data.status == true) {
                setFollowedData(true)
            }
            else {
                setFollowedData(false)
            }
                })
    }
    const changeFollow = async () => {
        await fetch(state.url + `/followings/update/?user_id=${state.user_id}&follow_id=${userInfo}`,{
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + token
            },
            body: JSON.stringify(followData)
        })
        .then(response => response.json())
        .then((data) => {
            if(data.action == 'added') {
                setFollowedData(true)
            }
            else {
                setFollowedData(false)
            }
                })
    }

    const getProfileInfo = async () => {
        return fetch(`${state.url}/basic_user_infos/${userInfo}`, {
            headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": '*',   
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

      const gameApiCall = () => {
        fetch(`https://api.rawg.io/api/games?key=d60c391b55cf416eb0d4e9f83c4a6a69&search=${gameData}&page_size=1&page=1&search_precise=true`, {
          headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",   
          }})
        .then((response) => response.json())
        .then((data) => {
          setSpecificGame(data.results)
          console.log(data)
        });
    };

      React.useLayoutEffect(()=> {
        checkFollow()
      }, [])

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

           {JSON.parse(window.localStorage.getItem('auth')).user_id != userInfo ? ( 
            <Grid item xs={12}> 
            {followedData ? (<Button variant="contained" onClick={changeFollow} color="primary">
                        UnFollow
                    </Button>) : (<Button variant="contained" onClick={changeFollow} color="secondary">
                        Follow
                    </Button>)}
            </Grid> ) : null }
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

const [drawer, setDrawer] = React.useState(false);

const toggleDrawer = (open) => (event) => {
          if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
          }
          setDrawer(open);
        };

React.useEffect(() => {
     gameApiCall()
            }, [gameData])

    return (
    <React.Fragment>    
    <CssBaseline />    
    <Container className={classes.root}>
    <Paper className={classes.paper}>
    <Grid container justify='space-around' className={classes.grid} spacing={2}>
        <Grid item  sm={1}></Grid>
        <Grid container item direction= "column" xs={12} sm={10} spacing ={4}>
            <Slide in={'true'} direction={"right"} timeout={500}>
            <Paper className = {classes.paperComponents} elevation={6} style={{backgroundImage: `url(${randomBackground})`}}>
            {profileData ? loaded():(<CircularProgress color="secondary" />)}
            </Paper>
            </Slide>
            <Grid container item xs={12} alignItems="center" justify="center" spacing={3}>
                    {(gameCardData && profileData) ? gameCardData.map((card, index) => (
                        <Grid item xs={6} sm={4} lg={3}>
                        <GameCard getGamerCards={getGamerCards} setDrawer={setDrawer}
         setGameData={setGameData} toggleDrawer={toggleDrawer} product ={card.product} screenname={card.screenname} username={profileData.username}currently_playing={card.currently_playing} index={index} id={card.id}/>
                        </Grid>
                    )) : (<CircularProgress color="secondary" />)}
                    <Grid item xs={6} sm={4} lg={3}>
                   

                    </Grid>
            
            </Grid>
            <Grid container item xs={12}>
                <Grid container item xs={6}> 
                
                </Grid>
                
            </Grid>            
        </Grid>
        <Grid item  sm={1}></Grid>
    </Grid>
    {JSON.parse(window.localStorage.getItem('auth')).user_id == userInfo ?

                   ( <Tooltip title="Add">
                        <Fab aria-label="add" onClick={handleNewOpen} className={classes.absolute} style={{ fontSize: 10 }} variant="extended">
                            <AddIcon />
                            Add a Game Card
                        </Fab>
                    </Tooltip> ) : null}
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

            <Drawer anchor='left' open={drawer} onClose={toggleDrawer(false)}>
                {/* <Grid container direction ="column" alignItems="center"> */}
                    {specificGame ? (
                        <>
                        <Grid item sm={12}>
                            <GameInfo specificGame={specificGame}/>
                        </Grid> 
                        </>
                    ) : (<LinearProgress color="secondary" />)}
                {/* </Grid> */}
            </Drawer>
            </Paper>                   
    </Container>
    </React.Fragment>
    )
}

export default Profile