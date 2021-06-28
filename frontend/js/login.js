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
    var arrayOfInputObject = [];
    var login_email = document.querySelector('#email').value;
    var login_password = document.querySelector('#password').value;
    arrayOfInputObject.push({
        login_email: login_email,
        login_password: login_password
    });
    arrayOfFormObject.push(arrayOfInputObject);

    var login_obj = {
        email: login_email,
        password: login_password
    }

    console.log(login_obj)

    postXHR(
        'login', 
        JSON.stringify(
            login_obj
        ),
        function(result, data){ // success request
            console.log(result);
            // displayNews(data);

            console.log(data)
            login_form = data;

            //stringify login object and save to session storage
            login_string = JSON.stringify(login_form);
            sessionStorage.setItem('user_login',login_string);

            login_data = sessionStorage.getItem('user_login');
            console.log(login_data)

            to_loginObj = JSON.parse(login_data);
            console.log(to_loginObj)

            location.replace('campaignSubmission.html');

            isLoading = false;
        },
        function(result, data){ 
            console.log(result);
            // failed request
            // redirectToHome();
            
        },
        function(){ 
            // connection error
            console.log(result);
            // redirectToHome();
        },
        function(status){ 
            // request status error
            console.log(result);
            // redirectToHome();
        }
    );

})







