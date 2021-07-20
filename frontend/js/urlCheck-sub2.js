var x = $('.appleSelected').length;

var apple = document.querySelectorAll('input[type="url"].appleSelected');
for(let i=0; i<apple.length; i++){
  apple[i].addEventListener('keydown',function(){
    var oldVal = this.value;
    var field = this;

      
    setTimeout(function () {
        if(field.value.indexOf('https://music.apple.com/') !== 0) {
            field.value = oldVal;
        } 
    }, 1);
  })
}

var spotify = document.querySelectorAll('input[type="url"].spotifySelected')
for(let i=0; i<spotify.length; i++){
  spotify[i].addEventListener('keydown', function(){
    var oldVal = this.value;
    var field = this;

    setTimeout(function(){
      if(field.value.indexOf('https://open.spotify.com/track/') !== 0 || field.value.indexOf('https://open.spotify.com/album/') !== 0){
          field.value = oldVal;
      }
    })
  })
}