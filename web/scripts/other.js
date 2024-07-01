
// ---------------------------------------------------------------------------------------------------
// send messages to the discord bot
function send_discordMessage(discordMessage) {
	var request = new XMLHttpRequest();
	request.open("POST", "https://discord.com/api/webhooks/844480647614955521/SEt0izTTDEAxZSmyh67EPGvQg8d-dKHZjVSGjddKwqggMNPYVUQNuGulqLCNCx_U0B4J");

	request.setRequestHeader('Content-type', 'application/json');

	var params = {
		username: "Smart Home",
		avatar_url: "",
		content: discordMessage
	}

	request.send(JSON.stringify(params));
}


// ---------------------------------------------------------------------------------------------------
// change app color
var title = document.getElementById("title");
title.onclick = function(){
	document.body.classList.toggle("light-theme");
}


// ---------------------------------------------------------------------------------------------------
// clock
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
display_datetime();
function display_datetime() {
	var d = new Date();
	document.getElementById("c-date").innerHTML = days[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate();
	if(d.getHours() > 12){
		if(d.getMinutes() < 10) {
			document.getElementById("c-time").innerHTML = d.getHours() + ':0' + d.getMinutes() + ' PM';
		}
		else {
			document.getElementById("c-time").innerHTML = d.getHours() + ':' + d.getMinutes() + ' PM';
		}
	}
	else{
		if(d.getMinutes() < 10) {
			document.getElementById("c-time").innerHTML = d.getHours() + ':0' + d.getMinutes() + ' AM';
		}
		else {
			document.getElementById("c-time").innerHTML = d.getHours() + ':' + d.getMinutes() + ' AM';
		}
	}
	if(d.getHours() >= 0 && d.getHours() < 12){
		document.getElementById("time-status").innerHTML = "Good Morning";
		document.getElementById("time-status-id").className = "fas fa-coffee";
	}
	else if(d.getHours() >= 12 && d.getHours() < 17){
		document.getElementById("time-status").innerHTML = "Good Afternoon";
		document.getElementById("time-status-id").className = "fas fa-cloud-moon";
	}
	else{
		document.getElementById("time-status").innerHTML = "Good Night";
		document.getElementById("time-status-id").className = "fas fa-moon";
	}
}

setInterval( display_datetime, 1000);
