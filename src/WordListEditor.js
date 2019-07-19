import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import WordListManager from './WordListManager';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    createNewPopup:{
        padding:'20px'
      },
      textArea:{
        width:'100%'
      }, 
      button: {
        margin: theme.spacing(1),
      }
  });

  class WordListEditor extends React.Component {

    wordListManager=new WordListManager();

    constructor(props){
        super(props);
        if(this.props.wordListId){
            var wordList=this.wordListManager.get(this.props.wordListId);
            this.state={title:wordList.title,words:wordList.words.join("\n")};
        }
        else{
            this.state={title:"",words:""};
        }
        this.titleChangeHandler=this.titleChangeHandler.bind(this);
        this.wordsChangeHandler=this.wordsChangeHandler.bind(this);
    }

    titleChangeHandler(event){
        this.setState({title:event.target.value})
    }

    wordsChangeHandler(event){
        this.setState({words:event.target.value})
    }

    render(){
        return (
            <div className={this.props.classes.createNewPopup}>
            <InputLabel htmlFor="listTitle">Word List Title</InputLabel>
            <Input id="listTitle" aria-describedby="listTitle-Helper" value={this.state.title} onChange={this.titleChangeHandler} />
            <FormHelperText id="listTitle-Helper">Title for your List. Ex: My Favorite Word List</FormHelperText>
            <br/>
            <InputLabel htmlFor="words">Words</InputLabel>
            <br/>
            <TextareaAutosize id="words" aria-describedby="words-Helper" rows="15" className={this.props.classes.textArea} value={this.state.words}  onChange={this.wordsChangeHandler} />
            <FormHelperText id="words-Helper">Enter Words separated by New Line</FormHelperText>
            <Button variant="contained" color="primary" className={this.props.classes.button}
            onClick={()=>{
              if(this.state.title.trim()==="" || this.state.words.trim()==="") return;
              if(this.props.wordListId){
                this.wordListManager.update(this.props.wordListId,this.state.title,this.state.words);
              }
              else{
                  this.wordListManager.create(this.state.title,this.state.words);
              }
              this.props.closeCallback();
            }}>
              Save
            </Button>
            <Button variant="contained" color="primary" className={this.props.classes.button} 
            onClick={() => {
                this.props.closeCallback();
            }}>
              Close
            </Button>
          </div>
        );
    }
  }
  export default withStyles(styles)(WordListEditor);