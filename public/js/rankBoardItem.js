function getRankBoardItem(name,id){

    const a = document.createElement('a');
    a.setAttribute('class','list-group-item list-group-item-action');

    a.innerHTML = name;

    return a;


}