$(document).ready(() => {
  function updateRequest(req) {
    $.ajax({
      method: 'PUT',
      url: '/api/manager/update',
      data: req,
    })
      .then(() => {
        window.location.reload();
      });
  }

  $('.man-decision-btn').on('click', function (event) {
    event.stopPropagation();
    event.preventDefault();
    console.log($(this));
    const reqStatus = $(this).attr('data-status');
    const reqId = $(this).attr('data-id');
    updateRequest({ reqId, reqStatus });
    // $(this).attr('data-status')
  });
});
