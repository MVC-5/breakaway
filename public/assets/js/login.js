$(document).ready(() => {
  // submit login form
  $('form').on('submit', (e) => {
    e.preventDefault();
    // if employee
    if ($('#employeeId').length) {
      console.log('empl');
      const id = $('#employeeId').val();
      window.location.href = `/request/${id}`;
      // if manager
    } else if ($('#managerId')) {
      const id = $('#managerId').val();
      window.location.href = `/manager/${id}`;
    }
  });
});
