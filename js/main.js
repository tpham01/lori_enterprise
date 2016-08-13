

$('document').ready(function(){

  $(".request-quote-submit").click(function(){
    $(".request-quote-2").removeClass("hidden")
  });

  $(".submit-request-cta").click(function(){
    $(".request-quote-3").removeClass("hidden")
    $(".request-quote-2").addClass("hidden")
  });

  $(".contact-cta-mobile").click(function(){
    $(".contact-mobile-modal").removeClass("hidden")
  });

  $(".submit-another-request-cta").click(function(){
    $(".request-quote-2").removeClass("hidden")
    $(".request-quote-3").addClass("hidden")
  });

  $(".close-modal").click(function(){
    $(".overlay").addClass("hidden")
  });

  $(".trucker-modal-cta").click(function(){
    $(".overlay").removeClass("hidden");
    console.log("aha");
  });

  $('form').submit(false); 
  $('.mobile-push-menu-cta').click(function(){
    $(".push-navigation-wrapper").toggleClass("open");
    $(".mobile-push-menu__navigation").toggleClass("open");
    $(".close-push-navigation-cta").toggleClass("hidden");
  });
  $(".close-push-navigation-cta").click(function(){
    $(".push-navigation-wrapper").toggleClass("open");
    $(".mobile-push-menu__navigation").toggleClass("open");
    $(".close-push-navigation-cta").toggleClass("hidden");
  });
});


$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 400);
        return false;
      }
    }
  });
});