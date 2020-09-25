$(document).ready(() => {
  // request page

  // eslint-disable-next-line no-undef
  flatpickr('.r-start', {});
  // eslint-disable-next-line no-undef
  flatpickr('.r-end', {});

  // frontend validation dates -- also used in backend
  const verifyDates = (startDate, endDate) => {
    // eslint-disable-next-line no-undef
    if (moment(startDate).isBefore(endDate, 'day') && moment().isBefore(startDate, 'day')) {
      return true;
    } return false;
  };
  // request form

  const employeeId = $('#employee').attr('data-id');
  $('.request-form').submit((event) => {
    event.preventDefault();
    console.log('submit');
    const formData = $('.request-form').serializeArray().reduce((obj, item) => {
      obj[item.name] = item.value;
      return obj;
    }, {});
    if (!formData.startDate || !formData.endDate) {
      $('#response').text('Did you forget to enter in a date?');
      // alert('Did you forget to enter in a date?');
    } else if (!verifyDates(formData.startDate, formData.endDate)) {
      $('#response').text('Please enter valid dates that start after today.');
    } else {
      console.log(formData);
      $.ajax({
        type: 'POST',
        url: '/api/request',
        data: {
          id: employeeId,
          formData,
        },
        success() {
          window.location.reload();
        },
        error(response) {
          $('#response').text(`Error: Something went wrong! *${response.responseJSON.error}`);
        },
      });
    }
  });
});
