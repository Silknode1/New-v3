/* Attribution + "go deeper" links. Project entries reference these by key. */
window.DB = window.DB || {};
window.DB.sources = {
  "randomnerd": {
    name: "Random Nerd Tutorials — 250+ ESP32 Projects",
    short: "RNT",
    type: "Tutorial catalog",
    url: "https://randomnerdtutorials.com/projects-esp32/",
    desc: "The most complete ESP32 tutorial index: wiring diagrams, full source, photos and video for hundreds of builds."
  },
  "rnt-sensors": {
    name: "Random Nerd Tutorials — 36 Sensor & Module Guides",
    short: "RNT Sensors",
    type: "Tutorial catalog",
    url: "https://randomnerdtutorials.com/esp32-guides-sensors-modules/",
    desc: "Per-sensor guides (DHT, DS18B20, BME280, PIR, HC-SR04, MPU6050, OLED, relays, RTC and more) in Arduino + MicroPython."
  },
  "rnt-beginner": {
    name: "Random Nerd Tutorials — 10 Easy Projects for Beginners",
    short: "RNT Beginner",
    type: "Tutorial list",
    url: "https://randomnerdtutorials.com/esp32-projects-for-beginners/",
    desc: "Curated first builds: web server, DHT+OLED display, GPS logger, internet clock, weather station."
  },
  "mcl": {
    name: "Microcontrollerslab — 150+ ESP32 Tutorials",
    short: "MCL",
    type: "Tutorial catalog",
    url: "https://microcontrollerslab.com/esp32-tutorials-projects/",
    desc: "Sensors, displays, motors, web servers, MQTT, ESP-NOW and cloud integrations."
  },
  "circuitdigest": {
    name: "Circuit Digest — ESP32 Projects",
    short: "Circuit Digest",
    type: "Tutorial catalog",
    url: "https://circuitdigest.com/esp32-projects",
    desc: "Circuit diagrams + code, strong on ESP32-CAM (face/object/helmet detection, attendance, WhatsApp)."
  },
  "efy": {
    name: "Electronics For You — ESP32 Projects",
    short: "EFY",
    type: "Tutorial catalog",
    url: "https://www.electronicsforu.com/category/electronics-projects/esp32-projects",
    desc: "Step-by-step DIY projects with downloadable code and schematics across skill levels."
  },
  "awesome-esp": {
    name: "agucova/awesome-esp (GitHub)",
    short: "awesome-esp",
    type: "Curated repo list",
    url: "https://github.com/agucova/awesome-esp",
    desc: "Curated ESP8266/ESP32 projects & libraries: smart home, InfoSec, LoRa, audio, smartwatches."
  },
  "awesome-esp-projects": {
    name: "hpsaturn/Awesome-ESP-projects (GitHub)",
    short: "Awesome-ESP-projects",
    type: "Curated repo list",
    url: "https://github.com/hpsaturn/Awesome-ESP-projects",
    desc: "Air-quality (CanAirIO/CODOS), Telegram bots, IR TV remotes, logging and more."
  },
  "100days": {
    name: "kritishmohapatra/100_Days_100_IoT_Projects (GitHub)",
    short: "100 Days IoT",
    type: "MicroPython repo",
    url: "https://github.com/kritishmohapatra/100_Days_100_IoT_Projects",
    desc: "100 day-by-day MicroPython projects (ESP32/Pico): each a sensor/module with code + circuit."
  },
  "nabidoust": {
    name: "m-nabidoust/ESP32-Projects (GitHub)",
    short: "ESP32-Projects",
    type: "Arduino/IDF repo",
    url: "https://github.com/m-nabidoust/ESP32-Projects",
    desc: "Zero-to-hero examples across GPIO, ADC/DAC, PWM, I2C/SPI, Wi-Fi/BLE, displays, MQTT."
  },
  "esphome": {
    name: "ESPHome + Home Assistant",
    short: "ESPHome",
    type: "Firmware platform",
    url: "https://esphome.io/",
    desc: "Config-file firmware for ESP32 smart-home devices; native Home Assistant integration, no coding required."
  },
  "cyd-panel": {
    name: "akuehlewind/ESPHome-touch-display-mount (CYD panel)",
    short: "CYD Panel",
    type: "GitHub + STL",
    url: "https://github.com/akuehlewind/ESPHome-touch-display-mount",
    desc: "LVGL touch control panel for Home Assistant with 3D-printable wall/desk enclosure."
  },
  "wled": {
    name: "WLED",
    short: "WLED",
    type: "Firmware app",
    url: "https://kno.wled.ge/",
    desc: "The standard ESP32 firmware for addressable LED strips: effects, web UI, app, voice, sync."
  },
  "freetouchdeck": {
    name: "DustinWatts/FreeTouchDeck",
    short: "FreeTouchDeck",
    type: "GitHub app",
    url: "https://github.com/DustinWatts/FreeTouchDeck",
    desc: "Touchscreen BLE macro keypad / stream-deck built on ESP32."
  },
  "esp32-radio": {
    name: "Edzelf/ESP32-Radio",
    short: "ESP32-Radio",
    type: "GitHub app",
    url: "https://github.com/Edzelf/ESP32Radio-V2",
    desc: "Internet radio on ESP32 with VS1053/I2S decoder, TFT display and web control."
  },
  "espwho": {
    name: "espressif/esp-who + esp-tflite-micro",
    short: "ESP-WHO / TFLite",
    type: "Espressif framework",
    url: "https://github.com/espressif/esp-who",
    desc: "Official face/person detection and TensorFlow-Lite-Micro examples for ESP32-S3."
  },
  "edgeimpulse": {
    name: "Edge Impulse — ESP32-S3 Vision",
    short: "Edge Impulse",
    type: "ML platform",
    url: "https://docs.edgeimpulse.com/",
    desc: "Train an image model in the browser, export an Arduino library, run inference on the S3-CAM."
  },
  "person-detect-s3": {
    name: "ai4iot/person-detection-esp32s3",
    short: "Person Detection S3",
    type: "GitHub project",
    url: "https://github.com/ai4iot/person-detection-esp32s3",
    desc: "OV2640 + ESP32-S3 MobileNetV2 person detector (95% accuracy) with web preview."
  },
  "waveshare-c6": {
    name: "Waveshare ESP32-C6-LCD-1.47 Wiki",
    short: "Waveshare C6 LCD",
    type: "Hardware wiki",
    url: "https://www.waveshare.com/wiki/ESP32-C6-LCD-1.47",
    desc: "Pinout, ST7789 driver, demos and LVGL setup for your C6 + 1.47\" screen board."
  },
  "lonelybinary": {
    name: "Lonely Binary — TinkerBlock & ESP32 tutorials",
    short: "Lonely Binary",
    type: "Vendor tutorials",
    url: "https://lonelybinary.com/blogs/tinkerblock-esp32-s3-starter-kit",
    desc: "Your kit's vendor: setup guides, driver install, per-brick lessons, and printable STL bases."
  },
  "makemindz": {
    name: "MakeMindz — Best ESP32 IoT Projects",
    short: "MakeMindz",
    type: "Tutorial list",
    url: "https://www.makemindz.com/2026/02/best-15-iot-projects-using-esp32-for.html",
    desc: "Curated IoT builds with components and real-world applications (parking, doorbell, irrigation, air quality)."
  },
  "wokwi": {
    name: "Wokwi — Online ESP32 Simulator",
    short: "Wokwi",
    type: "Simulator",
    url: "https://wokwi.com/",
    desc: "Simulate ESP32 + many sensors/displays in the browser before touching hardware."
  },
  "lilygo-tembed": {
    name: "LilyGO T-Embed CC1101",
    short: "T-Embed",
    type: "Hardware repo",
    url: "https://github.com/Xinyuan-LilyGO/T-Embed-CC1101",
    desc: "Schematics, pinout and examples for your sub-GHz/IR/encoder board."
  },
  "chameleon": {
    name: "RfidResearchGroup / ChameleonUltra",
    short: "Chameleon Ultra",
    type: "RFID research repo",
    url: "https://github.com/RfidResearchGroup/ChameleonUltra",
    desc: "Open-source firmware/docs for the Chameleon Ultra NFC/RFID emulator (authorized research)."
  }
};
