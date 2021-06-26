$(document).ready(function(){
    $('.menu-ctn').click(function(){
        if(!($('.sidenav').hasClass('active'))){
          $('.sidenav').addClass('active');
          $('body').css('overflow','hidden');
          // $('#openSideBar').attr('src','img/close_menu.svg');
        }else{

          $('.sidenav').removeClass('active');
          $('body').css('overflow','auto');
          // $('#openSideBar').attr('src','img/menubar.svg');
        }
    })

    $('.toggle').click(function(){
      if(!($(this).hasClass('active'))){
        $(this).addClass('active')
      }else{
        $(this).removeClass('active')
      }
    })

    scrollFix()
    scrollFn()
    topFunction()
})

$(window).scroll(function(){
  scrollFix()
  scrollFn()
})

function scrollFix(){
   var nowScrollTop = $(window).scrollTop();
   if(nowScrollTop > 50){
     $('.slide-text marquee').addClass('fixBar');
   }else{
    $('.slide-text marquee').removeClass('fixBar');
   }
}

function scrollFn(){
    var nowScrollTop = $(window).scrollTop();
    if(nowScrollTop > 200){
      $('.float-btn-ctn button').css('display','block')
    }else{
      $('.float-btn-ctn button').css('display','none')
    }
}

function topFunction(){
  $('.float-btn-ctn button').click(function(){
    $(window).scrollTop(0);
  })
}


