var listArr = [];
var listItem = document.getElementById("listItem");


// loopSongOrder();
function loopSongOrder(){
  shuffle();
  setInterval(function(){
    shuffle();
  },5000);
}

function shuffle() {
    var currentIndex = listArr.length,  randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [listArr[currentIndex], listArr[randomIndex]] = [listArr[randomIndex], listArr[currentIndex]];
    }
  
    RenderSongName();
}

function RenderSongName(){
      var list_ctn = document.getElementById('listItem');
      list_ctn.innerHTML = "";
      var itemDiv = document.createElement("div");
      itemDiv.setAttribute("class","item-div");
      list_ctn.append(itemDiv);

      var maxItem = 10

      for(let i=0; i<maxItem; i++){
          var list = listArr[i];

          var item = document.createElement("span");
          item.setAttribute("class","listItem");

          if(i >= (maxItem-1)){
            item.textContent = list;
          }else{
            item.textContent = list + " / ";
          }

          itemDiv.append(item);
      }
}


$('.vote-link .submit-form').click(function(){

    var user_data = sessionStorage.getItem('user_data');
    var user_data_obj = JSON.parse(user_data);


    if(sessionStorage.length == 0){
        $('a').attr("href","login.html")
    }else{
        
        if( 'user_data' in sessionStorage){
            $('.member-ctn .submit').empty();

            if(user_data_obj.is_artist == false){
              location.replace('artist-form.html')
            }else{
              location.replace('campaignSubmission.html')
            }
        }
        // location.replace('artist-form.html')
    }
})

$('.vote-link .voting-form').click(function(){
    if(sessionStorage.length == 0){
        $('a').attr("href","login.html");
    }else{
        $('a').attr("href","voting.html");
    }
})



function getSongListData(){
    postXHR(
      'get_all_data_by_data_type', 
      JSON.stringify({
          data_type: 'voting_slogan_data'
      }),
      function(result, data){ // success request
          console.log(result);
          // displayNews(data);

          // if(data === undefined || data === null || data == "" || data.length<1){
          //     window.location.href="index.html"
          // }else{
          //     job_desc = data;
          //     console.log(data)
          //     getJobDesc();
          // }
          songlist = data
          getSongList()
          loopSongOrder();

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


function getSongList(){
    var list_length = songlist.item_list.length;

    for(let i=0; i<list_length; i++){
        listArr.push(songlist.item_list[i].title)
    }
}


getSongListData()

