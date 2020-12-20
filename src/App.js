import logo from './logo.svg';
import './App.css';
import {Grid, Paper} from "@material-ui/core"
import Header from './components/Header'
import Signin from './components/Auth/Signin'
import { Route, Link, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    type: 'dark',

    primary: {
      main: '#00695c',
    },
    secondary: {
      main: '#6a1b9a',
    }
  }
})
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Paper style={{height: "100vh"}}>
        <Grid container direction="column">
          <Grid item>
          {/* The NavBar */}
            <Header /> 
          </Grid>
          <Switch>
            <Route exact path="/login" render={(rp) => ( <Signin {...rp}/>)}
            />
          </Switch>
        </Grid>
      </Paper>
    </ThemeProvider>
  )
}

export default App;
