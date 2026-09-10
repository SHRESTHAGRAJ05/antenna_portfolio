/* ============================================================
   EDIT ME: to add a new antenna topic, copy one whole block below
   and change the text. The template page (antenna.html) reads
   this file and builds itself — no other file needs to change.
   `bg` controls the animated background: "ripple", "sweep", or "pulse".
   ============================================================ */
const ANTENNA_TOPICS = {

  "yagi-uda": {
    name: "Yagi-Uda Antenna",
    tagline: "A driven dipole flanked by parasitic elements that turn broadcast reception into a directional beam.",
    bg: "pulse",
    stats: [ { label: "Typical gain", value: "6–15 dBi" }, { label: "Polarization", value: "Linear" }, { label: "Common use", value: "TV reception" } ],
    overview: "The Yagi-Uda is the classic rooftop TV antenna shape: a row of parallel elements mounted on a boom, all working together so the antenna favors one direction far more than any single dipole could.",
    structure: [
      { title: "Driven Element", desc: "A half-wave dipole connected directly to the feedline — the only element actually fed with signal." },
      { title: "Reflector", desc: "A slightly longer element behind the driven element that bounces energy forward instead of backward." },
      { title: "Directors", desc: "One or more shorter elements in front that reinforce the signal in the forward direction." },
      { title: "Boom", desc: "The support rod holding every element in precise alignment and spacing." }
    ],
    working: "Every element in a Yagi-Uda re-radiates the signal it intercepts, but its length and spacing determine the phase of that re-radiation. The reflector's slightly longer length delays its re-radiated wave just enough to cancel energy heading backward, while the shorter directors advance the phase just enough to reinforce energy heading forward. The result is constructive interference in one direction and destructive interference in the opposite direction — a directional beam built entirely from passive elements.",
    characteristics: [ { label: "Directionality", value: "Highly directional, single main lobe" }, { label: "Bandwidth", value: "Narrow to moderate" }, { label: "Gain", value: "Increases with more directors" }, { label: "Feed impedance", value: "~50–75 Ω, tunable via matching" } ],
    applications: [
      { title: "TV reception", desc: "Rooftop antennas pointed at the nearest broadcast tower." },
      { title: "Point-to-point links", desc: "Fixed wireless links where both ends stay in place." },
      { title: "Amateur radio", desc: "Directional beams for long-distance contacts." }
    ],
    facts: [
      "Invented in Japan in the 1920s, but named after only one of its two inventors in most of the world.",
      "Adding more directors increases gain, but with rapidly diminishing returns after 6–8 elements."
    ]
  },

  "patch": {
    name: "Microstrip Patch Antenna",
    tagline: "A flat rectangle of copper on a PCB, radiating from the edges of a thin resonant cavity.",
    bg: "ripple",
    stats: [ { label: "Profile", value: "Low, planar" }, { label: "Polarization", value: "Linear or circular" }, { label: "Common use", value: "GPS, WLAN" } ],
    overview: "A microstrip patch is just a metal rectangle etched onto one side of a dielectric substrate, with a ground plane on the other side. It's thin, light, and cheap to reproduce in volume — which is why it's everywhere in consumer electronics.",
    structure: [
      { title: "Patch", desc: "The top conductor whose length sets the resonant frequency." },
      { title: "Substrate", desc: "A dielectric layer between patch and ground; its permittivity and thickness shape bandwidth and efficiency." },
      { title: "Ground Plane", desc: "The bottom conductor that completes the resonant cavity and shields what's behind the antenna." },
      { title: "Feed", desc: "A coaxial probe or inset microstrip line delivering signal to the patch at a matched impedance point." }
    ],
    working: "The patch and ground plane form a thin resonant cavity. At resonance, the fields fringe out at two opposite edges of the patch, and these fringing fields are what actually radiate. Because the cavity is so thin compared to a wavelength, the antenna radiates mainly broadside — straight up out of the board — making it ideal wherever a flat, low-profile antenna is required.",
    characteristics: [ { label: "Bandwidth", value: "Narrow (a few percent)" }, { label: "Efficiency", value: "Moderate, substrate-dependent" }, { label: "Pattern", value: "Broadside, moderately directional" }, { label: "Polarization", value: "CP achievable via corner truncation" } ],
    applications: [
      { title: "GPS receivers", desc: "Circularly polarized patches track satellites reliably regardless of orientation." },
      { title: "Wi-Fi & mobile devices", desc: "Internal antennas where a flat footprint matters." },
      { title: "Satellite terminals", desc: "Array elements in phased-array satcom systems." }
    ],
    facts: [
      "First proposed in 1953, but impractical until low-loss PCB substrates matured decades later.",
      "The same truncated-corner technique used in this project's polarization-reconfigurable design generates fixed circular polarization in ordinary GPS patches."
    ]
  },

  "dipole": {
    name: "Dipole Antenna",
    tagline: "Two straight conductor arms and a feed point — the reference antenna against which almost everything else is measured.",
    bg: "ripple",
    stats: [ { label: "Feed impedance", value: "~73 Ω" }, { label: "Polarization", value: "Linear" }, { label: "Common use", value: "Wi-Fi routers, broadcast" } ],
    overview: "A half-wave dipole is the simplest practical antenna: split a wire at its center, feed it there, and let each half be roughly a quarter-wavelength long. Its behavior is so well understood that it serves as the baseline unit ('dBd') for comparing antenna gain.",
    structure: [
      { title: "Two Arms", desc: "Each roughly a quarter-wavelength long, extending in opposite directions from the feed point." },
      { title: "Feed Point", desc: "The center gap where the transmission line connects, driving current onto both arms." }
    ],
    working: "Current flows onto the dipole from the feed point, peaking at the center and tapering toward zero at the open tips. This current distribution radiates a doughnut-shaped pattern: maximum radiation broadside to the wire, and nulls straight off the ends. A monopole is simply half of this structure standing over a conductive ground plane, which electrically mirrors the missing half.",
    characteristics: [ { label: "Pattern", value: "Omnidirectional in the plane perpendicular to the wire" }, { label: "Gain", value: "~2.15 dBi (reference antenna)" }, { label: "Bandwidth", value: "Moderate" }, { label: "Simplicity", value: "Minimal parts, easy to tune" } ],
    applications: [
      { title: "Wi-Fi routers", desc: "The external 'sticks' on a router are usually simple dipoles or monopoles." },
      { title: "Broadcast radio", desc: "Tall monopole towers for AM/FM transmission." },
      { title: "Ham radio", desc: "Wire dipoles strung between supports for HF operation." }
    ],
    facts: [
      "Marconi's 1901 transatlantic transmission used a wire antenna hundreds of meters long.",
      "A quarter-wave monopole over a ground plane behaves electrically like a full half-wave dipole."
    ]
  },

  "horn": {
    name: "Horn Antenna",
    tagline: "A flared metal waveguide that gradually widens a confined RF wave into free space.",
    bg: "sweep",
    stats: [ { label: "Typical gain", value: "10–25 dBi" }, { label: "Bandwidth", value: "Very wide" }, { label: "Common use", value: "Microwave links, radar" } ],
    overview: "A horn antenna is essentially a waveguide — a hollow metal tube that confines RF energy — flared outward like a trumpet. That gradual flare lets the wave expand into free space efficiently, without the sharp impedance mismatch that would otherwise reflect the signal back.",
    structure: [
      { title: "Waveguide Feed", desc: "The narrow section connecting to the RF source, sized to support a single propagating mode." },
      { title: "Flare", desc: "The gradually widening walls that transform the confined wave into a broader free-space wave." },
      { title: "Aperture", desc: "The open mouth of the horn, whose size largely determines gain and beamwidth." }
    ],
    working: "Inside the waveguide, the RF wave travels confined by conducting walls. As the horn flares outward, the wave's phase front gradually expands to match free space, minimizing reflection at the aperture. A wider, longer flare produces a larger, more uniform aperture — and therefore higher gain and a narrower beam — at the cost of a physically bigger antenna.",
    characteristics: [ { label: "Bandwidth", value: "Very wide, often over an octave" }, { label: "Gain", value: "Scales with aperture size" }, { label: "Pattern purity", value: "Clean, well-predicted pattern" }, { label: "Power handling", value: "High, useful for radar transmitters" } ],
    applications: [
      { title: "Radar systems", desc: "Feed elements for parabolic dishes, or standalone at short range." },
      { title: "Microwave links", desc: "Point-to-point backhaul links between towers." },
      { title: "Antenna measurement", desc: "Standard-gain horns used as calibrated references in anechoic chambers." }
    ],
    facts: [
      "Because its behavior is so predictable, a 'standard gain horn' is a common calibration reference in antenna test labs.",
      "Horns feed almost every satellite dish you've ever seen — the small protruding cone at the dish's focal point."
    ]
  },

  "parabolic": {
    name: "Parabolic Reflector Antenna",
    tagline: "A curved metal dish that turns a small feed antenna into an enormous effective aperture.",
    bg: "sweep",
    stats: [ { label: "Typical gain", value: "30–50+ dBi" }, { label: "Beamwidth", value: "Very narrow" }, { label: "Common use", value: "Satellite, deep space" } ],
    overview: "A parabolic dish isn't the antenna doing the actual radiating — a small feed antenna at its focal point does that. The dish is a passive reflector shaped so every ray from that focal point leaves the dish traveling perfectly parallel, concentrating energy into an extremely narrow, high-gain beam.",
    structure: [
      { title: "Reflector Dish", desc: "A parabolic-curved conducting surface that redirects incoming or outgoing rays." },
      { title: "Feed Antenna", desc: "Typically a small horn, placed exactly at the dish's focal point." },
      { title: "Support Struts", desc: "Hold the feed precisely in place relative to the dish." }
    ],
    working: "A defining property of a parabola is that every ray originating from its focal point reflects off the curve and leaves traveling parallel to the dish's axis — and, by reciprocity, every parallel incoming ray reflects to converge exactly at that same focal point. This geometric trick turns a modest feed antenna into an antenna with an effective aperture as large as the whole dish, which is why dish size scales so directly with achievable gain.",
    characteristics: [ { label: "Gain", value: "Scales with dish diameter squared" }, { label: "Beamwidth", value: "Extremely narrow at large sizes" }, { label: "Pointing accuracy", value: "Must be aimed precisely" }, { label: "Bandwidth", value: "Wide — limited mainly by the feed" } ],
    applications: [
      { title: "Satellite TV & internet", desc: "Home dishes pointed at a fixed geostationary satellite." },
      { title: "Deep-space communication", desc: "Giant dishes (like NASA's Deep Space Network) for spacecraft links." },
      { title: "Point-to-point microwave", desc: "High-gain backhaul links between towers." }
    ],
    facts: [
      "Doubling a dish's diameter roughly quadruples its gain.",
      "The Arecibo and FAST radio telescopes are, at their core, enormous parabolic reflectors."
    ]
  },

  "helical": {
    name: "Helical Antenna",
    tagline: "A wire wound into a helix over a ground plane — the natural way to generate circular polarization.",
    bg: "pulse",
    stats: [ { label: "Polarization", value: "Circular (inherent)" }, { label: "Modes", value: "Normal or axial" }, { label: "Common use", value: "Satellite comms" } ],
    overview: "A helical antenna is a wire coiled into a spring shape above a ground plane. Depending on how large the coil is relative to the wavelength, it behaves in one of two very different ways — a compact near-omnidirectional radiator, or a focused, naturally circularly-polarized beam.",
    structure: [
      { title: "Helix", desc: "The coiled conductor, defined by its diameter, pitch (spacing between turns), and number of turns." },
      { title: "Ground Plane", desc: "A conducting disk or mesh beneath the helix, shaping the radiation pattern." },
      { title: "Feed", desc: "Connects the transmission line to the base of the helix." }
    ],
    working: "In 'normal mode' (helix circumference much smaller than a wavelength), the antenna behaves like a compact dipole, radiating broadly. In 'axial mode' (circumference near one wavelength), the currents traveling around each turn combine so that the antenna radiates a focused beam directly along its axis — and because the current pattern itself rotates as it travels along the helix, the radiated wave's electric field rotates too, producing circular polarization inherently, with no extra circuitry needed.",
    characteristics: [ { label: "Polarization purity", value: "Naturally good axial ratio in axial mode" }, { label: "Gain", value: "Moderate to high in axial mode" }, { label: "Bandwidth", value: "Wide for a simple antenna" }, { label: "Orientation sensitivity", value: "Low — CP tolerates receiver rotation" } ],
    applications: [
      { title: "Satellite ground stations", desc: "CP avoids signal loss from unpredictable satellite orientation." },
      { title: "Spacecraft telemetry", desc: "Flown on satellites since the earliest space missions." },
      { title: "GPS and RFID", desc: "Compact circularly polarized links." }
    ],
    facts: [
      "A helix can switch between nearly omnidirectional and highly directional just by changing its size relative to wavelength — no other common antenna type spans that range so simply.",
      "Because CP survives arbitrary rotation, helices remain useful even when a spacecraft is tumbling."
    ]
  },

  "array": {
    name: "Antenna Array",
    tagline: "Many simple elements, fed with a coordinated phase pattern, acting as one steerable antenna.",
    bg: "pulse",
    stats: [ { label: "Elements", value: "2 to thousands" }, { label: "Key ability", value: "Electronic beam steering" }, { label: "Common use", value: "Cellular towers, radar" } ],
    overview: "Rather than build one large, complicated antenna, an array combines many small, simple elements — often patches or dipoles — and controls the phase and amplitude fed to each one. The interference between all those elements' signals is what actually shapes the combined antenna's pattern.",
    structure: [
      { title: "Elements", desc: "Individual radiators (commonly patches or dipoles), identical and evenly spaced." },
      { title: "Feed Network", desc: "Splits the signal to each element with a controlled phase and amplitude." },
      { title: "Phase Shifters", desc: "In an electronically steered array, these adjust each element's phase in real time to steer the beam without moving any hardware." }
    ],
    working: "When each element radiates the same signal but with a carefully chosen phase offset, the waves add constructively in one direction and cancel in others — forming a directional beam from otherwise unremarkable individual elements. Changing the phase offsets electronically sweeps that beam across a wide angle instantly, with no mechanical movement — the basis of modern phased-array radar and 5G massive-MIMO base stations.",
    characteristics: [ { label: "Beam steering", value: "Electronic, near-instant" }, { label: "Gain", value: "Increases with element count" }, { label: "Sidelobes", value: "Controlled via amplitude tapering" }, { label: "Complexity", value: "Higher feed-network and control complexity" } ],
    applications: [
      { title: "Cellular base stations", desc: "Sector panels are patch arrays covering 60–120° each." },
      { title: "Phased-array radar", desc: "Electronically steered beams with no moving parts." },
      { title: "5G massive MIMO", desc: "Large arrays serving many users with independently steered beams." }
    ],
    facts: [
      "A phased array can steer its beam in microseconds — mechanically rotating a dish to the same angle would take seconds.",
      "Three 120°-sector panel arrays are enough to cover all 360° around a typical cell tower."
    ]
  }
};
