var delbtn = document.getElementsByClassName('deleteme')[0];
delbtn.addEventListener('click', (e)=>{
    var tarid = e.target.attributes.data_id.value;
    fetch('http://localhost:5000/article'+tarid,{
        method:'DELETE'
    }).then(res=>{
        console.log(res);
        window.location.href='/';
    })
    .catch(err => console.log(err));
}) 