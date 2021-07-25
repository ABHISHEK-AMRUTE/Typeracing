const name = document.getElementById('txtName');
const ID = document.getElementById('ID');


const button_submit = document.getElementById('btnSubmit');

button_submit.addEventListener('click',function(){
    console.log(name.value,ID.value)
    if(name.value !="" && ID.value!="")
    {
        localStorage.setItem('userName',name.value);
        localStorage.setItem('userId',ID.value);
        
        var redirectUrl = localStorage.getItem('redirectUrl');
        if(redirectUrl === "" || redirectUrl == null)
         location.replace('../../');
         else location.replace(redirectUrl);
    }
})