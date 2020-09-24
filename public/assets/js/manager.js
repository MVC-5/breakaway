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
    let bank = parseInt($(this).attr('data-bank'), 10);
    const empId = $(this).attr('data-empId');
    const prevStatus = $(this).attr('data-prev-status');
    const duration = parseInt($(this).attr('data-duration'), 10);
    if (reqStatus === '1') {
      if (prevStatus !== 'Approved') {
        bank -= duration;
      }
    } else if (reqStatus === '0') {
      if (prevStatus === 'Approved') {
        bank += duration;
      }
    }
    updateRequest({
      reqId, reqStatus, bank, empId,
    });
  });
});
