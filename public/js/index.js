const socket = io();
const name = localStorage.getItem('userName');
const ID = localStorage.getItem('userId');
const roomName = document.getElementById('roomname');



if(name==null || ID==null)
{
    console.log("ha null hai bhai, mai ja raha by....")
    location.replace('./html/takeName.html');
}

// roomName.addEventListener('input',function(){
    
//     var tempString = roomName.value;
//     if(tempString.search(' ') || tempString.search('%'))
//     {
//         roomName.setAttribute('class','errorInput');

        
//     }else roomName.removeAttribute('class','inputs'); 

// });

document.getElementById('game').addEventListener('click',function(){
    // var name = document.getElementById('name').value
    var roomname = roomName.value
    // var id = document.getElementById('id').value

    
    socket.emit('joinroom',roomname,name,ID,1);
    // window.alert('./html/game.html?roomname='+roomname)
    socket.disconnect();

    location.replace('./html/game.html?roomname='+roomname + '&Tn='+name);
})


