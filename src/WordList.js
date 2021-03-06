import React from 'react';
import PageContainer from './PageContainer';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import WordListItem from './WordListItem'
import WordTest from './WordTest'
import Popup from "reactjs-popup";
import WordListManager from './WordListManager';
import WordListEditor from './WordListEditor';
import Breakpoint from 'react-socks';
import ArrowBack from '@material-ui/icons/ArrowBack';


const styles = theme => ({
      toolbarButtons: {
        marginLeft: 'auto',
      },
      button: {
        margin: theme.spacing(1)
      },
      rightIcon: {
        marginLeft: theme.spacing(1),
      },
      gridRoot: {
        flexGrow: 1,
      }
     
  });

  class WordList extends React.Component {
    wordListManager=new WordListManager();
    constructor(props){
      super(props);
      this.state=this.initialState();
    }

    initialState(){
      return {wordListId:0,title:"My Word Lists",words:this.wordListManager.getAllLists()}
    }
    

    editWordList(id){
      this.createPopup(id);
    
    }

    deleteWordList(id){
      if(window.confirm("Delete this Word List?")){
        this.wordListManager.delete(id);
        this.setState({words:this.wordListManager.getAllLists()});
      }
    }

    learnWordList(id,title){
      this.setState({wordListId:id,title:title});
      
    }

    restartWordList(id,title){
      this.wordListManager.setLevelScore(id,0,0);
      this.setState({wordListId:id,title:title});
    }

    render(){
        return (
        <PageContainer title={this.state.title} toolbarButtons={
            <div className={this.props.classes.toolbarButtons}>
              {this.state.wordListId===0 &&
                <Popup trigger={
                  <Button variant="contained" color="primary" className={this.props.classes.button}>
                      <Breakpoint small up>Create New
                      </Breakpoint><Add className={this.props.classes.rightIcon}></Add>
                  </Button>
                }
                modal
                >
                  {close=>(
                    <WordListEditor closeCallback={()=>{this.setState({words:this.wordListManager.getAllLists()}); close();}} />
                  )}
                </Popup>
              }
              {this.state.wordListId > 0 &&
                <Button variant="contained" color="primary" className={this.props.classes.button} onClick={()=>{this.setState(this.initialState())}}>
                  <ArrowBack className={this.props.classes.rightIcon}></ArrowBack><Breakpoint small up>Back
                  </Breakpoint>
                </Button>
              }
            </div>
        }>
        <div className={this.props.classes.root}>
          {this.state.wordListId===0 ?(
            <Grid container spacing={3} className={this.props.classes.gridRoot}>
               
                {this.state.words.map((item, key) =>
                  <Grid key={key}  item>
                    <WordListItem id={item.id} title={item.title} score={item.score} level={item.level} count={item.words.length}
                    onDelete={()=>this.deleteWordList(item.id)}
                    onLearn={()=>this.learnWordList(item.id,item.title)}
                    onChange={()=>{this.setState({words:this.wordListManager.getAllLists()});}}
                    onRestart={()=>{this.restartWordList(item.id,item.title)}}
                    >
                    </WordListItem>
                  </Grid>
                )
              }
                
            </Grid>):(
              <WordTest wordListId={this.state.wordListId} onTestComplete={()=>{this.setState(this.initialState());}}></WordTest>
            )
          }
        </div>
        </PageContainer>
       
        );
    }
}
  
  export default withStyles(styles)(WordList);