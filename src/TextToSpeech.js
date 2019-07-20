  class TextToSpeech {
    speechApi = new SpeechSynthesisUtterance();
    constructor(){
        var voices = this.getVoices();
        var settings=this.getSettings();
        this.speechApi.voice = voices[settings.voice]; 
    }
    getVoices(){
        return window.speechSynthesis.getVoices();
    }
    getSettings(){
        var settings=localStorage.getItem("Speller_Voice_Settings");
        if(!settings){
            settings={
                rate:0.2,
                pitch:1,
                voice:0
            };
        }
        else{
            settings=JSON.parse(settings);
        }
        return settings;
    }
    saveSettings(settings){
        localStorage.setItem("Speller_Voice_Settings",JSON.stringify(settings));
    }
    Speak(text,callback){
        var voices = this.getVoices();
        var settings=this.getSettings();
        this.speechApi.voice = voices[settings.voice];
        this.speechApi.voiceURI = 'native';
        this.speechApi.volume = 1; // 0 to 1
        this.speechApi.rate = settings.rate; // 0.1 to 10
        this.speechApi.pitch = settings.pitch; //0 to 2
        this.speechApi.text = text;
        this.speechApi.lang = 'en-US';
        this.speechApi.onend=function(){
            if(callback) callback();
        };
        speechSynthesis.speak(this.speechApi);
    }
}
  
  export default TextToSpeech;