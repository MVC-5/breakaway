$(document).ready(() => {
// modal form
  const form = $('#new-post');
  form.append('<div id="call-res"></div>');
  form.submit(() => {
    // adds loader
    $('#call-res').html('<img id="loader"/>');
    $('#loader').attr('src', './assets/img/45.gif');
  });
});
