$(document).ready(() => {
  // homepage

  const employeeId = $('#employeeId');
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
});
