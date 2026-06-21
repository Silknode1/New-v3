/* Long-form guide pages. `body` is trusted HTML authored here. */
window.DB = window.DB || {};
window.DB.guides = [
  {
    id: "approach", title: "How to Approach a Build", glyph: "🧭",
    summary: "The repeatable loop from idea to finished device — plus a board chooser so you pick the right ESP32 every time.",
    body: [
      "<h4>The loop, every time</h4>",
      "<ol>",
      "<li><b>Define the job in one sentence.</b> \"Tell me when the mailbox opens.\" Inputs and outputs fall out of that sentence (input: reed/vibration; output: phone notification).</li>",
      "<li><b>Pick the board it fits</b> (chooser below). Match radio, pins, screen and power needs.</li>",
      "<li><b>Breadboard the smallest version.</b> One sensor, one output, serial print. Prove the idea before adding features.</li>",
      "<li><b>Simulate or bench-test logic.</b> Use Wokwi to write/debug the sketch even before parts are wired.</li>",
      "<li><b>Iterate features</b> one at a time — add Wi-Fi, then the display, then sleep. Commit/save working steps.</li>",
      "<li><b>Design the enclosure</b> once the wiring is final. Measure the assembled stack; model standoffs and cut-outs.</li>",
      "<li><b>Make it permanent.</b> Solder to perfboard (or order a PCB), add proper power, flash final firmware (ideally with OTA).</li>",
      "<li><b>Print, assemble, mount, live with it.</b> Revise the print for fit and serviceability.</li>",
      "</ol>",

      "<h4>Which board do I pick?</h4>",
      "<table><thead><tr><th>If the project needs…</th><th>Reach for</th><th>Why</th></tr></thead><tbody>",
      "<tr><td>A screen / UI with no wiring</td><td>C6 + 1.47\"</td><td>Onboard ST7789 TFT + RGB LED + TF slot</td></tr>",
      "<tr><td>Smart-home (Matter / Zigbee / Thread)</td><td>C6 + 1.47\" or C6 Mini</td><td>802.15.4 radio + Wi-Fi 6</td></tr>",
      "<tr><td>Camera / on-device AI / audio</td><td>S3 or S3-CAM</td><td>PSRAM + SIMD, USB-OTG, camera bus</td></tr>",
      "<tr><td>Lots of pins / many peripherals</td><td>S3 Gold</td><td>~45 GPIO, dual-core</td></tr>",
      "<tr><td>USB / BLE keyboard, mouse, macro pad</td><td>S3 Gold</td><td>Native USB-OTG + BLE HID</td></tr>",
      "<tr><td>Tiny battery sensor / wearable</td><td>C6 Super Mini</td><td>Small, low deep-sleep current</td></tr>",
      "<tr><td>Learn your own IR / 433 MHz remotes</td><td>T-Embed CC1101</td><td>Integrated IR + sub-GHz + UI</td></tr>",
      "<tr><td>Learn RFID/NFC with your own cards</td><td>Chameleon Ultra</td><td>125 kHz + 13.56 MHz emulate/read</td></tr>",
      "</tbody></table>",

      "<h4>Wiring rules that save hours</h4>",
      "<ul>",
      "<li><b>Common ground</b> across every supply, always.</li>",
      "<li><b>3.3V logic.</b> The ESP32 is not 5V-tolerant — level-shift 5V signals (e.g. HC-SR04 ECHO).</li>",
      "<li><b>Power 5V loads (relays, servos, MQ-2, motors) from 5V/USB or the MB102</b>, not the 3.3V pin.</li>",
      "<li><b>Add a resistor</b> to every LED and a flyback path for inductive loads.</li>",
      "<li><b>Watch strapping pins</b> (boot mode) — don't hang pull-downs/heavy loads on GPIO0 etc.</li>",
      "</ul>",
      "<p class='lead'>Each project card repeats this arc: <b>Parts → Prototype → Code → Make it real.</b> Skim a few in a category to see the pattern.</p>"
    ].join("")
  },
  {
    id: "prototype", title: "Prototyping: Breadboard + Simulation", glyph: "🧪",
    summary: "How to lay out a breadboard cleanly and how to use Wokwi to write and debug firmware before (or without) hardware.",
    body: [
      "<h4>Breadboard basics</h4>",
      "<ul>",
      "<li>The long <b>side rails are power</b> (+ and –). Feed 3.3V and GND there first; jump to the board.</li>",
      "<li>The short <b>center columns are tied vertically</b>, split by the middle gap (where ICs straddle).</li>",
      "<li>Keep a tidy color code: red = 3.3V, orange = 5V, black = GND, anything else = signal.</li>",
      "<li>Use the <b>MB102 power module</b> for 5V parts so the board's regulator isn't overloaded.</li>",
      "<li>Short jumpers and a flat layout make faults obvious. Add components <b>one at a time</b> and test.</li>",
      "</ul>",

      "<h4>Simulate with Wokwi</h4>",
      "<p>Wokwi runs an ESP32 plus many sensors and displays in the browser. You can write, flash and debug the exact sketch with no hardware, then move it over.</p>",
      "<ul>",
      "<li>Start a new ESP32 project, add parts from the '+' menu, wire them on the virtual breadboard.</li>",
      "<li>Paste your sketch, hit play, watch the Serial Monitor and the parts react.</li>",
      "<li>Great for: LEDs, buttons, pots, DHT, DS18B20, HC-SR04, OLED/LCD, TM1637, servo, stepper, matrix, keypad, WS2812.</li>",
      "</ul>",
      "<div class='callout'>⚠️ <b>C6 caveat:</b> Wokwi's ESP32-C6 support is limited and analog gas/rain/soil sensors aren't simulated. Prototype the <i>logic</i> on a simulated S3/C3, then port pin numbers to your C6. For the C6's onboard screen, test on real hardware with the ST7789 driver.</div>",

      "<h4>From 'it blinks' to 'it works'</h4>",
      "<ul>",
      "<li><b>Serial-print everything</b> while developing; it's your microscope.</li>",
      "<li>Bring up subsystems separately: scan I2C (find 0x27/0x3C), confirm sensor reads, then combine.</li>",
      "<li>Use <b>non-blocking timing</b> (millis()) instead of delay() so inputs stay responsive.</li>",
      "<li>For networked builds, add Wi-Fi + a web page early so you can watch values remotely.</li>",
      "</ul>"
    ].join("")
  },
  {
    id: "print", title: "3D Printing & Enclosures", glyph: "🖨️",
    summary: "Turn a working breadboard into a real, printed device: case design, tolerances, materials, mounting and power.",
    body: [
      "<h4>Design the case around the final stack</h4>",
      "<ul>",
      "<li>Finish wiring first, then <b>measure the assembled height</b> (board + headers + tallest part).</li>",
      "<li>Model a two-part box: a base with <b>board standoffs</b> and a lid with <b>cut-outs</b> for USB, screen, sensors and LEDs.</li>",
      "<li>Add <b>vent slots</b> near heat or gas/temperature sensors so readings reflect the room, not the box.</li>",
      "<li>Leave a finger-notch or screw bosses so you can reopen it. Future-you will need to.</li>",
      "</ul>",

      "<h4>Tolerances & fit</h4>",
      "<ul>",
      "<li><b>Clearance fit:</b> add ~0.2 mm gap for sliding parts, ~0.1–0.15 mm for snug press-fits (printer-dependent).</li>",
      "<li><b>Snap-fit lids</b> save screws; test a small coupon before printing the whole case.</li>",
      "<li>For threads, model <b>heat-set insert</b> pockets (≈ insert OD − 0.1 mm) or use self-tapping screw bosses.</li>",
      "<li>Standoffs for ESP32 dev boards are typically <b>M2 / M2.5</b>; PCB mount holes ~2.2–2.7 mm.</li>",
      "</ul>",

      "<h4>Material & print settings (FDM)</h4>",
      "<table><thead><tr><th>Material</th><th>Use it for</th><th>Notes</th></tr></thead><tbody>",
      "<tr><td><b>PLA</b></td><td>Indoor cases, prototypes, desk gadgets</td><td>Easiest, rigid; softens in hot cars/sun</td></tr>",
      "<tr><td><b>PETG</b></td><td>Outdoor / warm / mechanical parts</td><td>Tougher, heat-resistant; the kit's STL bases print great in PETG</td></tr>",
      "<tr><td><b>TPU</b></td><td>Gaskets, strain reliefs, bumpers</td><td>Flexible; print slow</td></tr>",
      "</tbody></table>",
      "<p>Reasonable starting point: 0.2 mm layer height, 3–4 walls, 15–25% infill. Orient so screw bosses and snap features print along strong (not delaminating) directions.</p>",

      "<h4>Mounting & power</h4>",
      "<ul>",
      "<li>Print <b>sensor mounts</b> aimed correctly: PIR/ultrasonic forward, soil probe down, mic ported to a hole.</li>",
      "<li>Add <b>strain relief</b> (a channel or zip-tie post) where the USB/power cable exits.</li>",
      "<li>For portable builds, model a <b>LiPo pocket</b> and a reachable charge port; never trap a swollen-prone cell.</li>",
      "<li>The <b>Lonely Binary TinkerBlock STL bases</b> are LEGO-Technic compatible — handy for clipping sensors onto rigs without a custom case.</li>",
      "</ul>",
      "<div class='callout info'>Tip: search Printables/Thingiverse/MakerWorld for an existing ESP32-S3 / C6 / SG90 / HC-SR04 enclosure before modeling from scratch — then tweak cut-outs to your build.</div>"
    ].join("")
  }
];
