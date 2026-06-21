/* The six boards on the bench. */
window.DB = window.DB || {};
window.DB.boards = [
  {
    id: "s3", name: "Lonely Binary Gold ESP32-S3 (N16R8)", short: "S3 Gold", glyph: "🧠",
    role: "Your workhorse: dual-core, USB-OTG, 8MB PSRAM and tons of GPIO. Reach for it when a project needs muscle — camera, audio, BLE HID, on-device AI, or just lots of pins.",
    tags: ["Dual-core", "USB-OTG", "PSRAM", "AI"],
    specs: [
      ["Chip", "ESP32-S3, dual-core Xtensa LX7 @ 240 MHz"],
      ["Memory", "16 MB flash, 8 MB PSRAM"],
      ["Radio", "Wi-Fi 4 (2.4 GHz) + Bluetooth 5 LE"],
      ["GPIO", "~45 usable pins; 2× USB-C (native USB + UART)"],
      ["Special", "Vector/SIMD for TinyML, LCD/camera (DVP) & I2S peripherals"]
    ],
    strengths: [
      "Native USB-OTG: act as a BLE/USB keyboard, mouse or MIDI device.",
      "PSRAM + SIMD make it the only board here that runs camera + TinyML comfortably.",
      "Pin-rich — drive many sensors, a display and motors at once."
    ],
    gotchas: [
      "Two USB ports: one is native USB (for flashing/CDC), one is the UART bridge — if uploads fail, try the other port or hold BOOT.",
      "Some GPIOs are tied to PSRAM/flash (e.g. 26–32 on octal-PSRAM parts) — avoid them for I/O.",
      "For camera/AI sketches set Flash 16MB, PSRAM 'OPI', and an 8MB partition scheme."
    ],
    pins: [
      ["Safe general I/O", "GPIO 1–14, 21, 35–48 (verify per project)"],
      ["I2C default", "SDA 8 / SCL 9 (remappable)"],
      ["Strapping (careful)", "GPIO 0, 3, 45, 46"],
      ["Onboard RGB LED", "GPIO 48 (WS2812 on most S3 boards)"]
    ]
  },
  {
    id: "c6-lcd", name: "Waveshare ESP32-C6-LCD-1.47", short: "C6 + 1.47\"", glyph: "📺",
    role: "Smart-home and on-device UI in one. The built-in 172×320 color screen means many display projects need zero extra wiring, and Wi-Fi 6 + Thread/Zigbee/Matter make it your home-automation board.",
    tags: ["TFT screen", "Matter/Thread", "Wi-Fi 6", "TF slot"],
    specs: [
      ["Chip", "ESP32-C6, RISC-V HP @ 160 MHz + LP @ 20 MHz"],
      ["Memory", "8 MB flash (FH8), 512 KB SRAM"],
      ["Radio", "Wi-Fi 6 (2.4 GHz) + BLE 5 + 802.15.4 (Thread/Zigbee/Matter)"],
      ["Display", "1.47\" ST7789 IPS, 172×320, 262K colors, SPI"],
      ["Extras", "Onboard WS2812 RGB LED, microSD/TF slot, USB-C, ~15 free GPIO"]
    ],
    strengths: [
      "Screen is on-board — instant dashboards, menus, clocks, gauges with no display wiring.",
      "802.15.4 radio joins Thread/Zigbee/Matter networks: native Apple Home / Home Assistant devices.",
      "TF slot enables local logging/asset storage out of the box."
    ],
    gotchas: [
      "The LCD claims several pins — keep them free for the screen (see Key pins).",
      "Wokwi support for C6 is limited; prototype logic on an S3/C3 in the simulator, then port.",
      "Single HP core — fine for UI + sensors, but not heavy AI."
    ],
    pins: [
      ["LCD MOSI / SCLK", "GPIO 6 / GPIO 7"],
      ["LCD CS / DC / RST", "GPIO 14 / GPIO 15 / GPIO 21"],
      ["LCD Backlight", "GPIO 22"],
      ["Onboard RGB LED", "GPIO 8"],
      ["Free for sensors", "GPIO 0–5, 18–20, 23 (check against SD use)"]
    ]
  },
  {
    id: "s3cam", name: "ESP32-S3 + Camera (S3-CAM)", short: "S3-CAM", glyph: "📷",
    role: "Eyes for your bench. Same S3 muscle plus an OV2640-class camera — streaming, motion snapshots, time-lapse, and real on-device vision with Edge Impulse / ESP-WHO.",
    tags: ["Camera", "Edge AI", "PSRAM", "Streaming"],
    specs: [
      ["Chip", "ESP32-S3 dual-core @ 240 MHz, PSRAM"],
      ["Camera", "OV2640 (some kits OV5640), DVP parallel interface"],
      ["Radio", "Wi-Fi + BLE 5 LE"],
      ["Memory", "≥8 MB flash + PSRAM (needed for framebuffers)"],
      ["Use", "MJPEG web stream, image capture, TinyML inference"]
    ],
    strengths: [
      "Runs MobileNet-class person/object detection on-device (~3+ FPS) — privacy-friendly, no cloud.",
      "PSRAM holds full camera framebuffers for higher-res capture.",
      "Pairs with Edge Impulse to train + deploy a custom detector as an Arduino library."
    ],
    gotchas: [
      "Camera pins are board-specific — set the correct pin map / board model in code.",
      "Low light kills detection quality; add lighting or NIR LEDs.",
      "Heavy on RAM/flash: use an 8MB+ partition with PSRAM enabled."
    ],
    pins: [
      ["Camera bus", "DVP (D0–D7, XCLK, PCLK, VSYNC, HREF) — fixed by board"],
      ["I2C (SCCB)", "Camera config bus, board-defined SIOD/SIOC"],
      ["Free I/O", "Whatever the camera doesn't claim — usually a few GPIO + UART"]
    ]
  },
  {
    id: "c6mini", name: "ESP32-C6 Super Mini", short: "C6 Mini", glyph: "🔋",
    role: "Tiny, cheap and low-power with the same Wi-Fi 6 + Thread/Zigbee radio. The board you solder into a 3D-printed case and run for months on a battery — door sensors, beacons, wearables.",
    tags: ["Tiny", "Low-power", "Matter/Thread", "Battery"],
    specs: [
      ["Chip", "ESP32-C6 RISC-V @ 160 MHz + LP core @ 20 MHz"],
      ["Radio", "Wi-Fi 6 + BLE 5 + 802.15.4 (Thread/Zigbee/Matter)"],
      ["Memory", "4 MB flash (typical)"],
      ["Form factor", "~22×18 mm, castellated, USB-C"],
      ["Power", "Deep-sleep µA range for battery sensors"]
    ],
    strengths: [
      "Deep sleep + LP core = months of battery life for periodic sensors.",
      "Smallest board here — fits inside compact printed enclosures and wearables.",
      "Matter/Thread capable, so a battery sensor can join your smart home natively."
    ],
    gotchas: [
      "Few GPIO and small flash — keep firmware lean; one job per device.",
      "No screen — pair with the C6-LCD or an OLED for UI, or report over the network.",
      "Limited Wokwi support — prototype logic on S3/C3 in sim, then deploy."
    ],
    pins: [
      ["I2C default", "SDA/SCL remappable to any free GPIO"],
      ["Wake source", "Use an RTC-GPIO pin (e.g. a reed switch) for deep-sleep wake"],
      ["Onboard LED", "Single GPIO LED (board-specific)"]
    ]
  },
  {
    id: "c3", name: "ESP32-C3 Super Mini", short: "C3 Mini", glyph: "🔹",
    role: "The cheap, tiny do-anything board for simple projects and learning. Single-core RISC-V with Wi-Fi + BLE 5 — perfect for a first upload and for builds that only need a few pins.",
    tags: ["Cheap", "Tiny", "BLE 5", "Beginner"],
    specs: [
      ["Chip", "ESP32-C3 single-core RISC-V @ 160 MHz"],
      ["Memory", "4 MB flash (typical)"],
      ["Radio", "Wi-Fi 4 (2.4 GHz) + Bluetooth 5 LE"],
      ["GPIO", "~11 usable pins, 1 ADC block, USB-C / native USB-CDC"],
      ["Form factor", "Super-Mini ~22×18 mm"]
    ],
    strengths: [
      "Cheapest way to put any sensor online — great for one-off gadgets.",
      "Native USB-CDC: flash and serial over one USB-C cable.",
      "Plenty for blink/button/sensor + Wi-Fi/BLE basics."
    ],
    gotchas: [
      "Few GPIO and one ADC block — not for pin-hungry builds (use the S3).",
      "No 802.15.4 — for Matter/Zigbee/Thread use a C6 instead.",
      "Single core; fine for simple loops, not camera/AI."
    ],
    pins: [
      ["Safe general I/O", "GPIO 0–10 (avoid strapping pins for boot)"],
      ["I2C / SPI", "Remappable to free GPIO"],
      ["ADC", "GPIO 0–4 (ADC1)"]
    ]
  },
  {
    id: "tembed", name: "LilyGO T-Embed CC1101 Plus", short: "T-Embed", glyph: "🛰️",
    role: "A handheld already loaded with a screen, rotary encoder, mic, IR, and a CC1101 sub-GHz radio. Your tool for learning RF and IR by capturing and replaying your OWN remotes and devices.",
    tags: ["Sub-GHz", "IR", "Encoder + screen", "Handheld"],
    specs: [
      ["Base", "ESP32-S3 with TFT display + rotary encoder + mic"],
      ["Sub-GHz", "TI CC1101 transceiver (~300–928 MHz, region-dependent)"],
      ["IR", "Onboard IR transmit/receive"],
      ["Power", "Built-in LiPo charging — portable"],
      ["Use", "Learn/record/replay your own 433 MHz + IR remotes; custom handheld UIs"]
    ],
    strengths: [
      "Everything integrated: no breadboard needed to start building a handheld UI.",
      "CC1101 + IR make it ideal for understanding how your own remotes encode signals.",
      "Encoder + screen = a great platform for menu-driven tools."
    ],
    gotchas: [
      "⚠️ Authorized use only — operate on your own devices and legal frequencies for your region.",
      "Sub-GHz transmit is region-regulated; respect local RF rules and duty cycles.",
      "Firmware/pin maps vary by revision — match examples to your exact board version."
    ],
    pins: [
      ["CC1101", "SPI bus to the radio (board-defined CS/GDO pins)"],
      ["IR TX/RX", "Dedicated onboard IR pins"],
      ["Encoder + screen", "Pre-wired on the board"]
    ]
  },
  {
    id: "chameleon", name: "Chameleon Ultra (RFID/NFC)", short: "Chameleon", glyph: "💳",
    role: "A dedicated 125 kHz + 13.56 MHz RFID/NFC emulator and reader. Use it to learn how access cards work by reading, saving, and emulating cards you own — purely for your own learning and testing.",
    tags: ["RFID 125kHz", "NFC 13.56MHz", "Emulator", "Research"],
    specs: [
      ["LF", "125 kHz (EM4100-class) read/emulate"],
      ["HF", "13.56 MHz (MIFARE Classic-class) read/emulate"],
      ["Control", "BLE + USB app / CLI"],
      ["Form", "Card-sized, battery powered, multiple slots"],
      ["Use", "Education: understand and test your own credentials"]
    ],
    strengths: [
      "Emulates and reads both common card frequencies in one pocket device.",
      "Great for learning RFID/NFC concepts hands-on with your own tags.",
      "Open-source firmware and active docs/community."
    ],
    gotchas: [
      "⚠️ Authorized use only — only read/clone/emulate cards and systems you own or are explicitly permitted to test.",
      "Not an ESP32 board — it pairs with your phone/PC, not your breadboard.",
      "Card cloning of credentials you don't own is illegal in most places — keep it to learning."
    ],
    pins: [
      ["Interface", "BLE / USB to the companion app — no GPIO wiring"]
    ]
  }
];
