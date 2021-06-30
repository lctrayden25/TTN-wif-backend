$('.song-info-ctn').click(function(){
    var data_img_id = $(this).attr('data-img-id');
    $('#artist-img'+data_img_id).fadeIn().siblings().hide().fadeOut(300);
});


$('.cover-info-ctn').click(function(){
    var data_img_id = $(this).attr('data-img-id');
    $('#cover-img'+data_img_id).fadeIn().siblings().hide().fadeOut(300);
});


// $('.info-ctn').click(function(){
//     $(this).addClass('selected').siblings().removeClass('selected');

//     $(this).children('.voting-box, .song-info, .cover-info').addClass('selected');
//     $(this).siblings().find('.voting-box, .song-info, .cover-info').removeClass('selected');
// });


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





