var email = document.getElementById("email");
var showPwd = document.getElementById("visible-logo");
var password = document.getElementById("password");
var showPwd2 = document.getElementById("confirm-visible-logo");
var confirmPassword = document.getElementById("confirmPassword");
var registerBtn = document.getElementById("registerBtn");


$('.visible-logo').click(function(){
    var password_type = $('.visible-check').attr('type');

    if(password_type == "password"){
        $('.visible-check').parent().find('.visible-check').attr('type','text');
    }else{
        $('.visible-check').parent().find('.visible-check').attr('type','password');
    }
})


$('.required').blur(function(){
    if($(this).val() == ""){
        $(this).css('border','1px solid #ff4d00');
        $(this).parent().find('.error').html('Please enter valid information.')
    }else{
        $(this).css('border','1px solid #000');
        $(this).parent().find('span').empty();
    }
})

$('#email').blur(function(){
    const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if($('#email').val() == "" || !($('#email').val().match(mailformat))){
        $('#email').css('border','1px solid #ff4d00');
        $(this).parent().find('.error').html("Please enter valid email.");
        return false;
    }else{
        $('#email').css('border','1px solid #000');
        $(this).parent().find('.error').empty();
    }
})

$('#password').blur(function(){
    if($(this).val().length < 8){
        $(this).css('border','1px solid #ff4d00');
        $(this).parent().find('.error').html('This is a weak password.')
    }else{
        $(this).css('border','1px solid #000');
        $(this).parent().find('.error').empty();
    }
})


$('#confirmPassword').blur(function(){
    var password = $('#password').val();
    var confirm_password = $(this).val();

    if(confirm_password !== password){
        $(this).css('border','1px solid #ff4d00');
        $(this).parent().find('.error').html('Please ensure enter the same password.')
    }else{
        $(this).css('border','1px solid #000');
        $(this).parent().find('.error').empty();
    }
})


$('#registerBtn').click(function(){
    if(!isLoading){

        if($('.required').val() == ""){
            $('.required').css('border','1px solid #ff4d00');
            $('.error').html('Please enter valid information.');
            return false;
        }

        const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if($('#email').val() == "" || !($('#email').val().match(mailformat))){
            $('#email').css('border','1px solid #ff4d00');
            $('#email').parent().find('.error').html("Please enter valid email.");
            return false;
        }


        if($('#password').val().length < 8){
            $('#password').css('border','1px solid #ff4d00');
            $('#password').parent().find('.error').html('password is a weak password.');
            return false;
        }else{
            $('#password').css('border','1px solid #000');
            $('#password').parent().find('.error').empty();
        }


        if((($('#confirmPassword').val()) !== $('#password').val())){
            $('#confirmPassword').css('border','1px solid #ff4d00');
            $('#confirmPassword').parent().find('.error').html('Please ensure enter the same password.');
            return false;
        }else{
            $('#confirmPassword').css('border','1px solid #000');
            $('#confirmPassword').parent().find('.error').empty();
        }

        var arrayOfFormObject = [];
        var arrayOfInputObject = [];
        var email = document.querySelector('#email').value;
        var password = document.querySelector('#password').value;
        var confirm_password = document.querySelector('#confirmPassword').value;
        arrayOfInputObject.push({
            email: email,
            password: password ,
            confirm_password: confirm_password
        });
        arrayOfFormObject.push(arrayOfInputObject);

        var register_form_obj = {
             'email': email,
             'password': confirm_password
        }

        // isLoading = true;

        postXHR(
            'user_register', 
            JSON.stringify(
                register_form_obj
            ),
            function(result, data){ // success request
                console.log(result);
                // displayNews(data);

                console.log(data)
                register_form = data;

                register_string = JSON.stringify(register_form); 
                sessionStorage.setItem('user_register',register_string);

                register_data = sessionStorage.getItem('user_register');
                to_loginObj = JSON.parse(register_data);

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

    } 
})



window.addEventListener('beforeunload',function(e){
    if(isLoading){
        e.preventDefault();
        e.returnValue = '';
    }
});

