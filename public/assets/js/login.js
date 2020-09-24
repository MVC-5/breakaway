$(document).ready(() => {
  $('form').on('submit', (e) => {
    e.preventDefault();
    if ($('#employeeId').length) {
      console.log('empl');
      const id = $('#employeeId').val();
      window.location.href = `/request/${id}`;
    } else if ($('#managerId')) {
      const id = $('#managerId').val();
      window.location.href = `/manager/${id}`;
    }
  });
});
