$(document).ready(() => {
  // request page

  // eslint-disable-next-line no-undef
  flatpickr('.r-start', {});
  // eslint-disable-next-line no-undef
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
