var input = document.querySelectorAll('.input-wrapper input[type="url"]');
input[0].addEventListener("keydown", function() {
  var oldVal = this.value;
//   console.log(oldVal);
  var field = this;
//   console.log("funciona");
  
  setTimeout(function () {
    if(field.value.indexOf('https://www.facebook.com/') !== 0) {
        field.value = oldVal;
    } 
}, 1);
});

input[1].addEventListener("keydown", function() {
    var oldVal = this.value;
  //   console.log(oldVal);
    var field = this;
  //   console.log("funciona");
    
    setTimeout(function () {
      if(field.value.indexOf('https://www.instagram.com/') !== 0) {
          field.value = oldVal;
      } 
  }, 1);
});

input[2].addEventListener("keydown", function() {
    var oldVal = this.value;
  //   console.log(oldVal);
    var field = this;
  //   console.log("funciona");
    
    setTimeout(function () {
      if(field.value.indexOf('https://www.youtube.com/user/') !== 0) {
          field.value = oldVal;
      } 
  }, 1);
});
