async function translateText() {

let text = document.getElementById("inputText").value;
let source = document.getElementById("sourceLang").value;
let target = document.getElementById("targetLang").value;

if(text === ""){
alert("Please enter text");
return;
}

try{

let response = await fetch(
"https://translate.googleapis.com/translate_a/single?client=gtx&sl="
+ source +
"&tl=" +
target +
"&dt=t&q=" +
encodeURIComponent(text)
);

let data = await response.json();

document.getElementById("outputText").value =
data[0][0][0];

}
catch(error){
alert("Translation Failed");
}

}

function swapLang(){

let source =
document.getElementById("sourceLang");

let target =
document.getElementById("targetLang");

let temp = source.value;
source.value = target.value;
target.value = temp;

}

function copyText(){

let output =
document.getElementById("outputText");

navigator.clipboard.writeText(output.value);

alert("Copied Successfully");

}

function speakText(){

let text =
document.getElementById("outputText").value;

if(text === "") return;

let speech =
new SpeechSynthesisUtterance(text);

window.speechSynthesis.speak(speech);

}

function startVoice(){

const recognition =
new(window.SpeechRecognition ||
window.webkitSpeechRecognition)();

recognition.lang = "en-US";

recognition.start();

recognition.onresult = function(event){

document.getElementById("inputText").value =
event.results[0][0].transcript;

};

}