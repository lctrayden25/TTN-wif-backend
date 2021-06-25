var email = document.getElementById("email");
var showPwd = document.getElementById("visible-logo");
var password = document.getElementById("password");
var loginBtn = document.getElementById("loginBtn");
var emailWarn = document.getElementById("email-warn");
var pwdWarn = document.getElementById("pwd-warn");

// show password
function showPassowrd(){
    if(password.type === "password"){
        password.type = "text";
    }else{
        password.type = "password";
    }
}
showPwd.addEventListener('click',showPassowrd,false);


function loginChecking(event){

    event.preventDefault();

    if(email.value == ""){
        email.style.border = "1px solid #FF4D00";
        emailWarn.innerHTML = "Please enter your email.";
    }else{
        email.style.border = "1px solid black"
        emailWarn.innerHTML = "";
    }

    if(password.value == ""){
        password.style.border = "1px solid #FF4D00";
        pwdWarn.innerHTML = "Please enter your password.";
    }else{
        password.style.border = "1px solid black";
    }

    const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.value.match(mailformat)){
        // alert("correct email format");
        return true;
    }else{
        // alert("wrong email format");
        emailWarn.innerHTML = "Invalid email";
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

}
loginBtn.addEventListener('click', loginChecking, false);









