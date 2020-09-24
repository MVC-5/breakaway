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
        window.location.href = '/request';
      },
      error(response) {
        console.log(response.status, response.statusText);
      },
    });
    event.preventDefault();
  });
});

// Case code for available/booked days calendar
var daysAlreadyBooked = [
	'2020-09-22',
	'2020-09-23',
	'2020-09-28',
	'2020-11-15',
	'2020-10-05',
]

// this loop creates a day
function displayDays(startDay, howManyDays){
	for (let i = startDay; i < howManyDays; i++) {
		let day = moment()
		console.log(day.add(i, 'days').format('YYYY-MM-DD'));
		dayBooked = false
		//check the newly created against all days booked already
		for (let j = 0; j < daysAlreadyBooked.length; j++) {
			if (day.format('YYYY-MM-DD') == daysAlreadyBooked[j]){
				dayBooked = true
			}
		}
		if(dayBooked){
			var newDay = document.createElement('div')
			newDay.setAttribute('class', 'days')
			newDay.style.backgroundColor = 'var(--accent-color)'
			newDay.innerText = day.format('DD')
			document.querySelector('#calendar').appendChild(newDay)
		} else {
			var newDay = document.createElement('div')
			newDay.setAttribute('class', 'days available')
			newDay.style.backgroundColor = 'var(--primary-color)'
			newDay.innerText = day.format('DD')
			document.querySelector('#calendar').appendChild(newDay)
		}
	}
}
displayDays(0, 20)
var availableDays = document.querySelectorAll('.available')
console.log(availableDays);
