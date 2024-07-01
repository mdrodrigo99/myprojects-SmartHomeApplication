var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var commands = [ 'fan on' , 'fan off' , 'pump on', 'pump off'];
var grammar = '#JSGF V1.0; grammar commands; public <command> = ' + commands.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.getElementById('voice-bot').addEventListener('click', function (event) {
    document.getElementById("mic-icon").className = "fas fa-microphone";
	recognition.start();
	console.log('Ready to receive a command.');
});

recognition.onresult = function(event) {
	var command = event.results[0][0].transcript;
	console.log('Command: ' + command);
	if(command == 'fan on'){
		document.getElementById("check-it").checked = true;
		send_message('on','indoor/temp/fanon');
		send_discordMessage("Living Room Fan: On");
	}
	if(command == 'fan off'){
		document.getElementById("check-it").checked = false;
		send_message('off','indoor/temp/fanoff');
		send_discordMessage("Living Room Fan: Off");
	}
	
	if(command == 'pump on'){
		document.getElementById("check-wl").checked = true;
		send_message('on','watertank/waterlevel/motor');
		send_discordMessage("Water Pump: On");
	}
	if(command == 'pump off'){
		document.getElementById("check-wl").checked = false;
		send_message('off','watertank/waterlevel/motor');
		send_discordMessage("Water Pump: Off");
	}
	console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
	document.getElementById("mic-icon").className = "fas fa-microphone-slash";		
	recognition.stop();
}

recognition.onnomatch = function(event) {
	console.log("Didn't recognised");
}

recognition.onerror = function(event) {
	console.log('Error occurred');
}