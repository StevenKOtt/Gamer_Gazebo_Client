import React from 'react'
import {Paper, Grid, Card,CardContent, Typography,CircularProgress} from '@material-ui/core/';
import {useAppState} from '../../AppState.js'
import UserCard from '../Parts/SearchBlocks/UserCard'
const Search = (props) => {
    const {searchData, setSearchData} = props
    const [searchResults, setSearchResults] = React.useState()
    const {state, dispatch} = useAppState()
    const {token} = state
    const [checked, setChecked] = React.useState(false);
    const getProfileInfo = async () => {
        fetch(`${state.url}/search?keyword=${searchData.setkeyword}`, {
            headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": '*',
            Authorization: "bearer " + token}})
          .then((response) => response.json())
          .then((data) => {
            setSearchResults(data)
            console.log(data)
          });
      };

    React.useLayoutEffect(() => {
    getProfileInfo()

    }, [searchData.setkeyword])

const loaded =() => {
    return (
        <>

        </>
    )
} 
return (
<Grid container style={{height: '100vh'}}>
    <Grid item sm={1}>
    
    </Grid>
    <Grid container item sm={10} spacing={2}>

            {searchResults ? searchResults.map((user, index) => (
            <Grid item sm={6}>
            <UserCard checked={checked} index={index} image={user.image} username={user.username} pronoun={user.pronoun} user_id={user.user_id} about_me={user.about_me}/></Grid>
            )) : (<CircularProgress color="secondary" />).then}
    </Grid>
    <Grid item sm={1}> 
    
    </Grid>
</Grid>


)
}
export default Search