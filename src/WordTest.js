import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AnswerPad from './AnswerPad';
import Practice from './Practice';
import WordListManager from './WordListManager';
import { Button } from '@material-ui/core';

const styles = theme => ({
   
  });

  class WordTest extends React.Component {
    wordListManager=new WordListManager();
    wordList=null;
    currentIndex=0;
    steps=["Practice","Missing Letters","Jumbled Letters","Scrambled Letters","Listen and Spell"];

    constructor(props){
        super(props);
        this.wordList=this.wordListManager.get(this.props.wordListId);
        this.state={activeStep:this.wordList.level,word:this.getWord(),mask:this.getMask(this.wordList.level),hint:this.getHint(this.wordList.level)};
    }

    onWordComplete(){
        this.wordList.score++;
        this.wordListManager.setLevelScore(this.props.wordListId,this.state.activeStep,this.wordList.score);
        this.setState({word:this.getWord(),mask:this.getMask(this.wordList.level),hint:this.getHint(this.wordList.level)});
    }

    getWord(){
        if(this.wordList.score===this.wordList.words.length){
            console.log("Score Complete")
            this.wordList.score=0;
            this.wordList.level++;
            if(this.wordList.level>4){
                return;
            }
            this.wordListManager.setLevelScore(this.props.wordListId,this.wordList.level,this.wordList.score);
            this.setState({activeStep:this.wordList.level});
        }
        return this.wordList.words[this.wordList.score].toUpperCase();
    }

    getMask(level){
        var word=this.getWord();
        if(level===1){
            return this.createMissingLettersMask(word,Math.floor(word.length/3));
        }
        else{
            return this.createMissingLettersMask(word,word.length);
        }
    }

    getHint(level){
        var word=this.getWord();
        if(level===2){
            return this.scrambleLetters(word,Math.floor(word.length*0.6));
        }
        else if(level===3){
            return this.scrambleLetters(word,word.length);
        }
        else{
            return null;
        }
    }

    createMissingLettersMask(word,numberOfLetters){
        var x=0;
        if(word.length===numberOfLetters){
            var mask="";
            for(x=0;x<word.length;x++){
                mask+="?";
            }
            return mask;
        }
        else{
            var letterIndex=[];
            var maskArray=word.split("");
            for(x=0;x<numberOfLetters;x++){
                var index=Math.floor(Math.random()*(word.length));
                if(letterIndex.indexOf(index)===-1){
                    letterIndex.push(index);
                    maskArray[index]="?";
                }
            }
            return maskArray.join("");
        }
    }

    scrambleLetters(word,numberOfLetters){
        if(word.length===numberOfLetters){
            var shuffled= word;
            while(shuffled[0]===word[0] || shuffled[shuffled.length-1]===word[word.length-1]){
                shuffled=this.shuffle(word);
            }
            return shuffled;
        }
        else{
            var lettersToSkip=Math.floor((word.length-numberOfLetters)/2);

            var subWord=word;

            while(subWord===word){
                subWord=word.substring(lettersToSkip,lettersToSkip+numberOfLetters);
                subWord=this.shuffle(subWord);
                subWord=word.substring(0,lettersToSkip) + subWord;
                if(subWord.length < word.length){
                    subWord=subWord+word.substring(subWord.length);
                }
                return subWord;
            }
        }
    }

    shuffle(word){
        var shuffledWord = '';
        word = word.split('');
        while (word.length > 0) {
        shuffledWord +=  word.splice(word.length * Math.random() << 0, 1);
        }
        return shuffledWord;
    }
    
    skipPractice(){
        this.wordList.level=1;
        this.wordListManager.setLevelScore(this.props.wordListId,this.wordList.level,0);
        this.setState({activeStep:this.wordList.level});
    }

    render(){
        return (
            <div className={this.props.classes.root}>
                <Stepper activeStep={this.state.activeStep}>
                {this.steps.map((label, index) => {
                    return (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    );
                })}
                </Stepper>
                {this.state.activeStep>0 &&
                    <AnswerPad word={this.state.word} mask={this.state.mask} hint={this.state.hint} enableAudio={this.state.activeStep===4} onComplete={()=>{this.onWordComplete()}}></AnswerPad>
                }

                {this.state.activeStep===0 &&
                    <React.Fragment>
                        <Practice words={this.wordList.words}></Practice>
                        <br/>
                        <div>
                            <Button variant="contained" color="primary" className={this.props.classes.button} 
                            onClick={() => {
                                this.skipPractice();
                            }}>
                            Skip Practice
                            </Button>
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }
  }
  
  export default withStyles(styles)(WordTest);