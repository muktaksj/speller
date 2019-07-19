import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
        paper: {
            minHeight:'200px',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(2)
        }
  });


  class PageContainer extends React.Component {
    render(){
        return (
            <React.Fragment>
                <CssBaseline />
                <Paper className={this.props.classes.paper}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            {this.props.title}
                        </Typography>
                        {this.props.toolbarButtons}
                    </Toolbar>
                    {this.props.children}
                </Paper>
            </React.Fragment>
    
        );
    }
  }
  
  export default withStyles(styles)(PageContainer);