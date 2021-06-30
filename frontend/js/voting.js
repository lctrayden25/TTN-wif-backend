$(document).ready(function(){

})

$('.song-info-ctn').click(function(){
    var data_img_id = $(this).attr('data-img-id');
    $('#artist-img'+data_img_id).fadeIn().siblings().hide().fadeOut(300);
});


$('.cover-info-ctn').click(function(){
    var data_img_id = $(this).attr('data-img-id');
    $('#cover-img'+data_img_id).fadeIn().siblings().hide().fadeOut(300);
});

//artist voting
// $('.info-ctn').click(function(){
//     $(this).addClass('selected').siblings().removeClass('selected');

//     $(this).children('.song-info').addClass('selected');
//     $(this).siblings().find('.song-info').removeClass('selected');

//     $('.voting-box input').attr('checked',true);
//     $(this).siblings().find('.voting-box input').attr('checked',false)

// });


//cover voting
// $('.left-ctn .info-ctn').click(function(){
//     $(this).addClass('selected').siblings().removeClass('selected');

//     $(this).children('.cover-info').addClass('selected');
//     $(this).siblings().find('.cover-info').removeClass('selected');

//     $('.cover-voting input').attr('checked',true);
//     $(this).siblings().find('.cover-voting input').attr('checked',false)
// })



$('#artist-vote').click(function(){
    var songInfo_artist = $('.song-info.selected h3').html();
    var songInfo_name = $('.song-info.selected span').html();

    var songInfo_obj = {
        'artist_name': songInfo_artist,
        'song_name': songInfo_name
    }

    console.log(songInfo_obj);
});


$('#cover-vote').click(function(){
    var coverInfo_cover = $('.cover-info.selected h3').html();
    var coverInfo_artist = $('.cover-info.selected span').html();

    var coverInfo_obj = {
        'cover_name': coverInfo_cover,
        'artist_name': coverInfo_artist
    }

    console.log(coverInfo_obj);
})





