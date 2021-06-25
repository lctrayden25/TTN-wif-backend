$('.required-field').blur(function(){
    if($(this).val() == "" ){
        $(this).parent().find('input').css('border','1px solid #ff0000');
        $(this).parent().find('.error').html("Please enter valid information")
    }else{
        $(this).parent().find('input').css('border','1px solid #000');
        $(this).parent().find('.error').empty();
    }
})


$('#nextBtn').bind("click",function(){ 
    var imgVal = $('#file-input').val(); 
    if(imgVal=='') { 
        $('.custom-upload-btn').css('border','1px solid #ff0000');
        return false; 
    }else{
        $('.custom-upload-btn').css('border','1px solid #000');
    }
}); 

var file_upload = null
function getBase64(file, name) {
	var reader = new FileReader();
	reader.onload = function () {
        file64 = reader.result;
        file64_type = name.split('.').pop();

        var artistImgageObj = {
            file_name: null,
            file_type: file64_type,
            base64: file64
        }

        postXHR(
            'upload_file', 
            JSON.stringify(
                artistImgageObj
            ),
            function(result, data){ // success request
                console.log(result);
                // displayNews(data);

                console.log(data)
                file_upload = data;

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
	reader.onerror = function (error) {
		console.log('Upload Error: ', error);
		processing = false;
	};
	reader.readAsDataURL(file);
}


$('#file-input').change(function(event){
    var filesize = this.files[0].size/1024/1024;
    if(filesize > 2){
        $('.file-remark').css('color','#ff0000')
        return false;
    }else{
        $('.file-remark').css('color','#000')
    }

    var filename = event.target.value.split('\\')[event.target.value.split('\\').length - 1];
    if(filename == ""){
        return false;
    }else{
        var file = this.files[0];
        $('.uploaded').html("<span style='font-size:16px'>"+filename+"</span><button class='delBtn'>Delete</button>");
    
        $('.delBtn').click(function(){
            $('.uploaded').find('span, button').remove();
        })
        getBase64(file, fileName);
    }
    // $('.uploaded').html("<span style='font-size:16px'>"+filename+"</span><button class='delBtn'>Delete</button>");
    
    // $('.delBtn').click(function(){
    //     $('.uploaded').find('span, button').remove();
    // })
})


$('.required-field').blur(function(){
    if($(this).val()== ""){
        $(this).css('border','1px solid #FF4D00')
    }else{
        $(this).css('border','1px solid #000')
    }
});


// $('#nextBtn').click(function(){
//     if(($('.youtube').val() == "https://www.youtube.com/user/") || ($('.youtube').val() == "")){
//         $('input.youtube').css('border','1px solid #FF4D00');
//     }else{
//         $('input.youtube').css('border','1px solid #000');
//     }

//     if(($('.facebook').val() == "https://www.facebook.com/") || ($('.facebook').val() == "")){
//         $('input.facebook').css('border','1px solid #FF4D00');
//     }else{
//         $('input.facebook').css('border','1px solid #000');
//     }

//     if(($('.instagram').val() == "https://www.instagram.com/") || ($('.instagram').val() == "")){
//         $('input.instagram').css('border','1px solid #FF4D00');
//     }else{
//         $('input.instagram').css('border','1px solid #000');
//     }
// })

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


var artistName = document.getElementById("artistName");
var musicLabel = document.getElementById("musicLabel");
var contactPerson = document.getElementById("contactPerson");
var roleContactPerson = document.getElementById("roleContactPerson");
var contactEmail = document.getElementById("contactEmail");
var contactNumber = document.getElementById("contactNumber");
var facebook = document.getElementById("facebook");
var instagram = document.getElementById("instagram");
var youtube = document.getElementById("youtube");
var cashMember = document.getElementById("cashMember");
var nextBtn = document.getElementById("nextBtn");


$('#contactEmail').blur(function(){
     const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if((contactEmail.value == "") || !(contactEmail.value.match(mailformat))){
        contactEmail.style.border = "1px solid #FF4D00";
        $(this).parent().find('.error').html("Please enter valid contact email");
        return false;
    }else{
        contactEmail.style.border = "1px solid black";
        $(this).parent().find('.error').empty();
    }
})

   
$('#contactNumber').blur(function(){
    var contactFormat = /^\d{8}$/;
    if(contactNumber.value == "" || !(contactNumber.value.match(contactFormat))){
        contactNumber.style.border = "1px solid #FF4D00";
        $(this).parent().find('.error').html("Please enter valid contact number");
        return false;
    }else{
        contactNumber.style.border = "1px solid black" 
        $(this).parent().find('.error').empty();
    }
})

//Click next button to another page
function loadToAlbum(){
    if(artistName.value=="" || musicLabel.value =="" || contactEmail.value=="" || contactNumber.value==""){
        return false;
    }else{
        location.href='campaignSub2-album.html';    
    }
}

function loadToTrack(){
    if(artistName.value=="" || musicLabel.value =="" || contactEmail.value=="" || contactNumber.value==""){
        return false;
    }else{
        location.href='campaignSub2-track.html';    
    }
}



function albumFormOneCheck(event){
    if(!isLoading){
        event.preventDefault();
    
        var required = $('.required-field').val();
        if(required == ""){
            $('.required-field').css('border','1px solid #ff0000');
            $('.error').html("Please enter valid information");
            return false;
        }
    
        var arrayOfAlbumFormObject = [];
        var listOfAlbumForm = document.querySelectorAll('.inputForm');
        [].forEach.call(listOfAlbumForm, function(form) {
            var arrayOfAlbumInputObject = [];
            var artist_name = form.querySelector('#artistName').value;
            var artist_orgin = form.querySelector('#artist-origin').value;
            var music_label = form.querySelector('#musicLabel').value;
            var cash_member = form.querySelector('#cashMember').value;
            var contact_person = form.querySelector('#contactPerson').value;
            var role_contact_person = form.querySelector('#roleContactPerson').value;
            var contact_email = form.querySelector('#contactEmail').value;
            var contact_number = form.querySelector('#contactNumber').value;
            var facebook = form.querySelector('#facebook').value;
            var instagram = form.querySelector('#instagram').value;
            var youtube = form.querySelector('#youtube').value;
            var website = form.querySelector('#website').value;
            var file_input = form.querySelector('#file-input').value;
            arrayOfAlbumInputObject.push({
                artist_name: artist_name,
                artist_orgin: artist_orgin,
                music_label: music_label,
                cash_member: cash_member,
                contact_person: contact_person,
                role_contact_person: role_contact_person,
                contact_email: contact_email,
                contact_number: contact_number,
                facebook: facebook,
                instagram: instagram,
                youtube: youtube,
                website: website,
                file_input: file_input
            });
            arrayOfAlbumFormObject.push(arrayOfAlbumInputObject);
        }); 

        var sub1_form_obj = {
            
        }
    
        console.log(arrayOfAlbumFormObject)
    }
}
nextBtn.addEventListener('click', albumFormOneCheck, false);


window.addEventListener('beforeunload', function (e) {
    if (isLoading) {
        e.preventDefault();
        e.returnValue = '';
	}
});

