// This loop creates a day
function displayDays(startDay, howManyDays, approvedDays){
	for (let i = startDay; i < howManyDays; i++) {
		let day = moment()
		console.log(day.add(i, 'days').format('YYYY-MM-DD'));
		dayBooked = false
		//Check the newly created against all days booked already
		for (let j = 0; j < approvedDays.length; j++) {
			if (day.format('YYYY-MM-DD') == approvedDays[j]){
				dayBooked = true
			}
		}
		if(dayBooked){
			var newDay = document.createElement('div')
			newDay.setAttribute('class', 'days')
			newDay.style.backgroundColor = 'var(--accent-color)'
			newDay.innerText = day.format('MM/DD')
			document.querySelector('#calendar').appendChild(newDay)
		} else {
			var newDay = document.createElement('div')
			newDay.setAttribute('class', 'days available')
			newDay.style.backgroundColor = 'var(--primary-color)'
			newDay.innerText = day.format('MM/DD')
			document.querySelector('#calendar').appendChild(newDay)
		}
	}
}

var availableDays = document.querySelectorAll('.available')
console.log(availableDays);


$(document).ready(() => {
    function showCalendar(req) {
        $.ajax({
          method: 'GET',
          url: '/api/approvedrequests/2',
          data: req,
        })
          .then((days) => {
            console.log(days);
			displayDays(0,30, days)
          });
    };
    
    showCalendar();
});
