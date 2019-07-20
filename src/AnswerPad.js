import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import classNames from 'classnames';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import TextToSpeech from './TextToSpeech';

const styles = theme => ({
    button: {
        margin: theme.spacing(1),
      },
      keypad:{
          width:'500px',
          display:'flex',
          margin:'0 auto',
          flexWrap:'wrap'
      },
      answerContainer:{
        textAlign:'center'
      },
      answerBox:{
        border:'2px solid skyblue',
        borderRadius:'10px',
        width:'60px',
        height:'60px',
        marginRight:'3px',
        display:'inline-block',
        fontSize:'40px'
      },
      neutralAnswerBox:{
        backgroundColor:'#FFFFFF',
        color:'#000000'
      },
      correctAnswerBox:{
        backgroundColor:'green',
        color:'#FFFFFF'
      },
      wrongAnswerBox:{
        backgroundColor:'red',
        color:'#FFFFFF'
      }
});

class AnswerPad extends React.Component {
    letters=[];
    currentIndex=0;
    speechEngine=new TextToSpeech();

    constructor(props){
        super(props);
        this.state={answer:[]};
        this.componentWillReceiveProps(this.props,true);
    }

    componentWillReceiveProps(nextProps,init){
        this.letters=this.getCharArray(nextProps);

        var answer=[];
        var x=0;
        this.currentIndex=nextProps.mask.indexOf("?");
    
        for(x=0;x<nextProps.mask.length;x++){
            answer.push(nextProps.mask[x]);
        }

        var state={answer:answer,hint:nextProps.hint,word:nextProps.word};
        if(init){
            // eslint-disable-next-line
            this.state=state;
        }
        else{
            this.setState(state);
        }
    }
    
    getCharArray(nextProps){
        var items=[];
        for(var x=0;x<nextProps.word.length;x++){
            var char=nextProps.word[x];
            if(items.indexOf(char)===-1){
                items.push(char);
            }
        }
        while(items.length<nextProps.word.length * 2 && items.length<26){
            var randomCharCode=String.fromCharCode(Math.floor(Math.random()*(90-65+1)+65));
            if(items.indexOf(randomCharCode)===-1){
                items.push(randomCharCode);
            }
        }
        items.sort();
        return items;
    }
    
    pushLetter(letter){
        var answer=this.state.answer;
        answer[this.currentIndex]=letter;
        this.setState({answer:answer})
        if(this.state.word[this.currentIndex]===letter){
            this.currentIndex=this.state.answer.indexOf("?");
            if(this.currentIndex===-1){
                this.props.onComplete();
            }
        }
    }
    getAnswerStatus(index,hint){
        if(!hint && this.state.answer[index]!=="?"){
            return this.state.word[index]===this.state.answer[index]?this.props.classes.correctAnswerBox:this.props.classes.wrongAnswerBox;
        }
        return this.props.classes.neutralAnswerBox;
    }
    getWordPlaceHolders(hint){
        var items=[];
        var source=hint && this.state.hint && this.state.hint.length > 0?this.state.hint:this.state.answer;
        for(var x=0;x<source.length;x++){
            items.push(<Box key={(hint?"Hint":"Word")+x} className={classNames(this.props.classes.answerBox,this.getAnswerStatus(x,hint))}>{source[x]}</Box>)
        }
        return items;
    }
    playWord(word){
        this.speechEngine.Speak(word);
    }
    render(){
        return (
            <React.Fragment>
                <br/> <br/>
            <CssBaseline />
            {this.state.hint && this.state.hint.length>0 &&
            <Box className={this.props.classes.answerContainer}>
                {this.getWordPlaceHolders(true)}
                <br/><br/>
            </Box>
            }

            <Box className={this.props.classes.answerContainer}>
                <Button variant="contained" color="secondary" clasName={this.props.classes.button} onClick={()=>{this.playWord(this.state.word)}}>
                    Play Word
                    <PlayCircleOutline></PlayCircleOutline>
                </Button> <br/><br/>    
            </Box>  
            <Box className={this.props.classes.answerContainer}>
                {this.getWordPlaceHolders()}
            </Box>
            <br/> <br/>
            <Box className={this.props.classes.keypad}>
            {this.letters.map((item, key) =>
                <Button key={item} variant="contained" color="primary" className={this.props.classes.button} onClick={()=>this.pushLetter(item)}>
                    {item}
                </Button>
            )}
            </Box>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AnswerPad);
