let seconds = 0;
let timers = document.querySelector('.timer');
	let seconds_timer_ = setInterval(function() {
			seconds++;
			timers.innerHTML = String(seconds);
	}, 100);










