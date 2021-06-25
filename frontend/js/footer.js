var sub_name = document.getElementById("sub-name");
var sub_email = document.getElementById("sub-email");
var footerSub = document.getElementById("footerSub");


function footerFormValidate(event){
    event.preventDefault();

    const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(sub_email.value == "" || !(sub_email.value.match(mailformat))){
        sub_email.style.border = "1px solid red"
        return false;
    }else{
        sub_email.style.border = "none"
        sub_email.style.borderBottom = "1px solid black"
    }

    // var arrayOfFormObject = [];
    // var listOfForm = document.querySelectorAll('.subscribeForm');
    // [].forEach.call(listOfForm, function() {
    // var arrayOfInputObject = [];
    // var name = document.getElementById('name').value;
    // var email = document.getElementById('email').value;
    // arrayOfInputObject.push({
    //     name: name,
    //     email: email
    // });
    // arrayOfFormObject.push(arrayOfInputObject);
    // }); 

    var arrayOfFormObject = [];
    var arrayOfInputObject = [];
    var name = document.getElementById('sub-name').value;
    var email = document.getElementById('sub-email').value;
    arrayOfInputObject.push({
        name: name,
        email: email
    });
    arrayOfFormObject.push(arrayOfInputObject);

    var form_obj = {
        name: name,
        email: email
    }

    postXHR(
        'user_register', 
        JSON.stringify(
            form_obj
        ),
        function(result, data){ // success request
            console.log(result);
            // displayNews(data);

            console.log(data)
            footer_form_obj = data;

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

footerSub.addEventListener('click', footerFormValidate, false)