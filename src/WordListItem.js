import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popup from "reactjs-popup";
import WordListEditor from './WordListEditor';

const styles = theme => ({
      title:{
          fontSize:'1.3em'
      },
      wordCount:{
        fontSize:'1em'
      },
      content:{
          display:'flex'
      },
      primaryBox:{
        flex: '1 0 auto',
      },
      box:{
        flex: '1 0 auto',
        backgroundColor:"#EAEAEA",
        border:"1px solid #CCCCCC",
        margin:'4px',
      
      },
      label:{
        textAlign:'center'
      },
      labelValue:{
        textAlign:'center'
      }
  });

  class WordListItem extends React.Component {
    classes=this.props.classes;

    render(){
        return (
          
            <Card>
                <CardContent className={this.props.classes.content}>
                    <Box className={this.props.classes.primaryBox}>
                        <Typography className={this.props.classes.title}>{this.props.title}</Typography>
                        <Typography className={this.props.classes.wordCount} color="textSecondary">
                        {this.props.count} Words
                        </Typography>
                    </Box>
                    <Box className={this.props.classes.box} color="secondary">
                        <Typography className={this.props.classes.label}>Score</Typography>
                        <Typography className={this.props.classes.labelValue} color="textSecondary">
                        {this.props.score}/{this.props.count}
                        </Typography>
                    </Box>
                    <Box className={this.props.classes.box} color="secondary">
                        <Typography className={this.props.classes.label}>Level</Typography>
                        <Typography className={this.props.classes.labelValue} color="textSecondary">
                        {this.props.level+1}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions>
                
                    <Popup trigger={
                      <Button size="small" color="primary">Edit</Button>
                    }
                    modal
                    closeOnDocumentClick
                    >
                      {close=>(
                        <WordListEditor closeCallback={()=>{this.props.onChange(); close();}} wordListId={this.props.id}/>
                      )}
                    </Popup>
                    
                    <Button size="small" color="primary" onClick={this.props.onDelete}>Delete</Button>
                    {this.props.level===4 && this.props.score===this.props.count &&
                      <Button size="small" color="primary" onClick={this.props.onRestart}>Restart</Button>
                    }
                    {(this.props.level < 4 || this.props.score<this.props.count) &&
                      <Button size="small" color="primary" onClick={this.props.onLearn}>Learn</Button>
                    }
                </CardActions>
            </Card>
        );
    }
}
  
  export default withStyles(styles)(WordListItem);