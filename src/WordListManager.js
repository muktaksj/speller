import MyWordList from './MyWordList'
class WordListManager{
    
    get(id){
        var item=localStorage.getItem("Speller_WordList_"+id);
        if(item){
            return JSON.parse(item);
        }
        return null;
    }

    create(title,wordList){
        var list=new MyWordList(title);
        list.words=this.filterWordList(wordList);
        var count=localStorage.getItem("Speller_List_Count");
        if(!count){
            count=1;
        }
        else{
            count++
        }
        list.id=count;
        localStorage.setItem("Speller_List_Count",count);
        localStorage.setItem("Speller_WordList_"+count,JSON.stringify(list));
        return count;
    }

    filterWordList(wordList){
        var words=wordList.split("\n").filter(function (el) {   
            return el !== null && el.trim()!=="";
          });

        for(var x=0;x<words.length;x++){
            words[x]=words[x].replace(/[^a-zA-Z'-]*/g,"");
        }
        return words;
    }

    update(id,title,wordList){
        var list=this.get(id);
        list.title=title;
        list.words=this.filterWordList(wordList);

        list.score=0;
        list.level=0;
        localStorage.setItem("Speller_WordList_"+id,JSON.stringify(list));
    }

    delete(id)
    {
        localStorage.removeItem("Speller_WordList_"+id);
        var count=localStorage.getItem("Speller_List_Count");
        count--;
        localStorage.setItem("Speller_List_Count",count);
    }
    setLevelScore(id,level,score){
        var list=this.get(id);
        list.level=level;
        list.score=score;
        localStorage.setItem("Speller_WordList_"+id,JSON.stringify(list));
    }

    getAllLists(){
        var items=[];
        var count=localStorage.getItem("Speller_List_Count");
        for(var x=1;x<=count;x++){
            var item=this.get(x);
            if(item){
                items.push(item);
            }
        }
        
        return items;
    }
}
export default WordListManager;