import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextToSpeech from './TextToSpeech';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutline from '@material-ui/icons/PauseCircleOutline';
import Replay10 from '@material-ui/icons/Replay10';
import Button from '@material-ui/core/Button';



const styles = theme => ({
      title:{
        fontSize:'2em',
        textAlign:'center'
      },
      cardActions:{
        justifyContent:'center'
      },
      gridRoot: {
        flexGrow: 1,
      }
  });

  class Practice extends React.Component {
    speechEngine=new TextToSpeech();

    constructor(props){
      super(props);
      this.state={word:"",playing:false,repeat:false};
    }

    play(text,repeat){

      this.setState({word:text,playing:true,repeat:repeat});
      var wordToTrain=text.split("").join(" ") +" " + text;

      var counter=0;
      var $this=this;
      var Speak=function(text){
        $this.speechEngine.Speak(wordToTrain,function(){
          if($this.state.repeat){
            if(counter<9)
            {
              counter++;
              setTimeout(function(){
                Speak(text)
              },500);
            }
            else{
              $this.stop();
            }
          }
          else{
            $this.stop();
          }
        });
      };
      Speak(text);
    }

    stop(){
      this.setState({word:"",playing:false,repeat:false});
    }

    render(){
        return (
          <Grid container spacing={3} className={this.props.classes.gridRoot}>
               
          {this.props.words.map((item, key) =>
            <Grid key={key}  item xs={2}>
              <Card>
                <CardContent>
                  <Typography className={this.props.classes.title}>{item}</Typography>
                </CardContent>
                <CardActions className={this.props.classes.cardActions}>
                  <Button disabled={this.state.playing===true} onClick={()=>{this.play(item,false)}}>
                    <PlayCircleOutline></PlayCircleOutline>
                  </Button>

                  {this.state.word===item && this.state.playing===true && this.state.repeat===true &&
                  <Button onClick={()=>{this.stop()}}>
                      <PauseCircleOutline></PauseCircleOutline>
                  </Button>
                  }

                  <Button disabled={this.state.playing===true} onClick={()=>{this.play(item,true)}}>
                    <Replay10></Replay10>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        }
          
      </Grid>
        );
    }
  }
  
  export default withStyles(styles)(Practice);