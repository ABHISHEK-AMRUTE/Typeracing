var is_admin  = false;
var wordLength = 0;
var timeTaken = 0;
var startTime =0;
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

var roomname = getUrlParameter('roomname')
var temp = getUrlParameter('Tn');

const socket = io();
const name = localStorage.getItem('userName');
const id = localStorage.getItem('userId');

if(temp === name)
is_admin = true;

if(name==null || id==null)
{
    console.log("ha null hai bhai, mai ja raha by....")
    location.replace('../html/takeName.html');
}else{
    socket.emit('joinroom',roomname,name,id,0);
}

var scoreArray = [];



// document.getElementById('game').addEventListener('click',function(){
//      name = document.getElementById('name').value
//      id = document.getElementById('id').value
//      socket.emit('joinroom',roomname,name,id,0);
// })

var para = 'Bob Proctor has formed the habit of reading a few'

const paraDisplay = document.getElementById('normal');
const incorrect = document.getElementById('incorrect');
const correct = document.getElementById('correct');
const startButton = document.getElementById('startGame');
const inviteButton = document.getElementById('inviteButton');
const notificationText = document.getElementById('notificationText');
const timerInSec = document.getElementById('timerInSec');
const textArea = document.getElementById('inputLines')
const rankBoard = document.getElementById('rankboard');
const trafficLight = document.getElementById('trafficLight');



// textArea.readOnly = true;
if(is_admin)
{
    notificationText.innerHTML = "Start the game, racers are waiting...";
    startButton.style.visibility = 'visible';
}else{
    notificationText.innerHTML = "Waiting for the admin to start new race"
    startButton.style.visibility = 'hidden';
}



startButton.addEventListener('click',function(){
    trafficLight.style.border = "2px solid red"
    socket.emit('startGame',roomname);
});

paraDisplay.innerHTML = para;



var userList = document.getElementById('userList')
var completed = 0;

textArea.addEventListener('input',function(){
   if(completed==0)
   {
    var str = textArea.value
    var index = -1;
    var wordCount = 1;
    for(var x=0;x<para.length;x++)
    {
        if(str[x]!=para[x]){
            index = x;
            break;
        }
         wordCount++;
    }
    var d = new Date();
   
    timeTaken = (d.getTime()-startTime)/(60*1000);
    var speed = (wordCount/5)/(timeTaken);
    speed =  parseInt(speed)
     document.getElementById('typingSpeed'+id).innerText = speed+" WPM";
     if(index==-1 && str.length === para.length )
     {
         //  window.alert('Completed')
         completed = 1;
         correct.innerHTML = para.substring(0) 
         incorrect.innerHTML = ""
     
        paraDisplay.innerHTML = ""
        // document.getElementById(id+"completed").innerText = "100%"
        socket.emit('noteCompleted',roomname,name,id);
        socket.emit('broadcastProgress',roomname,id,"100")
        startButton.style.display = 'inline';
     }else{
     
     var correctString =   para.substring(0,index)
     correct.innerHTML =  correctString
     var per = (correctString.length/para.length)*100
    //  document.getElementById(id+"completed").innerText = parseInt(per) + "%"
     document.getElementById('car'+id).style.marginLeft = parseInt(per) + "%";
     document.getElementById('widthBar'+id).style.width = parseInt(per) + "%";
     socket.emit('broadcastProgress',roomname,id,parseInt(per))
     incorrect.innerHTML = para.substring(index  , str.length)
 
    paraDisplay.innerHTML = "<span class='blink'>|</span>"+ para.substring(str.length);}
   }
})

socket.on('memberList',(arr)=>{
   arr.forEach(element => {
    // userList.appendChild(getUserTile(element.id,element.name));
    userList.appendChild(getNewCard(element.id,element.name));
   });
})
socket.on('newMembers',(name,id)=>{
    // userList.appendChild(getUserTile(id,name));
    userList.appendChild(getNewCard(id,name));
})

socket.on('progress',(id,progress)=>{
    // document.getElementById(id+"completed").innerText = progress +"%"
    
    document.getElementById('car'+id).style.marginLeft = parseInt(progress) + "%";
    document.getElementById('widthBar'+id).style.width = parseInt(progress) + "%";
    

})

socket.on('completed',(name,id,time)=>{
    scoreArray.push({name:name,id:id,time:time});
    scoreArray.sort(function(a,b){return a.time < b.time})
    rankBoard.innerHTML = "";
    scoreArray.forEach(element => {
        rankBoard.appendChild(getRankBoardItem(element.name)); 
    });
})


socket.on('start',(text)=>{
     completed = 0;
     startButton.style.display = 'none';
     document.getElementById('car'+id).style.marginLeft =  "0%";
     document.getElementById('widthBar'+id).style.width="0%"
       textArea.innerHTML = "";
       correct.innerHTML=""
       incorrect.innerHTML="";
       paraDisplay.innerHTML="";
       wordLength = text.length;
       timeTaken = 0;
       console.log(wordLength)
       notificationText.innerHTML ="!!! Racers get ready !!!"
       textArea.readOnly = true;
       var timeleft = 10;
       para= text;
       paraDisplay.innerHTML = text;

       var tempTimer = setInterval(function(){
        if(timeleft <= 0){
          clearInterval(tempTimer);
          timerInSec.innerHTML = "Go";
          textArea.readOnly = false;
          textArea.focus();
          var d = new Date();
          startTime = d.getTime();

        } else {
            if(timeleft==5)
            {
                trafficLight.style.border = "2px solid yellow"
            }else if(timeleft==1){
                trafficLight.style.border = "2px solid green"
            }
            timerInSec.innerHTML = timeleft + " Sec";
        }
        timeleft -= 1;
      }, 1000);

})