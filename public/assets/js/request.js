$(document).ready(() => {
  // request page

  flatpickr('.r-start', {});
  flatpickr('.r-end', {});

  // request form

  const employeeId = $('#employee').attr('data-id');
  console.log(employeeId);
  $('.request-form').submit((event) => {
    event.preventDefault();

    console.log('submit');
    const formData = $('.request-form').serializeArray().reduce((obj, item) => {
      obj[item.name] = item.value;
      return obj;
    }, {});
    if (!formData.startDate || !formData.endDate) {
      alert('Did you forget to enter in a date?');
    } else {
      $.ajax({
        type: 'POST',
        url: '/api/request',
        data: {
          id: employeeId,
          formData,
        },
        success(response) {
          window.location.reload();
        },
        error(response) {
          console.log(response.status, response.responseJSON.error);
        },
      });
    }
  });

  // show upcoming request status
  $('.t-status').each(function () {
    console.log($(this).attr('data-status'));
    if ($(this).attr('data-status') === 'pending') {
      $(this).addClass('t-pending');
      $(this).text('Pending');
    } else if ($(this).attr('data-status') === 'false') {
      $(this).addClass('t-denied');
      $(this).text('Denied');
    } else {
      $(this).addClass('t-approved');
      $(this).text('Approved');
    }
  });
});

function formatDate() {
  const d = new Date();
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) { month = `0${month}`; }
  if (day.length < 2) { day = `0${day}`; }

  return [year, month, day].join('-');
}

console.log(formatDate());
