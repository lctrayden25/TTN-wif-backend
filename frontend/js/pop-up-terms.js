// var modal = document.getElementById('myModal');
// var closeModal =  document.getElementById('close');
// var openModal = document.getElementById('openModal');

// openModal.onclick = function(){
//     var required = $('.required-field').val();
//     var lengthOfForm = $('.trackForm .form-wrapper').length;

//     if(required == ""){
//         $('.required-field').css('border','1px solid #ff0000');
//         $('.error').html("Please enter valid information");
//         return false;
//     }else{
//         modal.style.display = 'block'
//     }

//     if(lengthOfForm < 7){
//         this.parent().find('.error').html('Album submission at lease 7 tracks or more')
//     }
// };



// closeModal.onclick = function(){
//     modal.style.display = "none";
// }

$('#openModal').click(function(){
        var required = $('.required-field').val();
        if(required == ""){
            $('.required-field').css('border','1px solid #ff0000');
            $('.error').html("Please enter valid information");
            return false;
        }else{
            $('#myModal').css('display','block');
            $(this).hide();
            $('.trackSub').show();
            $('.albumSub').show();
        }
})

$('#close').click(function(){
    $('#myModal').css('display','none')
})

