var email = document.getElementById("email");
var showPwd = document.getElementById("visible-logo");
var password = document.getElementById("password");
var showPwd2 = document.getElementById("confirm-visible-logo");
var confirmPassword = document.getElementById("confirmPassword");
var registerBtn = document.getElementById("registerBtn");

var emailWarn = document.getElementById("email-warn");
var pwdWarn = document.getElementById("pwd-warn");
var confirmpwdWarn = document.getElementById("confirmpwd-warn");



function showPassowrd(){
    if(password.type === "password"){
        password.type = "text";
    }else{
        password.type = "password";
    }
}
function showConfirmPwd(){
    if(confirmPassword.type === "password"){
        confirmPassword.type = "text";
    }else{
        confirmPassword.type = "password";
    }
}
showPwd.addEventListener('click',showPassowrd,false);
showPwd2.addEventListener('click',showConfirmPwd,false);


function registerEmailCheck(){
    const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.value == "" || !(email.value.match(mailformat))){
        email.style.border = "1px solid red";
        emailWarn.textContent = "Invalid email";
        return false;
    }else{
        email.style.border = "1px solid black"
        emailWarn.textContent = "";
    }
}
email.addEventListener("blur", registerEmailCheck,false);

function registerPasswordCheck(){
    // var pwdformat = /^([a-zA-Z0-9!@#$%^&*])$/;
    if(password.value.length < 8){
        password.style.border = "1px solid red";
        pwdWarn.textContent = "Weak password";
        return false;
    }else{
        password.style.border = "1px solid black";
        pwdWarn.textContent = ""
    }
}
password.addEventListener("blur", registerPasswordCheck, false);


function comparePassword(){
    if(password.value != confirmPassword.value){
        password.style.border = "1px solid red";
        confirmpwdWarn.textContent = "Two different password";
    }else{
        password.style.border = "1px solid black";
        pwdWarn.textContent = ""
    }
}
confirmPassword.addEventListener("blur", comparePassword, false);

function registerChecking(){
    if(!isLoading){
        registerEmailCheck();
        registerPasswordCheck();

        var arrayOfFormObject = [];
        var arrayOfInputObject = [];
        var email = document.querySelector('#email').value;
        var password = document.querySelector('#password').value;
        var confirm_passowrd = document.querySelector('#confirmPassword').value;
        arrayOfInputObject.push({
            email: email,
            password: password ,
            confirm_passowrd: confirm_passowrd
        });
        arrayOfFormObject.push(arrayOfInputObject);

        console.log(arrayOfFormObject)

        // var form_obj = {
        //     'email': email,
        //     'password': password,
        // }

    }
}
registerBtn.addEventListener('click', registerChecking,false);

window.addEventListener('beforeunload',function(e){
    e.preventDefault();
    e.returnValue = '';
});

