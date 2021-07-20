var modal = document.getElementById('myModal');
var closeModal =  document.getElementById('close');
var openModal = document.getElementById('openModal');

openModal.onclick = function(){
    modal.style.display = 'block'
};

closeModal.onclick = function(){
    modal.style.display = "none";
}

