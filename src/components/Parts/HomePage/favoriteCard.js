import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {CardMedia, ButtonBase, Grow, Avatar} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom'
import {useAppState} from '../../../AppState.js'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 150,
    marginTop: 10
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
},
}));

const FavoriteCard = (props) => {
  const {state, dispatch} = useAppState()
  const {token} = state
  const classes = useStyles();
  const theme = useTheme();
  const {pronoun, username, about_me, user_id, index, image} = props
  const preventDefault = (event) => event.preventDefault();
  const history = useHistory(); 

  return (
    <Grow in={true} timeout={1000+(index*500)}>
      <ButtonBase onClick={()=>{
        history.push(`/user/profile/${user_id}`)
      }}>
      <div className={classes.details}>
          <Typography variant="subtitle1">
            {username}
          </Typography>
          <Avatar alt="Steven Ott" src={`${state.url}/${image}`} className={classes.large} />
      </div>
    </ButtonBase>
    </Grow>
  );
}

export default FavoriteCard