function getUserTile (id,name){
    //creation
    var outerContainer = document.createElement('div')
    var nameField = document.createElement('span')
    var idField = document.createElement('span')
    var complete = document.createElement('span')
    

    //styling
    nameField.innerHTML = "<br><b>Name: " +name + "</b><br> "
    idField.innerHTML = "User-Id: "+id +"<br>"
    complete.innerHTML ="0%"
    complete.setAttribute('id',id+"completed");


    //attaching
    outerContainer.appendChild(nameField)
    outerContainer.appendChild(idField)
    outerContainer.appendChild(complete)

    return outerContainer;
}
console.log('loaded user_tile')