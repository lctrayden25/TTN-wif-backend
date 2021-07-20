$(document).ready(function(){
    login_data = sessionStorage.getItem('user_data');
    to_loginObj = JSON.parse(login_data);

    if( 'user_data' in sessionStorage){
        $('.member-ctn .submit').empty().html('<button id="logout">Log Out</button>');
        $('.menu-login').empty().html('<button id="logout">Log Out</button>');
    }

    $('.submit #logout').click(function(){
        sessionStorage.removeItem('user_data');
        location.replace('index.html')
    })

    $('.toSubmit').click(function(){
        if(!('user_data' in sessionStorage)){
            $(this).attr('href','login.html')
        }else{
            // $(this).attr('href','artist-form.html');
            if(to_loginObj.isArtist == false){
                $(this).attr('href','artist-form.html');
            }else{
                $(this).attr('href','campaignSubmission.html')
            }
        }
    })

    $('.toVote').click(function(){
        if(!('user_data' in sessionStorage)){
            $(this).attr('href','login.html'); 
        }else{
            $(this).attr('href','voting.html'); 
        }
    })
})

var isLoading= false;

// POST XMLHttpRequest
window.postXHR=function(dataName, dataJson, fnSuccess, fnFail, fnRequestError, fnStatusError) {
    var request = new XMLHttpRequest();
    request.open("POST", "https://thistownneeds.online/Backend/voting_request.php");
    var data = new FormData();
    data.append(dataName, dataJson);
    request.onload = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var error;
                function temp() {
                    try {
                        return JSON.parse(request.responseText);
                    } catch (e) {
                        error = e;
                        return false;
                    }
                };
                result = temp();
                if (!result) {
                    console.warn('XHR: Request Failed (JSON Parse Exception) - [Request Key:' + dataName + ']');
                    console.warn(request.responseText);
                    if (fnFail !== undefined) fnFail('JSON Parse Exception', error);
                } else {
                    console.log(result);
                    if (result.result == 'success') {
                        console.log('XHR: Request Success - [Request Key:' + dataName + ']');
                        if (fnSuccess !== undefined) fnSuccess(result.result, result.data);
                    } else {
                        console.warn('XHR: Request Failed (Unsuccessful Result) - [Request Key:' + dataName + ']');
                        if (fnFail !== undefined) fnFail(result.result, result.data);
                    }
                }
            } else {
                console.warn('XHR: Request status error (' + request.status + ') - [Request Key:' + dataName + ']');
                if (fnStatusError !== undefined) fnStatusError(request.status);
            }
        } else {
            console.warn('XHR: Request ReadyState error (' + request.readyState + ') - [Request Key:' + dataName + ']');
            if (fnStatusError !== undefined) fnStatusError(request.readyState);
        }
    }
    request.onabort = function () {
        console.warn('XHR: internet connection failed - [Request Key:' + dataName + ']');
		if (fnRequestError !== undefined) fnRequestError();
	};
	request.onerror = function () {
        console.warn('XHR: internet connection failed - [Request Key:' + dataName + ']');
		if (fnRequestError !== undefined) fnRequestError();
	};
    request.send(data);
}



// get top slogan
function getTopSloganData(){
    postXHR(
      'get_all_data_by_data_type', 
      JSON.stringify({
          data_type: 'voting__top_slogan_data'
      }),
      function(result, data){ // success request
          console.log(result);
          topSlogan = data

          getTopSlogan();

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

function getTopSlogan(){
    var top_slogan_length = topSlogan.item_list.length;
  
    for(let i=0; i<top_slogan_length; i++){
        $('.slide-text marquee').html('<span>'+topSlogan.item_list[i].title+'</span>')
    }
  }

getTopSloganData()
