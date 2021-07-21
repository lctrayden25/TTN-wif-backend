var mins;
var seconds;
var max_num = 60;
// var data_duration = $('#show-btn-input').attr('data-duration');
var duration;
var duration = null;
var objOfDuration = {
    minute_value: '',
    second_value: ''
}

//default hide
$('.mins-ctn').hide();
$('.seconds-ctn').hide();

window.onload = function(){
    for(let i=0; i<=max_num; i++){
        if(i<10){
            $('.mins-ctn').append('<span class="minute">0'+i+'</span>');
            $('.seconds-ctn').append('<span class="second">0'+i+'</span>');
        }else{
            $('.mins-ctn').append('<span class="minute">'+i+'</span>');
            $('.seconds-ctn').append('<span class="second">'+i+'</span>');
        }
    }
}

//show dropdown menu
$('#btn').click(function(e){
    e.preventDefault();
    $(this).parent().siblings().toggle()
})


//show or hide minute dropdown
$('#dropdown-mins').click(function(){
    $('.mins-ctn').toggle();

    $('.minute').click(function(){
        mins = $(this).text();
        $('#dropdown-mins').html(mins);
        $('.mins-ctn').hide();

        objOfDuration.minute_value = mins;
    })
})


//show or hide minute dropdown
$('#dropdown-seconds').click(function(){
    $('.seconds-ctn').toggle();

    $('.second').click(function(){
        seconds = $(this).text();
        $('#dropdown-seconds').html(seconds);
        $('.seconds-ctn').hide();

        objOfDuration.second_value = seconds;
    })
})


$('#dropdown-confirm').click(function(){
    duration = objOfDuration.minute_value + ':' + objOfDuration.second_value;

    if(!(objOfDuration.minute_value == "") || !(objOfDuration.second_value == "")){
        $('#show-btn-input').attr('placeholder',duration);
        $('#show-btn-input').attr('data-duration',duration);
        $('#show-btn-input').attr('value',duration);
        $('.dropdown-btn .error').empty();
    }else{
        $('.dropdown-btn .error').html('Please enter valid information')
        return false;
    }

    $('.dropdown-ctn').hide()
})