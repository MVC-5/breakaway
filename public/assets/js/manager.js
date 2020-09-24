$(document).ready(() => {
  function updateRequest(req, id) {
    $.ajax({
      method: 'PUT',
      url: `/api/manager/${id}`,
      data: req,
    })
      .then(() => {
        window.location.reload();
      });
  }

  $('.approveBtn').on('click', function (event) {
    event.stopPropagation();
    event.preventDefault();
    console.log($(this));
    const status = $(this).attr('data-status');
    const id = $(this).attr('data-id');
    const manId = $(this).attr('data-manId');
    const request = {
      id,
      status,
    };
    updateRequest(request, manId);

    // $(this).attr('data-status')
  });
});
