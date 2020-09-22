const breakBtn = $('#make-break');
const employeeId = $('#employeeId');

$(document).ready(() => {
  flatpickr('.r-start', {});
  flatpickr('.r-end', {});

  $('a.open-modal').click(function (event) {
    $(this).modal({
      fadeDuration: 250,
    });
    return false;
  });

  $('#modal-form').submit((event) => {
    const thisEmployee = employeeId.val();
    console.log(thisEmployee);
    employeeId.val('');
    $.modal.close();
    $.ajax({
      type: 'GET',
      url: '/api/login',
      data: { id: thisEmployee },
      success(response) {
        window.location.href = `/request/${thisEmployee}`;
      },
      error(response) {
        console.log(response.status, response.statusText);
      },
    });
    event.preventDefault();
  });

  $('.t-status').each(function () {
    console.log($(this).attr('data-status'));
    if ($(this).attr('data-status') === 'pending') {
      $(this).addClass('t-pending');
      $(this).text('Pending');
    } else if ($(this).attr('data-status') === false) {
      $(this).addClass('t-denied');
      $(this).text('Denied');
    } else {
      $(this).addClass('t-approved');
      $(this).text('Approved');
    }
  });
});
