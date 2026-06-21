# Tile Image Prompts — ESP32 Project Studio

Generate one image per entry and save it as the exact filename shown (e.g. `assets/images/blink.png`). The app loads `assets/images/<id>.png` automatically and falls back to the built-in SVG tile if a file is missing — so you can do as many or as few as you like, in any order.

## How to use

**Google Nano Banana 2 (Gemini image):** Paste the **STYLE BLOCK** once and generate a first image. Then for every tile, say *"same style and framing as the previous image:"* followed by that tile's **subject line**. Reusing the first image as a style reference keeps all tiles consistent.

**ChatGPT image generator:** For each tile, paste the **STYLE BLOCK + the subject line together** as a single prompt. To stay consistent, keep the same chat and start later prompts with *"in the exact same illustration style as before:"*.

**Tips:** request a **16:10 aspect ratio** (matches the tiles), **no text or letters** in the image, centered subject, and a dark background. Export as **PNG**.

---

## STYLE BLOCK (use for every image)

```
Flat-design isometric 3D product illustration of a maker/electronics scene, clean and modern. 16:10 aspect ratio. Dark slate charcoal background (#0e1116) with a soft radial glow behind the subject. Subject centered with generous margins, soft studio lighting, gentle shadows, subtle depth of field. Crisp vector-like shapes, a restrained palette, tasteful neon accent. Absolutely NO text, NO letters, NO numbers, NO logos, NO watermarks. Cohesive icon-set look suitable for a card in a grid.
```

---

## Boards (7)

**`assets/images/s3.png`** — an ESP32-S3 dev board, shown as a hero product shot floating on a dark background with a teal accent glow; clean, premium, isometric.

**`assets/images/c6-lcd.png`** — an ESP32-C6 board with a small built-in color TFT screen, shown as a hero product shot floating on a dark background with a teal accent glow; clean, premium, isometric.

**`assets/images/s3cam.png`** — an ESP32-S3 board with a small camera module, shown as a hero product shot floating on a dark background with a teal accent glow; clean, premium, isometric.

**`assets/images/c6mini.png`** — a tiny ESP32-C6 Super Mini board, shown as a hero product shot floating on a dark background with a teal accent glow; clean, premium, isometric.

**`assets/images/c3.png`** — a tiny ESP32-C3 Super Mini board, shown as a hero product shot floating on a dark background with a teal accent glow; clean, premium, isometric.

**`assets/images/tembed.png`** — a handheld device with a small screen and a rotary knob, shown as a hero product shot floating on a dark background with a teal accent glow; clean, premium, isometric.

**`assets/images/chameleon.png`** — a slim card-sized RFID/NFC device, shown as a hero product shot floating on a dark background with a teal accent glow; clean, premium, isometric.


---

## Projects (108)

### Basics & I/O  
_Accent: warm emerald-green glow._

- **`assets/images/blink.png`** — Blink & Heartbeat LED: a scene with a tiny ESP32-C3 Super Mini board featuring LED (assorted), evoking a breadboard with glowing LEDs; warm emerald-green glow. Concept: The hello-world: blink an LED, then make it 'breathe' with PWM. Proves your toolchain works.
- **`assets/images/button-counter.png`** — Button Counter (debounced): a scene with a tiny ESP32-C3 Super Mini board featuring Push Button, OLED SSD1306, evoking a breadboard with glowing LEDs; warm emerald-green glow. Concept: Count clean button presses with software debounce and show the count on serial or an OLED.
- **`assets/images/pot-dimmer.png`** — Potentiometer LED Dimmer: a scene with a tiny ESP32-C3 Super Mini board featuring Rotary Potentiometer, LED (assorted), evoking a breadboard with glowing LEDs; warm emerald-green glow. Concept: Read an analog knob and map it to LED brightness — your first ADC→PWM pipeline.
- **`assets/images/rgb-mood.png`** — RGB Mood Lamp: a scene with a tiny ESP32-C3 Super Mini board featuring RGB LED (KY-016), Rotary Potentiometer, evoking a breadboard with glowing LEDs; warm emerald-green glow. Concept: Fade an RGB LED through the color wheel, or set hue with a knob.
- **`assets/images/joystick-cursor.png`** — Joystick Cursor / Servo Aim: a scene with an ESP32-S3 dev board featuring 2-Axis Joystick, Servo SG90, evoking a breadboard with glowing LEDs; warm emerald-green glow. Concept: Read X/Y and the button; move a cursor on the screen or aim a servo.
- **`assets/images/encoder-counter.png`** — Rotary Encoder Tuner: a scene with an ESP32-S3 dev board featuring Rotary Encoder (KY-040), OLED SSD1306, evoking a breadboard with glowing LEDs; warm emerald-green glow. Concept: Spin a detented knob to change a value up/down with a click to select — the core of any menu.
- **`assets/images/touch-lamp.png`** — Capacitive Touch Lamp: a scene with a tiny ESP32-C3 Super Mini board featuring Capacitive Touch (TTP223), WS2812 RGB LED, evoking a breadboard with glowing LEDs; warm emerald-green glow. Concept: Tap a pad to toggle light and long-press to cycle brightness/effects — no moving switch.
- **`assets/images/laser-tripwire.png`** — Laser Tripwire Alarm: a scene with a tiny ESP32-C3 Super Mini board featuring Laser Diode (KY-008), Active Buzzer, evoking a breadboard with glowing LEDs; warm emerald-green glow. Concept: A laser hits an LDR; break the beam and the buzzer fires. Classic spy-museum build.
- **`assets/images/traffic-light.png`** — Traffic-Light Sequencer: a scene with a tiny ESP32-C3 Super Mini board featuring 3× LED, 3× 220Ω, Push Button, evoking a breadboard with glowing LEDs; warm emerald-green glow. Concept: Drive red/amber/green in a timed cycle with a pedestrian-request button — a state-machine primer.
- **`assets/images/bargraph-meter.png`** — Analog Bar-Graph Meter: a scene with an ESP32-S3 dev board featuring LED Bar Graph (10-seg), 10× 220Ω (or 74HC595 Shift Register), Rotary Potentiometer, evoking a breadboard with glowing LEDs; warm emerald-green glow. Concept: Light up an LED bar in proportion to an analog input — a tactile VU/level display.
- **`assets/images/reaction-game.png`** — Reaction-Time Game: a scene with an ESP32-S3 dev board featuring Push Button, LED, Passive Buzzer, evoking a breadboard with glowing LEDs; warm emerald-green glow. Concept: LED lights after a random delay; smash the button — it times your reflexes in milliseconds.
- **`assets/images/simon-says.png`** — Simon-Says Memory Game: a scene with an ESP32-S3 dev board featuring 4× LED, 4× Push Button, Passive Buzzer, evoking a breadboard with glowing LEDs; warm emerald-green glow. Concept: Repeat a growing color/tone sequence. Four LEDs, four buttons, four notes.

### Environmental sensing  
_Accent: cool teal glow with a hint of nature._

- **`assets/images/temp-tft.png`** — Desk Temp/Humidity Monitor: a scene with an ESP32-C6 board with a small built-in color TFT screen featuring DHT11 Temp + Humidity, ESP32-C6-LCD-1.47, evoking small environmental sensors, a leaf or water droplet motif; cool teal glow with a hint of nature. Concept: Read a DHT11 and show big temperature/humidity figures on the onboard 1.47" color screen.
- **`assets/images/dht-oled.png`** — DHT + OLED Mini Weather Display: a scene with an ESP32-S3 dev board featuring DHT11 Temp + Humidity, OLED SSD1306, evoking small environmental sensors, a leaf or water droplet motif; cool teal glow with a hint of nature. Concept: The classic first build: temperature/humidity with icons on a crisp OLED.
- **`assets/images/weather-web.png`** — Wi-Fi Weather Station (Web): a scene with an ESP32-S3 dev board featuring BME280, ESP32-S3, evoking small environmental sensors, a leaf or water droplet motif; cool teal glow with a hint of nature. Concept: Serve a live page of temperature, humidity and pressure you can open from any phone on your Wi-Fi.
- **`assets/images/air-quality.png`** — Air-Quality Monitor: a scene with an ESP32-C6 board with a small built-in color TFT screen featuring BME680, ESP32-C6-LCD-1.47, evoking small environmental sensors, a leaf or water droplet motif; cool teal glow with a hint of nature. Concept: Track VOC/gas + temp/humidity and show an air-quality index on screen, with alerts when it spikes.
- **`assets/images/plant-monitor.png`** — Soil-Moisture Plant Monitor: a scene with a tiny ESP32-C6 Super Mini board featuring Soil Moisture, ESP32-C6 Super Mini, LED, evoking small environmental sensors, a leaf or water droplet motif; cool teal glow with a hint of nature. Concept: Read soil moisture and warn you (LED or phone) when your plant needs water.
- **`assets/images/smoke-alarm.png`** — Smoke & Gas Alarm: a scene with an ESP32-S3 dev board featuring MQ-2 Gas / Smoke, Flame Sensor, Active Buzzer, evoking small environmental sensors, a leaf or water droplet motif; cool teal glow with a hint of nature. Concept: MQ-2 + flame sensor trip a loud buzzer and (optionally) cut a relay and send an alert.
- **`assets/images/leak-detector.png`** — Water-Leak / Level Alert: a scene with a tiny ESP32-C6 Super Mini board featuring Water Level Sensor, Active Buzzer, ESP32-C6 Super Mini, evoking small environmental sensors, a leaf or water droplet motif; cool teal glow with a hint of nature. Concept: Detect water under the sink or a tank's level and buzz/notify before it floods.
- **`assets/images/rain-awning.png`** — Rain-Activated Alert: a scene with a tiny ESP32-C6 Super Mini board featuring Raindrop Sensor, ESP32-C6 Super Mini, evoking small environmental sensors, a leaf or water droplet motif; cool teal glow with a hint of nature. Concept: Sense the first raindrops and alert you to bring in laundry / close a window.
- **`assets/images/fridge-temp.png`** — Fridge/Freezer Temp Logger: a scene with a tiny ESP32-C6 Super Mini board featuring DS18B20 Temp Probe, ESP32-C6 Super Mini, evoking small environmental sensors, a leaf or water droplet motif; cool teal glow with a hint of nature. Concept: A waterproof DS18B20 logs fridge temperature and alerts if the door's left open (temp rises).
- **`assets/images/altimeter-display.png`** — Altimeter / Pressure Trend: a scene with an ESP32-C6 board with a small built-in color TFT screen featuring BME280, ESP32-C6-LCD-1.47, evoking small environmental sensors, a leaf or water droplet motif; cool teal glow with a hint of nature. Concept: Show altitude and a falling/rising pressure trend on screen — a hiking/weather gadget.
- **`assets/images/light-auto-lamp.png`** — Dusk-to-Dawn Auto Lamp: a scene with a tiny ESP32-C3 Super Mini board featuring Relay Module (1-ch), evoking small environmental sensors, a leaf or water droplet motif; cool teal glow with a hint of nature. Concept: Switch a lamp on when ambient light drops below a threshold (with hysteresis to avoid flicker).

### Motion & Presence  
_Accent: electric blue glow with motion ripples._

- **`assets/images/pir-nightlight.png`** — PIR Motion Night Light: a scene with a tiny ESP32-C3 Super Mini board featuring PIR Motion (HC-SR501), WS2812 RGB LED, evoking radar/sonar ripples and a motion sensor; electric blue glow with motion ripples. Concept: Lights fade up on motion and time out after stillness — hallway/closet automation.
- **`assets/images/ultrasonic-radar.png`** — Servo Radar Scanner: a scene with an ESP32-C6 board with a small built-in color TFT screen featuring Ultrasonic (HC-SR04), Servo SG90, ESP32-C6-LCD-1.47, evoking radar/sonar ripples and a motion sensor; electric blue glow with motion ripples. Concept: Sweep a servo carrying an ultrasonic sensor and draw a sweeping radar plot on the screen.
- **`assets/images/parking-gauge.png`** — Garage Parking Gauge: a scene with an ESP32-S3 dev board featuring Ultrasonic (HC-SR04), 3× LED, Active Buzzer, evoking radar/sonar ripples and a motion sensor; electric blue glow with motion ripples. Concept: Green/amber/red + faster beeps as your car approaches the perfect stop distance.
- **`assets/images/occupancy-counter.png`** — Room People Counter: a scene with an ESP32-S3 dev board featuring 2× IR Obstacle Avoidance, OLED SSD1306, ESP32-S3, evoking radar/sonar ripples and a motion sensor; electric blue glow with motion ripples. Concept: Count entries/exits with two beams (or PIR + ultrasonic) and show current occupancy.
- **`assets/images/door-sensor.png`** — Door / Window Open Sensor: a scene with a tiny ESP32-C6 Super Mini board featuring Reed Switch (KY-021), ESP32-C6 Super Mini, evoking radar/sonar ripples and a motion sensor; electric blue glow with motion ripples. Concept: A reed switch wakes the board from deep sleep the instant a door opens, then it reports and sleeps.
- **`assets/images/bike-alarm.png`** — Bike / Parcel Vibration Alarm: a scene with a tiny ESP32-C6 Super Mini board featuring Vibration / Shock (SW-420), Tilt Switch (SW-520D), Active Buzzer, evoking radar/sonar ripples and a motion sensor; electric blue glow with motion ripples. Concept: Arm it, and any jostle triggers a siren and a phone alert. Tamper detection on the cheap.
- **`assets/images/tachometer.png`** — Magnetic Tachometer / Counter: a scene with an ESP32-S3 dev board featuring Hall Sensor (KY-003), ESP32-C6-LCD-1.47, evoking radar/sonar ripples and a motion sensor; electric blue glow with motion ripples. Concept: Count magnet passes per second to measure RPM of a wheel, fan or motor.
- **`assets/images/step-counter.png`** — Wearable Step Counter: a scene with a tiny ESP32-C6 Super Mini board featuring MPU6050, OLED SSD1306, ESP32-C6 Super Mini, evoking radar/sonar ripples and a motion sensor; electric blue glow with motion ripples. Concept: Detect walking peaks from an accelerometer to count steps; show them or send to your phone.
- **`assets/images/fall-detector.png`** — Fall Detection Alert: a scene with a tiny ESP32-C6 Super Mini board featuring MPU6050, Active Buzzer, ESP32-C6 Super Mini, evoking radar/sonar ripples and a motion sensor; electric blue glow with motion ripples. Concept: Spot the free-fall-then-impact signature and send an SOS if there's no 'I'm OK' cancel.
- **`assets/images/smart-scale.png`** — Smart Kitchen Scale: a scene with an ESP32-C6 board with a small built-in color TFT screen featuring HX711 + Load Cell, Push Button, ESP32-C6-LCD-1.47, evoking radar/sonar ripples and a motion sensor; electric blue glow with motion ripples. Concept: Read a load cell via HX711, tare with a button, and show grams on the screen.

### Displays & UI  
_Accent: violet glow from a screen._

- **`assets/images/tft-menu.png`** — Rotary-Encoder TFT Menu: a scene with an ESP32-C6 board with a small built-in color TFT screen featuring Rotary Encoder (KY-040), ESP32-C6-LCD-1.47, evoking a small glowing display showing a simple UI; violet glow from a screen. Concept: A scrollable, selectable menu system on the color screen — the foundation for any handheld tool.
- **`assets/images/tft-dashboard.png`** — 1.47" Network Dashboard: a scene with an ESP32-C6 board with a small built-in color TFT screen featuring ESP32-C6-LCD-1.47, Wi-Fi, evoking a small glowing display showing a simple UI; violet glow from a screen. Concept: Pull time, weather and a couple of stats from the internet and tile them on the screen.
- **`assets/images/oled-stats.png`** — PC/Server Stats OLED: a scene with an ESP32-S3 dev board featuring OLED SSD1306, ESP32-S3, evoking a small glowing display showing a simple UI; violet glow from a screen. Concept: Show CPU/RAM/net stats your computer pushes over the network on a tiny desk OLED.
- **`assets/images/matrix-ticker.png`** — Scrolling LED-Matrix Ticker: a scene with an ESP32-S3 dev board featuring 8×8 LED Matrix (MAX7219), ESP32-S3, evoking a small glowing display showing a simple UI; violet glow from a screen. Concept: Scroll messages, time, or live data (weather, crypto, notifications) across an 8×8 matrix chain.
- **`assets/images/seven-seg-counter.png`** — TM1637 Digit Counter/Score: a scene with a tiny ESP32-C3 Super Mini board featuring TM1637 4-Digit 7-Seg, 2× Push Button, evoking a small glowing display showing a simple UI; violet glow from a screen. Concept: Four-digit numeric display for scores, counts, or a countdown — only two data pins.
- **`assets/images/ambient-clock.png`** — WS2812 Ambient Light Clock: a scene with an ESP32-C6 board with a small built-in color TFT screen featuring WS2812B Strip/Ring, ESP32-C6-LCD-1.47, evoking a small glowing display showing a simple UI; violet glow from a screen. Concept: Map hours/minutes onto a LED ring/strip with smooth color — a glanceable, gorgeous clock.
- **`assets/images/animated-eyes.png`** — Animated 'Robot Eyes' UI: a scene with an ESP32-C6 board with a small built-in color TFT screen featuring ESP32-C6-LCD-1.47, Capacitive Touch (TTP223), evoking a small glowing display showing a simple UI; violet glow from a screen. Concept: Blinking, glancing cartoon eyes that react to touch/sound — give any gadget a personality.
- **`assets/images/touch-control-panel.png`** — Home-Assistant Touch Panel (CYD-style): a scene with an ESP32-S3 dev board featuring ESP32-S3 + touchscreen (or C6-LCD), Wi-Fi, evoking a small glowing display showing a simple UI; violet glow from a screen. Concept: An LVGL wall panel with buttons that call Home Assistant directly — lights, scenes, status.
- **`assets/images/notifier-strip.png`** — Desk Notifier Light Bar: a scene with an ESP32-S3 dev board featuring WS2812B Strip, ESP32-S3, evoking a small glowing display showing a simple UI; violet glow from a screen. Concept: A strip that glows by event: green build passed, blue new email, red calendar in 5 min.
- **`assets/images/lcd-readout.png`** — LCD1602 Sensor Readout: a scene with a tiny ESP32-C3 Super Mini board featuring LCD1602 (I2C), DHT11 Temp + Humidity, evoking a small glowing display showing a simple UI; violet glow from a screen. Concept: Two lines of crisp text for any sensor value — the no-graphics, always-readable display.

### Audio  
_Accent: amber-orange glow with sound waves._

- **`assets/images/buzzer-jukebox.png`** — Passive-Buzzer Jukebox: a scene with a tiny ESP32-C3 Super Mini board featuring Passive Buzzer, 2× Push Button, evoking concentric sound waves and a tiny speaker/mic; amber-orange glow with sound waves. Concept: Play melodies (note frequencies + durations) and pick songs with buttons.
- **`assets/images/clap-switch.png`** — Clap-Activated Switch: a scene with a tiny ESP32-C3 Super Mini board featuring Analog Microphone / Sound, Relay Module (1-ch), evoking concentric sound waves and a tiny speaker/mic; amber-orange glow with sound waves. Concept: Toggle a light on a double-clap using the sound sensor's digital threshold output.
- **`assets/images/audio-spectrum.png`** — Music Spectrum Visualizer: a scene with an ESP32-S3 dev board featuring INMP441 I2S Mic, WS2812B Strip, ESP32-S3, evoking concentric sound waves and a tiny speaker/mic; amber-orange glow with sound waves. Concept: FFT a clean I2S mic feed and paint frequency bands across LEDs or the screen.
- **`assets/images/voice-relay.png`** — Voice-Command Relay (TinyML): a scene with an ESP32-S3 dev board featuring INMP441 I2S Mic, Relay Module (1-ch), ESP32-S3, evoking concentric sound waves and a tiny speaker/mic; amber-orange glow with sound waves. Concept: On-device keyword spotting ('on'/'off') toggles a relay — offline, no cloud.
- **`assets/images/web-radio.png`** — ESP32 Internet Radio: a scene with an ESP32-S3 dev board featuring Rotary Encoder (KY-040), ESP32-S3, evoking concentric sound waves and a tiny speaker/mic; amber-orange glow with sound waves. Concept: Stream internet radio over Wi-Fi to an I2S amp + speaker, with station select on the screen.
- **`assets/images/talking-clock.png`** — Talking / Chiming Clock: a scene with an ESP32-S3 dev board featuring ESP32-S3, evoking concentric sound waves and a tiny speaker/mic; amber-orange glow with sound waves. Concept: Announce the time or chime on the hour using stored WAV clips played over I2S.
- **`assets/images/sound-leds.png`** — Sound-Reactive Party LEDs: a scene with an ESP32-S3 dev board featuring Analog Microphone / Sound, WS2812 RGB LED, evoking concentric sound waves and a tiny speaker/mic; amber-orange glow with sound waves. Concept: The kit's analog mic drives brightness/color of the RGB bar — quick reactive lighting.

### Home Automation  
_Accent: green smart-home glow._

- **`assets/images/matter-sensor.png`** — Matter Temp/Humidity Sensor: a scene with an ESP32-C6 board with a small built-in color TFT screen featuring ESP32-C6 (LCD or Mini), DHT11 Temp + Humidity, evoking a stylized house outline and a smart switch; green smart-home glow. Concept: A native Matter/Thread sensor that pairs straight into Apple Home / Google / Home Assistant.
- **`assets/images/zigbee-button.png`** — Zigbee/Thread Smart Button: a scene with a tiny ESP32-C6 Super Mini board featuring Push Button, ESP32-C6 Super Mini, evoking a stylized house outline and a smart switch; green smart-home glow. Concept: A wireless scene button (single/double/hold) that triggers automations on your hub.
- **`assets/images/esphome-relay.png`** — ESPHome Smart Plug / Fan: a scene with an ESP32-S3 dev board featuring Relay Module (1-ch), DHT11 Temp + Humidity, ESP32-S3, evoking a stylized house outline and a smart switch; green smart-home glow. Concept: Switch a load from Home Assistant and add a temperature rule (fan on when warm) — no code.
- **`assets/images/mqtt-node.png`** — MQTT Sensor Node: a scene with an ESP32-S3 dev board featuring DHT11 Temp + Humidity, ESP32-S3, evoking a stylized house outline and a smart switch; green smart-home glow. Concept: Publish readings to an MQTT broker for dashboards/automation — the IoT lingua franca.
- **`assets/images/smart-doorbell.png`** — Smart Doorbell + Snapshot: a scene with an ESP32-S3 board with a small camera module featuring Push Button, ESP32-S3-CAM, evoking a stylized house outline and a smart switch; green smart-home glow. Concept: Press the button → capture a photo and push a notification with the image.
- **`assets/images/presence-beacon.png`** — BLE Presence Beacon: a scene with a tiny ESP32-C6 Super Mini board featuring ESP32-C6 Super Mini, evoking a stylized house outline and a smart switch; green smart-home glow. Concept: Advertise a BLE beacon so your hub detects when you're home and runs room automations.
- **`assets/images/thermostat.png`** — Wi-Fi Thermostat: a scene with an ESP32-C6 board with a small built-in color TFT screen featuring DHT11 Temp + Humidity, Rotary Encoder (KY-040), Relay Module (1-ch), evoking a stylized house outline and a smart switch; green smart-home glow. Concept: Set a target with the knob; the screen shows current vs target and a relay drives the heater/fan.
- **`assets/images/curtain-opener.png`** — Automated Curtain/Blind: a scene with an ESP32-S3 dev board featuring 28BYJ-48 Stepper + ULN2003, ESP32-S3, evoking a stylized house outline and a smart switch; green smart-home glow. Concept: Open blinds at sunrise (or by schedule/app) using the geared stepper.
- **`assets/images/wled-strip.png`** — WLED Ambient Lighting: a scene with an ESP32-S3 dev board featuring WS2812B Strip, ESP32 (S3/C3), 5V supply + level shifter, evoking a stylized house outline and a smart switch; green smart-home glow. Concept: Flash the WLED firmware and control an LED strip from a phone app, voice, or Home Assistant — no coding.

### Connectivity & Cloud  
_Accent: cyan glow with wifi arcs._

- **`assets/images/web-led.png`** — Web-Server LED Control: a scene with an ESP32-S3 dev board featuring LED, ESP32-S3, evoking wifi/cloud arcs and data dots; cyan glow with wifi arcs. Concept: Toggle GPIO from a web page on your phone — the gateway to every IoT project.
- **`assets/images/cloud-logger.png`** — Google-Sheets Cloud Logger: a scene with an ESP32-S3 dev board featuring BME280, ESP32-S3, evoking wifi/cloud arcs and data dots; cyan glow with wifi arcs. Concept: Append timestamped readings to a Google Sheet you can view/graph from anywhere.
- **`assets/images/telegram-alerts.png`** — Telegram / WhatsApp Alerts: a scene with an ESP32-S3 dev board featuring PIR Motion (HC-SR501), ESP32-S3, evoking wifi/cloud arcs and data dots; cyan glow with wifi arcs. Concept: Push a phone message on any event — motion, door, threshold — and accept commands back.
- **`assets/images/espnow-link.png`** — ESP-NOW Sensor → Display Link: a scene with a tiny ESP32-C6 Super Mini board featuring 2× ESP32-C6 (Mini sender + LCD receiver), DHT11 Temp + Humidity, evoking wifi/cloud arcs and data dots; cyan glow with wifi arcs. Concept: A battery sensor sends readings directly to a display board with no router or pairing latency.
- **`assets/images/sd-logger.png`** — Standalone SD Data Logger: a scene with an ESP32-C6 board with a small built-in color TFT screen featuring DS3231 RTC, DS18B20 Temp Probe, ESP32-C6-LCD-1.47 (TF slot), evoking wifi/cloud arcs and data dots; cyan glow with wifi arcs. Concept: Timestamp and write readings to a microSD card for offline, no-Wi-Fi logging.
- **`assets/images/gps-logger.png`** — GPS Trip Logger: a scene with an ESP32-S3 dev board featuring NEO-6M GPS, MicroSD (or C6 TF slot), ESP32-S3, evoking wifi/cloud arcs and data dots; cyan glow with wifi arcs. Concept: Record a GPX/CSV track of where you go and map it later (e.g. on Google Earth).
- **`assets/images/trip-tracker.png`** — Live LTE-less Trip Tracker: a scene with a tiny ESP32-C6 Super Mini board featuring NEO-6M GPS, LiPo, ESP32-C6 Super Mini, evoking wifi/cloud arcs and data dots; cyan glow with wifi arcs. Concept: Buffer GPS points offline and upload the track whenever it rejoins known Wi-Fi.
- **`assets/images/captive-setup.png`** — Captive-Portal Wi-Fi Setup: a scene with an ESP32-S3 dev board featuring ESP32 (any), evoking wifi/cloud arcs and data dots; cyan glow with wifi arcs. Concept: Let users enter Wi-Fi credentials via a phone page (no hard-coding) — makes a device shareable.
- **`assets/images/lora-sensor.png`** — Long-Range LoRa Sensor: a scene with an ESP32-S3 dev board featuring SX1278 LoRa, DS18B20 Temp Probe, ESP32-S3, evoking wifi/cloud arcs and data dots; cyan glow with wifi arcs. Concept: Send sensor data kilometers with no Wi-Fi — farm, garden, or off-grid telemetry.
- **`assets/images/lora-pager.png`** — Off-Grid LoRa Pager: a scene with an ESP32-C6 board with a small built-in color TFT screen featuring SX1278 LoRa, ESP32-C6-LCD-1.47, Rotary Encoder (KY-040), evoking wifi/cloud arcs and data dots; cyan glow with wifi arcs. Concept: Two screen-equipped nodes exchange short text messages over LoRa with no infrastructure.

### Camera & Edge AI  
_Accent: magenta-pink glow._

- **`assets/images/cam-stream.png`** — Live MJPEG Camera Stream: a scene with an ESP32-S3 board with a small camera module featuring ESP32-S3-CAM, evoking a camera lens with a subtle AI bounding-box overlay; magenta-pink glow. Concept: Stream the camera to any browser on your network — the foundation for every vision project.
- **`assets/images/security-cam.png`** — Motion-Snapshot Security Cam: a scene with an ESP32-S3 board with a small camera module featuring ESP32-S3-CAM, PIR Motion (HC-SR501), evoking a camera lens with a subtle AI bounding-box overlay; magenta-pink glow. Concept: On PIR motion, grab a JPEG and push it to your phone / save it — a battery-friendly cam.
- **`assets/images/timelapse-cam.png`** — Time-Lapse Camera: a scene with an ESP32-S3 board with a small camera module featuring ESP32-S3-CAM, MicroSD (or onboard slot), evoking a camera lens with a subtle AI bounding-box overlay; magenta-pink glow. Concept: Snap a frame every N minutes to SD; stitch into a time-lapse of a sunset, print, or plant.
- **`assets/images/qr-detect.png`** — QR / Barcode Reader: a scene with an ESP32-S3 board with a small camera module featuring ESP32-S3-CAM, evoking a camera lens with a subtle AI bounding-box overlay; magenta-pink glow. Concept: Decode QR codes from the camera and act on them — inventory, check-in, config handoff.
- **`assets/images/person-detect.png`** — On-Device Person Detection: a scene with an ESP32-S3 board with a small camera module featuring ESP32-S3-CAM, evoking a camera lens with a subtle AI bounding-box overlay; magenta-pink glow. Concept: Run a MobileNet/TFLite model to flag when a person is in frame — privacy-friendly, no cloud.
- **`assets/images/occupancy-ai.png`** — Edge-AI Room Occupancy Counter: a scene with an ESP32-S3 board with a small camera module featuring ESP32-S3-CAM, OLED SSD1306, evoking a camera lens with a subtle AI bounding-box overlay; magenta-pink glow. Concept: Count people in view with a TFLite model and show occupancy — drive ventilation/heating.
- **`assets/images/color-sorter.png`** — Color / Object Classifier: a scene with an ESP32-S3 board with a small camera module featuring ESP32-S3-CAM, Servo SG90, evoking a camera lens with a subtle AI bounding-box overlay; magenta-pink glow. Concept: Train Edge Impulse to recognize a few objects/colors and trigger a servo to sort them.
- **`assets/images/pan-tilt-cam.png`** — Pan/Tilt Tracking Camera: a scene with an ESP32-S3 board with a small camera module featuring ESP32-S3-CAM, Pan/Tilt + 2× SG90, evoking a camera lens with a subtle AI bounding-box overlay; magenta-pink glow. Concept: Detect a face/person and keep them centered by driving two servos.

### RF / IR / RFID  
_Accent: red glow with concentric radio waves._

- **`assets/images/ir-remote-clone.png`** — IR Remote Record & Replay: a scene with a handheld device with a small screen and a rotary knob featuring IR Receiver (VS1838B), IR Transmitter LED, ESP32-S3 (or T-Embed), evoking radio/IR waves and an access card; red glow with concentric radio waves. Concept: Capture codes from YOUR remotes and replay them — one device to rule your own gear.
- **`assets/images/universal-ac.png`** — Smart IR A/C Controller: a scene with a handheld device with a small screen and a rotary knob featuring IR Transmitter LED, DHT11 Temp + Humidity, ESP32-C6-LCD-1.47, evoking radio/IR waves and an access card; red glow with concentric radio waves. Concept: Send your A/C's IR commands on schedule or from your phone — make a dumb A/C smart.
- **`assets/images/subghz-learn.png`** — Sub-GHz Remote Learning (433 MHz): a scene with a handheld device with a small screen and a rotary knob featuring LilyGO T-Embed CC1101, evoking radio/IR waves and an access card; red glow with concentric radio waves. Concept: Use the CC1101 to observe and understand how YOUR own 433 MHz remotes encode signals.
- **`assets/images/rfid-access.png`** — RFID Access Demo (your cards): a scene with an ESP32-S3 dev board featuring RC522 RFID, Servo SG90 (or Relay), ESP32-S3, evoking radio/IR waves and an access card; red glow with concentric radio waves. Concept: Unlock a servo/relay when an authorized tag (one you own) is presented — learn access control.
- **`assets/images/rfid-attendance.png`** — RFID Attendance / Inventory: a scene with an ESP32-S3 dev board featuring RC522 RFID, ESP32-C6-LCD-1.47, evoking radio/IR waves and an access card; red glow with concentric radio waves. Concept: Tap a tag to log a name/item with a timestamp to a sheet or local list.
- **`assets/images/chameleon-learn.png`** — RFID/NFC Learning Lab (Chameleon Ultra): a scene with a slim card-sized RFID/NFC device featuring Chameleon Ultra, your own RFID/NFC cards, phone/PC app, evoking radio/IR waves and an access card; red glow with concentric radio waves. Concept: Use the Chameleon Ultra to read, save and emulate YOUR OWN cards to understand RFID/NFC.
- **`assets/images/ir-trigger-cam.png`** — IR-Triggered Shutter/Action: a scene with an ESP32-S3 dev board featuring IR Receiver (VS1838B), Relay Module (1-ch), evoking radio/IR waves and an access card; red glow with concentric radio waves. Concept: Use any spare remote button to trigger a relay/macro — repurpose a remote as a wireless button.

### Robotics & Motors  
_Accent: purple glow._

- **`assets/images/servo-gauge.png`** — Physical Data Gauge (Servo): a scene with a tiny ESP32-C3 Super Mini board featuring Servo SG90, DHT11 Temp + Humidity, evoking gears, a servo horn and a small wheeled chassis; purple glow. Concept: Point a servo needle at a printed dial to show temperature, CPU load, or any value.
- **`assets/images/stepper-dial.png`** — Stepper Indicator / Valve: a scene with an ESP32-S3 dev board featuring 28BYJ-48 Stepper + ULN2003, Rotary Encoder (KY-040), evoking gears, a servo horn and a small wheeled chassis; purple glow. Concept: Precisely position a geared stepper for a multi-turn dial, valve, or focus mechanism.
- **`assets/images/obstacle-rover.png`** — Obstacle-Avoiding Rover: a scene with an ESP32-S3 dev board featuring DC Motor + L9110, Ultrasonic (HC-SR04), evoking gears, a servo horn and a small wheeled chassis; purple glow. Concept: A two-motor rover that drives forward and turns away from obstacles it 'sees' with ultrasonic.
- **`assets/images/line-follower.png`** — Line-Following Robot: a scene with an ESP32-S3 dev board featuring 3× Line Tracking (TCRT5000), DC Motor + L9110, evoking gears, a servo horn and a small wheeled chassis; purple glow. Concept: Follow a black line on the floor using reflective sensors and proportional steering.
- **`assets/images/light-tracker.png`** — Sun/Light-Tracking Servo: a scene with an ESP32-S3 dev board featuring Servo SG90 (or pan/tilt), evoking gears, a servo horn and a small wheeled chassis; purple glow. Concept: Two LDRs let a servo aim a panel/sensor at the brightest spot — a solar tracker demo.
- **`assets/images/self-level.png`** — Self-Leveling Platform: a scene with an ESP32-S3 dev board featuring MPU6050, Pan/Tilt + 2× SG90, ESP32-S3, evoking gears, a servo horn and a small wheeled chassis; purple glow. Concept: Read tilt from an IMU and counter-rotate two servos to keep a platform flat (camera gimbal-lite).
- **`assets/images/fan-controller.png`** — PWM Fan / Motor Speed Box: a scene with a tiny ESP32-C3 Super Mini board featuring DC Motor + L9110, Rotary Potentiometer, NTC Thermistor (KY-013), evoking gears, a servo horn and a small wheeled chassis; purple glow. Concept: Control a DC fan's speed by knob or by temperature — quiet when cool, fast when warm.
- **`assets/images/split-flap.png`** — Mini Split-Flap / Rolling Display: a scene with an ESP32-S3 dev board featuring 28BYJ-48 Stepper + ULN2003, Hall Sensor (KY-003), evoking gears, a servo horn and a small wheeled chassis; purple glow. Concept: A stepper rotates a printed character drum to show a letter — chain them for words.

### Clocks, Timers & Games  
_Accent: golden-yellow glow._

- **`assets/images/ntp-clock.png`** — Internet (NTP) Clock: a scene with an ESP32-C6 board with a small built-in color TFT screen featuring ESP32-C6-LCD-1.47 (or TM1637), evoking a clock face and playful game pips; golden-yellow glow. Concept: Always-accurate clock synced over Wi-Fi, shown on the TFT or a TM1637.
- **`assets/images/alarm-clock.png`** — Smart Alarm Clock: a scene with an ESP32-C6 board with a small built-in color TFT screen featuring DS3231 RTC, Rotary Encoder (KY-040), Passive Buzzer, evoking a clock face and playful game pips; golden-yellow glow. Concept: Set alarms with the knob; buzzer/chime wakes you; snooze on a tap. Keeps time offline via RTC.
- **`assets/images/pomodoro.png`** — Pomodoro Focus Timer: a scene with an ESP32-C6 board with a small built-in color TFT screen featuring Rotary Encoder (KY-040), Passive Buzzer, ESP32-C6-LCD-1.47, evoking a clock face and playful game pips; golden-yellow glow. Concept: 25-minute work / 5-minute break cycles with a knob to adjust and a chime at each switch.
- **`assets/images/word-clock.png`** — Word Clock: a scene with an ESP32-S3 dev board featuring WS2812B Strip (grid), DS3231 RTC, ESP32-S3, evoking a clock face and playful game pips; golden-yellow glow. Concept: Light up words ('IT IS HALF PAST TEN') on a printed letter grid backed by addressable LEDs.
- **`assets/images/dice.png`** — Electronic Dice: a scene with a tiny ESP32-C3 Super Mini board featuring Vibration / Shock (SW-420), 8×8 LED Matrix (MAX7219), evoking a clock face and playful game pips; golden-yellow glow. Concept: Shake or press to 'roll' — show 1–6 pips on LEDs or the matrix with a little animation.
- **`assets/images/countdown-timer.png`** — Kitchen / Workshop Countdown: a scene with a tiny ESP32-C3 Super Mini board featuring TM1637 4-Digit 7-Seg, Rotary Encoder (KY-040), Active Buzzer, evoking a clock face and playful game pips; golden-yellow glow. Concept: Dial in minutes:seconds, start, and get a loud alert at zero — the everyday timer.
- **`assets/images/whack-game.png`** — Whack-a-LED Reflex Game: a scene with an ESP32-S3 dev board featuring 4× LED, 4× Push Button, TM1637 4-Digit 7-Seg, evoking a clock face and playful game pips; golden-yellow glow. Concept: A random LED lights; hit its button before it times out. Speeds up as your score climbs.

### Power & Wearables  
_Accent: indigo glow._

- **`assets/images/deep-sleep-sensor.png`** — Months-on-a-Battery Sensor: a scene with a tiny ESP32-C6 Super Mini board featuring ESP32-C6 Super Mini, DHT11 Temp + Humidity, LiPo, evoking a small LiPo battery and a wearable strap; indigo glow. Concept: The pattern behind every battery sensor: wake, read, send, deep-sleep — for months of runtime.
- **`assets/images/status-badge.png`** — Wearable Status Badge: a scene with a tiny ESP32-C6 Super Mini board featuring ESP32-C6 Super Mini, WS2812 RGB LED, LiPo, evoking a small LiPo battery and a wearable strap; indigo glow. Concept: A pocket-sized badge showing your name/status with addressable bling, on battery.
- **`assets/images/name-badge.png`** — E-Ink Name Badge: a scene with a tiny ESP32-C6 Super Mini board featuring E-Paper 2.9", ESP32-C6 Super Mini, LiPo, evoking a small LiPo battery and a wearable strap; indigo glow. Concept: Set your name/role once; the e-ink holds it with near-zero power for days on a charge.
- **`assets/images/eink-dashboard.png`** — Low-Power E-Ink Dashboard: a scene with a tiny ESP32-C6 Super Mini board featuring E-Paper 2.9", ESP32-C6 Super Mini, evoking a small LiPo battery and a wearable strap; indigo glow. Concept: Weather/calendar/agenda on e-ink that refreshes a few times a day and sleeps between.
- **`assets/images/mailbox-notifier.png`** — Mailbox 'You've Got Mail' Notifier: a scene with a tiny ESP32-C6 Super Mini board featuring Reed Switch (KY-021), ESP32-C6 Super Mini, LiPo, evoking a small LiPo battery and a wearable strap; indigo glow. Concept: The mailbox door (reed) or added weight wakes the board to ping your phone, then it sleeps.
- **`assets/images/solar-node.png`** — Solar-Powered Garden Node: a scene with a tiny ESP32-C6 Super Mini board featuring ESP32-C6 Super Mini, Soil Moisture, small solar panel + LiPo + TP4056, evoking a small LiPo battery and a wearable strap; indigo glow. Concept: A perpetual outdoor sensor: small solar panel tops up a LiPo while the C6 deep-sleeps between reads.
- **`assets/images/gesture-ui.png`** — Gesture-Controlled Interface: a scene with an ESP32-S3 dev board featuring MPU6050, ESP32-S3, evoking a small LiPo battery and a wearable strap; indigo glow. Concept: Tilt/flick gestures from an IMU control a UI or act as a BLE remote (next/prev/volume).
- **`assets/images/ble-macropad.png`** — BLE Macro Keypad / Stream Deck: a scene with an ESP32-S3 dev board featuring 4×4 Membrane Keypad (or buttons), ESP32-S3, evoking a small LiPo battery and a wearable strap; indigo glow. Concept: Keys that send shortcuts/macros to your PC over BLE — a DIY stream-deck (à la FreeTouchDeck).
- **`assets/images/ble-gamepad.png`** — BLE Game Controller: a scene with an ESP32-S3 dev board featuring 2-Axis Joystick, 4× Push Button, ESP32-S3, evoking a small LiPo battery and a wearable strap; indigo glow. Concept: Turn a joystick + buttons into a wireless BLE gamepad for your PC/phone.

---
## Fully-expanded example (style + subject combined)

```
[STYLE BLOCK above] Subject: Blink & Heartbeat LED — a scene with a tiny ESP32-C3 Super Mini board featuring LED (assorted), evoking a breadboard with glowing LEDs; warm emerald-green glow. 16:10, no text.
```
