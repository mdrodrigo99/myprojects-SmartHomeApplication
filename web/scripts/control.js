
// ---------------------------------------------------------------------------------------------------
// reconnecting
document.getElementById('status').addEventListener('click', function (event) {
    MQTTconnect();
});


// ---------------------------------------------------------------------------------------------------
// updating every n time
setInterval(function() {
    send_message('need','need/indoor/temp');
	send_message('need','need/humid/humidity');
	send_message('need','need/outdoor/temp');
	send_message('need','need/watertank/waterlevel');
	send_message('need','need/door/ultrasonic');
	send_message('need','need/indoor/motionsensor');
}, 60 * 1000);

// ---------------------------------------------------------------------------------------------------
// thermostat slider 
var slider = document.getElementById("myRange");
var output = document.getElementById("thermostat");
var val = slider.value/50;

output.innerHTML = slider.value + '°C';

$(slider).css('background-image',
	'-webkit-gradient(linear, left top, right top, '
	+ 'color-stop(' + val + ', #ff4545), '
	+ 'color-stop(' + val + ', #c7c7c7)'
	+ ')'
);

slider.oninput = function() {
	output.innerHTML = this.value + '°C';
	var val = $(this).val()/50;
    
    $(this).css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + val + ', #ff4545), '
                + 'color-stop(' + val + ', #c7c7c7)'
                + ')'
    );
	send_message(this.value,'indoor/temp/thermostat');
}


// ---------------------------------------------------------------------------------------------------
// update data by click
document.getElementById('indoor-temp-click').addEventListener('click', function (event) {
    send_message('need','need/indoor/temp');
});

document.getElementById('humidity-click').addEventListener('click', function (event) {
    send_message('need','need/humid/humidity');
});

document.getElementById('outdoor-temp-click').addEventListener('click', function (event) {
    send_message('need','need/outdoor/temp');
});

document.getElementById('waterlevel-click').addEventListener('click', function (event) {
    send_message('need','need/watertank/waterlevel');
});

document.getElementById('door-click').addEventListener('click', function (event) {
    send_message('need','need/door/ultrasonic');
});

document.getElementById('motion-click').addEventListener('click', function (event) {
    send_message('need','need/indoor/motionsensor');
});

// ---------------------------------------------------------------------------------------------------
// control using buttons
function waterpump() {
	var checkBox = document.getElementById("check-wl");
	if (checkBox.checked == true){
		send_message('on','watertank/waterlevel/motor');
		send_discordMessage("Water Pump: On");
	} 
	else
	{
		send_message('off','watertank/waterlevel/motor');
		send_discordMessage("Water Pump: Off");
	}
}

function fan() {
	var checkBox = document.getElementById("check-it");
	if (checkBox.checked == true){
		send_message('on','indoor/temp/fanon');
		send_discordMessage("Living Room Fan: On");
	} 
	else
	{
		send_message('off','indoor/temp/fanoff');
		send_discordMessage("Living Room Fan: Off");
	}
}

function home() {
	var checkBox = document.getElementById("check-home");
	if (checkBox.checked == true){
		document.getElementById("check-away").checked = false;
		document.getElementById("away-id").style.backgroundColor = "var(--primary-color)";
		document.getElementById("home-id").style.backgroundColor = "var(--button-color)";
	} 
	else
	{
		document.getElementById("home-id").style.backgroundColor = "var(--primary-color)";
	}
}

function away() {
	var checkBox = document.getElementById("check-away");
	if (checkBox.checked == true){
		document.getElementById("check-home").checked = false;
		document.getElementById("home-id").style.backgroundColor = "var(--primary-color)";
		document.getElementById("away-id").style.backgroundColor = "var(--button-color)";
	} 
	else
	{
		document.getElementById("away-id").style.backgroundColor = "var(--primary-color)";
	}
}