import React from 'react';
import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import WordList from './WordList';
import { BreakpointProvider } from 'react-socks';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  }
});

class App extends React.Component {
  render(){
    return (
      <BreakpointProvider>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={this.props.classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Speller - A Fun way to learn spellings!
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={this.props.classes.layout}>
          <WordList/>
        </main>
      </BreakpointProvider>

      );
  }
}

export default withStyles(styles)(App);
