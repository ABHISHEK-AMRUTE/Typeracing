const low = require('lowdb')
const Filesync = require('lowdb/adapters/FileSync')

const adapter = new Filesync('text.json')
const db = low(adapter)


function getRandomeText()
{
    var arr = db.get('easy').value();
     
    var si = arr.length;
    var index =  parseInt(Math.random() * (si));
    return arr[index];
}


module.exports = {
    getRandomeText
}