function getNewCard(id,name)
{
     const outerDiv  = document.createElement('div');
     const span = document.createElement('span');
     const img = document.createElement('img');
     const innerDiv = document.createElement('div');
     const separator = document.createElement('hr');
     const rowContainer = document.createElement('div');
     const colOneContainer = document.createElement('div');
     const colTwoContainer = document.createElement('div');
     const typeSpeed = document.createElement('div');


     rowContainer.setAttribute('class','row');
     colOneContainer.setAttribute('class','col-sm-10');
     colTwoContainer.setAttribute('class','col-sm-2');
     span.setAttribute('class','info');
     span.innerHTML = name;
     img.setAttribute('height','50px');
     img.setAttribute('src','../res/esf-removebg-preview.png')
     img.setAttribute('id','car'+id)
     innerDiv.setAttribute('class','progress');
     innerDiv.setAttribute('style','background-color : blue; width:1%');
     innerDiv.setAttribute('id','widthBar'+id);
     typeSpeed.setAttribute('class','typingSpeed');
     typeSpeed.setAttribute('id','typingSpeed'+id);
     typeSpeed.innerHTML = "45 WPM"

     colOneContainer.appendChild(img);
     colOneContainer.appendChild(innerDiv);
     colTwoContainer.appendChild(typeSpeed);
     colTwoContainer.appendChild(span);
     rowContainer.appendChild(colOneContainer);
     rowContainer.appendChild(colTwoContainer);
     outerDiv.appendChild(rowContainer);
     outerDiv.appendChild(separator);
     return outerDiv;
}