$(document).ready(function() {
  $('.new-tweet').on('keyup', '#compose textarea', function() {
    const charactersTyped = $(this).val().length;
    const charactersLeft = 140 - charactersTyped;
    $(this).siblings('span').find('.counter').html(charactersLeft);
    if (charactersLeft < 0) {
      $("#textcounter").css({"color": "red"});
    } else {
      $("#textcounter").css({"color": "black"});
    }
  });
});

