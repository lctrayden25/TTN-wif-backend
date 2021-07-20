$(document).ready(function(){
    login_data = sessionStorage.getItem('user_data');
    to_loginObj = JSON.parse(login_data);
});
 

// Track song upload
var arrayOfFileUpload = [];
var file_upload = null;
var song_file_id = null;
function getBase64_songUpload(file, name) {
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
                file_upload = data;

                arrayOfFileUpload.push({
                    file_id: song_file_id,
                    song_data:file_upload
                })

                console.log(arrayOfFileUpload)
                
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

//song upload
$('#file-input1').change(function(event){
    song_file_id = event.target.id;
    var filename = event.target.value.split('\\')[event.target.value.split('\\').length - 1];
    
    var filesize = this.files[0].size/1024/1024;
    if(filesize > 15){
        $(this).parent().find('.file-remark').css('color','#ff0000')
        return false;
    }else{
        $(this).parent().find('.file-remark').css('color','#000')
    }

    if(filename == ""){

    }else{
        var file = this.files[0];
        $(this).parent().find('.song-name').html("<span style='font-size:16px'>"+filename+"</span><button class='delBtn'>Delete</button>");

        $('.delBtn').click(function(){
            $(this).parent().find('button,span').remove();
        })
        getBase64_songUpload(file, filename);
    }

})


// Track image upload
var arrayOfTrackImageUpload = [];
var track_file_id = null;
var track_cover_upload = null;
function getBase64_trackImageUpload(file, name) {
	var reader = new FileReader();
	reader.onload = function () {
        file64 = reader.result;
        file64_type = name.split('.').pop();

        var track_image_upload = {
            // file_name: null,
            upload_file_type: file64_type,
            upload_data: file64,
        }

        postXHR(
            'upload_track',

            JSON.stringify(
                track_image_upload
            ),
            function(result, data){ // success request
                console.log(result);
                // displayNews(data);

                console.log(data)
                track_cover_upload = data;

                arrayOfTrackImageUpload.push({
                    file_id: track_file_id,
                    image_file: track_cover_upload
                })

                console.log(arrayOfTrackImageUpload)
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

$('#trackImage-upload1').change(function(event){
    track_file_id = event.target.id;
    var filename = event.target.value.split('\\')[event.target.value.split('\\').length - 1];
    
    var filesize = this.files[0].size/1024/1024;
    if(filesize > 2){
        $('.file-remark').css('color','#ff0000')
        return false;
    }else{
        $('.file-remark').css('color','#000')
    }

    if(filename == ""){

    }else{
        var file = this.files[0];
        $(this).parent().find('.song-name').html("<span style='font-size:16px'>"+filename+"</span><button class='delBtn'>Delete</button>");

        $('.delBtn').click(function(){
            $(this).parent().find('button,span').remove();
        })

        getBase64_trackImageUpload(file, filename);
    }
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
var trackFormList = ["track-form1"]
$('#addMoreTrack').click(function(event){

    var form_clone = $('.form-template .form-wrapper').clone();

    form_clone.find('.required-field').css('border','1px solid #000');
    form_clone.find('.error, .song-name').html("");

    var formSection = 'track-form'+ index;
    form_clone.appendTo('.track-form-ctn');

    form_clone.attr('id',formSection);
    form_clone.find('#track').attr('id','track'+index).html('TRACK '+index);

    form_clone.find(".file-btn-ctn label").attr('for','file-input'+index)
    form_clone.find(".file-btn-ctn label.trackImageUpload-btn").attr('for','trackImage-upload'+index)

    form_clone.find('#trackName').attr('id','trackName'+index);
    form_clone.find('#releaseDate').attr('id','releaseDate'+index);
    form_clone.find('#trackDuration').attr('id','trackDuration'+index);
    form_clone.find('#trackGenre').attr('id','trackGenre'+index);
    form_clone.find('#contactPerson').attr('id','contactPerson'+index);
    form_clone.find('#personRole').attr('id','personRole'+index);
    form_clone.find('#trackPublisher').attr('id','trackPublisher'+index);
    form_clone.find('#featureArtist').attr('id','featureArtist'+index);
    form_clone.find('#composer').attr('id','composer'+index);
    form_clone.find('#composer-op').attr('id','composer-op'+index);
    form_clone.find('#composer-sp').attr('id','composer-sp'+index);
    form_clone.find('#lyricist').attr('id','lyricist'+index);
    form_clone.find('#lyricist-op').attr('id','lyricist-op'+index);
    form_clone.find('#lyricist-sp').attr('id','lyricist-sp'+index);
    form_clone.find('#arranger').attr('id','arranger'+index);
    form_clone.find('#producer').attr('id','producer'+index);
    form_clone.find('#recordEngineer').attr('id','recordEngineer'+index);
    form_clone.find('#mixEngineer').attr('id','mixEngineer'+index);
    form_clone.find('#masterEngineer').attr('id','masterEngineer'+index);
    form_clone.find('#lsrc').attr('id','lsrc'+index);
    form_clone.find('#track-streamLink').attr('id','track-streamLink'+index);
    form_clone.find('#appleSelected').attr('id','appleSelected'+index);
    form_clone.find('#spotifySelected').attr('id','spotifySelected'+index);
    form_clone.find('#file-input').attr('id','file-input'+index);
    form_clone.find('#trackImage-upload').attr('id','trackImage-upload'+index);

    trackFormList.push(formSection);

    form_clone.find('button').click(function(){
        $('#'+formSection).remove();
        var sectionIndex = trackFormList.indexOf(formSection);
        trackFormList.splice(sectionIndex,1);
    })

    $('#file-input'+index).change(function(event){
        song_file_id = event.target.id;

        var filename = event.target.value.split('\\')[event.target.value.split('\\').length - 1];
        if(filename == ""){
    
        }else{
            var file = this.files[0];
            $(this).parent().find('.song-name').html("<span style='font-size:16px'>"+filename+"</span><button class='delBtn'>Delete</button>");
            $('.delBtn').click(function(){
                $(this).parent().find('button,span').remove();
            })
    
            getBase64_songUpload(file, filename);
        }
    })


    $('#trackImage-upload'+index).change(function(event){
        track_file_id = event.target.id;

        var filename = event.target.value.split('\\')[event.target.value.split('\\').length - 1];
        if(filename == ""){
    
        }else{
            var file = this.files[0];
            $(this).parent().find('.song-name').html("<span style='font-size:16px'>"+filename+"</span><button class='delBtn'>Delete</button>");
            $('.delBtn').click(function(){
                $(this).parent().find('button,span').remove();
            })
            getBase64_trackImageUpload(file, filename);
        }
    })

    index++
})


// $('.submit-before').click(function(){
//     var required = $('.required-field').val();
//     if(required == ""){
//         $('.required-field').css('border','1px solid #ff0000');
//         $('.error').html("Please enter valid information");
//         return false;
//     }
// })

var global_array = null;
var form_index = 0;
$('.trackSub').click(function(){
   if(!isLoading){
        // var required = $('.required-field').val();
        // if(required == ""){
        //     $('.required-field').css('border','1px solid #ff0000');
        //     $('.error').html("Please enter valid information");
        // }

        var lengthOfForm = $('.trackForm .form-wrapper').length;
        var arrayOfInputObject = [];
        for(let index=1; index<=lengthOfForm; index++){
            var track_name = document.querySelector('#trackName'+index).value;
            var release_date = document.querySelector('#releaseDate'+index).value;
            var track_duration = document.querySelector('#trackDuration'+index).value;
            var track_genre = document.querySelector('#trackGenre'+index).value;
            var contact_person = document.querySelector('#contactPerson'+index).value;
            var person_role = document.querySelector('#personRole'+index).value;
            var track_publisher = document.querySelector('#trackPublisher'+index).value;
            var feature_artist = document.querySelector('#featureArtist'+index).value;
            var composer = document.querySelector('#composer'+index).value;
            var composer_op = document.querySelector('#composer-op'+index).value;
            var composer_sp = document.querySelector('#composer-sp'+index).value;
            var lyricist = document.querySelector('#lyricist'+index).value;
            var lyricist_op = document.querySelector('#lyricist-op'+index).value;
            var lyricist_sp = document.querySelector('#lyricist-sp'+index).value;
            var arranger = document.querySelector('#arranger'+index).value;
            var producer = document.querySelector('#producer'+index).value;
            var record_engineer = document.querySelector('#recordEngineer'+index).value;
            var mix_engineer = document.querySelector('#mixEngineer'+index).value;
            var master_engineer = document.querySelector('#masterEngineer'+index).value;
            var lsrc = document.querySelector('#lsrc'+index).value;
            // var song_upload = document.querySelector('#file-input'+index).value;
            // var track_stream_link = document.querySelector('#track-streamLink'+index).value;
            var appleSelected = document.querySelector('#appleSelected'+index).value;
            var spotifySelected = document.querySelector('#spotifySelected'+index).value;

            if($('#track-streamLink'+index).val() == "Apple Music"){
                track_streaming_link = appleSelected;
            }else{
                track_streaming_link = spotifySelected;
            }

            console.log(arrayOfTrackImageUpload)
            var song = arrayOfFileUpload.find(function(element){return element.file_id == 'file-input'+index})
            var image = arrayOfTrackImageUpload.find(function(element){return element.file_id == 'trackImage-upload'+index})

            arrayOfInputObject.push({
                auth_code: to_loginObj.auth_code,
                track_name: track_name,
                release_date: release_date,
                track_duration: track_duration,
                genre: track_genre,
                contact_person: contact_person,
                role_of_contact_person: person_role,
                track_publisher: track_publisher,
                featuring_artist: feature_artist,
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
                source_file_name: song.song_data,
                track_streaming_link: track_streaming_link,
                tracks_cover: image.image_file
            })
        }

        global_array = arrayOfInputObject;
        form_index = global_array.length -1;
        recursive(form_index);

        console.log(arrayOfInputObject);


        var track_form_obj = {
            'auth_code': to_loginObj.auth_code,
            'track_name': track_name,
            'release_date': release_date,
            'track_duration': track_duration,
            'genre': track_genre,
            'contact_person': contact_person,
            'role_of_contact_person': person_role,
            'track_publisher': track_publisher,
            'featuring_artist': feature_artist,
            'composer': composer,
            'lyricist': lyricist,
            'arranger': arranger,
            'producer': producer,
            'recording_engineer': record_engineer,
            'mixing_engineer': mix_engineer,
            'mastering_engineer': master_engineer,
            'lsrc': lsrc,
            'track_streaming_link': track_streaming_link,
            'souce_file_name': file_upload,

            'composer_op': composer_op,
            'composer_sp': composer_sp,
            'lyricist_op': lyricist_op,
            'lyricist_sp': lyricist_sp,
        }

        $('.trackSub').html('Submitted');
   }
})


function recursive(index){

    if(index < 0){
        return;
    }

    // console.log(global_array[index]);
    // console.log(global_array)
    // recursive(index -1);
    // console.log(global_array[index])

    postXHR(
        'new_track', 
        JSON.stringify(
            global_array[index]
        ),
        function(result, data){ // success request
            console.log(result);
            // displayNews(data);

            console.log(data)
            // track_form = data;
            recursive(index -1);
            // $('.trackSub').html('Submitted');
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


window.addEventListener('beforeunload',function(e){
    if(isLoading){
        e.preventDefault();
        e.returnValue = '';
    }
})