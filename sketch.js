let x= 100;
let y = 100;
let xspd = -1;
let yspd = -1.5;
let dsptxt = "reply";
let rover;
let foo; // my voice
let micButton;
let bot;
// run locally make a server at the directory 
// python3 -m http.server 8888
// modified to utf8 and variable handling by greg k
// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

function setup() {
  
  micButton = createButton("click to speak")
  micButton.mousePressed(getMic);
  createCanvas(windowWidth,windowHeight);
  background(0);
  textAlign(CENTER);
  angleMode(DEGREES);
  colorMode(HSB);

  // Create a RiveScript bot
  

   rover = new p5.Speech(); // speech synthesis object
   //rover.speak('mars rover connected'); // say something
   rover.onLoad = voiceReady;
   rover.setRate(0.8)
  
   foo = new p5.SpeechRec(); // speech recognition object (will prompt for mic access)
  foo.onResult = showResult; // bind callback function to trigger when speech is recognized
  foo.continuous = false
  foo.start(); // start listening

   

  bot = new RiveScript({utf8: true});

  // Load the bot files (this can be more than one)
  //const files = ['brainutf8/hello.rive','brainutf8/begin.rive','brainutf8/knockknock.rive','brainutf8/move.rive'];
  const files = ['rover.txt'];
  bot.loadFile(files)
    .then(() => {
      console.log("Bot loaded");
      bot.sortReplies();
    })
    .catch(error => console.error(error));

  // Grab some DOM elements
  const button = select('#submit');
  const input = select('#textinput');
  const output = select('#bot');

  // Whenever the user hits "submit" ask the bot to say something
  button.mousePressed(() => {
    // What did the user say?
    const txt = input.value();
    // What does the bot say?
    bot.reply("local-user",txt)  // this is missing from the shiffman web site
      .then(function(reply){     // anonymous function in a promise
  	 output.html(reply);
     display(reply);
  	 input.value('');  // clear input
  	 console.log("boing");})
      .catch(error => console.error(error));
  }); 
  
  micButton = createButton("click to speak")
  micButton.mousePressed(getMic);
  }

function getMic(){
  
  foo.start();
}

function voiceReady(){
  rover.listVoices();
  rover.setVoice('Alex')
  
  
}

function showResult()
{
  /// mic recorded speach to rivescript bot
  console.log(foo.resultString); // log the result
  const txt = foo.resultString;
    // What does the bot say?
    bot.reply("local-user",txt)  // this is missing from the shiffman web site
      .then(function(reply){     // anonymous function in a promise
     display(reply);
  	 console.log("boing");})
      .catch(error => console.error(error));
}

function display(reply){
  background(0);
  dsptxt = reply;
  // have the rover speak
  rover.speak(reply); // say something
  
  
}


function draw(){
 //push();
 //background(0);
  fill(frameCount%255,255,255);
  stroke(0,255,255);
  
  x+=xspd;
  y+=yspd;
  if (x > width || x< 0){
    xspd *=-1;
  }
  if (y > height || y< 0){
    yspd *=-1;
  }
  translate(x,y);
  rotate(frameCount);
  textSize(frameCount%50);
  text(dsptxt,0,0);
  
  //pop();
  
}
