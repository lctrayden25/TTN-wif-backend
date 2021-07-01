var artist = [];
var artist_img = [];
var index = 0;
var cover = [];



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

            list()
    
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


function list(){

    var list_length =  campaign_data.item_list.length;

    for(let i=0; i<list_length; i++){

        var list_ctn_clone = $('.template .list-ctn').clone();
        list_ctn_clone.appendTo('.container');
        $('.container #campaign').attr('id','campaign'+i)
        $('.container #campaign'+i+' #voting-btn').attr('id','voting-btn'+i)

        $('#campaign'+i+' .big-title h1').html(campaign_data.item_list[i].campaign_name);

        var item_list_length = campaign_data.item_list[i].option_list.length;

        for(let j=0; j<item_list_length; j++){
            
            //clone .info-ctn
            var info_ctn_clone = $('.template .info-ctn').clone();
            info_ctn_clone.appendTo('#campaign'+i+' .item-list');
            info_ctn_clone.attr('data-info-id',''+i+j)

            //clone artist image
            var artist_img = $('.template #artist-img').clone();
            artist_img.appendTo('#campaign'+i+' .artist-img');
            artist_img.attr('id','artist-img-'+i+j);


            //check if voting album, default false
            if(campaign_data.item_list[i].is_voting_album == false){
                $('#campaign'+i+' .song-info h3').html(campaign_data.item_list[i].option_data[j].artist_name);
            }else{
                $('#campaign'+i+' .song-info span').html(campaign_data.item_list[i].option_data[j].artist_name);
            }
            
            //Show image when click
            $('#campaign'+i+' .info-ctn').click(function(){
                var info_data_id = $(this).attr('data-info-id');
                $('#artist-img-'+info_data_id).fadeIn().siblings().hide();
            })
        }

        $('#campaign'+i+' img:not(:first)').hide();
        $('#campaign'+i+' .song-info span').html("Hello Word")


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