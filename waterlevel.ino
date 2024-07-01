// water level sensor pins
#define sensorPower 7
#define sensorPin A0

// water pump relay pin
#define relayPin 9

int waterlevel;

char msg;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(sensorPower,OUTPUT);  
  pinMode(relayPin,OUTPUT);
  digitalWrite(relayPin,HIGH);
}

void loop() {
  if( Serial.available() > 0){
    msg = Serial.read();
    
    if( msg == 'e' ){
      Water_Level_Readings();
    } 
    
    if( msg == 'n' ){
      Pump_Control(1);  
    } 
    
    if( msg == 'f' ){
      Pump_Control(0);  
    } 
  }
  else{
    Watertank_Auto_Refill();
  }
}

void Water_Level_Readings(){
  digitalWrite(sensorPower,HIGH);
  delay(10);
  waterlevel = analogRead(sensorPin);
  waterlevel = map(waterlevel,0,1023,0,100);
  digitalWrite(sensorPower,LOW);

  if(waterlevel >= 0 && waterlevel <= 33){
    Serial.println(waterlevel);
  }
  else if(waterlevel >= 34 && waterlevel <= 38){
    waterlevel += 10;
    Serial.println(waterlevel);
  }
  else if(waterlevel >= 39 && waterlevel <= 41){
    waterlevel += 15;
    Serial.println(waterlevel);
  }
  else if(waterlevel >= 42 && waterlevel <= 44){
    waterlevel += 30;
    Serial.println(waterlevel);
  }
  else if(waterlevel >= 45 && waterlevel <= 47){
    waterlevel += 45;
    Serial.println(waterlevel);
  }
  else{
    waterlevel += 50;
    Serial.println(waterlevel);
  }
}

void Pump_Control(int control){
  if( control == 0 ){
    // pump off
    digitalWrite(relayPin, HIGH);
  }
  
  if( control == 1 ){
    // pump on
    digitalWrite(relayPin, LOW);
  }
}

void Watertank_Auto_Refill(){
  digitalWrite(sensorPower,HIGH);
  delay(10);
  waterlevel = analogRead(sensorPin);
  waterlevel = map(waterlevel,0,1023,0,100);
  digitalWrite(sensorPower,LOW);
  if( waterlevel < 25 ){
    digitalWrite(relayPin,LOW);
  }
  if( waterlevel > 46 ){
    digitalWrite(relayPin,HIGH);
  }
}
