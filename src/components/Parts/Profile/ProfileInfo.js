import React from 'react';
import {Paper, Grid, Card,CardContent, Typography, Avatar} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20)

    }
  }));

const ProfileInfo = (props) => {
    const classes = useStyles();
    const {profileData} = props
    return (
    <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Username: {profileData.username}
                    </Typography>
                    <Typography variant="h5" component="h2">
                    <Avatar alt="Steven Ott" src="https://p16-va-default.akamaized.net/img/musically-maliva-obj/1641700153405446~c5_720x720.jpeg" className={classes.large} />
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    Pronouns: {profileData.pronoun}
                    </Typography>
                    <Typography variant="body2" component="p">
                    About Me: {profileData.about_me}
                    </Typography>
                </CardContent>
            </Card>
    )
}
export default ProfileInfo