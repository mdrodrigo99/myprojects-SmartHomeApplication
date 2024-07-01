import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish
import serial
import time
from time import sleep

device = '/dev/ttyUSB0'

arduino = serial.Serial(device,115200)

# change this to -> your topic
sendPath = "watertank/waterlevel"

#change this to -> 'need' + your topic -> 'need/your topic'
receivedPath1 = "need/watertank/waterlevel"
receivedPath2 = "watertank/waterlevel/motor"

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe(receivedPath1)
    client.subscribe(receivedPath2)	
    sleep(3)
    
def on_message(client, userdata, msg):
    print(msg.topic + " " + str(msg.payload))
    if "need" in msg.payload:
        arduino.write('e')
        sleep(3)
        waterlevel = arduino.readline()
        print(waterlevel)
        publish.single(sendPath, str(waterlevel), hostname="34.151.77.31")
        print("Done")
    if "on" in msg.payload:
        arduino.write('n')
        sleep(3)
        print("Done")
    if "off" in msg.payload:
        arduino.write('f')
        sleep(3)
        print("Done")
        
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect("34.151.77.31", 1883, 60)
client.loop_forever()