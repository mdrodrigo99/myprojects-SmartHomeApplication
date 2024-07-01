var connected_flag=0	
var mqtt;
var reconnectTimeout = 5000;
var host="34.151.77.31";
var port=9001;
var sub_topic="#";

function onConnectionLost(){
	console.log("connection lost");
	document.getElementById("status").style.color = "#c9a207";
	connected_flag=0;
}

function onFailure(message) {
	console.log("Failed");
	document.getElementById("status").style.color = "#c9a207";
    setTimeout(MQTTconnect, reconnectTimeout);
}

function onMessageArrived(r_message){
	out_msg = "Message received " + r_message.payloadString + "<br>";
	out_msg = out_msg + "Message received Topic " + r_message.destinationName;
	console.log(out_msg);
	var topic = r_message.destinationName;
	var payload = r_message.payloadString;
	
	if (topic == "indoor/temp") {
		document.getElementById("indoor-temp").innerHTML = payload + '°C';
	}
	
	if (topic == "door/ultrasonic") {
		if	(parseInt(payload) < 5) {
			document.getElementById("door").innerHTML = '<strong>Door Closed</strong>';
			document.getElementById("door-icon").className = "fas fa-door-closed";
			document.getElementById("door-icon").style.color = "green";
			if	(document.getElementById("check-away").checked == true) {
				send_discordMessage("Security Alert: Door Closed");
			}
		}
		else {
			document.getElementById("door").innerHTML = '<strong>Door Opened</strong>';
			document.getElementById("door-icon").className = "fas fa-door-open";
			document.getElementById("door-icon").style.color = "red";
			if	(document.getElementById("check-away").checked == true) {
				send_discordMessage("Security Alert: Door Opened");
			}
		}
	}
	
	if (topic == "indoor/motionsensor") {
		//parseInt(payload) == 1
		if	(parseInt(payload) == 1) {
			document.getElementById("motion-icon").style.color = "red";
			document.getElementById("motion").innerHTML = "<strong>Threats Found</strong>";
			if	(document.getElementById("check-away").checked == true) {
				send_discordMessage("Security Alert: Threats Found");
			}
		}
		else {
			document.getElementById("motion-icon").style.color = "green";
			document.getElementById("motion").innerHTML = "<strong>Safe Home</strong>";
			if	(document.getElementById("check-away").checked == true) {
				send_discordMessage("Security Alert: No Threats Found");
			}
		}
	}
	
	if (topic == "watertank/waterlevel") {
		document.getElementById("waterlevel").innerHTML = payload + '%';
	}
	
	if (topic == "outdoor/temp") {
		document.getElementById("outdoor-temp").innerHTML = payload + '°C';
	}
	if (topic == "humid/humidity") {
		document.getElementById("humidity").innerHTML = payload + '%';
	}
}

function onConnected(recon,url){
	console.log(" in onConnected " +reconn);
}
	
function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	console.log("Connected to "+host +"on port "+port);
	connected_flag=1
	document.getElementById("status").style.color = "#ff4545";
	console.log("on Connect "+connected_flag);
	mqtt.subscribe(sub_topic);
	send_message('need','need/indoor/temp');
	send_message('need','need/humid/humidity');
	send_message('need','need/outdoor/temp');
	send_message('need','need/watertank/waterlevel');
	send_message('need','need/door/ultrasonic');
	send_message('need','need/indoor/motionsensor');
}

function MQTTconnect() {
	console.log("connecting to "+ host +" "+ port);
	var x=Math.floor(Math.random() * 10000); 
	var cname="controlform-"+x;
	mqtt = new Paho.MQTT.Client(host,port,cname);
		
	var options = {
        timeout: 3,
		onSuccess: onConnect,
		onFailure: onFailure,
      
    };
	
	mqtt.onConnectionLost = onConnectionLost;
	mqtt.onMessageArrived = onMessageArrived;
	mqtt.connect(options);
	
	return false;
}

function send_message(msg,topic){
	if (connected_flag==0){
		out_msg="<b>Not Connected so can't send</b>"
		console.log(out_msg);
	
		return false;
	}
	var value = msg;
	message = new Paho.MQTT.Message(value);
	message.destinationName = topic;
	//console.log(message);
	mqtt.send(message);

	return false;
}