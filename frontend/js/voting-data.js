var artist = [];
var artist_img = [];
var index = 0;
var cover = [];
var img_url = 'https://thistownneeds.online/Media/';


function getData(){
    postXHR(
        'get_campaign_by_filter',

        JSON.stringify({
            "filter_page":0,"filter_limit":3
        }),
        function(result, data){ // success request
            console.log(result);
            campaign_data = data

            console.log(campaign_data)

            getList()
    
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


function getList(){

    var list_length =  campaign_data.item_list.length;

    for(let i=0; i<list_length; i++){

        var list_ctn_clone = $('.template .list-ctn').clone();
        list_ctn_clone.appendTo('.container');
        $('.container #campaign').attr('id','campaign'+i)
        $('.container #campaign'+i+' #voting-btn').attr('id','voting-btn'+i)

        // show campaign name
        $('#campaign'+i+' .big-title h1').html(campaign_data.item_list[i].campaign_name);


        // check how many option_data inside item_list
        var option_data_length = campaign_data.item_list[i].option_data.length;
        for(let j=0; j<option_data_length; j++){
            

            //clone .info-ctn
            var info_ctn_clone = $('.template .info-ctn').clone();
            info_ctn_clone.appendTo('#campaign'+i+' .item-list');
            info_ctn_clone.attr('data-info-id',''+i+j)
            info_ctn_clone.attr('id','info-ctn-'+i+j)


            //clone artist image
            var artist_img = $('.template #artist-img').clone();
            artist_img.appendTo('#campaign'+i+' .artist-img');
            artist_img.attr('id','artist-img-'+i+j);


            var album_img_src = campaign_data.item_list[i].option_data[j].album_cover_img_url;
            var track_img_src = campaign_data.item_list[i].option_data[j].artist_photo;

            // voting album
            if(campaign_data.item_list[i].is_voting_album == true){
                $('#campaign'+i+' #info-ctn-'+i+j+' .song-info h3').html('《'+campaign_data.item_list[i].option_data[j].album_name+'》');
                $('#campaign'+i+' #info-ctn-'+i+j+' .song-info span').html(campaign_data.item_list[i].option_data[j].artist_name);
                $('#campaign'+i+' #artist-img-'+i+j).attr('src',img_url+album_img_src)
            }


            //voting track
            if(campaign_data.item_list[i].is_voting_album == false){
                $('#campaign'+i+' #info-ctn-'+i+j+' .song-info h3').html(campaign_data.item_list[i].option_data[j].artist_name);
                $('#campaign'+i+' #info-ctn-'+i+j+' .song-info span').html('《'+campaign_data.item_list[i].option_data[j].track_name+'》');
                $('#campaign'+i+' #artist-img-'+i+j).attr('src',img_url+track_img_src)
            }
        

            //Show image when click
            $('#campaign'+i+' .info-ctn').click(function(){
                var info_data_id = $(this).attr('data-info-id');
                $('#artist-img-'+info_data_id).fadeIn();
                $('#artist-img-'+info_data_id).siblings().hide();
            })
        }

        $('#campaign'+i+' img:not(:first)').hide();


        //Check the voting box
        $('#campaign'+i+' .info-ctn').click(function(){
            $(this).addClass('selected')
            $(this).siblings().removeClass('selected');
            $(this).find('input').attr('checked',true);
            $(this).siblings().find('input').attr('checked',false);
        })
    }

}

getData()