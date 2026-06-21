/* Recommended add-on parts (user is open to buying). `enables` lists project ids. */
window.DB = window.DB || {};
window.DB.shopping = [
  {
    id: "bme280", name: "BME280 / BME680 Environmental Sensor", glyph: "🌬️",
    kind: "Sensor", interface: "I2C", price: "$5–12",
    unlocks: "Lab-grade temperature, humidity, barometric pressure (BME680 adds gas/air-quality).",
    why: "The DHT11 in your kit is coarse (±2°C, no pressure). A BME280 is the go-to for accurate weather stations and altitude; the BME680 adds a VOC gas index for air-quality monitors.",
    enables: ["weather-web", "air-quality", "cloud-logger", "altimeter-display"]
  },
  {
    id: "ssd1306", name: "SSD1306 0.96\" OLED", glyph: "📟",
    kind: "Display", interface: "I2C", price: "$3–6",
    unlocks: "Crisp little status display for any project — and the classic DHT+OLED build.",
    why: "Two wires (I2C) for a sharp monochrome screen. Perfect on boards without the onboard TFT (S3, C6 Super Mini). If your 46-kit already has one, you're set.",
    enables: ["dht-oled", "occupancy-counter", "pomodoro", "step-counter"]
  },
  {
    id: "mpu6050", name: "MPU6050 Accelerometer + Gyro (IMU)", glyph: "🧭",
    kind: "Sensor", interface: "I2C", price: "$3–6",
    unlocks: "Motion, tilt, orientation, step counting, gesture and impact/fall detection.",
    why: "Adds 6-axis motion sensing the kit lacks — the basis for wearables, self-balancing bots, level tools and gesture UIs.",
    enables: ["step-counter", "gesture-ui", "fall-detector", "self-level"]
  },
  {
    id: "rc522", name: "RC522 RFID Reader + Cards", glyph: "💳",
    kind: "Module", interface: "SPI", price: "$4–8",
    unlocks: "13.56 MHz RFID read/write — access tags, attendance, inventory (separate from Chameleon).",
    why: "A cheap, wire-it-yourself RFID reader to build access/attendance projects on a breadboard, complementing the Chameleon Ultra for learning.",
    enables: ["rfid-access", "rfid-attendance"]
  },
  {
    id: "inmp441", name: "INMP441 I2S Microphone", glyph: "🎙️",
    kind: "Sensor", interface: "I2S", price: "$4–8",
    unlocks: "Clean digital audio capture for VU meters, sound classifiers and voice features.",
    why: "Far better than the analog mic for real audio: I2S gives clean PCM for FFT spectrum displays, clap detection, and TinyML keyword spotting.",
    enables: ["audio-spectrum", "voice-relay", "web-radio"]
  },
  {
    id: "max98357", name: "MAX98357A I2S Amplifier + Speaker", glyph: "🔈",
    kind: "Module", interface: "I2S", price: "$4–9",
    unlocks: "Real sound output: music, web radio, spoken alerts/TTS, alarm tones.",
    why: "The passive buzzer can only beep. An I2S amp + small speaker lets the S3 play WAV/MP3 and stream internet radio.",
    enables: ["web-radio", "talking-clock", "voice-relay"]
  },
  {
    id: "ws2812-strip", name: "WS2812B Addressable LED Strip", glyph: "🌈",
    kind: "Output", interface: "Digital (1-wire)", price: "$6–15",
    unlocks: "WLED ambient lighting, notifiers, status bars, and big sound-reactive effects.",
    why: "Your kit has a short RGB bar; a full strip (30–144 LEDs) unlocks WLED — the killer ESP32 lighting app — plus reactive and clock effects.",
    enables: ["wled-strip", "ambient-clock", "audio-spectrum", "notifier-strip"]
  },
  {
    id: "microsd", name: "MicroSD Card Module", glyph: "💾",
    kind: "Module", interface: "SPI", price: "$2–5",
    unlocks: "Local data logging, image/audio storage, web-server file hosting.",
    why: "Standalone boards (S3, C6 Super Mini) need this to log to a card. Your C6-LCD board already has a TF slot, so this is for the others.",
    enables: ["sd-logger", "cloud-logger", "timelapse-cam"]
  },
  {
    id: "neo6m", name: "NEO-6M / NEO-M8N GPS Module", glyph: "🛰️",
    kind: "Module", interface: "UART", price: "$8–16",
    unlocks: "Location, speed and accurate time — GPS loggers and trackers.",
    why: "Adds positioning for trip loggers, geofences and a rock-solid clock source independent of Wi-Fi.",
    enables: ["gps-logger", "trip-tracker"]
  },
  {
    id: "hx711", name: "HX711 + Load Cell", glyph: "⚖️",
    kind: "Sensor", interface: "Digital (2-wire)", price: "$6–12",
    unlocks: "Weight/force measurement — smart scales, fill monitors, presence-by-weight.",
    why: "Turns any load cell into a digital scale: coffee scale, pet-bowl monitor, mailbox 'mail arrived' sensor.",
    enables: ["smart-scale", "mailbox-notifier"]
  },
  {
    id: "ds3231", name: "DS3231 Precision RTC", glyph: "🕰️",
    kind: "Module", interface: "I2C", price: "$2–5",
    unlocks: "Accurate timekeeping with a backup battery for offline clocks/loggers.",
    why: "More accurate than the kit's DS1307 and keeps time without Wi-Fi/power — ideal for clocks and timestamped logs off-grid.",
    enables: ["alarm-clock", "sd-logger", "word-clock"]
  },
  {
    id: "epaper", name: "E-Paper / E-Ink Display (2.9\")", glyph: "🧾",
    kind: "Display", interface: "SPI", price: "$15–30",
    unlocks: "Ultra-low-power always-on info tags: weather, calendar, name badges.",
    why: "Holds an image with zero power — perfect with the C6 Super Mini's deep sleep for month-long battery info displays.",
    enables: ["eink-dashboard", "name-badge", "weather-web"]
  },
  {
    id: "lora", name: "LoRa Module (SX1278 433/915 MHz)", glyph: "📶",
    kind: "Module", interface: "SPI", price: "$8–18",
    unlocks: "Kilometer-range, license-free wireless links with no Wi-Fi needed.",
    why: "For remote sensors well beyond Wi-Fi range — farm/garden telemetry, off-grid messaging, long-range buttons.",
    enables: ["lora-sensor", "lora-pager"]
  },
  {
    id: "lipo", name: "1S LiPo + Charger (TP4056 / built-in)", glyph: "🔋",
    kind: "Power", interface: "—", price: "$5–12",
    unlocks: "Untethered, portable and wearable builds; deep-sleep battery sensors.",
    why: "The step that makes a breadboard project a real device you can carry or mount anywhere. Pair with deep sleep for months of runtime.",
    enables: ["status-badge", "deep-sleep-sensor", "name-badge", "trip-tracker"]
  },
  {
    id: "servo-pantilt", name: "Pan/Tilt Bracket + 2× SG90", glyph: "🎯",
    kind: "Mechanical", interface: "PWM", price: "$6–12",
    unlocks: "Aim a camera or sensor in two axes — trackers and scanners.",
    why: "A 3D-printable or kit bracket plus a second servo turns the radar/camera projects into real pan/tilt rigs.",
    enables: ["pan-tilt-cam", "ultrasonic-radar", "light-tracker"]
  }
];
