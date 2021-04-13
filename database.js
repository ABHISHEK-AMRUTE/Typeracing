const low = require('lowdb')
const Filesync = require('lowdb/adapters/FileSync')

const adapter = new Filesync('db.json')
const db = low(adapter)

function makeroom(roomname)
{ 

    var str = roomname
    var obj = {
     }
     obj[str] = []
    db.defaults(obj).write();
}

function getMembers(roomname)
{
    return db.get(roomname).value();
}


function addMember(roomname,name,id)
{
    var obj = {
        "name" : name,
        "id" : id
    }

    db.get(roomname).push(obj).write();
}


module.exports = {
    makeroom,
    getMembers,
    addMember
}
