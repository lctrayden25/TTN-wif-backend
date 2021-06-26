$(document).ready(function(){
});

$('#coverUpload').change(function(e){
    var filename = e.target.files[0].name;
    $('.cover-name').html("<span style='font-size:16px'>"+filename+"</span><button class='delBtn'>Delete</button>");

    $('.delBtn').click(function(){
        $(this).parent().find('button,span').remove();
    })
})

$('#file-input1').change(function(e){
    var filename = e.target.files[0].name;
    $(this).parent().find('.song-name').html("<span style='font-size:16px'>"+filename+"</span><button class='delBtn'>Delete</button>");

    $('.delBtn').click(function(){
        $(this).parent().find('button,span').remove();
    })
})


$('.required-field').blur(function(){
    if($(this).val() == "" || $(this).val() == "https://music.spotify.com/" || $(this).val() == "https://music.apple.com/"){
        $(this).parent().find('input').css('border','1px solid #ff0000');
        $(this).parent().find('.error').html("Please enter valid information")
    }else{
        $(this).parent().find('input').css('border','1px solid #000');
        $(this).parent().find('.error').empty();
    }
})


var index = 2;
var formList = ["inner-form-wrapper1"];
$('#addMoreAlbum').click(function(){
    var clone_form = $('.form-template .inner-form-wrapper').clone();

    clone_form.find('.required-field').css('border','1px solid #000');
    clone_form.find('.error, .song-name').html("");


    var formSection = 'inner-form-wrapper'+ index;
    clone_form.appendTo('.form-wrapper');

    clone_form.attr('id',formSection);
    clone_form.find('#track').attr('id','track'+index).html('TRACK '+index+' OF ALBUM');

    clone_form.find(".file-btn-ctn label").attr('for','file-input'+index)

    clone_form.find('#trackName').attr('id','trackName'+index);
    clone_form.find('#trackDuration').attr('id','trackDuration'+index);
    clone_form.find('#featureArtist').attr('id','featureArtist'+index);
    clone_form.find('#composer').attr('id','composer'+index);
    clone_form.find('#composer-op').attr('id','composer-op'+index);
    clone_form.find('#composer-sp').attr('id','composer-sp'+index);
    clone_form.find('#lyricist').attr('id','lyricist'+index);
    clone_form.find('#lyricist-op').attr('id','lyricist-op'+index);
    clone_form.find('#lyricist-sp').attr('id','lyricist-sp'+index);
    clone_form.find('#arranger').attr('id','arranger'+index);
    clone_form.find('#producer').attr('id','producer'+index);
    clone_form.find('#recordEngineer').attr('id','recordEngineer'+index);
    clone_form.find('#mixEngineer').attr('id','mixEngineer'+index);
    clone_form.find('#masterEngineer').attr('id','masterEngineer'+index);
    clone_form.find('#lsrc').attr('id','lsrc'+index);
    clone_form.find('#streamLink').attr('id','streamLink'+index);
    clone_form.find('#appleSelected').attr('id','appleSelected'+index);
    clone_form.find('#spotifySelected').attr('id','spotifySelected'+index);
    clone_form.find('#file-input').attr('id','file-input'+index);

    formList.push(formSection);

    clone_form.find('button').click(function(){
        $('#'+formSection).remove();
        var sectionIndex = formList.indexOf(formSection);
        formList.splice(sectionIndex,1)
    })

    $('#file-input'+index).change(function(){
        var filename = this.files[0].name;
        $(this).parent().find('.song-name').html("<span style='font-size:16px'>"+filename+"</span><button class='delBtn'>Delete</button>");
    
        $('.delBtn').click(function(){
            $(this).parent().find('button,span').remove();
        })
    })
    
    console.log(formList)

    index++;
})


$('.albumSub').click(function(){
    if(!isLoading){
        
        var required = $('.required-field').val();
        if(required == ""){
            $('.required-field').css('border','1px solid #ff4d00');
            $('.error').html("Please enter valid information");
            return false;
        }


        var lengthOfForm = $('.albumForm .inner-form-wrapper').length;
        var arrayOfInputObject = [];

        var album_name = document.querySelector('#albumName').value;
        var release_date = document.querySelector('#releaseDate').value;
        var album_genre = document.querySelector('#albumGenre').value;
        var album_publisher = document.querySelector('#albumPublisher').value;
        var stream_link = document.querySelector('#streamLink').value;
        var appleMusic = document.querySelector('#appleMusic').value;
        var spotifyMusic = document.querySelector('#spotifyMusic').value;
        var album_exProducer = document.querySelector('#albumExProducer').value;
        var cover_upload = document.querySelector('#coverUpload').value;
        arrayOfInputObject.push({
            album_name: album_name,
            release_date: release_date,
            album_genre: album_genre,
            album_publisher: album_publisher,
            stream_link: stream_link,
            appleMusic: appleMusic,
            spotifyMusic: spotifyMusic,
            album_exProducer: album_exProducer,
            cover_upload: cover_upload
        });

        for(let i=1; i<=lengthOfForm; i++){

            var track_name = document.querySelector('#trackName'+i).value;
            var track_duration = document.querySelector('#trackDuration'+i).value;
            var featuring_artist = document.querySelector('#featureArtist'+i).value;
            var composer = document.querySelector('#composer'+i).value;
            var composer_op = document.querySelector('#composer-op'+i).value;
            var composer_sp = document.querySelector('#composer-sp'+i).value;
            var lyricist = document.querySelector('#lyricist'+i).value;
            var lyricist_op = document.querySelector('#lyricist-op'+i).value;
            var lyricist_sp= document.querySelector('#lyricist-sp'+i).value;
            var arranger = document.querySelector('#arranger'+i).value;
            var producer = document.querySelector('#producer'+i).value;
            var record_engineer = document.querySelector('#recordEngineer'+i).value;
            var mix_engineer = document.querySelector('#mixEngineer'+i).value;
            var master_engineer = document.querySelector('#masterEngineer'+i).value;
            var lsrc = document.querySelector('#lsrc'+i).value;
            var appleSelected = document.querySelector('#appleSelected'+i).value;
            var spotifySelected = document.querySelector('#spotifySelected'+i).value;
            var song_upload = document.querySelector('#file-input'+i).value;

            arrayOfInputObject.push({
                track_name: track_name,
                track_duration: track_duration,
                featuring_artist: featuring_artist,
                composer: composer,
                composer_op: composer_op,
                composer_sp: composer_sp,
                lyricist: lyricist,
                lyricist_op: lyricist_op,
                lyricist_sp: lyricist_sp,
                arranger: arranger,
                producer: producer,
                record_engineer: record_engineer,
                mix_engineer: mix_engineer,
                master_engineer: master_engineer,
                lsrc: lsrc,
                appleSelected: appleSelected,
                spotifySelected: spotifySelected,
                song_upload: song_upload
            })
        }
        console.log(arrayOfInputObject)

        
        var album_streaming_link;
        if($('#streamLink').val() == "Apple Music"){
            album_streaming_link = appleMusic
        }else{
            album_streaming_link = spotifyMusic;
        }

        var album_form_obj = {
            'artist_id': '',
            'album_name': album_name,
            'release_date': release_date,
            'genre': album_genre,
            'album_publisher': album_publisher,
            'album_exceutive_producer': album_exProducer,
            'album_cover_img_url': cover_upload,
            'album_streaming_link': album_streaming_link,            
        }
    }
});

window.addEventListener('beforeunload',function(e){
    e.preventDefault();
    e.returnValue = '';
});





