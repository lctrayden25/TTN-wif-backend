$('.song-info-ctn').click(function(){
    var data_img_id = $(this).attr('data-img-id');
    $('#artist-img'+data_img_id).fadeIn().siblings().hide().fadeOut(300);
})

$('.cover-info-ctn').click(function(){
    var data_img_id = $(this).attr('data-img-id');
    $('#cover-img'+data_img_id).fadeIn().siblings().hide().fadeOut(300);
})

$('.info-ctn').click(function(){
    $(this).addClass('selected').siblings().removeClass('selected');

    $(this).children('.voting-box').addClass('selected');
    $(this).siblings().find('.voting-box').removeClass('selected')

})
