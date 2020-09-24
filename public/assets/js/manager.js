$(document).ready(() => {
  function updateRequest(req) {
    $.ajax({
      method: 'PUT',
      url: '/api/manager',
      data: req,
    })
      .then(() => {
        window.location.href = '/manager/:id';
      });
  }

  $('.approveBtn').on('click', function (event) {
    event.stopPropagation();
    event.preventDefault();
    console.log($(this));
    console.log($(this).attr('data-status'));
    const request = {

    };

    // $(this).attr('data-status')
  });
});
