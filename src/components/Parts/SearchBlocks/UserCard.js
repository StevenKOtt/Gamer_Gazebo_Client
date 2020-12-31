import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {CardMedia, CardActionArea, Grow,Grid, Avatar} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom'
import {useAppState} from '../../../AppState.js'


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

const UserCard = (props) => {
  const {state, dispatch} = useAppState()
  const {token} = state
  const classes = useStyles();
  const theme = useTheme();
  const {pronoun, username, about_me, user_id, index, image} = props
  const preventDefault = (event) => event.preventDefault();
  const history = useHistory(); 

  return (
    <Grow in={true} timeout={1000+(index*300)}>
    <Card className={classes.root}>
      <CardActionArea onClick={()=>{
        history.push(`/user/profile/${user_id}`)
      }}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
        <Grid container>
          <Grid container item direction="column" xs={12}>
            <Grid item xs={12}>
              <Typography component="h5" variant="h5">
                {username}
              </Typography>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={4}>
              <Avatar alt="Steven Ott" src={`${state.url}/${image}`} className={classes.large} />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={7}>
              <Typography variant="subtitle1" color="textSecondary">
                  {about_me}
              </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image="/static/images/cards/live-from-space.jpg"
        title="Live from space album cover"
      />
    </CardActionArea>
    </Card>
    </Grow>
  );
}

export default UserCard