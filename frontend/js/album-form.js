$(document).ready(function(){
    login_data = sessionStorage.getItem('user_data');
    to_loginObj = JSON.parse(login_data);
});



$('#coverUpload').change(function(event){
    // var filename = e.target.files[0].name;
    // $('.cover-name').html("<span style='font-size:16px'>"+filename+"</span><button class='delBtn'>Delete</button>");

    // $('.delBtn').click(function(){
    //     $(this).parent().find('button,span').remove();
    // })

    var filename = event.target.value.split('\\')[event.target.value.split('\\').length - 1];
    if(filename == ""){

    }else{
        var file = this.files[0];
        $('.cover-name').html("<span style='font-size:16px'>"+filename+"</span><button class='delBtn'>Delete</button>");

        $('.delBtn').click(function(){
            $(this).parent().find('button,span').remove();
        })

        getBase64_cover(file, filename);
    }
})

var cover_file = null;
function getBase64_cover(file, name) {
	var reader = new FileReader();
	reader.onload = function () {
        file64 = reader.result;
        file64_type = name.split('.').pop();

        var cover_upload = {
            // file_name: null,
            upload_file_type: file64_type,
            upload_data: file64,
        }

        postXHR(
            'upload_track',

            JSON.stringify(
                cover_upload
            ),
            function(result, data){ // success request
                console.log(result);
                // displayNews(data);

                console.log(data)
                cover_file = data;
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



$('#file-input1').change(function(event){
    // var filename = e.target.files[0].name;
    // $(this).parent().find('.song-name').html("<span style='font-size:16px'>"+filename+"</span><button class='delBtn'>Delete</button>");

    // $('.delBtn').click(function(){
    //     $(this).parent().find('button,span').remove();
    // })
    var filename = event.target.value.split('\\')[event.target.value.split('\\').length - 1];
    if(filename == ""){

    }else{
        var file = this.files[0];
        $(this).parent().find('.song-name').html("<span style='font-size:16px'>"+filename+"</span><button class='delBtn'>Delete</button>");

        $('.delBtn').click(function(){
            $(this).parent().find('button,span').remove();
        })

        getBase64_song(file, filename);
    }
})

var song_file = null;
function getBase64_song(file, name) {
	var reader = new FileReader();
	reader.onload = function () {
        file64 = reader.result;
        file64_type = name.split('.').pop();

        var song_upload = {
            // file_name: null,
            upload_file_type: file64_type,
            upload_data: file64,
            
        }

        postXHR(
            'upload_track',

            JSON.stringify(
                song_upload
            ),
            function(result, data){ // success request
                console.log(result);
                // displayNews(data);

                console.log(data)
                song_file = data;
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

    $('#file-input'+index).change(function(event){
        // var filename = this.files[0].name;
        // $(this).parent().find('.song-name').html("<span style='font-size:16px'>"+filename+"</span><button class='delBtn'>Delete</button>");
    
        // $('.delBtn').click(function(){
        //     $(this).parent().find('button,span').remove();
        // })
        var filename = event.target.value.split('\\')[event.target.value.split('\\').length - 1];

        if(filename == ""){
    
        }else{
            var file = this.files[0];
            $(this).parent().find('.song-name').html("<span style='font-size:16px'>"+filename+"</span><button class='delBtn'>Delete</button>");
    
            $('.delBtn').click(function(){
                $(this).parent().find('button,span').remove();
            })
    
            getBase64_song(file, filename);
        }
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
        var arrayOfInputObject = null;

        var album_name = document.querySelector('#albumName').value;
        var release_date = document.querySelector('#releaseDate').value;
        var album_genre = document.querySelector('#albumGenre').value;
        var album_publisher = document.querySelector('#albumPublisher').value;
        var stream_link = document.querySelector('#streamLink').value;
        var appleMusic = document.querySelector('#appleMusic').value;
        var spotifyMusic = document.querySelector('#spotifyMusic').value;
        var album_exProducer = document.querySelector('#albumExProducer').value;
        var cover_upload = document.querySelector('#coverUpload').value;

        if(stream_link == "Apple Music"){
            stream_link = appleMusic
        }else{
            stream_link = spotifyMusic
        }

        arrayOfInputObject = {
            auth_code:to_loginObj.auth_code,
            album_name: album_name,
            release_date: release_date,
            genre: album_genre,
            album_publisher: album_publisher,
            album_streaming_link: stream_link,
            album_exceutive_producer: album_exProducer,
            // appleMusic: appleMusic,
            // spotifyMusic: spotifyMusic,
            album_cover_img_url: cover_file,

            track_list:[]
        };

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
            var track_streaming_link = document.querySelector('trackStreamLink'+i);
            var appleSelected = document.querySelector('#appleSelected'+i).value;
            var spotifySelected = document.querySelector('#spotifySelected'+i).value;
            var song_upload = document.querySelector('#file-input'+i).value;

            if($('#trackStreamLink'+i) == "Apple Music"){
                track_streaming_link = appleSelected;
            }else{
                track_streaming_link = spotifyMusic;
            }

            arrayOfInputObject.track_list.push({
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
                recording_engineer: record_engineer,
                mixing_engineer: mix_engineer,
                mastering_engineer: master_engineer,
                lsrc: lsrc,
                track_streaming_link: track_streaming_link,
                appleSelected: appleSelected,
                spotifySelected: spotifySelected,
                song_upload: song_file
            })

        }
        console.log(arrayOfInputObject)

        
        var album_streaming_link;
        if($('#streamLink').val() == "Apple Music"){
            album_streaming_link = appleMusic
        }else{
            album_streaming_link = spotifyMusic;
        }

        // var album_form_obj = {
        //     'auth_code':"",
        //     'album_name': album_name,
        //     'release_date': release_date,
        //     'genre': album_genre,
        //     'album_publisher': album_publisher,
        //     'album_exceutive_producer': album_exProducer,
        //     'album_cover_img_url': cover_upload,
        //     'album_streaming_link': album_streaming_link,            
        // }

        postXHR(
            'new_album', 
            JSON.stringify(
                arrayOfInputObject
            ),
            function(result, data){ // success request
                console.log(result);
                // displayNews(data);

                console.log(data)
                album_form = data;


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
});

window.addEventListener('beforeunload',function(e){
    e.preventDefault();
    e.returnValue = '';
});





