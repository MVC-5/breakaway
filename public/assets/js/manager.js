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
    const start = $(this).attr('data-start');
    const end = $(this).attr('data-end');
    const email = $(this).attr('data-email');
    if (duration > bank) {
      alert("Request cannot be approved since the employee's PTO bank contains less than the number of requested days.");
    } else {
      if (reqStatus === '1') {
        if (prevStatus !== 'approved') {
          bank -= duration;
        }
      } else if (reqStatus === '0') {
        if (prevStatus === 'approved') {
          bank += duration;
        }
      }
      updateRequest({
        reqId, reqStatus, bank, empId, email, start, end,
      });
    }
  });
});
