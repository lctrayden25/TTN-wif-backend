var email = document.getElementById("email");
var showPwd = document.getElementById("visible-logo");
var password = document.getElementById("password");
var loginBtn = document.getElementById("loginBtn");

// show password
function showPassword(){
    if(password.type === "password"){
        password.type = "text";
    }else{
        password.type = "password";
    }
}
showPwd.addEventListener('click',showPassword,false);


$('#loginBtn').click(function(){
    if($('.required').val() == ""){
        $('.required').parent().find('input').css('border','1px solid #ff0000');
        $('.required').parent().find('span').html('Please enter valid information.')
    }else{
        $('.required').parent().find('input').css('border','1px solid #000');
        $('.required').parent().find('span').empty();
    }


    var arrayOfFormObject = [];
    var listOfForm = document.querySelectorAll('.loginForm');
    [].forEach.call(listOfForm, function(form) {
    var arrayOfInputObject = [];
    var inputValue1 = form.querySelector('#email').value;
    var inputValue2 = form.querySelector('#password').value;
    arrayOfInputObject.push({
        value1: inputValue1,
        value2: inputValue2
    });
    arrayOfFormObject.push(arrayOfInputObject);
    });
})







