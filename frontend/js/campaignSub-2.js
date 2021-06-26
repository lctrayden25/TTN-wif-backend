
$(document).ready(function(){
    socialCheck();

    //date picker plugin
    // $(".datepicker").datepicker();
});


function socialCheck(){
    $('#submitBtn').click(function(){
        if(($('input.appleSelected').val() == "https://music.apple.com/") || ($('input.appleSelected').val() == "")){
            $('input.appleSelected').css('border','1px solid red');
        }else{
            $('input.appleSelected').css('border','1px solid #000');
        }

        if(($('input.sporifySelected').val() == "https://music.spotify.com/") || ($('input.spotifySelected').val() == "")){
            $('input.spotifySelected').css('border','1px solid #ff0000');
        }else{
            $('input.spotifySelected').css('border','1px solid #000');
        }
    })
}


window.onload = function(){
    document.getElementById("submitBtn").disabled = true;
    submitBtn.style.background = "grey";
}
function termCheck(checkbox){
    var submitBtn = document.getElementById("submitBtn");
    if(!(checkbox.checked)){
        submitBtn.disabled = true;
        submitBtn.style.background = "grey"
    }else{
        submitBtn.disabled = false;
        submitBtn.style.background = "#000"
    }
}


function optionCheck(event){
    var selectEl = event.target;
    var parent = selectEl.parentElement;
    var inputApple = parent.querySelector('.appleSelected');
    var inputSpotify = parent.querySelector('.spotifySelected');

    if(event.target.value == "Apple Music"){
        inputApple.style.display = "block";
        inputSpotify.style.display = "none"
    }else{
        inputApple.style.display = "none";
        inputSpotify.style.display = "block"
    }
}





