var listArr = [
    "PUBBERBAND",
    "SERRINI",
    "MATT FORCE",
    "JAN CURIOUS & TOMBEATS",
    "LIFE WAS ALL SIENCE",
    "GIGI & SABRINA", 
    "RAIN IN TIME 及時雨", 
    "BUBBLEVIRUS",
    "逆流",
    "Testing Testing",
    "testing",
    "tteessttiinngg",
    "hello",
    "world",
    "olleh",
    "dlrow",
    "abcd",
    "grddg",
    "teisng"
];

var listItem = document.getElementById("listItem");

loopSongOrder();

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
  }

})

