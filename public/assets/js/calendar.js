function makeCalendar(daysApproved) {
  const calTable = $('.cal-table');
  const calRow1 = $('<tr>', { id: 'cal-1', class: 'a' });
  const calRow2 = $('<tr>', { id: 'cal-2', class: 'a' });
  const calRow3 = $('<tr>', { id: 'cal-3', class: 'a' });
  const calRow4 = $('<tr>', { id: 'cal-4', class: 'a' });
  const calRow5 = $('<tr>', { id: 'cal-5', class: 'a' });

  let rowCount = 0;
  daysApproved.forEach((day) => {
    if (rowCount < 7) {
      calRow1.append(`<td class="cal-day t-${day.taken}">${moment(day.date, 'ddd-YYYY-MM-DD').format('DD')}</td>`);
    } else if (rowCount < 14) {
      calRow2.append(`<td class="cal-day t-${day.taken}">${moment(day.date, 'ddd-YYYY-MM-DD').format('DD')}</td>`);
    } else if (rowCount < 21) {
      calRow3.append(`<td class="cal-day t-${day.taken}">${moment(day.date, 'ddd-YYYY-MM-DD').format('DD')}</td>`);
    } else if (rowCount < 28) {
      calRow4.append(`<td class="cal-day t-${day.taken}">${moment(day.date, 'ddd-YYYY-MM-DD').format('DD')}</td>`);
    } else {
      calRow5.append(`<td class="cal-day t-${day.taken}">${moment(day.date, 'ddd-YYYY-MM-DD').format('DD')}</td>`);
    }

    // theCal.append(`<td class="cal-day d-${day.taken}">${moment(day.date).format('DD')}</td>`);
    rowCount += 1;
  });
  calTable.append(calRow1, calRow2, calRow3, calRow4, calRow5);
  // console.log(theCal);
}

$(document).ready(() => {
  if (!$('.aRequest').length) {
    $('.aHead').remove();
  }

  if (!$('.bRequest').length) {
    $('.bHead').remove();
  }

  function showCalendar(req) {
    const location = window.location.href;
    if (location.includes('manager')) {
      const currentMan = location.slice(location.lastIndexOf('/') + 1);
      $.ajax({
        method: 'GET',
        url: `/api/approvedrequests/${currentMan}`,
        data: req,
      })
        .then((days) => {
          console.log(days);
          makeCalendar(days);
        });
    } else {
      const currentEmp = location.slice(location.lastIndexOf('/') + 1);
      $.ajax({
        method: 'GET',
        url: `/api/approvedrequests/emp/${currentEmp}`,
        data: req,
      })
        .then((days) => {
          makeCalendar(days);
        });
    }
  }

  showCalendar();
});
