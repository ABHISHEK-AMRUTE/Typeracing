const {makeroom,getMembers,addMember} = require('./database')

const express = require('express');
const { time } = require('console');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http,{
    cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});
app.use(cors());



const port = process.env.PORT ||3000;

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/" + "index.html" );
})

io.on('connection' , (socket)=>{
    console.log("new connection received")


    socket.on('joinroom',(roomname,name,id,creating)=>{
        

        if(creating===1)
        {
            makeroom(roomname)
            console.log('room created :: ' + roomname)
        }
        else{
            socket.join(roomname);

            var arr = getMembers(roomname);

            var is_already_inside =0;
            arr.forEach(element => {
                if(element.name == name && element.id == id)
                {
                      is_already_inside = 1;
                       return;
                }
            });
            if(is_already_inside)
            {
                
                io.to(socket.id).emit('memberList',arr);

            }else{
                addMember(roomname,name,id)
                var arrr = getMembers(roomname);
                io.to(socket.id).emit('memberList',arrr)//only to sender
                socket.to(roomname).emit('newMembers',name,id) // all in room except sender
            }
            
        }
        
        
    })

    socket.on('broadcastProgress',(roomname,id,prog)=>{
        socket.to(roomname).emit('progress',id,prog); // all in room except sender
    })
   
    socket.on('noteCompleted',(roomname,name,id)=>{
        io.in(roomname).emit('completed',name,id,Date.now());
    })

    socket.on('startGame',(roomname)=>{
        var text = "Running is the way in which people or animals travel quickly on their feet. It is a method of travelling on land. It is different to walking in that both feet are regularly off the ground at the same time.[1] Different terms are used to refer to running according to the speed: jogging is slow, and sprinting is running fast.Running is a popular form of exercise. It is also one of the oldest forms of sport. The exercise is known to be good for health; it helps breathing and heartbeat, and burns any spare calories. Running keeps a person fit and active. It also relieves stress. Running makes a person thirsty, so it is important to drink water when running."
        io.in(roomname).emit('start',text);
    })
})

http.listen(port,()=>{
    console.log("on port 3000");
})