/* The project database. 100+ entries across 12 categories.
   Fields: id,title,glyph,difficulty,boards[],inputs[],outputs[],category,
           needsExtraParts,extraParts[],summary,whyBoard,source,parts[],
           prototype{breadboard[],wiring[],simulator{}},code{arduino,micropython},makeItReal[]
   Code is intentionally compact but real. */
window.DB = window.DB || {};
window.DB.projects = [

/* =================== 1. BASICS & I/O =================== */
{
  id:"blink", title:"Blink & Heartbeat LED", glyph:"💡", difficulty:"Beginner",
  boards:["c3","s3","c6mini"], inputs:[], outputs:["led"], category:"Basics & I/O",
  needsExtraParts:false, extraParts:[], source:"nabidoust",
  summary:"The hello-world: blink an LED, then make it 'breathe' with PWM. Proves your toolchain works.",
  whyBoard:"Any board — the C3 Super Mini or onboard LED is perfect for a first upload.",
  parts:["LED (assorted)","220Ω resistor","breadboard","jumpers"],
  prototype:{ breadboard:["LED long leg (anode) to a GPIO through a 220Ω resistor.","LED short leg to GND.","Upload and watch it blink; then try the PWM 'breathe' version."],
    wiring:[{from:"LED anode",to:"GPIO2 via 220Ω"},{from:"LED cathode",to:"GND"}],
    simulator:{tool:"Wokwi",notes:"Drop an ESP32 + LED, wire to GPIO2.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#define LED 2
void setup(){ pinMode(LED, OUTPUT); }
void loop(){
  // breathe using LEDC PWM
  for(int d=0; d<=255; d++){ analogWrite(LED, d); delay(4); }
  for(int d=255; d>=0; d--){ analogWrite(LED, d); delay(4); }
}`,
    micropython:`from machine import Pin, PWM
import time
led = PWM(Pin(2), freq=1000)
while True:
    for d in list(range(0,1024,8))+list(range(1023,-1,-8)):
        led.duty(d); time.sleep_ms(4)` },
  makeItReal:["Solder the LED+resistor to a tiny perfboard.","Print a small domed diffuser cap.","Power from any USB port as a status beacon."]
},
{
  id:"button-counter", title:"Button Counter (debounced)", glyph:"🔘", difficulty:"Beginner",
  boards:["c3","s3"], inputs:["button"], outputs:["led","oled"], category:"Basics & I/O",
  needsExtraParts:false, extraParts:[], source:"nabidoust",
  summary:"Count clean button presses with software debounce and show the count on serial or an OLED.",
  whyBoard:"Tiny job — C3/S3 both fine. INPUT_PULLUP means no extra resistor.",
  parts:["Push Button","OLED SSD1306","breadboard","jumpers"],
  prototype:{ breadboard:["Button from GPIO4 to GND (use INPUT_PULLUP).","Optional OLED on I2C (SDA/SCL).","Each clean press increments the count."],
    wiring:[{from:"Button",to:"GPIO4 ↔ GND"},{from:"OLED SDA/SCL",to:"I2C pins"}],
    simulator:{tool:"Wokwi",notes:"Button + ESP32; watch serial.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#define BTN 4
int count=0; bool last=HIGH; unsigned long t=0;
void setup(){ pinMode(BTN, INPUT_PULLUP); Serial.begin(115200); }
void loop(){
  bool s=digitalRead(BTN);
  if(s!=last && millis()-t>25){ t=millis();
    if(s==LOW){ count++; Serial.println(count); }
    last=s;
  }
}` },
  makeItReal:["Mount an arcade button in a printed box.","Add an OLED window in the lid.","Use it as a tally counter / scorer."]
},
{
  id:"pot-dimmer", title:"Potentiometer LED Dimmer", glyph:"🎚️", difficulty:"Beginner",
  boards:["c3","s3"], inputs:["potentiometer"], outputs:["led"], category:"Basics & I/O",
  needsExtraParts:false, extraParts:[], source:"100days",
  summary:"Read an analog knob and map it to LED brightness — your first ADC→PWM pipeline.",
  whyBoard:"Any board with an ADC pin. Note C3 has fewer ADC channels than S3.",
  parts:["Rotary Potentiometer","LED (assorted)","220Ω resistor","breadboard"],
  prototype:{ breadboard:["Pot outer pins to 3.3V and GND, wiper to an ADC GPIO.","LED on a PWM GPIO via resistor.","Turn the knob, brightness follows."],
    wiring:[{from:"Pot wiper",to:"GPIO34 (ADC)"},{from:"LED",to:"GPIO2 via 220Ω"}],
    simulator:{tool:"Wokwi",notes:"Pot + LED on ESP32.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#define POT 34
#define LED 2
void setup(){ pinMode(LED, OUTPUT); }
void loop(){
  int v = analogRead(POT);            // 0..4095
  analogWrite(LED, map(v,0,4095,0,255));
}` },
  makeItReal:["Panel-mount the pot in a printed knob bezel.","Drive a small LED lamp instead of one LED.","Great front panel for any adjustable build."]
},
{
  id:"rgb-mood", title:"RGB Mood Lamp", glyph:"🌈", difficulty:"Beginner",
  boards:["c3","s3","c6-lcd"], inputs:["potentiometer"], outputs:["rgb"], category:"Basics & I/O",
  needsExtraParts:false, extraParts:[], source:"rnt-sensors",
  summary:"Fade an RGB LED through the color wheel, or set hue with a knob.",
  whyBoard:"Three PWM channels needed — all boards have plenty.",
  parts:["RGB LED (KY-016)","3× 220Ω resistors","Rotary Potentiometer","breadboard"],
  prototype:{ breadboard:["R/G/B legs to three PWM GPIOs via resistors; common to GND (or 3.3V if common-anode).","Optional pot on ADC to pick hue.","Cycle hue in code."],
    wiring:[{from:"R/G/B",to:"GPIO 25/26/27 via 220Ω"},{from:"Common",to:"GND"}],
    simulator:{tool:"Wokwi",notes:"RGB LED on three PWM pins.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`int R=25,G=26,B=27;
void hsv(int h){ // crude wheel
  int x=255-abs(h%170-85)*3; x=constrain(x,0,255);
  analogWrite(R, 255-h%85*3); analogWrite(G, x); analogWrite(B, h%85*3);
}
void setup(){ pinMode(R,OUTPUT);pinMode(G,OUTPUT);pinMode(B,OUTPUT); }
void loop(){ for(int h=0;h<255;h++){ hsv(h); delay(20);} }` },
  makeItReal:["Print a frosted dome/diffuser.","Add a USB-C base and a touch sensor for on/off.","Upgrade to a WS2812 ring for richer effects (see WLED)."]
},
{
  id:"joystick-cursor", title:"Joystick Cursor / Servo Aim", glyph:"🕹️", difficulty:"Beginner",
  boards:["s3","c6-lcd"], inputs:["joystick"], outputs:["servo","tft"], category:"Basics & I/O",
  needsExtraParts:false, extraParts:[], source:"100days",
  summary:"Read X/Y and the button; move a cursor on the screen or aim a servo.",
  whyBoard:"C6+screen draws the cursor with no extra display; S3 has ADC pins to spare.",
  parts:["2-Axis Joystick","Servo SG90","breadboard","jumpers"],
  prototype:{ breadboard:["VRx/VRy to two ADC pins, SW to a GPIO (pull-up).","Map X to a servo angle (or to screen coordinates)."],
    wiring:[{from:"VRx/VRy",to:"GPIO34/35"},{from:"SW",to:"GPIO32"},{from:"Servo",to:"GPIO13 + 5V"}],
    simulator:{tool:"Wokwi",notes:"Joystick + servo on ESP32.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <ESP32Servo.h>
Servo s;
void setup(){ s.attach(13); }
void loop(){
  int x=analogRead(34);
  s.write(map(x,0,4095,0,180));
  delay(15);
}` },
  makeItReal:["Print a handheld grip housing the joystick.","Add a LiPo for a wireless controller.","Send X/Y over BLE/ESP-NOW to drive a robot."]
},
{
  id:"encoder-counter", title:"Rotary Encoder Tuner", glyph:"🎛️", difficulty:"Beginner",
  boards:["s3","c6-lcd","tembed"], inputs:["encoder"], outputs:["oled","tft"], category:"Basics & I/O",
  needsExtraParts:false, extraParts:[], source:"nabidoust",
  summary:"Spin a detented knob to change a value up/down with a click to select — the core of any menu.",
  whyBoard:"T-Embed has an encoder + screen built in; C6+screen shows the value natively.",
  parts:["Rotary Encoder (KY-040)","OLED SSD1306","breadboard"],
  prototype:{ breadboard:["CLK/DT to two GPIOs (interrupts), SW to a GPIO.","Increment/decrement on rotation; print value."],
    wiring:[{from:"CLK/DT",to:"GPIO18/19"},{from:"SW",to:"GPIO5"}],
    simulator:{tool:"Wokwi",notes:"Encoder available in Wokwi.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`volatile int pos=0; int clk=18,dt=19;
void IRAM_ATTR isr(){ pos += digitalRead(dt)?-1:1; }
void setup(){ pinMode(clk,INPUT_PULLUP);pinMode(dt,INPUT_PULLUP);
  attachInterrupt(clk, isr, FALLING); Serial.begin(115200); }
void loop(){ static int last=0; if(pos!=last){ Serial.println(pos); last=pos; } }` },
  makeItReal:["Reuse as the input for the Pomodoro timer or TFT menu.","Print a knurled knob.","Wrap in a small console enclosure."]
},
{
  id:"touch-lamp", title:"Capacitive Touch Lamp", glyph:"👆", difficulty:"Beginner",
  boards:["c3","s3","c6-lcd"], inputs:["touch"], outputs:["ws2812","led"], category:"Basics & I/O",
  needsExtraParts:false, extraParts:[], source:"rnt-sensors",
  summary:"Tap a pad to toggle light and long-press to cycle brightness/effects — no moving switch.",
  whyBoard:"Any board; ESP32 also has native touch pins if you skip the TTP223.",
  parts:["Capacitive Touch (TTP223)","WS2812 RGB LED","breadboard"],
  prototype:{ breadboard:["TTP223 I/O to a GPIO; WS2812 DIN to a GPIO.","Toggle on tap; cycle on hold."],
    wiring:[{from:"TTP223 I/O",to:"GPIO4"},{from:"WS2812 DIN",to:"GPIO5"}],
    simulator:{tool:"Wokwi",notes:"Use a button to stand in for touch; WS2812 supported.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <Adafruit_NeoPixel.h>
Adafruit_NeoPixel px(8,5,NEO_GRB+NEO_KHZ800);
bool on=false;
void setup(){ pinMode(4,INPUT); px.begin(); }
void loop(){ if(digitalRead(4)){ on=!on; px.fill(on?px.Color(255,180,80):0); px.show(); delay(300);} }` },
  makeItReal:["Hide the touch pad under a printed lid (capacitive sees through plastic).","Diffuse the LEDs with a frosted shade.","Add a LiPo for a cordless table lamp."]
},
{
  id:"laser-tripwire", title:"Laser Tripwire Alarm", glyph:"🔴", difficulty:"Beginner",
  boards:["c3","s3"], inputs:["ldr"], outputs:["laser","buzzer"], category:"Basics & I/O",
  needsExtraParts:false, extraParts:[], source:"rnt-sensors",
  summary:"A laser hits an LDR; break the beam and the buzzer fires. Classic spy-museum build.",
  whyBoard:"Trivial I/O — any board. Keep the laser steady for a clean beam.",
  parts:["Laser Diode (KY-008)","Photoresistor (LDR)","Active Buzzer","220Ω + 10k resistors"],
  prototype:{ breadboard:["Aim the laser across a gap onto the LDR (divider with 10k).","Read ADC; if light drops below threshold, sound the buzzer."],
    wiring:[{from:"Laser S",to:"GPIO5"},{from:"LDR node",to:"GPIO34"},{from:"Buzzer",to:"GPIO18"}],
    simulator:{tool:"Wokwi",notes:"LDR + buzzer; vary light to test.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`int laser=5,ldr=34,buz=18;
void setup(){ pinMode(laser,OUTPUT);pinMode(buz,OUTPUT);digitalWrite(laser,HIGH); }
void loop(){ if(analogRead(ldr) < 800){ digitalWrite(buz,HIGH);} else digitalWrite(buz,LOW); }` },
  makeItReal:["Print two posts to hold laser + LDR aligned.","Add a latch so the alarm stays on until reset.","Mount across a doorway or drawer."]
},
{
  id:"traffic-light", title:"Traffic-Light Sequencer", glyph:"🚦", difficulty:"Beginner",
  boards:["c3","s3"], inputs:["button"], outputs:["led"], category:"Basics & I/O",
  needsExtraParts:false, extraParts:[], source:"100days",
  summary:"Drive red/amber/green in a timed cycle with a pedestrian-request button — a state-machine primer.",
  whyBoard:"Any board; great teaching project for non-blocking timing.",
  parts:["3× LED","3× 220Ω","Push Button","breadboard"],
  prototype:{ breadboard:["Three LEDs on three GPIOs; button to GND.","Cycle states with millis(); button requests a walk phase."],
    wiring:[{from:"R/A/G",to:"GPIO 25/26/27"},{from:"Button",to:"GPIO4"}],
    simulator:{tool:"Wokwi",notes:"Three LEDs + button.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`int R=25,A=26,G=27;
void s(int r,int a,int g,int ms){ digitalWrite(R,r);digitalWrite(A,a);digitalWrite(G,g);delay(ms);}
void setup(){ pinMode(R,OUTPUT);pinMode(A,OUTPUT);pinMode(G,OUTPUT); }
void loop(){ s(1,0,0,4000); s(1,1,0,1000); s(0,0,1,4000); s(0,1,0,1000); }` },
  makeItReal:["Print a mini traffic-light tower.","Use it as a build-status/CI light over Wi-Fi.","Scale to an intersection diorama."]
},
{
  id:"bargraph-meter", title:"Analog Bar-Graph Meter", glyph:"📊", difficulty:"Beginner",
  boards:["s3"], inputs:["potentiometer"], outputs:["led"], category:"Basics & I/O",
  needsExtraParts:false, extraParts:[], source:"nabidoust",
  summary:"Light up an LED bar in proportion to an analog input — a tactile VU/level display.",
  whyBoard:"S3 has the pins; or use a 74HC595 to save GPIO.",
  parts:["LED Bar Graph (10-seg)","10× 220Ω (or 74HC595 Shift Register)","Rotary Potentiometer"],
  prototype:{ breadboard:["Drive bar segments from GPIO (or shift register).","Map ADC value to number of lit segments."],
    wiring:[{from:"Pot wiper",to:"GPIO34"},{from:"Bar segs",to:"GPIO bank / 595"}],
    simulator:{tool:"Wokwi",notes:"Bar graph + pot.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`int segs[]={13,12,14,27,26,25,33,32,15,4};
void setup(){ for(int p:segs) pinMode(p,OUTPUT); }
void loop(){ int n=map(analogRead(34),0,4095,0,10);
  for(int i=0;i<10;i++) digitalWrite(segs[i], i<n); }` },
  makeItReal:["Use as a battery/level gauge.","Swap the bar for a WS2812 strip to free pins.","Print a beveled bezel."]
},
{
  id:"reaction-game", title:"Reaction-Time Game", glyph:"⚡", difficulty:"Beginner",
  boards:["s3","c6-lcd"], inputs:["button"], outputs:["led","buzzer","oled"], category:"Basics & I/O",
  needsExtraParts:false, extraParts:[], source:"rnt-sensors",
  summary:"LED lights after a random delay; smash the button — it times your reflexes in milliseconds.",
  whyBoard:"C6+screen shows the score; S3 with an OLED works too.",
  parts:["Push Button","LED","Passive Buzzer","OLED SSD1306"],
  prototype:{ breadboard:["After a random delay, light the LED and start a timer.","Stop on press; show reaction ms. Penalize early presses."],
    wiring:[{from:"Button",to:"GPIO4"},{from:"LED",to:"GPIO2"},{from:"OLED",to:"I2C"}],
    simulator:{tool:"Wokwi",notes:"Button+LED+OLED.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`void setup(){ pinMode(4,INPUT_PULLUP);pinMode(2,OUTPUT);Serial.begin(115200);randomSeed(esp_random()); }
void loop(){ delay(random(1500,4000)); digitalWrite(2,HIGH); unsigned long t=millis();
  while(digitalRead(4)==HIGH){} Serial.printf("%lums\\n",millis()-t); digitalWrite(2,LOW); delay(2000); }` },
  makeItReal:["Print a two-button arcade box for head-to-head play.","Track best scores in flash.","Add a buzzer 'go' cue."]
},
{
  id:"simon-says", title:"Simon-Says Memory Game", glyph:"🟩", difficulty:"Intermediate",
  boards:["s3"], inputs:["button"], outputs:["led","buzzer"], category:"Basics & I/O",
  needsExtraParts:false, extraParts:[], source:"awesome-esp",
  summary:"Repeat a growing color/tone sequence. Four LEDs, four buttons, four notes.",
  whyBoard:"S3 has enough pins for 4+4 I/O comfortably.",
  parts:["4× LED","4× Push Button","Passive Buzzer","resistors"],
  prototype:{ breadboard:["Four LED+button pairs, each a color with a tone.","Grow a random sequence; player echoes it back."],
    wiring:[{from:"LEDs",to:"4 GPIO"},{from:"Buttons",to:"4 GPIO (pull-up)"},{from:"Buzzer",to:"GPIO18"}],
    simulator:{tool:"Wokwi",notes:"4 LEDs + 4 buttons + buzzer.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Sketch outline: store seq[], each round append random(0..3),
// play tones/LEDs, then read buttons and compare. See RNT for full code.
int led[4]={25,26,27,14}, btn[4]={32,33,34,35};
void setup(){ for(int i=0;i<4;i++){pinMode(led[i],OUTPUT);pinMode(btn[i],INPUT_PULLUP);} }
void loop(){ /* sequence/echo loop */ }` },
  makeItReal:["Print a four-quadrant button face.","Add a high-score display.","Battery + lid = a real handheld toy."]
},

/* =================== 2. ENVIRONMENTAL SENSING =================== */
{
  id:"temp-tft", title:"Desk Temp/Humidity Monitor", glyph:"🌡️", difficulty:"Beginner",
  boards:["c6-lcd"], inputs:["temperature","humidity"], outputs:["tft"], category:"Environmental sensing",
  needsExtraParts:false, extraParts:[], source:"rnt-beginner",
  summary:"Read a DHT11 and show big temperature/humidity figures on the onboard 1.47\" color screen.",
  whyBoard:"C6+screen needs zero display wiring — just the DHT on one GPIO.",
  parts:["DHT11 Temp + Humidity","ESP32-C6-LCD-1.47","jumpers"],
  prototype:{ breadboard:["DHT11 DATA to a free C6 GPIO with a 10k pull-up.","Draw values with the ST7789 (TFT_eSPI/LVGL)."],
    wiring:[{from:"DHT11 DATA",to:"GPIO2 (+10k pull-up)"},{from:"DHT VCC/GND",to:"3.3V/GND"}],
    simulator:{tool:"Wokwi",notes:"Simulate DHT+display logic on an S3; port pins to C6.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include "DHT.h"
DHT dht(2, DHT11);
void setup(){ dht.begin(); Serial.begin(115200); /* init ST7789 here */ }
void loop(){
  float t=dht.readTemperature(), h=dht.readHumidity();
  Serial.printf("%.1fC %.0f%%\\n", t, h);   // draw to TFT instead
  delay(2000);
}`,
    micropython:`import dht, machine, time
d=dht.DHT11(machine.Pin(2))
while True:
    d.measure(); print(d.temperature(), d.humidity()); time.sleep(2)` },
  makeItReal:["Print a desk stand framing the screen.","Add vent slots so it reads room air.","Power via USB-C; optional MQTT publish."]
},
{
  id:"dht-oled", title:"DHT + OLED Mini Weather Display", glyph:"📟", difficulty:"Beginner",
  boards:["s3","c3"], inputs:["temperature","humidity"], outputs:["oled"], category:"Environmental sensing",
  needsExtraParts:true, extraParts:["OLED SSD1306"], source:"rnt-beginner",
  summary:"The classic first build: temperature/humidity with icons on a crisp OLED.",
  whyBoard:"Great on boards without a screen (S3/C3) using a two-wire OLED.",
  parts:["DHT11 Temp + Humidity","OLED SSD1306","breadboard"],
  prototype:{ breadboard:["DHT on a GPIO; OLED on I2C (SDA/SCL).","Render temp/humidity with U8g2."],
    wiring:[{from:"DHT DATA",to:"GPIO4"},{from:"OLED SDA/SCL",to:"GPIO8/9 (S3)"}],
    simulator:{tool:"Wokwi",notes:"DHT22 + SSD1306 both supported.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include "DHT.h"
#include <U8g2lib.h>
DHT dht(4,DHT11);
U8G2_SSD1306_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0);
void setup(){ dht.begin(); u8g2.begin(); }
void loop(){ float t=dht.readTemperature();
  u8g2.clearBuffer(); u8g2.setFont(u8g2_font_logisoso24_tf);
  u8g2.setCursor(0,40); u8g2.print(t,1); u8g2.print("C"); u8g2.sendBuffer(); delay(2000); }` },
  makeItReal:["Print a clock-radio style wedge case.","Cut an OLED window in the lid.","Add a button to flip temp/humidity pages."]
},
{
  id:"weather-web", title:"Wi-Fi Weather Station (Web)", glyph:"⛅", difficulty:"Intermediate",
  boards:["s3","c6-lcd"], inputs:["temperature","humidity"], outputs:["web","wifi"], category:"Environmental sensing",
  needsExtraParts:true, extraParts:["BME280 / BME680 Environmental Sensor"], source:"rnt-beginner",
  summary:"Serve a live page of temperature, humidity and pressure you can open from any phone on your Wi-Fi.",
  whyBoard:"S3/C6 Wi-Fi; BME280 gives accurate pressure for forecasting.",
  parts:["BME280","ESP32-S3","breadboard"],
  prototype:{ breadboard:["BME280 on I2C.","Start an async web server; return JSON/HTML of readings."],
    wiring:[{from:"BME280 SDA/SCL",to:"I2C pins"}],
    simulator:{tool:"Wokwi",notes:"Wokwi can simulate Wi-Fi + a web server with a virtual BME280.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <WiFi.h>
#include <WebServer.h>
#include <Adafruit_BME280.h>
Adafruit_BME280 bme; WebServer server(80);
void setup(){ WiFi.begin("SSID","PASS"); bme.begin(0x76);
  server.on("/",[](){ String s="T:"+String(bme.readTemperature())+
    " P:"+String(bme.readPressure()/100.0); server.send(200,"text/plain",s); });
  server.begin(); }
void loop(){ server.handleClient(); }` },
  makeItReal:["Print a Stevenson-screen style vented shield.","Mount outdoors in shade; power via USB or solar+LiPo.","Add history charts or push to a cloud sheet."]
},
{
  id:"air-quality", title:"Air-Quality Monitor", glyph:"😷", difficulty:"Intermediate",
  boards:["c6-lcd","s3"], inputs:["gas"], outputs:["tft","wifi"], category:"Environmental sensing",
  needsExtraParts:true, extraParts:["BME280 / BME680 Environmental Sensor"], source:"awesome-esp-projects",
  summary:"Track VOC/gas + temp/humidity and show an air-quality index on screen, with alerts when it spikes.",
  whyBoard:"C6+screen for the dashboard; BME680 adds the gas/VOC channel.",
  parts:["BME680","ESP32-C6-LCD-1.47"],
  prototype:{ breadboard:["BME680 on I2C; read gas resistance + T/H/P.","Compute a simple AQI band; color the screen."],
    wiring:[{from:"BME680 SDA/SCL",to:"I2C pins"}],
    simulator:{tool:"Wokwi",notes:"Prototype UI on S3; BME680 gas not fully simulated.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <Adafruit_BME680.h>
Adafruit_BME680 g;
void setup(){ Serial.begin(115200); g.begin(); g.setGasHeater(320,150); }
void loop(){ if(g.performReading()){ Serial.printf("VOC R=%.0f T=%.1f\\n", g.gas_resistance, g.temperature);} delay(3000); }` },
  makeItReal:["Inspired by CanAirIO/CODOS — print a vented desk enclosure.","Log to Home Assistant via MQTT.","Add a buzzer/LED for poor-air alerts."]
},
{
  id:"plant-monitor", title:"Soil-Moisture Plant Monitor", glyph:"🪴", difficulty:"Beginner",
  boards:["c6mini","c6-lcd"], inputs:["soil"], outputs:["wifi","led"], category:"Environmental sensing",
  needsExtraParts:false, extraParts:[], source:"rnt-sensors",
  summary:"Read soil moisture and warn you (LED or phone) when your plant needs water.",
  whyBoard:"C6 Super Mini sips power on battery and wakes periodically to check.",
  parts:["Soil Moisture","ESP32-C6 Super Mini","LED"],
  prototype:{ breadboard:["Power the probe from a GPIO only while reading (less corrosion).","Read ADC; below threshold → alert; deep-sleep between checks."],
    wiring:[{from:"Soil AO",to:"ADC GPIO"},{from:"Soil VCC",to:"GPIO (switched)"}],
    simulator:{tool:"Wokwi",notes:"Use a pot to emulate the analog probe.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#define AO 3
#define PWR 4
void setup(){ pinMode(PWR,OUTPUT); }
void loop(){ digitalWrite(PWR,HIGH); delay(50);
  int m=analogRead(AO); digitalWrite(PWR,LOW);
  Serial.println(m);
  esp_sleep_enable_timer_wakeup(30*60*1000000ULL); esp_deep_sleep_start(); }` },
  makeItReal:["Print a stake that holds the board above the soil.","Run on LiPo; deep-sleep for weeks.","Publish to Home Assistant or a Telegram alert."]
},
{
  id:"smoke-alarm", title:"Smoke & Gas Alarm", glyph:"💨", difficulty:"Intermediate",
  boards:["s3","c6-lcd"], inputs:["gas","flame"], outputs:["buzzer","relay","wifi"], category:"Environmental sensing",
  needsExtraParts:false, extraParts:[], source:"mcl",
  summary:"MQ-2 + flame sensor trip a loud buzzer and (optionally) cut a relay and send an alert.",
  whyBoard:"S3 handles the 5V MQ-2 + networking; warm-up the sensor before arming.",
  parts:["MQ-2 Gas / Smoke","Flame Sensor","Active Buzzer","Relay Module (1-ch)","MB102 PSU"],
  prototype:{ breadboard:["Power MQ-2 from 5V (MB102). Let it warm up ~30s.","Above threshold (or flame) → buzzer + relay off + alert."],
    wiring:[{from:"MQ-2 AO",to:"ADC GPIO"},{from:"Flame DO",to:"GPIO"},{from:"Buzzer/Relay",to:"GPIO"}],
    simulator:{tool:"Wokwi",notes:"MQ-2 not simulated — bench-test the threshold logic with a pot.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`int mq=34,flame=4,buz=18,relay=19;
void setup(){ pinMode(buz,OUTPUT);pinMode(relay,OUTPUT);pinMode(flame,INPUT);delay(30000); }
void loop(){ bool bad = analogRead(mq)>1500 || digitalRead(flame)==LOW;
  digitalWrite(buz,bad); digitalWrite(relay,!bad); delay(200); }` },
  makeItReal:["Print a vented wall enclosure.","⚠️ Treat as a learning aid, not a certified detector.","Add Wi-Fi push notifications."]
},
{
  id:"leak-detector", title:"Water-Leak / Level Alert", glyph:"💧", difficulty:"Beginner",
  boards:["c6mini"], inputs:["water"], outputs:["buzzer","wifi"], category:"Environmental sensing",
  needsExtraParts:false, extraParts:[], source:"mcl",
  summary:"Detect water under the sink or a tank's level and buzz/notify before it floods.",
  whyBoard:"C6 Mini battery + deep sleep for a stick-and-forget sensor.",
  parts:["Water Level Sensor","Active Buzzer","ESP32-C6 Super Mini"],
  prototype:{ breadboard:["Probe on the floor/tank; power intermittently to limit corrosion.","Above threshold → buzzer + alert."],
    wiring:[{from:"Sensor S",to:"ADC GPIO"},{from:"Buzzer",to:"GPIO"}],
    simulator:{tool:"Wokwi",notes:"Emulate with a pot.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`void setup(){ pinMode(5,OUTPUT); }
void loop(){ if(analogRead(3)>1000) digitalWrite(5,HIGH); else digitalWrite(5,LOW); delay(500); }` },
  makeItReal:["Print a low-profile puck with probe slots on the underside.","LiPo + deep sleep.","Notify via MQTT/Telegram."]
},
{
  id:"rain-awning", title:"Rain-Activated Alert", glyph:"🌧️", difficulty:"Beginner",
  boards:["c6mini","s3"], inputs:["water"], outputs:["wifi","buzzer"], category:"Environmental sensing",
  needsExtraParts:false, extraParts:[], source:"awesome-esp-projects",
  summary:"Sense the first raindrops and alert you to bring in laundry / close a window.",
  whyBoard:"Tiny job; C6 Mini on battery outdoors.",
  parts:["Raindrop Sensor","ESP32-C6 Super Mini"],
  prototype:{ breadboard:["Mount the plate at an angle to drain.","On wet → send alert; debounce dry spells."],
    wiring:[{from:"Rain DO",to:"GPIO"}],
    simulator:{tool:"Wokwi",notes:"Logic only; sensor not simulated.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`void setup(){ pinMode(4,INPUT); Serial.begin(115200); }
void loop(){ if(digitalRead(4)==LOW) Serial.println("RAIN"); delay(1000); }` },
  makeItReal:["Print an angled rain-plate holder with a drip edge.","Trigger a servo to retract an awning.","Battery + deep sleep, wake on timer."]
},
{
  id:"fridge-temp", title:"Fridge/Freezer Temp Logger", glyph:"❄️", difficulty:"Beginner",
  boards:["c6mini","s3"], inputs:["temperature"], outputs:["wifi"], category:"Environmental sensing",
  needsExtraParts:false, extraParts:[], source:"rnt-sensors",
  summary:"A waterproof DS18B20 logs fridge temperature and alerts if the door's left open (temp rises).",
  whyBoard:"DS18B20 probe + low-power C6 Mini that reports over Wi-Fi.",
  parts:["DS18B20 Temp Probe","ESP32-C6 Super Mini"],
  prototype:{ breadboard:["DS18B20 on a GPIO with a 4.7k pull-up.","Read °C, alert above a setpoint."],
    wiring:[{from:"DS18B20 DATA",to:"GPIO3 (+4.7k)"}],
    simulator:{tool:"Wokwi",notes:"DS18B20 supported.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <OneWire.h>
#include <DallasTemperature.h>
OneWire ow(3); DallasTemperature ds(&ow);
void setup(){ ds.begin(); Serial.begin(115200); }
void loop(){ ds.requestTemperatures(); Serial.println(ds.getTempCByIndex(0)); delay(5000); }` },
  makeItReal:["Run the probe through the door seal; board outside.","LiPo + deep sleep.","Alert via MQTT/Telegram on rise."]
},
{
  id:"altimeter-display", title:"Altimeter / Pressure Trend", glyph:"⛰️", difficulty:"Intermediate",
  boards:["c6-lcd"], inputs:["temperature"], outputs:["tft"], category:"Environmental sensing",
  needsExtraParts:true, extraParts:["BME280 / BME680 Environmental Sensor"], source:"rnt-sensors",
  summary:"Show altitude and a falling/rising pressure trend on screen — a hiking/weather gadget.",
  whyBoard:"C6+screen plots the trend; BME280 supplies pressure.",
  parts:["BME280","ESP32-C6-LCD-1.47"],
  prototype:{ breadboard:["BME280 on I2C; compute altitude from pressure.","Plot a rolling pressure graph on the TFT."],
    wiring:[{from:"BME280 SDA/SCL",to:"I2C"}],
    simulator:{tool:"Wokwi",notes:"Prototype UI on S3.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <Adafruit_BME280.h>
Adafruit_BME280 bme;
void setup(){ bme.begin(0x76); Serial.begin(115200); }
void loop(){ Serial.println(bme.readAltitude(1013.25)); delay(1000); }` },
  makeItReal:["Print a pocket case with a belt clip.","LiPo powered.","Add a peak-altitude memory."]
},
{
  id:"light-auto-lamp", title:"Dusk-to-Dawn Auto Lamp", glyph:"🔆", difficulty:"Beginner",
  boards:["c3","s3"], inputs:["ldr"], outputs:["relay","led"], category:"Environmental sensing",
  needsExtraParts:false, extraParts:[], source:"100days",
  summary:"Switch a lamp on when ambient light drops below a threshold (with hysteresis to avoid flicker).",
  whyBoard:"Any board; relay for a real lamp (low-voltage to start).",
  parts:["Photoresistor (LDR)","Relay Module (1-ch)","10k resistor"],
  prototype:{ breadboard:["LDR divider to ADC.","Below threshold → relay on; add hysteresis band."],
    wiring:[{from:"LDR node",to:"GPIO34"},{from:"Relay IN",to:"GPIO5"}],
    simulator:{tool:"Wokwi",notes:"LDR + relay supported.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`int on=false;
void setup(){ pinMode(5,OUTPUT); }
void loop(){ int l=analogRead(34);
  if(l<700) on=true; if(l>1100) on=false;
  digitalWrite(5,on); delay(200); }` },
  makeItReal:["⚠️ Mains needs care — start with a 5V lamp.","Print a wall box with the LDR facing a window.","Add a manual override button."]
},

/* =================== 3. MOTION & PRESENCE =================== */
{
  id:"pir-nightlight", title:"PIR Motion Night Light", glyph:"🚶", difficulty:"Beginner",
  boards:["c3","s3","c6mini"], inputs:["pir"], outputs:["ws2812","led"], category:"Motion & Presence",
  needsExtraParts:false, extraParts:[], source:"rnt-sensors",
  summary:"Lights fade up on motion and time out after stillness — hallway/closet automation.",
  whyBoard:"Any board; C6 Mini for a battery stick-up version.",
  parts:["PIR Motion (HC-SR501)","WS2812 RGB LED","jumpers"],
  prototype:{ breadboard:["PIR OUT to a GPIO; WS2812 DIN to a GPIO.","On motion fade up; after timeout fade down."],
    wiring:[{from:"PIR OUT",to:"GPIO4"},{from:"WS2812 DIN",to:"GPIO5"}],
    simulator:{tool:"Wokwi",notes:"PIR + WS2812 supported.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <Adafruit_NeoPixel.h>
Adafruit_NeoPixel px(8,5,NEO_GRB+NEO_KHZ800);
void setup(){ pinMode(4,INPUT); px.begin(); }
void loop(){ if(digitalRead(4)){ px.fill(px.Color(255,180,80)); px.show(); delay(15000);}
  else { px.clear(); px.show(); } }` },
  makeItReal:["Print a corner/stair mount aiming the PIR down the path.","USB or LiPo power.","Tune HC-SR501 hold time with its trim pot."]
},
{
  id:"ultrasonic-radar", title:"Servo Radar Scanner", glyph:"📡", difficulty:"Intermediate",
  boards:["c6-lcd","s3"], inputs:["ultrasonic"], outputs:["tft","servo"], category:"Motion & Presence",
  needsExtraParts:false, extraParts:[], source:"randomnerd",
  summary:"Sweep a servo carrying an ultrasonic sensor and draw a sweeping radar plot on the screen.",
  whyBoard:"C6's onboard TFT removes a wiring step; S3 has pins to spare.",
  parts:["Ultrasonic (HC-SR04)","Servo SG90","ESP32-C6-LCD-1.47","MB102 PSU"],
  prototype:{ breadboard:["Mount HC-SR04 on the servo horn.","Sweep 0–180°, read distance each degree, plot polar blips on the TFT."],
    wiring:[{from:"TRIG/ECHO",to:"GPIO4/5 (level-shift ECHO)"},{from:"Servo",to:"GPIO13 + 5V"}],
    simulator:{tool:"Wokwi",notes:"HC-SR04 + servo simulate well on S3; port to C6 screen.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <ESP32Servo.h>
Servo s; int TRIG=4,ECHO=5;
long dist(){ digitalWrite(TRIG,LOW);delayMicroseconds(2);digitalWrite(TRIG,HIGH);
  delayMicroseconds(10);digitalWrite(TRIG,LOW); return pulseIn(ECHO,HIGH,30000)/58; }
void setup(){ s.attach(13); pinMode(TRIG,OUTPUT);pinMode(ECHO,INPUT); Serial.begin(115200); }
void loop(){ for(int a=0;a<=180;a+=2){ s.write(a); delay(30); Serial.printf("%d:%ld\\n",a,dist()); } }` },
  makeItReal:["Print a rotating turret + base for the sensor.","Add a pan/tilt bracket (Buy More) for 2-axis.","Mount on a wall as a presence radar."]
},
{
  id:"parking-gauge", title:"Garage Parking Gauge", glyph:"🅿️", difficulty:"Beginner",
  boards:["s3","c3"], inputs:["ultrasonic"], outputs:["led","buzzer"], category:"Motion & Presence",
  needsExtraParts:false, extraParts:[], source:"makemindz",
  summary:"Green/amber/red + faster beeps as your car approaches the perfect stop distance.",
  whyBoard:"Any board; mount facing the parking spot.",
  parts:["Ultrasonic (HC-SR04)","3× LED","Active Buzzer"],
  prototype:{ breadboard:["Measure distance; map to LED color + beep rate.","Stop zone = solid red + steady tone."],
    wiring:[{from:"TRIG/ECHO",to:"GPIO4/5"},{from:"LEDs/Buzzer",to:"GPIO bank"}],
    simulator:{tool:"Wokwi",notes:"HC-SR04 + LEDs.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`int TRIG=4,ECHO=5;
long d(){ digitalWrite(TRIG,LOW);delayMicroseconds(2);digitalWrite(TRIG,HIGH);delayMicroseconds(10);digitalWrite(TRIG,LOW); return pulseIn(ECHO,HIGH,30000)/58; }
void setup(){ pinMode(TRIG,OUTPUT);pinMode(ECHO,INPUT);Serial.begin(115200); }
void loop(){ Serial.println(d()); delay(100); }` },
  makeItReal:["Print a wall sign housing 3 LEDs + sensor.","Power from a garage USB outlet.","Add a tennis-ball-on-string backup, obviously."]
},
{
  id:"occupancy-counter", title:"Room People Counter", glyph:"👥", difficulty:"Intermediate",
  boards:["s3","c6-lcd"], inputs:["ultrasonic","pir"], outputs:["oled","wifi"], category:"Motion & Presence",
  needsExtraParts:true, extraParts:["OLED SSD1306"], source:"mcl",
  summary:"Count entries/exits with two beams (or PIR + ultrasonic) and show current occupancy.",
  whyBoard:"S3 for logic + Wi-Fi; OLED or the C6 screen for the count.",
  parts:["2× IR Obstacle Avoidance","OLED SSD1306","ESP32-S3"],
  prototype:{ breadboard:["Two beams across a doorway; order of breaks = in vs out.","Increment/decrement a counter; display + publish."],
    wiring:[{from:"Beam A/B",to:"GPIO4/5"},{from:"OLED",to:"I2C"}],
    simulator:{tool:"Wokwi",notes:"Use two buttons to emulate beam breaks.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`int A=4,B=5,count=0;
void setup(){ pinMode(A,INPUT);pinMode(B,INPUT);Serial.begin(115200); }
void loop(){ /* detect A-then-B (in) vs B-then-A (out), update count */ }` },
  makeItReal:["Print a slim doorframe bar holding both beams aligned.","Publish occupancy to Home Assistant.","Drive HVAC/lights off the count."]
},
{
  id:"door-sensor", title:"Door / Window Open Sensor", glyph:"🚪", difficulty:"Beginner",
  boards:["c6mini"], inputs:["reed"], outputs:["wifi","ble"], category:"Motion & Presence",
  needsExtraParts:false, extraParts:[], source:"rnt-sensors",
  summary:"A reed switch wakes the board from deep sleep the instant a door opens, then it reports and sleeps.",
  whyBoard:"C6 Mini: reed on an RTC-wake pin = µA standby, months on a coin/LiPo.",
  parts:["Reed Switch (KY-021)","magnet","ESP32-C6 Super Mini"],
  prototype:{ breadboard:["Reed between an RTC-GPIO and GND; magnet on the door.","Wake on change → publish open/closed → deep sleep."],
    wiring:[{from:"Reed",to:"RTC-GPIO ↔ GND"}],
    simulator:{tool:"Wokwi",notes:"Use a button to emulate the reed.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <esp_sleep.h>
#define REED 2
void setup(){ Serial.begin(115200);
  Serial.println(digitalRead(REED)?"OPEN":"CLOSED");
  esp_deep_sleep_enable_gpio_wakeup(1ULL<<REED, ESP_GPIO_WAKEUP_GPIO_HIGH);
  esp_deep_sleep_start(); }
void loop(){}` },
  makeItReal:["Print a two-piece case: board+reed on the frame, magnet on the door.","Run on LiPo; deep sleep between events.","Join Home Assistant via Matter/MQTT."]
},
{
  id:"bike-alarm", title:"Bike / Parcel Vibration Alarm", glyph:"📳", difficulty:"Beginner",
  boards:["c6mini","s3"], inputs:["vibration","tilt"], outputs:["buzzer","ble"], category:"Motion & Presence",
  needsExtraParts:false, extraParts:[], source:"awesome-esp-projects",
  summary:"Arm it, and any jostle triggers a siren and a phone alert. Tamper detection on the cheap.",
  whyBoard:"C6 Mini hides on the bike; BLE/Wi-Fi to ping your phone.",
  parts:["Vibration / Shock (SW-420)","Tilt Switch (SW-520D)","Active Buzzer"],
  prototype:{ breadboard:["SW-420 DO to a GPIO; on trigger sound the buzzer + notify.","Add an arm/disarm via button or phone."],
    wiring:[{from:"SW-420 DO",to:"GPIO4"},{from:"Buzzer",to:"GPIO5"}],
    simulator:{tool:"Wokwi",notes:"Emulate trigger with a button.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`bool armed=true;
void setup(){ pinMode(4,INPUT);pinMode(5,OUTPUT); }
void loop(){ if(armed && digitalRead(4)){ digitalWrite(5,HIGH); delay(3000); digitalWrite(5,LOW);} }` },
  makeItReal:["Print a discreet under-seat clip case.","LiPo + deep sleep, wake on vibration interrupt.","Arm/disarm over BLE from your phone."]
},
{
  id:"tachometer", title:"Magnetic Tachometer / Counter", glyph:"🧲", difficulty:"Intermediate",
  boards:["s3","c6-lcd"], inputs:["hall"], outputs:["tft","oled"], category:"Motion & Presence",
  needsExtraParts:false, extraParts:[], source:"rnt-sensors",
  summary:"Count magnet passes per second to measure RPM of a wheel, fan or motor.",
  whyBoard:"C6+screen shows live RPM; interrupts keep counts accurate.",
  parts:["Hall Sensor (KY-003)","small magnet","ESP32-C6-LCD-1.47"],
  prototype:{ breadboard:["Magnet on the rotating part; hall fixed nearby.","Count interrupts per second → RPM."],
    wiring:[{from:"Hall S",to:"GPIO4 (interrupt)"}],
    simulator:{tool:"Wokwi",notes:"Emulate pulses with a button.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`volatile unsigned long c=0;
void IRAM_ATTR tick(){ c++; }
void setup(){ pinMode(4,INPUT_PULLUP); attachInterrupt(4,tick,FALLING); Serial.begin(115200); }
void loop(){ static unsigned long t=0,last=0; if(millis()-t>1000){ Serial.println((c-last)*60); last=c; t=millis(); } }` },
  makeItReal:["Print a bracket holding the hall at the right gap.","Add a magnet to the wheel/fan.","Show RPM on the TFT with a gauge."]
},
{
  id:"step-counter", title:"Wearable Step Counter", glyph:"🧭", difficulty:"Intermediate",
  boards:["c6mini","s3"], inputs:["imu"], outputs:["oled","ble"], category:"Motion & Presence",
  needsExtraParts:true, extraParts:["MPU6050 Accelerometer + Gyro (IMU)","OLED SSD1306"], source:"100days",
  summary:"Detect walking peaks from an accelerometer to count steps; show them or send to your phone.",
  whyBoard:"C6 Mini is small/low-power for a wrist or belt clip.",
  parts:["MPU6050","OLED SSD1306","ESP32-C6 Super Mini"],
  prototype:{ breadboard:["MPU6050 on I2C.","Detect acceleration-magnitude peaks above a threshold = steps."],
    wiring:[{from:"MPU6050 SDA/SCL",to:"I2C"}],
    simulator:{tool:"Wokwi",notes:"MPU6050 + OLED supported.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <Wire.h>
#include <MPU6050_light.h>
MPU6050 mpu(Wire); long steps=0;
void setup(){ Wire.begin(); mpu.begin(); mpu.calcOffsets(); }
void loop(){ mpu.update(); float a=mpu.getAccZ();
  static bool up=false; if(a>1.2&&!up){steps++;up=true;} if(a<1.05)up=false; }` },
  makeItReal:["Print a small wrist/belt enclosure with a LiPo pocket.","Show steps on OLED; sync over BLE.","Deep-sleep between samples for battery life."]
},
{
  id:"fall-detector", title:"Fall Detection Alert", glyph:"🆘", difficulty:"Advanced",
  boards:["c6mini","s3"], inputs:["imu"], outputs:["wifi","buzzer"], category:"Motion & Presence",
  needsExtraParts:true, extraParts:["MPU6050 Accelerometer + Gyro (IMU)"], source:"efy",
  summary:"Spot the free-fall-then-impact signature and send an SOS if there's no 'I'm OK' cancel.",
  whyBoard:"C6 for connectivity; wearable form via the Mini.",
  parts:["MPU6050","Active Buzzer","ESP32-C6 Super Mini"],
  prototype:{ breadboard:["Watch for low-g (free fall) followed by a high-g spike + stillness.","Start a cancel countdown; if not cancelled → alert."],
    wiring:[{from:"MPU6050 SDA/SCL",to:"I2C"},{from:"Button (cancel)",to:"GPIO"}],
    simulator:{tool:"Wokwi",notes:"Prototype thresholds with MPU6050 in sim.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Detect |a|<0.4g then >2.5g within 500ms, then ~no motion -> alert.
// Full algorithm: see EFY fall-detection write-up.` },
  makeItReal:["Wearable pendant enclosure + LiPo.","Send SOS via Telegram/SMS gateway.","Tune thresholds to reduce false positives."]
},
{
  id:"smart-scale", title:"Smart Kitchen Scale", glyph:"⚖️", difficulty:"Intermediate",
  boards:["c6-lcd","s3"], inputs:["weight"], outputs:["tft","wifi"], category:"Motion & Presence",
  needsExtraParts:true, extraParts:["HX711 + Load Cell"], source:"rnt-sensors",
  summary:"Read a load cell via HX711, tare with a button, and show grams on the screen.",
  whyBoard:"C6+screen displays weight; S3 fine too.",
  parts:["HX711 + Load Cell","Push Button","ESP32-C6-LCD-1.47"],
  prototype:{ breadboard:["HX711 DT/SCK to two GPIOs; calibrate with a known weight.","Tare on button; show grams."],
    wiring:[{from:"HX711 DT/SCK",to:"GPIO4/5"}],
    simulator:{tool:"Wokwi",notes:"HX711 not simulated — bench-test.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include "HX711.h"
HX711 scale;
void setup(){ scale.begin(4,5); scale.set_scale(420.f); scale.tare(); }
void loop(){ Serial.println(scale.get_units(5),1); delay(300); }` },
  makeItReal:["Print a platform + base that sandwiches the load cell.","Add tare/units buttons.","Log recipes or push weight to an app."]
},

/* =================== 4. DISPLAYS & UI =================== */
{
  id:"tft-menu", title:"Rotary-Encoder TFT Menu", glyph:"🖥️", difficulty:"Intermediate",
  boards:["c6-lcd","tembed"], inputs:["encoder"], outputs:["tft"], category:"Displays & UI",
  needsExtraParts:false, extraParts:[], source:"waveshare-c6",
  summary:"A scrollable, selectable menu system on the color screen — the foundation for any handheld tool.",
  whyBoard:"C6+screen and T-Embed both have an encoder/UI; reuse for every device.",
  parts:["Rotary Encoder (KY-040)","ESP32-C6-LCD-1.47"],
  prototype:{ breadboard:["Encoder rotation moves the highlight; click selects.","Render a list with the ST7789 (TFT_eSPI or LVGL)."],
    wiring:[{from:"Encoder CLK/DT/SW",to:"3 GPIO"}],
    simulator:{tool:"Wokwi",notes:"Prototype menu logic on S3+OLED, port to C6 TFT.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Maintain int selected; on rotate +/- and wrap; on click run action.
// Draw items with TFT_eSPI: tft.drawString(item[i], x, y, font), invert the selected row.` },
  makeItReal:["Reuse as the shell for the Pomodoro, radar, IR remote, etc.","Print a handheld case with a knob cutout.","Add LVGL for animated UI."]
},
{
  id:"tft-dashboard", title:"1.47\" Network Dashboard", glyph:"📺", difficulty:"Intermediate",
  boards:["c6-lcd"], inputs:[], outputs:["tft","wifi"], category:"Displays & UI",
  needsExtraParts:false, extraParts:[], source:"waveshare-c6",
  summary:"Pull time, weather and a couple of stats from the internet and tile them on the screen.",
  whyBoard:"C6+screen + Wi-Fi 6: a self-contained desk dashboard.",
  parts:["ESP32-C6-LCD-1.47","Wi-Fi"],
  prototype:{ breadboard:["Connect Wi-Fi, fetch JSON (time/weather API).","Lay out cards/widgets on the TFT; refresh on a timer."],
    wiring:[],
    simulator:{tool:"Wokwi",notes:"Prototype HTTP + layout on S3.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <WiFi.h>
#include <HTTPClient.h>
void setup(){ WiFi.begin("SSID","PASS"); }
void loop(){ if(WiFi.status()==WL_CONNECTED){ HTTPClient h; h.begin("http://worldtimeapi.org/api/ip");
  if(h.GET()==200) Serial.println(h.getString()); h.end(); } delay(60000); }` },
  makeItReal:["Print an angled desk frame for the screen.","USB-C powered, always on.","Add config via a captive portal."]
},
{
  id:"oled-stats", title:"PC/Server Stats OLED", glyph:"📟", difficulty:"Intermediate",
  boards:["s3","c3"], inputs:[], outputs:["oled","wifi"], category:"Displays & UI",
  needsExtraParts:true, extraParts:["OLED SSD1306"], source:"awesome-esp",
  summary:"Show CPU/RAM/net stats your computer pushes over the network on a tiny desk OLED.",
  whyBoard:"S3/C3 + OLED; a companion script on the PC posts the numbers.",
  parts:["OLED SSD1306","ESP32-S3"],
  prototype:{ breadboard:["ESP runs a tiny web endpoint; a PC script POSTs stats.","Render bars/numbers on the OLED."],
    wiring:[{from:"OLED",to:"I2C"}],
    simulator:{tool:"Wokwi",notes:"OLED + Wi-Fi server.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Run a WebServer; on POST /stats parse cpu,ram; draw to SSD1306.` },
  makeItReal:["Print a monitor-clip mount.","Auto-start the PC sender.","Show alerts when CPU/temp spikes."]
},
{
  id:"matrix-ticker", title:"Scrolling LED-Matrix Ticker", glyph:"🟩", difficulty:"Intermediate",
  boards:["s3","c6-lcd"], inputs:[], outputs:["matrix","wifi"], category:"Displays & UI",
  needsExtraParts:false, extraParts:[], source:"awesome-esp",
  summary:"Scroll messages, time, or live data (weather, crypto, notifications) across an 8×8 matrix chain.",
  whyBoard:"S3 drives MAX7219 over SPI; fetch text over Wi-Fi.",
  parts:["8×8 LED Matrix (MAX7219)","ESP32-S3"],
  prototype:{ breadboard:["Chain matrices over SPI (DIN/CS/CLK).","Use MD_Parola to scroll text fetched from the net."],
    wiring:[{from:"DIN/CS/CLK",to:"SPI pins"}],
    simulator:{tool:"Wokwi",notes:"MAX7219 matrix supported.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <MD_Parola.h>
#include <MD_MAX72XX.h>
MD_Parola p = MD_Parola(MD_MAX72XX::FC16_HW, 5, 4); // DIN,CLK via SPI, CS=5
void setup(){ p.begin(); p.displayText("HELLO", PA_CENTER,50,0,PA_SCROLL_LEFT,PA_SCROLL_LEFT); }
void loop(){ if(p.displayAnimate()) p.displayReset(); }` },
  makeItReal:["Print a long bezel for a 4-module bar.","Wall-mount near the door for the daily brief.","Pull notifications via MQTT/webhooks."]
},
{
  id:"seven-seg-counter", title:"TM1637 Digit Counter/Score", glyph:"🔢", difficulty:"Beginner",
  boards:["c3","s3"], inputs:["button"], outputs:["7segment"], category:"Displays & UI",
  needsExtraParts:false, extraParts:[], source:"randomnerd",
  summary:"Four-digit numeric display for scores, counts, or a countdown — only two data pins.",
  whyBoard:"Any board; two pins for the whole display.",
  parts:["TM1637 4-Digit 7-Seg","2× Push Button"],
  prototype:{ breadboard:["CLK/DIO to two GPIOs.","Buttons increment/decrement; show the number."],
    wiring:[{from:"CLK/DIO",to:"GPIO4/5"}],
    simulator:{tool:"Wokwi",notes:"TM1637 supported.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <TM1637Display.h>
TM1637Display d(4,5); int n=0;
void setup(){ d.setBrightness(5); d.showNumberDec(n); }
void loop(){ /* read buttons, n++/n--, d.showNumberDec(n) */ }` },
  makeItReal:["Print a scoreboard bezel.","Add a buzzer for zero/limit.","Use as a gym rep counter."]
},
{
  id:"ambient-clock", title:"WS2812 Ambient Light Clock", glyph:"🕛", difficulty:"Intermediate",
  boards:["c6-lcd","s3"], inputs:[], outputs:["ws2812","wifi"], category:"Displays & UI",
  needsExtraParts:true, extraParts:["WS2812B Addressable LED Strip"], source:"wled",
  summary:"Map hours/minutes onto a LED ring/strip with smooth color — a glanceable, gorgeous clock.",
  whyBoard:"C6 syncs time over Wi-Fi; WLED-style effects on the strip.",
  parts:["WS2812B Strip/Ring","ESP32-C6-LCD-1.47"],
  prototype:{ breadboard:["NTP-sync time; map hour/min/sec to LED positions + hues.","Add a breathing background."],
    wiring:[{from:"Strip DIN",to:"GPIO + level shift"}],
    simulator:{tool:"Wokwi",notes:"WS2812 strip supported.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// NTP time -> index = minute*ledcount/60; px.setPixelColor(index, hue); px.show();` },
  makeItReal:["Print a ring diffuser + wall mount.","Or flash WLED for a no-code option.","Add brightness auto-dim via LDR."]
},
{
  id:"animated-eyes", title:"Animated 'Robot Eyes' UI", glyph:"👀", difficulty:"Intermediate",
  boards:["c6-lcd","s3"], inputs:["touch"], outputs:["tft","oled"], category:"Displays & UI",
  needsExtraParts:false, extraParts:[], source:"100days",
  summary:"Blinking, glancing cartoon eyes that react to touch/sound — give any gadget a personality.",
  whyBoard:"C6 TFT for color eyes; or SSD1306 for the classic mono look.",
  parts:["ESP32-C6-LCD-1.47","Capacitive Touch (TTP223)"],
  prototype:{ breadboard:["Draw two eyes; animate blink/glance with timers.","React to touch (look toward) and idle randomly."],
    wiring:[{from:"Touch",to:"GPIO4"}],
    simulator:{tool:"Wokwi",notes:"Prototype on SSD1306 in Wokwi.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Draw filled rounded-rect eyes; periodically squash height for a blink;
// offset pupils toward last interaction. Use TFT_eSPI sprites for smoothness.` },
  makeItReal:["Print a face shell with a screen window.","Add a mic to glance toward sound.","Mount on top of another project as a 'face'."]
},
{
  id:"touch-control-panel", title:"Home-Assistant Touch Panel (CYD-style)", glyph:"📲", difficulty:"Advanced",
  boards:["s3","c6-lcd"], inputs:["touch"], outputs:["tft","wifi"], category:"Displays & UI",
  needsExtraParts:false, extraParts:[], source:"cyd-panel",
  summary:"An LVGL wall panel with buttons that call Home Assistant directly — lights, scenes, status.",
  whyBoard:"S3 muscle for LVGL; integrate via ESPHome for no-automation control.",
  parts:["ESP32-S3 + touchscreen (or C6-LCD)","Wi-Fi"],
  prototype:{ breadboard:["Build an LVGL screen of toggle tiles.","ESPHome config calls HA services on tap; sync state back."],
    wiring:[],
    simulator:{tool:"Wokwi",notes:"Prototype LVGL UI; HA calls need real network.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`# ESPHome (YAML) is the easy path — see the CYD panel repo for a full lvgl: config.` },
  makeItReal:["Print a flush wall/desk mount (STL in the CYD repo).","Hidden cable routing + USB feed.","Add a lock screen + live time."]
},
{
  id:"notifier-strip", title:"Desk Notifier Light Bar", glyph:"🔔", difficulty:"Intermediate",
  boards:["s3","c6-lcd"], inputs:[], outputs:["ws2812","wifi"], category:"Displays & UI",
  needsExtraParts:true, extraParts:["WS2812B Addressable LED Strip"], source:"awesome-esp",
  summary:"A strip that glows by event: green build passed, blue new email, red calendar in 5 min.",
  whyBoard:"S3/C6 + Wi-Fi receive webhooks/MQTT and animate the strip.",
  parts:["WS2812B Strip","ESP32-S3"],
  prototype:{ breadboard:["Run a tiny endpoint or subscribe to MQTT.","Map topics to colors/animations."],
    wiring:[{from:"Strip DIN",to:"GPIO + level shift"}],
    simulator:{tool:"Wokwi",notes:"WS2812 + Wi-Fi.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Subscribe MQTT topic 'notify'; payload 'build_pass' -> green wipe, etc.` },
  makeItReal:["Print a frosted bar diffuser for the monitor edge.","Wire IFTTT/GitHub Actions/HA to it.","Add a mute button."]
},
{
  id:"lcd-readout", title:"LCD1602 Sensor Readout", glyph:"🔡", difficulty:"Beginner",
  boards:["c3","s3"], inputs:["temperature"], outputs:["lcd"], category:"Displays & UI",
  needsExtraParts:false, extraParts:[], source:"100days",
  summary:"Two lines of crisp text for any sensor value — the no-graphics, always-readable display.",
  whyBoard:"Any board; I2C backpack = two wires.",
  parts:["LCD1602 (I2C)","DHT11 Temp + Humidity"],
  prototype:{ breadboard:["Scan for the LCD I2C address (0x27/0x3F).","Print labels + values on two rows."],
    wiring:[{from:"LCD SDA/SCL",to:"I2C"}],
    simulator:{tool:"Wokwi",notes:"I2C LCD supported.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27,16,2);
void setup(){ lcd.init(); lcd.backlight(); lcd.print("Hello ESP32"); }
void loop(){}` },
  makeItReal:["Print a retro instrument-panel bezel.","Add a contrast trim access hole.","Great for makerspace status signs."]
},

/* =================== 5. AUDIO =================== */
{
  id:"buzzer-jukebox", title:"Passive-Buzzer Jukebox", glyph:"🎵", difficulty:"Beginner",
  boards:["c3","s3"], inputs:["button"], outputs:["buzzer"], category:"Audio",
  needsExtraParts:false, extraParts:[], source:"100days",
  summary:"Play melodies (note frequencies + durations) and pick songs with buttons.",
  whyBoard:"Any board; tone()/LEDC drives the passive buzzer.",
  parts:["Passive Buzzer","2× Push Button"],
  prototype:{ breadboard:["Buzzer on a PWM pin; define note arrays.","Buttons select tunes."],
    wiring:[{from:"Buzzer",to:"GPIO18"}],
    simulator:{tool:"Wokwi",notes:"Passive buzzer + tone() supported.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`int mel[]={262,294,330,349,392}, dur=250;
void setup(){}
void loop(){ for(int n:mel){ tone(18,n,dur); delay(dur+30);} noTone(18); delay(1000); }` },
  makeItReal:["Print a tiny music-box case.","Add a lid switch (reed) to play on open.","Map buttons to favorite jingles."]
},
{
  id:"clap-switch", title:"Clap-Activated Switch", glyph:"👏", difficulty:"Beginner",
  boards:["c3","s3"], inputs:["sound"], outputs:["relay","led"], category:"Audio",
  needsExtraParts:false, extraParts:[], source:"mcl",
  summary:"Toggle a light on a double-clap using the sound sensor's digital threshold output.",
  whyBoard:"Any board; the analog mic's DO trips on loud sounds.",
  parts:["Analog Microphone / Sound","Relay Module (1-ch)"],
  prototype:{ breadboard:["Mic DO to a GPIO; detect two claps within a window.","Toggle a relay/LED."],
    wiring:[{from:"Mic DO",to:"GPIO4"},{from:"Relay IN",to:"GPIO5"}],
    simulator:{tool:"Wokwi",notes:"Emulate claps with a button.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`int last=0,claps=0; bool on=false;
void setup(){ pinMode(4,INPUT);pinMode(5,OUTPUT); }
void loop(){ if(digitalRead(4)){ if(millis()-last<400)claps++; else claps=1; last=millis();
  if(claps==2){on=!on;digitalWrite(5,on);claps=0;} delay(50);} }` },
  makeItReal:["Print a ceiling/wall puck with a mic port.","⚠️ Low-voltage load to start.","Tune the mic sensitivity pot."]
},
{
  id:"audio-spectrum", title:"Music Spectrum Visualizer", glyph:"🎚️", difficulty:"Advanced",
  boards:["s3"], inputs:["sound"], outputs:["ws2812","tft"], category:"Audio",
  needsExtraParts:true, extraParts:["INMP441 I2S Microphone","WS2812B Addressable LED Strip"], source:"awesome-esp",
  summary:"FFT a clean I2S mic feed and paint frequency bands across LEDs or the screen.",
  whyBoard:"S3's speed + SIMD handle real-time FFT comfortably.",
  parts:["INMP441 I2S Mic","WS2812B Strip","ESP32-S3"],
  prototype:{ breadboard:["I2S mic in; run arduinoFFT on the samples.","Map bins to LED columns / TFT bars."],
    wiring:[{from:"INMP441 SD/WS/SCK",to:"I2S pins"},{from:"Strip DIN",to:"GPIO"}],
    simulator:{tool:"Wokwi",notes:"I2S audio not simulated — develop on hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Read I2S frames -> arduinoFFT -> magnitude bins -> color columns on WS2812.` },
  makeItReal:["Print a frosted bar or a grid panel.","Wall-mount behind the desk/speakers.","Add peak-hold and palette presets."]
},
{
  id:"voice-relay", title:"Voice-Command Relay (TinyML)", glyph:"🗣️", difficulty:"Advanced",
  boards:["s3"], inputs:["sound"], outputs:["relay","wifi"], category:"Audio",
  needsExtraParts:true, extraParts:["INMP441 I2S Microphone","MAX98357A I2S Amplifier + Speaker"], source:"edgeimpulse",
  summary:"On-device keyword spotting ('on'/'off') toggles a relay — offline, no cloud.",
  whyBoard:"S3 runs a small TFLite Micro keyword model in real time.",
  parts:["INMP441 I2S Mic","Relay Module (1-ch)","ESP32-S3"],
  prototype:{ breadboard:["Collect samples in Edge Impulse; train a keyword model.","Deploy as an Arduino library; act on detections."],
    wiring:[{from:"INMP441",to:"I2S pins"},{from:"Relay",to:"GPIO"}],
    simulator:{tool:"Wokwi",notes:"Train/deploy on real hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Include the Edge Impulse SDK library; on classifier result 'on'/'off' set the relay.` },
  makeItReal:["Print a smart-switch enclosure.","Add an audible/visual ack.","Combine with the talking clock for voice feedback."]
},
{
  id:"web-radio", title:"ESP32 Internet Radio", glyph:"📻", difficulty:"Advanced",
  boards:["s3"], inputs:["encoder"], outputs:["speaker","tft"], category:"Audio",
  needsExtraParts:true, extraParts:["MAX98357A I2S Amplifier + Speaker"], source:"esp32-radio",
  summary:"Stream internet radio over Wi-Fi to an I2S amp + speaker, with station select on the screen.",
  whyBoard:"S3 decodes the stream; I2S amp gives real sound.",
  parts:["MAX98357A + speaker","Rotary Encoder (KY-040)","ESP32-S3"],
  prototype:{ breadboard:["Connect Wi-Fi; open an MP3/AAC stream URL.","Decode → I2S amp; encoder changes stations."],
    wiring:[{from:"MAX98357 BCLK/LRC/DIN",to:"I2S pins"},{from:"Encoder",to:"3 GPIO"}],
    simulator:{tool:"Wokwi",notes:"Audio streaming needs hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Use the ESP32-audioI2S library: audio.connecttohost("http://stream-url");
// audio.setVolume(12); call audio.loop() continuously.` },
  makeItReal:["Print a retro radio shell with a grille + knob.","Add presets + a clock.","Or start from the Edzelf ESP32-Radio firmware."]
},
{
  id:"talking-clock", title:"Talking / Chiming Clock", glyph:"🔈", difficulty:"Intermediate",
  boards:["s3","c6-lcd"], inputs:[], outputs:["speaker","tft"], category:"Audio",
  needsExtraParts:true, extraParts:["MAX98357A I2S Amplifier + Speaker"], source:"circuitdigest",
  summary:"Announce the time or chime on the hour using stored WAV clips played over I2S.",
  whyBoard:"S3 for I2S audio; NTP keeps it accurate.",
  parts:["MAX98357A + speaker","ESP32-S3"],
  prototype:{ breadboard:["Store number WAVs in flash/SD.","On the hour, sequence clips: 'It is ten o'clock'."],
    wiring:[{from:"MAX98357",to:"I2S pins"}],
    simulator:{tool:"Wokwi",notes:"Audio on hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Play WAV files from SPIFFS/SD via ESP8266Audio (AudioFileSourceSPIFFS + AudioOutputI2S).` },
  makeItReal:["Print a mantel-clock case with a speaker grille.","Add a snooze/repeat button.","Combine with the alarm clock project."]
},
{
  id:"sound-leds", title:"Sound-Reactive Party LEDs", glyph:"🔊", difficulty:"Beginner",
  boards:["s3","c3"], inputs:["sound"], outputs:["ws2812"], category:"Audio",
  needsExtraParts:false, extraParts:[], source:"100days",
  summary:"The kit's analog mic drives brightness/color of the RGB bar — quick reactive lighting.",
  whyBoard:"Any board; uses the kit mic (no extra parts).",
  parts:["Analog Microphone / Sound","WS2812 RGB LED"],
  prototype:{ breadboard:["Read mic AO; smooth it; map level to LED count/brightness.","Color shifts with intensity."],
    wiring:[{from:"Mic AO",to:"ADC GPIO"},{from:"WS2812 DIN",to:"GPIO"}],
    simulator:{tool:"Wokwi",notes:"Emulate level with a pot.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <Adafruit_NeoPixel.h>
Adafruit_NeoPixel px(8,5,NEO_GRB+NEO_KHZ800);
void setup(){ px.begin(); }
void loop(){ int lvl=map(analogRead(34),0,2048,0,8);
  px.clear(); for(int i=0;i<lvl;i++)px.setPixelColor(i,px.Color(0,150,255)); px.show(); }` },
  makeItReal:["Print a diffused bar.","Upgrade mic to INMP441 for true spectrum (see visualizer).","Battery for a portable party light."]
},

/* =================== 6. HOME AUTOMATION =================== */
{
  id:"matter-sensor", title:"Matter Temp/Humidity Sensor", glyph:"🏠", difficulty:"Advanced",
  boards:["c6-lcd","c6mini"], inputs:["temperature","humidity"], outputs:["network"], category:"Home Automation",
  needsExtraParts:false, extraParts:[], source:"esphome",
  summary:"A native Matter/Thread sensor that pairs straight into Apple Home / Google / Home Assistant.",
  whyBoard:"Only your C6 boards have the 802.15.4 radio for Thread/Matter.",
  parts:["ESP32-C6 (LCD or Mini)","DHT11 Temp + Humidity"],
  prototype:{ breadboard:["Use ESP-Matter / ESPHome to expose a temperature endpoint.","Commission with the QR/code into your ecosystem."],
    wiring:[{from:"DHT DATA",to:"GPIO2"}],
    simulator:{tool:"Wokwi",notes:"Matter commissioning needs hardware + a hub.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// ESPHome is the simplest path: a 'matter:' + 'sensor: dht' config.
// Or use Espressif's esp-matter examples in ESP-IDF.` },
  makeItReal:["Print a vented wall pod.","Battery + deep sleep on the Mini.","Add it to scenes/automations in your hub."]
},
{
  id:"zigbee-button", title:"Zigbee/Thread Smart Button", glyph:"🔘", difficulty:"Advanced",
  boards:["c6mini","c6-lcd"], inputs:["button"], outputs:["network"], category:"Home Automation",
  needsExtraParts:false, extraParts:[], source:"esphome",
  summary:"A wireless scene button (single/double/hold) that triggers automations on your hub.",
  whyBoard:"C6's 802.15.4 radio joins Zigbee/Thread directly — no Wi-Fi load.",
  parts:["Push Button","ESP32-C6 Super Mini"],
  prototype:{ breadboard:["Expose a Zigbee/Thread switch endpoint.","Map click patterns to commands; deep-sleep between."],
    wiring:[{from:"Button",to:"RTC-GPIO (wake)"}],
    simulator:{tool:"Wokwi",notes:"Needs hardware + a Zigbee/Thread coordinator.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Use esp-zigbee-sdk on the C6, or ESPHome's zigbee/thread support.` },
  makeItReal:["Print a wall-mount button plate.","Coin/LiPo powered for years on deep sleep.","Bind to lights/scenes in your hub."]
},
{
  id:"esphome-relay", title:"ESPHome Smart Plug / Fan", glyph:"🔌", difficulty:"Intermediate",
  boards:["s3","c6-lcd"], inputs:["temperature"], outputs:["relay","network"], category:"Home Automation",
  needsExtraParts:false, extraParts:[], source:"esphome",
  summary:"Switch a load from Home Assistant and add a temperature rule (fan on when warm) — no code.",
  whyBoard:"Any Wi-Fi board; ESPHome YAML does the work.",
  parts:["Relay Module (1-ch)","DHT11 Temp + Humidity","ESP32-S3"],
  prototype:{ breadboard:["Flash ESPHome with a switch + sensor + automation.","Control/monitor from HA."],
    wiring:[{from:"Relay IN",to:"GPIO5"},{from:"DHT",to:"GPIO4"}],
    simulator:{tool:"Wokwi",notes:"Prototype relay logic; HA needs network.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`# ESPHome YAML:
switch: [{platform: gpio, pin: GPIO5, name: "Fan"}]
sensor: [{platform: dht, pin: GPIO4, temperature: {name: "Temp"}}]` },
  makeItReal:["⚠️ Mains switching needs a proper enclosure + isolation.","Print a UL-style box for low-voltage loads.","Add HA automations + scheduling."]
},
{
  id:"mqtt-node", title:"MQTT Sensor Node", glyph:"📨", difficulty:"Intermediate",
  boards:["s3","c6mini"], inputs:["temperature","humidity"], outputs:["network"], category:"Home Automation",
  needsExtraParts:false, extraParts:[], source:"mcl",
  summary:"Publish readings to an MQTT broker for dashboards/automation — the IoT lingua franca.",
  whyBoard:"Any Wi-Fi board; tiny payloads, deep-sleep friendly on the Mini.",
  parts:["DHT11 Temp + Humidity","ESP32-S3"],
  prototype:{ breadboard:["Connect Wi-Fi + broker; publish JSON to a topic.","Subscribe for commands (optional)."],
    wiring:[{from:"DHT DATA",to:"GPIO4"}],
    simulator:{tool:"Wokwi",notes:"Wokwi has an MQTT-capable network.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <WiFi.h>
#include <PubSubClient.h>
WiFiClient w; PubSubClient mq(w);
void setup(){ WiFi.begin("SSID","PASS"); mq.setServer("192.168.1.10",1883); }
void loop(){ if(!mq.connected()) mq.connect("esp32"); mq.publish("home/temp","22.5"); delay(10000); }` },
  makeItReal:["Print a small wall pod.","Use Home Assistant MQTT discovery for auto-setup.","Deep-sleep on battery."]
},
{
  id:"smart-doorbell", title:"Smart Doorbell + Snapshot", glyph:"🔔", difficulty:"Advanced",
  boards:["s3cam"], inputs:["button","camera"], outputs:["wifi","network"], category:"Home Automation",
  needsExtraParts:false, extraParts:[], source:"makemindz",
  summary:"Press the button → capture a photo and push a notification with the image.",
  whyBoard:"S3-CAM: button triggers a capture and a Telegram/HA notification.",
  parts:["Push Button","ESP32-S3-CAM"],
  prototype:{ breadboard:["Button on a GPIO; on press capture a JPEG.","Send via Telegram bot / HA webhook."],
    wiring:[{from:"Button",to:"free GPIO"}],
    simulator:{tool:"Wokwi",notes:"Camera + push needs hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// esp_camera_fb_get() on press; POST the JPEG to a Telegram sendPhoto endpoint.` },
  makeItReal:["Print a doorbell faceplate with a lens hole + button.","Power from a USB feed.","Add a chime via the talking-clock speaker."]
},
{
  id:"presence-beacon", title:"BLE Presence Beacon", glyph:"📍", difficulty:"Intermediate",
  boards:["c6mini","s3"], inputs:[], outputs:["ble"], category:"Home Automation",
  needsExtraParts:false, extraParts:[], source:"awesome-esp",
  summary:"Advertise a BLE beacon so your hub detects when you're home and runs room automations.",
  whyBoard:"Tiny, low-power C6 Mini broadcasting iBeacon/Eddystone.",
  parts:["ESP32-C6 Super Mini"],
  prototype:{ breadboard:["Advertise a fixed UUID beacon.","HA/room-assistant uses RSSI for presence."],
    wiring:[],
    simulator:{tool:"Wokwi",notes:"BLE advertising; use a phone scanner to verify.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <BLEDevice.h>
#include <BLEBeacon.h>
void setup(){ BLEDevice::init("beacon"); BLEDevice::getAdvertising()->start(); }
void loop(){}` },
  makeItReal:["Print a keychain/tag enclosure.","Coin-cell or LiPo powered.","Tune TX power for room granularity."]
},
{
  id:"thermostat", title:"Wi-Fi Thermostat", glyph:"🌡️", difficulty:"Advanced",
  boards:["c6-lcd"], inputs:["temperature","encoder"], outputs:["relay","tft","network"], category:"Home Automation",
  needsExtraParts:false, extraParts:[], source:"mcl",
  summary:"Set a target with the knob; the screen shows current vs target and a relay drives the heater/fan.",
  whyBoard:"C6+screen = setpoint UI + Matter/MQTT control in one device.",
  parts:["DHT11 Temp + Humidity","Rotary Encoder (KY-040)","Relay Module (1-ch)","ESP32-C6-LCD-1.47"],
  prototype:{ breadboard:["Read temp; encoder sets target; relay with hysteresis.","Show both temps + state on the TFT; expose to HA."],
    wiring:[{from:"DHT",to:"GPIO2"},{from:"Encoder",to:"3 GPIO"},{from:"Relay",to:"GPIO"}],
    simulator:{tool:"Wokwi",notes:"Prototype control logic on S3.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`float target=21; bool heat=false;
void control(float t){ if(t<target-0.5)heat=true; if(t>target+0.5)heat=false; /* drive relay */ }` },
  makeItReal:["⚠️ HVAC wiring varies — start with a low-voltage demo load.","Print a wall thermostat housing.","Add schedules + HA integration."]
},
{
  id:"curtain-opener", title:"Automated Curtain/Blind", glyph:"🪟", difficulty:"Intermediate",
  boards:["s3","c6-lcd"], inputs:["ldr"], outputs:["stepper","network"], category:"Home Automation",
  needsExtraParts:false, extraParts:[], source:"awesome-esp",
  summary:"Open blinds at sunrise (or by schedule/app) using the geared stepper.",
  whyBoard:"S3/C6 drive the 28BYJ-48; LDR or NTP triggers timing.",
  parts:["28BYJ-48 Stepper + ULN2003","Photoresistor (LDR)","ESP32-S3"],
  prototype:{ breadboard:["Stepper turns a rod/pulley to open/close.","Trigger by light level, schedule, or app button."],
    wiring:[{from:"ULN2003 IN1-4",to:"4 GPIO"},{from:"LDR",to:"ADC"}],
    simulator:{tool:"Wokwi",notes:"Stepper supported.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <Stepper.h>
Stepper st(2048, 13,14,12,27);
void setup(){ st.setSpeed(10); }
void loop(){ /* on trigger: st.step(2048*turns) */ }` },
  makeItReal:["Print a bracket + pulley/gear for your blind type.","Add limit switches to avoid over-travel.","Control from HA + sunrise schedule."]
},
{
  id:"wled-strip", title:"WLED Ambient Lighting", glyph:"🌈", difficulty:"Beginner",
  boards:["s3","c3","c6-lcd"], inputs:[], outputs:["ws2812","wifi","network"], category:"Home Automation",
  needsExtraParts:true, extraParts:["WS2812B Addressable LED Strip"], source:"wled",
  summary:"Flash the WLED firmware and control an LED strip from a phone app, voice, or Home Assistant — no coding.",
  whyBoard:"Any Wi-Fi board; the famous WLED project does the rest.",
  parts:["WS2812B Strip","ESP32 (S3/C3)","5V supply + level shifter"],
  prototype:{ breadboard:["Wire strip DIN to a GPIO (add a level shifter + big 5V supply for long strips).","Flash WLED; configure in the web UI."],
    wiring:[{from:"Strip DIN",to:"GPIO2 via shifter"},{from:"5V/GND",to:"external PSU"}],
    simulator:{tool:"Wokwi",notes:"Short strips simulate; WLED itself runs on hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// No sketch needed — install WLED with the web installer, then configure LED count + pin.` },
  makeItReal:["Print mounting clips + diffuser channel.","Add an inline fuse on the 5V line.","Integrate with HA/Alexa/Google."]
},

/* =================== 7. CONNECTIVITY & CLOUD =================== */
{
  id:"web-led", title:"Web-Server LED Control", glyph:"🌐", difficulty:"Beginner",
  boards:["s3","c3","c6-lcd"], inputs:["button"], outputs:["led","web","wifi"], category:"Connectivity & Cloud",
  needsExtraParts:false, extraParts:[], source:"rnt-beginner",
  summary:"Toggle GPIO from a web page on your phone — the gateway to every IoT project.",
  whyBoard:"Any Wi-Fi board; the canonical first networked build.",
  parts:["LED","ESP32-S3"],
  prototype:{ breadboard:["Serve a page with ON/OFF links/buttons.","Routes set the GPIO; show state."],
    wiring:[{from:"LED",to:"GPIO2 via 220Ω"}],
    simulator:{tool:"Wokwi",notes:"Wokwi simulates Wi-Fi + web server.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <WiFi.h>
#include <WebServer.h>
WebServer s(80); bool on=false;
void setup(){ WiFi.begin("SSID","PASS"); pinMode(2,OUTPUT);
  s.on("/on",[](){on=true;digitalWrite(2,1);s.send(200,"text/plain","on");});
  s.on("/off",[](){on=false;digitalWrite(2,0);s.send(200,"text/plain","off");}); s.begin(); }
void loop(){ s.handleClient(); }` },
  makeItReal:["Add a captive portal for Wi-Fi setup.","Print a relay box for a real appliance.","Secure with a token before exposing."]
},
{
  id:"cloud-logger", title:"Google-Sheets Cloud Logger", glyph:"📈", difficulty:"Intermediate",
  boards:["s3","c6mini"], inputs:["temperature","humidity"], outputs:["wifi"], category:"Connectivity & Cloud",
  needsExtraParts:true, extraParts:["BME280 / BME680 Environmental Sensor"], source:"rnt-beginner",
  summary:"Append timestamped readings to a Google Sheet you can view/graph from anywhere.",
  whyBoard:"Any Wi-Fi board; deep-sleep between posts on the Mini.",
  parts:["BME280","ESP32-S3"],
  prototype:{ breadboard:["Deploy a Google Apps Script web app endpoint.","POST readings as query params; sheet appends rows."],
    wiring:[{from:"BME280",to:"I2C"}],
    simulator:{tool:"Wokwi",notes:"HTTP works in Wokwi.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <HTTPClient.h>
void post(float t){ HTTPClient h; h.begin("https://script.google.com/.../exec?t="+String(t));
  h.GET(); h.end(); }` },
  makeItReal:["Battery + deep sleep for a remote logger.","Add charts in Sheets.","Print a weatherproof shield for outdoor use."]
},
{
  id:"telegram-alerts", title:"Telegram / WhatsApp Alerts", glyph:"📲", difficulty:"Intermediate",
  boards:["s3","c6mini"], inputs:["pir","reed"], outputs:["wifi"], category:"Connectivity & Cloud",
  needsExtraParts:false, extraParts:[], source:"rnt-beginner",
  summary:"Push a phone message on any event — motion, door, threshold — and accept commands back.",
  whyBoard:"Any Wi-Fi board; a bot token does the messaging.",
  parts:["PIR Motion (HC-SR501)","ESP32-S3"],
  prototype:{ breadboard:["Create a bot; on event call sendMessage.","Optionally poll for commands to control GPIO."],
    wiring:[{from:"PIR OUT",to:"GPIO4"}],
    simulator:{tool:"Wokwi",notes:"HTTPS to the bot API works.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <UniversalTelegramBot.h>
// bot.sendMessage(CHAT_ID, "Motion detected!", "");` },
  makeItReal:["Print an enclosure for the chosen sensor.","Add arm/disarm via chat commands.","Battery + deep sleep for door/motion nodes."]
},
{
  id:"espnow-link", title:"ESP-NOW Sensor → Display Link", glyph:"🔗", difficulty:"Intermediate",
  boards:["c6mini","c6-lcd"], inputs:["temperature"], outputs:["tft","wifi"], category:"Connectivity & Cloud",
  needsExtraParts:false, extraParts:[], source:"mcl",
  summary:"A battery sensor sends readings directly to a display board with no router or pairing latency.",
  whyBoard:"C6 Mini = µW sender; C6+screen = receiver/display. ESP-NOW is fast + low-power.",
  parts:["2× ESP32-C6 (Mini sender + LCD receiver)","DHT11 Temp + Humidity"],
  prototype:{ breadboard:["Sender reads DHT, esp_now_send to the receiver's MAC, deep-sleep.","Receiver shows the value on its TFT."],
    wiring:[{from:"DHT (sender)",to:"GPIO2"}],
    simulator:{tool:"Wokwi",notes:"Two-node ESP-NOW best on hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <esp_now.h>
#include <WiFi.h>
// sender: esp_now_add_peer(rx_mac); esp_now_send(rx_mac,(uint8_t*)&data,sizeof(data));` },
  makeItReal:["Print enclosures for both nodes.","Sender on LiPo, sleeps for days.","Add many senders → one dashboard."]
},
{
  id:"sd-logger", title:"Standalone SD Data Logger", glyph:"💾", difficulty:"Intermediate",
  boards:["c6-lcd","s3"], inputs:["temperature"], outputs:[], category:"Connectivity & Cloud",
  needsExtraParts:true, extraParts:["DS3231 Precision RTC","MicroSD Card Module"], source:"mcl",
  summary:"Timestamp and write readings to a microSD card for offline, no-Wi-Fi logging.",
  whyBoard:"C6-LCD has a TF slot built in; add a DS3231 for accurate offline time.",
  parts:["DS3231 RTC","DS18B20 Temp Probe","ESP32-C6-LCD-1.47 (TF slot)"],
  prototype:{ breadboard:["Read RTC + sensor; append a CSV line to the card.","Show last value on the TFT."],
    wiring:[{from:"DS3231",to:"I2C"},{from:"SD",to:"onboard TF / SPI"}],
    simulator:{tool:"Wokwi",notes:"SD + RTC supported.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <SD.h>
#include <RTClib.h>
RTC_DS3231 rtc;
void log(float v){ File f=SD.open("/log.csv",FILE_APPEND);
  f.printf("%lu,%.2f\\n", rtc.now().unixtime(), v); f.close(); }` },
  makeItReal:["Print a field-logger case with a card door.","LiPo + deep sleep for long runs.","Pull the card or add Wi-Fi upload later."]
},
{
  id:"gps-logger", title:"GPS Trip Logger", glyph:"🛰️", difficulty:"Intermediate",
  boards:["s3","c6-lcd"], inputs:["gps"], outputs:["tft"], category:"Connectivity & Cloud",
  needsExtraParts:true, extraParts:["NEO-6M / NEO-M8N GPS Module","MicroSD Card Module"], source:"rnt-beginner",
  summary:"Record a GPX/CSV track of where you go and map it later (e.g. on Google Earth).",
  whyBoard:"S3/C6 read NMEA over UART; SD/TF stores the track.",
  parts:["NEO-6M GPS","MicroSD (or C6 TF slot)","ESP32-S3"],
  prototype:{ breadboard:["GPS TX→ESP RX; parse with TinyGPS++.","Log lat/lon/time to the card; show fix on screen."],
    wiring:[{from:"GPS TX",to:"ESP RX (UART)"}],
    simulator:{tool:"Wokwi",notes:"Feed sample NMEA to test parsing.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <TinyGPSPlus.h>
TinyGPSPlus gps;
void setup(){ Serial2.begin(9600); }
void loop(){ while(Serial2.available()) gps.encode(Serial2.read());
  if(gps.location.isUpdated()) Serial.println(gps.location.lat(),6); }` },
  makeItReal:["Print a dashboard/bike-mount case with a sky-facing antenna.","LiPo powered.","Export GPX and view your routes."]
},
{
  id:"trip-tracker", title:"Live LTE-less Trip Tracker", glyph:"📍", difficulty:"Advanced",
  boards:["c6mini","s3"], inputs:["gps"], outputs:["wifi"], category:"Connectivity & Cloud",
  needsExtraParts:true, extraParts:["NEO-6M / NEO-M8N GPS Module","1S LiPo + Charger (TP4056 / built-in)"], source:"efy",
  summary:"Buffer GPS points offline and upload the track whenever it rejoins known Wi-Fi.",
  whyBoard:"C6 Mini low-power; store-and-forward avoids needing cellular.",
  parts:["NEO-6M GPS","LiPo","ESP32-C6 Super Mini"],
  prototype:{ breadboard:["Log points to flash/SD when away.","On known Wi-Fi, POST the buffered track to a server."],
    wiring:[{from:"GPS TX",to:"ESP RX"}],
    simulator:{tool:"Wokwi",notes:"Logic via sample NMEA.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Buffer fixes in a ring; when WiFi.status()==WL_CONNECTED, flush via HTTP POST.` },
  makeItReal:["Print a compact case + LiPo pocket.","Deep-sleep between fixes for battery life.","Map uploads on a simple web dashboard."]
},
{
  id:"captive-setup", title:"Captive-Portal Wi-Fi Setup", glyph:"🛜", difficulty:"Intermediate",
  boards:["s3","c6-lcd","c6mini"], inputs:[], outputs:["wifi"], category:"Connectivity & Cloud",
  needsExtraParts:false, extraParts:[], source:"awesome-esp",
  summary:"Let users enter Wi-Fi credentials via a phone page (no hard-coding) — makes a device shareable.",
  whyBoard:"Any board; WiFiManager handles the portal.",
  parts:["ESP32 (any)"],
  prototype:{ breadboard:["On first boot, start an AP + config page.","Save creds; reconnect automatically after."],
    wiring:[],
    simulator:{tool:"Wokwi",notes:"AP + web form simulate.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <WiFiManager.h>
void setup(){ WiFiManager wm; wm.autoConnect("ESP-Setup"); }
void loop(){}` },
  makeItReal:["Bundle into any networked project above.","Add a 'reset Wi-Fi' button/long-press.","Show the portal URL/QR on the screen."]
},
{
  id:"lora-sensor", title:"Long-Range LoRa Sensor", glyph:"📶", difficulty:"Advanced",
  boards:["s3","c6mini"], inputs:["temperature"], outputs:["wifi"], category:"Connectivity & Cloud",
  needsExtraParts:true, extraParts:["LoRa Module (SX1278 433/915 MHz)"], source:"awesome-esp",
  summary:"Send sensor data kilometers with no Wi-Fi — farm, garden, or off-grid telemetry.",
  whyBoard:"S3 drives the SX1278 over SPI; a second node/gateway receives.",
  parts:["SX1278 LoRa","DS18B20 Temp Probe","ESP32-S3"],
  prototype:{ breadboard:["Node transmits a small packet periodically.","Gateway receives and forwards to Wi-Fi/MQTT."],
    wiring:[{from:"SX1278 SPI",to:"SCK/MISO/MOSI/CS + DIO0"}],
    simulator:{tool:"Wokwi",notes:"RF link needs hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <LoRa.h>
void setup(){ LoRa.begin(915E6); }
void loop(){ LoRa.beginPacket(); LoRa.print("T=22.5"); LoRa.endPacket(); delay(30000); }` },
  makeItReal:["Print weatherproof enclosures (node + gateway).","Solar+LiPo for the remote node.","Mind regional frequency/duty-cycle rules."]
},
{
  id:"lora-pager", title:"Off-Grid LoRa Pager", glyph:"📟", difficulty:"Advanced",
  boards:["c6-lcd","s3"], inputs:["encoder"], outputs:["tft"], category:"Connectivity & Cloud",
  needsExtraParts:true, extraParts:["LoRa Module (SX1278 433/915 MHz)"], source:"awesome-esp",
  summary:"Two screen-equipped nodes exchange short text messages over LoRa with no infrastructure.",
  whyBoard:"C6+screen for the UI; LoRa for the link.",
  parts:["SX1278 LoRa","ESP32-C6-LCD-1.47","Rotary Encoder (KY-040)"],
  prototype:{ breadboard:["Compose a canned message with the encoder; send over LoRa.","Show received messages on the TFT."],
    wiring:[{from:"SX1278 SPI",to:"SPI + DIO0"}],
    simulator:{tool:"Wokwi",notes:"Hardware needed for RF.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// LoRa.onReceive(cb); in cb read LoRa.readString() and draw it on the TFT.` },
  makeItReal:["Print a handheld with a screen + knob.","LiPo powered.","Add a small keyboard for free-text."]
},

/* =================== 8. CAMERA & EDGE AI =================== */
{
  id:"cam-stream", title:"Live MJPEG Camera Stream", glyph:"📷", difficulty:"Intermediate",
  boards:["s3cam"], inputs:["camera"], outputs:["wifi","web"], category:"Camera & Edge AI",
  needsExtraParts:false, extraParts:[], source:"circuitdigest",
  summary:"Stream the camera to any browser on your network — the foundation for every vision project.",
  whyBoard:"S3-CAM: PSRAM holds framebuffers; the stock CameraWebServer example just works.",
  parts:["ESP32-S3-CAM"],
  prototype:{ breadboard:["Set the correct camera pin map/board.","Start the web server; open the board's IP to view."],
    wiring:[],
    simulator:{tool:"Wokwi",notes:"Camera requires hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Start from Arduino's "CameraWebServer" example; pick the matching board/pin map,
// enable PSRAM, set an 8MB partition, flash, open the printed IP.` },
  makeItReal:["Print a stand/mount with a lens hole.","USB or LiPo power.","Add auth before exposing it."]
},
{
  id:"security-cam", title:"Motion-Snapshot Security Cam", glyph:"📸", difficulty:"Intermediate",
  boards:["s3cam"], inputs:["camera","pir"], outputs:["wifi"], category:"Camera & Edge AI",
  needsExtraParts:false, extraParts:[], source:"makemindz",
  summary:"On PIR motion, grab a JPEG and push it to your phone / save it — a battery-friendly cam.",
  whyBoard:"S3-CAM + PIR: capture only on motion to save power/bandwidth.",
  parts:["ESP32-S3-CAM","PIR Motion (HC-SR501)"],
  prototype:{ breadboard:["PIR wakes the board; capture a frame.","Send via Telegram / save to SD; back to sleep."],
    wiring:[{from:"PIR OUT",to:"RTC-GPIO (wake)"}],
    simulator:{tool:"Wokwi",notes:"Camera on hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Wake on PIR -> esp_camera_fb_get() -> POST JPEG -> esp_deep_sleep_start();` },
  makeItReal:["Print a weather-resistant housing with a hood.","LiPo + deep sleep for weeks.","Add night lighting/NIR for the dark."]
},
{
  id:"timelapse-cam", title:"Time-Lapse Camera", glyph:"⏳", difficulty:"Intermediate",
  boards:["s3cam"], inputs:["camera"], outputs:[], category:"Camera & Edge AI",
  needsExtraParts:true, extraParts:["MicroSD Card Module"], source:"circuitdigest",
  summary:"Snap a frame every N minutes to SD; stitch into a time-lapse of a sunset, print, or plant.",
  whyBoard:"S3-CAM captures; deep sleep between shots for long runs.",
  parts:["ESP32-S3-CAM","MicroSD (or onboard slot)"],
  prototype:{ breadboard:["On a timer wake, capture and save numbered JPEGs.","Deep-sleep until the next interval."],
    wiring:[],
    simulator:{tool:"Wokwi",notes:"Hardware needed.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// timer wakeup -> capture -> SD.save("/img%04d.jpg") -> deep sleep N minutes.` },
  makeItReal:["Print a tripod/window mount.","Power from USB for multi-day shoots.","Stitch frames with ffmpeg."]
},
{
  id:"qr-detect", title:"QR / Barcode Reader", glyph:"🔳", difficulty:"Advanced",
  boards:["s3cam"], inputs:["camera"], outputs:["wifi","tft"], category:"Camera & Edge AI",
  needsExtraParts:false, extraParts:[], source:"espwho",
  summary:"Decode QR codes from the camera and act on them — inventory, check-in, config handoff.",
  whyBoard:"S3-CAM has the speed; quirc/ESP-WHO decodes frames on-device.",
  parts:["ESP32-S3-CAM"],
  prototype:{ breadboard:["Grab frames; run a QR decoder (quirc).","On decode, POST/handle the payload."],
    wiring:[],
    simulator:{tool:"Wokwi",notes:"Hardware needed.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Use the quirc library on grayscale frames; print decoded strings.` },
  makeItReal:["Print a scanner stand at a fixed focal distance.","Add a beep + LED on a good read.","Feed results to a sheet/inventory app."]
},
{
  id:"person-detect", title:"On-Device Person Detection", glyph:"🧍", difficulty:"Advanced",
  boards:["s3cam"], inputs:["camera"], outputs:["wifi","led"], category:"Camera & Edge AI",
  needsExtraParts:false, extraParts:[], source:"person-detect-s3",
  summary:"Run a MobileNet/TFLite model to flag when a person is in frame — privacy-friendly, no cloud.",
  whyBoard:"S3-CAM's PSRAM + SIMD run a quantized detector at a few FPS.",
  parts:["ESP32-S3-CAM"],
  prototype:{ breadboard:["Use ai4iot's S3 person-detector or esp-tflite-micro 'person_detection'.","Above threshold → light an LED / send an alert."],
    wiring:[{from:"Status LED",to:"free GPIO"}],
    simulator:{tool:"Wokwi",notes:"ML inference on hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Flash ai4iot/person-detection-esp32s3 (Arduino) — green/red web bg by confidence.` },
  makeItReal:["Print a discreet sensor housing.","Use detections to drive lights/HVAC.","Add NIR lighting for low light."]
},
{
  id:"occupancy-ai", title:"Edge-AI Room Occupancy Counter", glyph:"🔢", difficulty:"Advanced",
  boards:["s3cam","s3"], inputs:["camera"], outputs:["oled","wifi"], category:"Camera & Edge AI",
  needsExtraParts:true, extraParts:["OLED SSD1306"], source:"espwho",
  summary:"Count people in view with a TFLite model and show occupancy — drive ventilation/heating.",
  whyBoard:"S3-CAM infers; an OLED or second ESP shows the count.",
  parts:["ESP32-S3-CAM","OLED SSD1306"],
  prototype:{ breadboard:["Run person detection; count detection boxes.","Show n on the OLED; publish to HA."],
    wiring:[{from:"OLED",to:"I2C"}],
    simulator:{tool:"Wokwi",notes:"Hardware needed.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Count bounding boxes from the detector; display + MQTT publish the number.` },
  makeItReal:["Print a ceiling/corner mount.","Tune for your room's lighting.","Feed occupancy into smart-home rules."]
},
{
  id:"color-sorter", title:"Color / Object Classifier", glyph:"🎨", difficulty:"Advanced",
  boards:["s3cam"], inputs:["camera"], outputs:["servo","tft"], category:"Camera & Edge AI",
  needsExtraParts:false, extraParts:[], source:"edgeimpulse",
  summary:"Train Edge Impulse to recognize a few objects/colors and trigger a servo to sort them.",
  whyBoard:"S3-CAM + Edge Impulse export → Arduino inference, then act.",
  parts:["ESP32-S3-CAM","Servo SG90"],
  prototype:{ breadboard:["Capture + label images in Edge Impulse; train.","On class result, move the servo to a bin."],
    wiring:[{from:"Servo",to:"GPIO + 5V"}],
    simulator:{tool:"Wokwi",notes:"Train/deploy on hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Include the EI library; switch(label){ case A: servo.write(0); ... }` },
  makeItReal:["Print a chute + sorting flap driven by the servo.","Add lighting for consistent images.","Expand classes by retraining."]
},
{
  id:"pan-tilt-cam", title:"Pan/Tilt Tracking Camera", glyph:"🎯", difficulty:"Advanced",
  boards:["s3cam"], inputs:["camera"], outputs:["servo"], category:"Camera & Edge AI",
  needsExtraParts:true, extraParts:["Pan/Tilt Bracket + 2× SG90"], source:"espwho",
  summary:"Detect a face/person and keep them centered by driving two servos.",
  whyBoard:"S3-CAM detects; two servos steer the pan/tilt rig.",
  parts:["ESP32-S3-CAM","Pan/Tilt + 2× SG90","MB102 PSU"],
  prototype:{ breadboard:["Get the detection's center; P-control the two servos to recenter it.","Power servos from 5V, shared ground."],
    wiring:[{from:"Pan/Tilt servos",to:"2 PWM GPIO + 5V"}],
    simulator:{tool:"Wokwi",notes:"Hardware needed.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// err = boxCenterX - frameCenterX; panAngle += Kp*err; servo.write(panAngle);` },
  makeItReal:["Print a sturdy pan/tilt base + camera cradle.","Add smoothing to avoid jitter.","Stream while it tracks."]
},

/* =================== 9. RF / IR / RFID (AUTHORIZED USE) =================== */
{
  id:"ir-remote-clone", title:"IR Remote Record & Replay", glyph:"📺", difficulty:"Intermediate",
  boards:["tembed","s3"], inputs:["ir"], outputs:["ir-tx","tft"], category:"RF / IR / RFID",
  needsExtraParts:false, extraParts:[], source:"awesome-esp-projects",
  summary:"Capture codes from YOUR remotes and replay them — one device to rule your own gear.",
  whyBoard:"T-Embed has IR TX/RX + screen built in; or use the kit IR pair on an S3.",
  parts:["IR Receiver (VS1838B)","IR Transmitter LED","ESP32-S3 (or T-Embed)"],
  prototype:{ breadboard:["Receive + decode codes with IRremoteESP8266.","Store them; replay with the IR LED on demand."],
    wiring:[{from:"IR recv OUT",to:"GPIO"},{from:"IR LED",to:"GPIO (via transistor)"}],
    simulator:{tool:"Wokwi",notes:"IR is best on hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <IRrecv.h>
#include <IRsend.h>
IRrecv rx(15); IRsend tx(4); decode_results r;
void setup(){ rx.enableIRIn(); tx.begin(); }
void loop(){ if(rx.decode(&r)){ Serial.println(r.value,HEX); rx.resume(); } }` },
  makeItReal:["⚠️ Use only with devices you own.","Print a handheld with the screen + a few buttons.","Build a labeled menu of your remotes."]
},
{
  id:"universal-ac", title:"Smart IR A/C Controller", glyph:"❄️", difficulty:"Intermediate",
  boards:["tembed","c6-lcd"], inputs:["temperature"], outputs:["ir-tx","wifi"], category:"RF / IR / RFID",
  needsExtraParts:false, extraParts:[], source:"awesome-esp-projects",
  summary:"Send your A/C's IR commands on schedule or from your phone — make a dumb A/C smart.",
  whyBoard:"T-Embed/C6 + IR LED; IRremoteESP8266 knows many A/C protocols.",
  parts:["IR Transmitter LED","DHT11 Temp + Humidity","ESP32-C6-LCD-1.47"],
  prototype:{ breadboard:["Identify your A/C protocol; build state (mode/temp).","Send on Wi-Fi command or a temperature rule."],
    wiring:[{from:"IR LED",to:"GPIO (transistor)"}],
    simulator:{tool:"Wokwi",notes:"IR on hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <IRac.h>
// Use the matching ir_<Brand>.h class; set mode/temp/fan, then send().` },
  makeItReal:["⚠️ Your own A/C only.","Print a line-of-sight emitter pod.","Expose to HA + schedules."]
},
{
  id:"subghz-learn", title:"Sub-GHz Remote Learning (433 MHz)", glyph:"🛰️", difficulty:"Advanced",
  boards:["tembed"], inputs:["rf"], outputs:["tft"], category:"RF / IR / RFID",
  needsExtraParts:false, extraParts:[], source:"lilygo-tembed",
  summary:"Use the CC1101 to observe and understand how YOUR own 433 MHz remotes encode signals.",
  whyBoard:"T-Embed's CC1101 + screen are purpose-built for this learning.",
  parts:["LilyGO T-Embed CC1101"],
  prototype:{ breadboard:["Configure CC1101 to your legal region/frequency.","Capture timings of your own remote; visualize on screen."],
    wiring:[],
    simulator:{tool:"Wokwi",notes:"Sub-GHz radio needs the hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Use an ELECHOUSE CC1101 library; set frequency, read RX bytes, render on TFT.` },
  makeItReal:["⚠️ Authorized use only — your devices, legal frequencies, respect duty cycles.","Build a labeled catalog of your remotes for learning.","Add a clear on-screen legal/ownership reminder."]
},
{
  id:"rfid-access", title:"RFID Access Demo (your cards)", glyph:"💳", difficulty:"Intermediate",
  boards:["s3","c6-lcd"], inputs:["rfid"], outputs:["servo","relay","tft"], category:"RF / IR / RFID",
  needsExtraParts:true, extraParts:["RC522 RFID Reader + Cards"], source:"mcl",
  summary:"Unlock a servo/relay when an authorized tag (one you own) is presented — learn access control.",
  whyBoard:"S3/C6 + RC522 over SPI; screen shows granted/denied.",
  parts:["RC522 RFID","Servo SG90 (or Relay)","ESP32-S3"],
  prototype:{ breadboard:["Read a card UID; compare to an allow-list you set.","Match → actuate; show result + log."],
    wiring:[{from:"RC522 SPI",to:"SCK/MISO/MOSI/SS/RST"}],
    simulator:{tool:"Wokwi",notes:"RC522 has Wokwi support.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <MFRC522.h>
MFRC522 rfid(5,22);
void setup(){ SPI.begin(); rfid.PCD_Init(); }
void loop(){ if(rfid.PICC_IsNewCardPresent()&&rfid.PICC_ReadCardSerial()){
  /* compare rfid.uid to allow-list */ rfid.PICC_HaltA(); } }` },
  makeItReal:["⚠️ Use only your own cards/locks.","Print a reader plate + a servo bolt mechanism.","Add enrollment mode + an event log."]
},
{
  id:"rfid-attendance", title:"RFID Attendance / Inventory", glyph:"🗂️", difficulty:"Intermediate",
  boards:["s3","c6-lcd"], inputs:["rfid"], outputs:["wifi","tft"], category:"RF / IR / RFID",
  needsExtraParts:true, extraParts:["RC522 RFID Reader + Cards"], source:"efy",
  summary:"Tap a tag to log a name/item with a timestamp to a sheet or local list.",
  whyBoard:"S3/C6 read RC522; Wi-Fi posts to a sheet; screen confirms.",
  parts:["RC522 RFID","ESP32-C6-LCD-1.47"],
  prototype:{ breadboard:["Map known UIDs → names/items.","On tap, append a timestamped row; show a checkmark."],
    wiring:[{from:"RC522 SPI",to:"SPI pins"}],
    simulator:{tool:"Wokwi",notes:"RC522 supported; logging via HTTP.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// On a known UID, HTTP GET your Apps Script endpoint with name+time.` },
  makeItReal:["⚠️ Tags you own/issue.","Print a kiosk stand for the reader + screen.","Add a buzzer ack + offline cache."]
},
{
  id:"chameleon-learn", title:"RFID/NFC Learning Lab (Chameleon Ultra)", glyph:"🔬", difficulty:"Advanced",
  boards:["chameleon"], inputs:["rfid"], outputs:[], category:"RF / IR / RFID",
  needsExtraParts:false, extraParts:[], source:"chameleon",
  summary:"Use the Chameleon Ultra to read, save and emulate YOUR OWN cards to understand RFID/NFC.",
  whyBoard:"The Chameleon Ultra is purpose-built to learn 125 kHz + 13.56 MHz on cards you own.",
  parts:["Chameleon Ultra","your own RFID/NFC cards","phone/PC app"],
  prototype:{ breadboard:["Pair via the app/CLI.","Read one of your own tags into a slot; emulate it back to your own reader to see how it works."],
    wiring:[],
    simulator:{tool:"n/a",notes:"Hands-on with the device + your own cards.",url:"https://github.com/RfidResearchGroup/ChameleonUltra"} },
  code:{ arduino:`# No ESP32 sketch — use the official Chameleon Ultra app / CLI to manage slots.` },
  makeItReal:["⚠️ Authorized use ONLY — only cards/systems you own or are permitted to test. Cloning others' credentials is illegal.","Keep a learning log of card types and how they differ.","Pair with the RC522 projects to see reader + card sides."]
},
{
  id:"ir-trigger-cam", title:"IR-Triggered Shutter/Action", glyph:"📤", difficulty:"Beginner",
  boards:["s3","c3"], inputs:["ir"], outputs:["relay","led"], category:"RF / IR / RFID",
  needsExtraParts:false, extraParts:[], source:"awesome-esp-projects",
  summary:"Use any spare remote button to trigger a relay/macro — repurpose a remote as a wireless button.",
  whyBoard:"Any board + the kit IR receiver.",
  parts:["IR Receiver (VS1838B)","Relay Module (1-ch)"],
  prototype:{ breadboard:["Decode a specific button code.","On that code, pulse a relay / run an action."],
    wiring:[{from:"IR recv OUT",to:"GPIO15"},{from:"Relay",to:"GPIO5"}],
    simulator:{tool:"Wokwi",notes:"IR best on hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <IRrecv.h>
IRrecv rx(15); decode_results r;
void setup(){ rx.enableIRIn(); pinMode(5,OUTPUT); }
void loop(){ if(rx.decode(&r)){ if(r.value==0xFF00) digitalWrite(5,HIGH); rx.resume(); } }` },
  makeItReal:["Print a small receiver puck.","Map remote buttons to scenes/macros.","Combine with the web-server project for hybrid control."]
},

/* =================== 10. ROBOTICS & MOTORS =================== */
{
  id:"servo-gauge", title:"Physical Data Gauge (Servo)", glyph:"⏲️", difficulty:"Beginner",
  boards:["c3","s3"], inputs:["temperature"], outputs:["servo"], category:"Robotics & Motors",
  needsExtraParts:false, extraParts:[], source:"100days",
  summary:"Point a servo needle at a printed dial to show temperature, CPU load, or any value.",
  whyBoard:"Any board; one PWM pin.",
  parts:["Servo SG90","DHT11 Temp + Humidity","printed dial"],
  prototype:{ breadboard:["Map a value range to 0–180°.","Servo points the needle; smooth the motion."],
    wiring:[{from:"Servo",to:"GPIO13 + 5V"}],
    simulator:{tool:"Wokwi",notes:"Servo + DHT.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <ESP32Servo.h>
Servo s; void setup(){ s.attach(13); }
void loop(){ s.write(map(analogRead(34),0,4095,0,180)); delay(50); }` },
  makeItReal:["Print a dial face + needle.","Feed it any networked metric.","Make a row of them as a dashboard."]
},
{
  id:"stepper-dial", title:"Stepper Indicator / Valve", glyph:"🔄", difficulty:"Intermediate",
  boards:["s3","c6-lcd"], inputs:["encoder"], outputs:["stepper"], category:"Robotics & Motors",
  needsExtraParts:false, extraParts:[], source:"rnt-sensors",
  summary:"Precisely position a geared stepper for a multi-turn dial, valve, or focus mechanism.",
  whyBoard:"S3/C6 drive the 28BYJ-48 via ULN2003.",
  parts:["28BYJ-48 Stepper + ULN2003","Rotary Encoder (KY-040)"],
  prototype:{ breadboard:["Encoder sets a target step position.","Move the stepper to it; remember position."],
    wiring:[{from:"ULN2003 IN1-4",to:"4 GPIO"}],
    simulator:{tool:"Wokwi",notes:"Stepper + encoder supported.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <Stepper.h>
Stepper st(2048, 13,14,12,27);
void setup(){ st.setSpeed(12); }
void loop(){ /* st.step(delta) toward target */ }` },
  makeItReal:["Print a gear/coupler for your shaft.","Add a home switch for absolute position.","Use for a valve, focuser, or split-flap."]
},
{
  id:"obstacle-rover", title:"Obstacle-Avoiding Rover", glyph:"🤖", difficulty:"Intermediate",
  boards:["s3"], inputs:["ultrasonic"], outputs:["motor"], category:"Robotics & Motors",
  needsExtraParts:false, extraParts:[], source:"nabidoust",
  summary:"A two-motor rover that drives forward and turns away from obstacles it 'sees' with ultrasonic.",
  whyBoard:"S3 has the pins for motors + sensor; power motors separately.",
  parts:["DC Motor + L9110","Ultrasonic (HC-SR04)","chassis + wheels","battery"],
  prototype:{ breadboard:["L9110 drives two motors (PWM).","If distance < threshold, stop + turn; else go."],
    wiring:[{from:"L9110 IA/IB",to:"PWM GPIO"},{from:"HC-SR04",to:"TRIG/ECHO"}],
    simulator:{tool:"Wokwi",notes:"Motors + ultrasonic logic simulate.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// if(dist()<20){ stop(); turnRight(400);} else forward();` },
  makeItReal:["Print a chassis + motor mounts + caster.","Separate battery for motors, common ground.","Add a bumper switch as a backup."]
},
{
  id:"line-follower", title:"Line-Following Robot", glyph:"🛣️", difficulty:"Intermediate",
  boards:["s3"], inputs:["tracking"], outputs:["motor"], category:"Robotics & Motors",
  needsExtraParts:false, extraParts:[], source:"nabidoust",
  summary:"Follow a black line on the floor using reflective sensors and proportional steering.",
  whyBoard:"S3 reads two/three TCRT5000s and drives the motors.",
  parts:["3× Line Tracking (TCRT5000)","DC Motor + L9110","chassis"],
  prototype:{ breadboard:["Read left/center/right sensors.","Steer to keep the line centered (P control)."],
    wiring:[{from:"3× tracker",to:"3 GPIO"},{from:"L9110",to:"PWM GPIO"}],
    simulator:{tool:"Wokwi",notes:"Logic simulates with switches.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// err = right - left; turn proportional to err; base speed forward.` },
  makeItReal:["Print a low chassis with sensors near the floor.","Tune threshold to your tape/surface.","Add a start/stop button + speed pot."]
},
{
  id:"light-tracker", title:"Sun/Light-Tracking Servo", glyph:"🌞", difficulty:"Intermediate",
  boards:["s3","c3"], inputs:["ldr"], outputs:["servo"], category:"Robotics & Motors",
  needsExtraParts:true, extraParts:["Pan/Tilt Bracket + 2× SG90"], source:"awesome-esp",
  summary:"Two LDRs let a servo aim a panel/sensor at the brightest spot — a solar tracker demo.",
  whyBoard:"Any board; compares two LDRs and nudges the servo.",
  parts:["2× Photoresistor (LDR)","Servo SG90 (or pan/tilt)","resistors"],
  prototype:{ breadboard:["Two LDRs with a divider on each side of a fin.","Move servo toward the brighter side until balanced."],
    wiring:[{from:"LDR L/R",to:"2 ADC"},{from:"Servo",to:"PWM + 5V"}],
    simulator:{tool:"Wokwi",notes:"Two LDRs + servo.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <ESP32Servo.h>
Servo s; int a=90;
void setup(){ s.attach(13); }
void loop(){ int l=analogRead(34),r=analogRead(35);
  if(l-r>100&&a<180)a++; if(r-l>100&&a>0)a--; s.write(a); delay(50); }` },
  makeItReal:["Print a pan/tilt frame + panel holder.","Add a second axis with the pan/tilt kit.","Log harvested light over a day."]
},
{
  id:"self-level", title:"Self-Leveling Platform", glyph:"⚖️", difficulty:"Advanced",
  boards:["s3"], inputs:["imu"], outputs:["servo"], category:"Robotics & Motors",
  needsExtraParts:true, extraParts:["MPU6050 Accelerometer + Gyro (IMU)","Pan/Tilt Bracket + 2× SG90"], source:"awesome-esp",
  summary:"Read tilt from an IMU and counter-rotate two servos to keep a platform flat (camera gimbal-lite).",
  whyBoard:"S3 fuses IMU data fast enough for smooth correction.",
  parts:["MPU6050","Pan/Tilt + 2× SG90","ESP32-S3"],
  prototype:{ breadboard:["Get roll/pitch (complementary filter).","Drive each servo to the negative of the measured angle."],
    wiring:[{from:"MPU6050",to:"I2C"},{from:"2 servos",to:"PWM + 5V"}],
    simulator:{tool:"Wokwi",notes:"MPU6050 + servos.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// roll,pitch from MPU; servoX.write(90-roll); servoY.write(90-pitch);` },
  makeItReal:["Print a gimbal frame + phone/camera cradle.","Add smoothing/PID to kill jitter.","LiPo for a handheld stabilizer."]
},
{
  id:"fan-controller", title:"PWM Fan / Motor Speed Box", glyph:"🌀", difficulty:"Beginner",
  boards:["c3","s3"], inputs:["potentiometer","temperature"], outputs:["motor"], category:"Robotics & Motors",
  needsExtraParts:false, extraParts:[], source:"100days",
  summary:"Control a DC fan's speed by knob or by temperature — quiet when cool, fast when warm.",
  whyBoard:"Any board; L9110/transistor + separate supply.",
  parts:["DC Motor + L9110","Rotary Potentiometer","NTC Thermistor (KY-013)"],
  prototype:{ breadboard:["PWM the motor driver from knob or temp curve.","Separate motor supply, common ground."],
    wiring:[{from:"L9110 IA",to:"PWM GPIO"},{from:"Pot/NTC",to:"ADC"}],
    simulator:{tool:"Wokwi",notes:"Motor + pot.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`void setup(){ pinMode(13,OUTPUT); }
void loop(){ analogWrite(13, map(analogRead(34),0,4095,0,255)); }` },
  makeItReal:["Print a fan shroud + control box.","Add a temp-curve mode.","Use for a 3D-printer enclosure exhaust."]
},
{
  id:"split-flap", title:"Mini Split-Flap / Rolling Display", glyph:"🔠", difficulty:"Advanced",
  boards:["s3"], inputs:[], outputs:["stepper","wifi"], category:"Robotics & Motors",
  needsExtraParts:false, extraParts:[], source:"awesome-esp",
  summary:"A stepper rotates a printed character drum to show a letter — chain them for words.",
  whyBoard:"S3 drives the stepper + a hall home sensor; Wi-Fi feeds text.",
  parts:["28BYJ-48 Stepper + ULN2003","Hall Sensor (KY-003)","printed drum"],
  prototype:{ breadboard:["Home the drum with a hall+magnet.","Step to the target character index."],
    wiring:[{from:"ULN2003",to:"4 GPIO"},{from:"Hall",to:"GPIO"}],
    simulator:{tool:"Wokwi",notes:"Stepper logic simulates.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// home(): step until hall triggers; then step (index * stepsPerChar).` },
  makeItReal:["Print the drum, frame and flaps.","Chain units over one bus for words.","Show clock/weather/messages."]
},

/* =================== 11. CLOCKS, TIMERS & GAMES =================== */
{
  id:"ntp-clock", title:"Internet (NTP) Clock", glyph:"🕛", difficulty:"Beginner",
  boards:["c6-lcd","s3"], inputs:[], outputs:["tft","7segment","wifi"], category:"Clocks, Timers & Games",
  needsExtraParts:false, extraParts:[], source:"rnt-beginner",
  summary:"Always-accurate clock synced over Wi-Fi, shown on the TFT or a TM1637.",
  whyBoard:"C6+screen shows it natively; any Wi-Fi board + TM1637 works.",
  parts:["ESP32-C6-LCD-1.47 (or TM1637)"],
  prototype:{ breadboard:["Connect Wi-Fi; configTime() with your timezone/NTP.","Render HH:MM:SS, refresh each second."],
    wiring:[],
    simulator:{tool:"Wokwi",notes:"NTP + display simulate.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <WiFi.h>
#include <time.h>
void setup(){ WiFi.begin("SSID","PASS");
  configTime(0,0,"pool.ntp.org"); }
void loop(){ time_t n=time(0); Serial.println(ctime(&n)); delay(1000); }` },
  makeItReal:["Print a desk/shelf clock case.","Add brightness auto-dim (LDR).","Show date/weather pages too."]
},
{
  id:"alarm-clock", title:"Smart Alarm Clock", glyph:"⏰", difficulty:"Intermediate",
  boards:["c6-lcd","s3"], inputs:["encoder","button"], outputs:["tft","buzzer"], category:"Clocks, Timers & Games",
  needsExtraParts:true, extraParts:["DS3231 Precision RTC"], source:"circuitdigest",
  summary:"Set alarms with the knob; buzzer/chime wakes you; snooze on a tap. Keeps time offline via RTC.",
  whyBoard:"C6+screen for the UI; DS3231 keeps time without Wi-Fi.",
  parts:["DS3231 RTC","Rotary Encoder (KY-040)","Passive Buzzer","ESP32-C6-LCD-1.47"],
  prototype:{ breadboard:["Encoder sets alarm time; store it.","At match, sound buzzer; button snoozes."],
    wiring:[{from:"DS3231",to:"I2C"},{from:"Encoder/Buzzer",to:"GPIO"}],
    simulator:{tool:"Wokwi",notes:"RTC + buzzer + UI.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <RTClib.h>
RTC_DS3231 rtc; int ah=7,am=0;
void setup(){ rtc.begin(); }
void loop(){ DateTime n=rtc.now(); if(n.hour()==ah&&n.minute()==am){ /* buzz */ } delay(1000); }` },
  makeItReal:["Print a bedside case + speaker grille.","Add a gentle WS2812 sunrise.","Multiple alarms + weekday logic."]
},
{
  id:"pomodoro", title:"Pomodoro Focus Timer", glyph:"🍅", difficulty:"Beginner",
  boards:["c6-lcd","tembed"], inputs:["encoder","button"], outputs:["tft","buzzer"], category:"Clocks, Timers & Games",
  needsExtraParts:true, extraParts:["OLED SSD1306"], source:"awesome-esp",
  summary:"25-minute work / 5-minute break cycles with a knob to adjust and a chime at each switch.",
  whyBoard:"C6+screen or T-Embed (knob + screen built in) is ideal.",
  parts:["Rotary Encoder (KY-040)","Passive Buzzer","ESP32-C6-LCD-1.47"],
  prototype:{ breadboard:["Countdown on screen; switch work/break; chime.","Encoder adjusts durations; button start/pause."],
    wiring:[{from:"Encoder/Buzzer",to:"GPIO"}],
    simulator:{tool:"Wokwi",notes:"Timer + display simulate.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`unsigned long endt; bool work=true;
void start(int min){ endt=millis()+min*60000UL; }
void loop(){ if(millis()>endt){ work=!work; /* chime */ start(work?25:5);} }` },
  makeItReal:["Print a desk wedge case.","Log completed pomodoros.","Add a 'do not disturb' WS2812 light."]
},
{
  id:"word-clock", title:"Word Clock", glyph:"🔡", difficulty:"Advanced",
  boards:["s3","c6-lcd"], inputs:[], outputs:["ws2812","wifi"], category:"Clocks, Timers & Games",
  needsExtraParts:true, extraParts:["WS2812B Addressable LED Strip","DS3231 Precision RTC"], source:"awesome-esp",
  summary:"Light up words ('IT IS HALF PAST TEN') on a printed letter grid backed by addressable LEDs.",
  whyBoard:"S3/C6 map time → which letters glow; NTP/RTC for accuracy.",
  parts:["WS2812B Strip (grid)","DS3231 RTC","ESP32-S3","printed letter mask"],
  prototype:{ breadboard:["Lay LEDs behind a letter grid.","Map the current time to the set of words/indices to light."],
    wiring:[{from:"WS2812 DIN",to:"GPIO"}],
    simulator:{tool:"Wokwi",notes:"Prototype the mapping with a small WS2812 array.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// timeToWords(h,m) -> list of LED indices; light them, dim the rest.` },
  makeItReal:["Print a letter faceplate + LED diffuser grid.","Wall-mount; NTP-synced.","Add color themes + night dimming."]
},
{
  id:"dice", title:"Electronic Dice", glyph:"🎲", difficulty:"Beginner",
  boards:["c3","s3"], inputs:["button","vibration"], outputs:["led","matrix"], category:"Clocks, Timers & Games",
  needsExtraParts:false, extraParts:[], source:"100days",
  summary:"Shake or press to 'roll' — show 1–6 pips on LEDs or the matrix with a little animation.",
  whyBoard:"Any board; shake via the vibration sensor or a button.",
  parts:["Vibration / Shock (SW-420)","8×8 LED Matrix (MAX7219)"],
  prototype:{ breadboard:["On shake/press, animate then settle on a random 1–6.","Show pip pattern."],
    wiring:[{from:"SW-420",to:"GPIO4"},{from:"Matrix",to:"SPI"}],
    simulator:{tool:"Wokwi",notes:"Matrix + button.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`int roll(){ return random(1,7); }
void setup(){ randomSeed(esp_random()); }
void loop(){ /* on trigger: animate, show roll() pattern */ }` },
  makeItReal:["Print a cube/box with a diffused face.","Add a coin-cell + tilt wake.","Two dice mode for board games."]
},
{
  id:"countdown-timer", title:"Kitchen / Workshop Countdown", glyph:"⏱️", difficulty:"Beginner",
  boards:["c3","s3"], inputs:["encoder","button"], outputs:["7segment","buzzer"], category:"Clocks, Timers & Games",
  needsExtraParts:false, extraParts:[], source:"randomnerd",
  summary:"Dial in minutes:seconds, start, and get a loud alert at zero — the everyday timer.",
  whyBoard:"Any board + TM1637 + buzzer.",
  parts:["TM1637 4-Digit 7-Seg","Rotary Encoder (KY-040)","Active Buzzer"],
  prototype:{ breadboard:["Encoder sets time; button starts/stops.","Count down on the display; buzz at zero."],
    wiring:[{from:"TM1637",to:"CLK/DIO"},{from:"Encoder/Buzzer",to:"GPIO"}],
    simulator:{tool:"Wokwi",notes:"TM1637 + encoder + buzzer.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <TM1637Display.h>
TM1637Display d(4,5); int secs=300;
void loop(){ d.showNumberDecEx(secs/60*100+secs%60,0b01000000); /* tick */ }` },
  makeItReal:["Print a magnet-backed fridge timer.","Add multiple preset buttons.","Loud piezo for the workshop."]
},
{
  id:"whack-game", title:"Whack-a-LED Reflex Game", glyph:"🟢", difficulty:"Intermediate",
  boards:["s3"], inputs:["button"], outputs:["led","7segment","buzzer"], category:"Clocks, Timers & Games",
  needsExtraParts:false, extraParts:[], source:"awesome-esp",
  summary:"A random LED lights; hit its button before it times out. Speeds up as your score climbs.",
  whyBoard:"S3 has pins for several LED/button pairs + a display.",
  parts:["4× LED","4× Push Button","TM1637 4-Digit 7-Seg","Passive Buzzer"],
  prototype:{ breadboard:["Light a random LED; start a shrinking timer.","Correct hit = score++ and faster; miss ends the round."],
    wiring:[{from:"LEDs/Buttons",to:"GPIO bank"},{from:"TM1637",to:"CLK/DIO"}],
    simulator:{tool:"Wokwi",notes:"LEDs + buttons + display.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// pick target=random(0..3); light led[target]; if correct button before timeout, score++.` },
  makeItReal:["Print a 4-pad arcade face.","Add a high-score memory.","Battery + lid = a real toy."]
},

/* =================== 12. POWER & WEARABLES =================== */
{
  id:"deep-sleep-sensor", title:"Months-on-a-Battery Sensor", glyph:"🔋", difficulty:"Intermediate",
  boards:["c6mini"], inputs:["temperature"], outputs:["wifi"], category:"Power & Wearables",
  needsExtraParts:true, extraParts:["1S LiPo + Charger (TP4056 / built-in)"], source:"mcl",
  summary:"The pattern behind every battery sensor: wake, read, send, deep-sleep — for months of runtime.",
  whyBoard:"C6 Mini's low deep-sleep current is the whole point.",
  parts:["ESP32-C6 Super Mini","DHT11 Temp + Humidity","LiPo"],
  prototype:{ breadboard:["Wake on timer; read; publish; sleep.","Minimize awake time; power sensors via a GPIO."],
    wiring:[{from:"DHT",to:"GPIO2"}],
    simulator:{tool:"Wokwi",notes:"Deep-sleep timing simulates.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <esp_sleep.h>
void setup(){ /* read + publish quickly */
  esp_sleep_enable_timer_wakeup(15*60*1000000ULL); esp_deep_sleep_start(); }
void loop(){}` },
  makeItReal:["Print a wall pod with a LiPo pocket + charge port.","Measure real current to estimate battery life.","Reuse the pattern for door/soil/leak nodes."]
},
{
  id:"status-badge", title:"Wearable Status Badge", glyph:"📛", difficulty:"Intermediate",
  boards:["c6mini","s3"], inputs:["touch"], outputs:["ws2812","oled"], category:"Power & Wearables",
  needsExtraParts:true, extraParts:["1S LiPo + Charger (TP4056 / built-in)"], source:"100days",
  summary:"A pocket-sized badge showing your name/status with addressable bling, on battery.",
  whyBoard:"C6 Mini is small + low power for an all-day wearable.",
  parts:["ESP32-C6 Super Mini","WS2812 RGB LED","LiPo"],
  prototype:{ breadboard:["Show name/status; tap to cycle modes.","Animate WS2812 accents; sleep when idle."],
    wiring:[{from:"WS2812 DIN",to:"GPIO"},{from:"Touch",to:"GPIO"}],
    simulator:{tool:"Wokwi",notes:"WS2812 + touch logic.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// modes[]: cycle on tap; render text/animation; idle -> light sleep.` },
  makeItReal:["Print a slim badge shell + pin/lanyard loop.","LiPo + charge port.","OTA-update the message remotely."]
},
{
  id:"name-badge", title:"E-Ink Name Badge", glyph:"🧾", difficulty:"Intermediate",
  boards:["c6mini"], inputs:[], outputs:["eink"], category:"Power & Wearables",
  needsExtraParts:true, extraParts:["E-Paper / E-Ink Display (2.9\")","1S LiPo + Charger (TP4056 / built-in)"], source:"awesome-esp",
  summary:"Set your name/role once; the e-ink holds it with near-zero power for days on a charge.",
  whyBoard:"C6 Mini + e-ink + deep sleep = a badge that lasts an event on one charge.",
  parts:["E-Paper 2.9\"","ESP32-C6 Super Mini","LiPo"],
  prototype:{ breadboard:["Render text/QR to the e-ink, then deep-sleep.","Update via a quick Wi-Fi/BLE form when needed."],
    wiring:[{from:"E-ink SPI",to:"SCK/MOSI/CS/DC/RST/BUSY"}],
    simulator:{tool:"Wokwi",notes:"E-ink best on hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// GxEPD2: draw name + QR once, then esp_deep_sleep_start();` },
  makeItReal:["Print a badge frame + lanyard slot.","Update text from your phone.","Add a small accent LED for flair."]
},
{
  id:"eink-dashboard", title:"Low-Power E-Ink Dashboard", glyph:"📰", difficulty:"Advanced",
  boards:["c6mini","s3"], inputs:[], outputs:["eink","wifi"], category:"Power & Wearables",
  needsExtraParts:true, extraParts:["E-Paper / E-Ink Display (2.9\")"], source:"awesome-esp",
  summary:"Weather/calendar/agenda on e-ink that refreshes a few times a day and sleeps between.",
  whyBoard:"C6 Mini: fetch, draw, sleep — runs for weeks on a battery.",
  parts:["E-Paper 2.9\"","ESP32-C6 Super Mini"],
  prototype:{ breadboard:["Wake on a schedule; fetch data (weather/calendar API).","Render a full layout; deep-sleep."],
    wiring:[{from:"E-ink SPI",to:"SPI + control pins"}],
    simulator:{tool:"Wokwi",notes:"Prototype layout/HTTP on S3.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// On timer wake: HTTP GET -> parse -> GxEPD2 layout -> deep sleep until next slot.` },
  makeItReal:["Print a desk/fridge frame.","Solar+LiPo for set-and-forget.","Add multiple pages cycled per refresh."]
},
{
  id:"mailbox-notifier", title:"Mailbox 'You've Got Mail' Notifier", glyph:"📬", difficulty:"Intermediate",
  boards:["c6mini"], inputs:["reed","weight"], outputs:["wifi"], category:"Power & Wearables",
  needsExtraParts:true, extraParts:["1S LiPo + Charger (TP4056 / built-in)"], source:"awesome-esp",
  summary:"The mailbox door (reed) or added weight wakes the board to ping your phone, then it sleeps.",
  whyBoard:"C6 Mini: deep-sleep wake on the reed = months between charges.",
  parts:["Reed Switch (KY-021)","ESP32-C6 Super Mini","LiPo"],
  prototype:{ breadboard:["Reed on the door wakes the board.","Send a notification; deep-sleep again."],
    wiring:[{from:"Reed",to:"RTC-GPIO ↔ GND"}],
    simulator:{tool:"Wokwi",notes:"Emulate the reed with a button.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Wake on reed -> WiFi -> Telegram 'Mail!' -> deep sleep.` },
  makeItReal:["Print a weatherproof box for inside the mailbox.","Mind metal mailbox Wi-Fi attenuation (antenna placement).","LiPo + charge port."]
},
{
  id:"solar-node", title:"Solar-Powered Garden Node", glyph:"🌻", difficulty:"Advanced",
  boards:["c6mini"], inputs:["soil","temperature"], outputs:["wifi"], category:"Power & Wearables",
  needsExtraParts:true, extraParts:["1S LiPo + Charger (TP4056 / built-in)"], source:"awesome-esp-projects",
  summary:"A perpetual outdoor sensor: small solar panel tops up a LiPo while the C6 deep-sleeps between reads.",
  whyBoard:"C6 Mini's tiny sleep draw lets a small panel keep it alive indefinitely.",
  parts:["ESP32-C6 Super Mini","Soil Moisture","small solar panel + LiPo + TP4056"],
  prototype:{ breadboard:["Panel→charger→LiPo→board.","Wake, read soil/temp, publish, long deep-sleep."],
    wiring:[{from:"Soil/temp",to:"ADC/GPIO"},{from:"Panel",to:"charger IN"}],
    simulator:{tool:"Wokwi",notes:"Sleep/read logic simulates.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// Same deep-sleep pattern; widen the interval to match solar budget.` },
  makeItReal:["Print a weatherproof case + panel mount + drip edge.","Size the panel/battery to your sun.","Publish to Home Assistant."]
},
{
  id:"gesture-ui", title:"Gesture-Controlled Interface", glyph:"✋", difficulty:"Advanced",
  boards:["s3","c6-lcd"], inputs:["imu"], outputs:["tft","ble"], category:"Power & Wearables",
  needsExtraParts:true, extraParts:["MPU6050 Accelerometer + Gyro (IMU)"], source:"100days",
  summary:"Tilt/flick gestures from an IMU control a UI or act as a BLE remote (next/prev/volume).",
  whyBoard:"S3 for BLE HID; C6+screen to show the UI.",
  parts:["MPU6050","ESP32-S3"],
  prototype:{ breadboard:["Classify simple gestures (tilt L/R, flick).","Map to UI actions or BLE HID keys."],
    wiring:[{from:"MPU6050",to:"I2C"}],
    simulator:{tool:"Wokwi",notes:"MPU6050 in sim; BLE on hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`// thresholds on gyro/accel -> emit action; or BLEKeyboard.write(KEY_MEDIA_NEXT).` },
  makeItReal:["Print a wand/ring/remote enclosure + LiPo.","Add haptic feedback (vibration motor).","Use as a presentation clicker."]
},
{
  id:"ble-macropad", title:"BLE Macro Keypad / Stream Deck", glyph:"⌨️", difficulty:"Advanced",
  boards:["s3"], inputs:["button","touch"], outputs:["ble","tft"], category:"Power & Wearables",
  needsExtraParts:false, extraParts:[], source:"freetouchdeck",
  summary:"Keys that send shortcuts/macros to your PC over BLE — a DIY stream-deck (à la FreeTouchDeck).",
  whyBoard:"S3's native USB/BLE HID makes it a real keyboard; touchscreen optional.",
  parts:["4×4 Membrane Keypad (or buttons)","ESP32-S3"],
  prototype:{ breadboard:["Map each key to a macro/shortcut.","Send via BLE HID (or USB HID) to the computer."],
    wiring:[{from:"Keypad/buttons",to:"GPIO"}],
    simulator:{tool:"Wokwi",notes:"HID pairing needs hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <BleKeyboard.h>
BleKeyboard kb("MacroPad");
void setup(){ kb.begin(); }
void loop(){ if(/* key1 */){ kb.press(KEY_LEFT_CTRL); kb.press('c'); kb.releaseAll(); } }` },
  makeItReal:["Print a keypad deck with keycaps.","Per-key labels (or a touchscreen via FreeTouchDeck).","USB-C powered on your desk."]
},
{
  id:"ble-gamepad", title:"BLE Game Controller", glyph:"🎮", difficulty:"Advanced",
  boards:["s3"], inputs:["joystick","button"], outputs:["ble"], category:"Power & Wearables",
  needsExtraParts:false, extraParts:[], source:"awesome-esp",
  summary:"Turn a joystick + buttons into a wireless BLE gamepad for your PC/phone.",
  whyBoard:"S3 BLE HID gamepad; plenty of ADC + GPIO.",
  parts:["2-Axis Joystick","4× Push Button","ESP32-S3"],
  prototype:{ breadboard:["Read axes + buttons; send as a BLE gamepad report.","Calibrate joystick center/deadzone."],
    wiring:[{from:"Joystick",to:"2 ADC + SW"},{from:"Buttons",to:"GPIO"}],
    simulator:{tool:"Wokwi",notes:"BLE on hardware.",url:"https://wokwi.com/projects/new/esp32"} },
  code:{ arduino:`#include <BleGamepad.h>
BleGamepad gp;
void setup(){ gp.begin(); }
void loop(){ if(gp.isConnected()){ gp.setAxes(analogRead(34),analogRead(35),0,0,0,0,0,0); } }` },
  makeItReal:["Print an ergonomic grip shell + LiPo.","Add triggers/shoulder buttons.","Save calibration to flash."]
}

];
