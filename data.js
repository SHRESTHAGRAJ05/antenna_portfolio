/* ============================================================
   EDIT ME: to add a new antenna topic, copy one whole block below
   and change the text. The template page (antenna.html) reads
   this file and builds itself — no other file needs to change.

   `bg`        controls the animated background:
               "directional" | "field" | "symmetric" | "spiral" |
               "converging"  | "multi" | "sweep"
   `radiation` controls the conceptual polar pattern:
               "omni" | "figure8" | "lobe" | "broadside" |
               "axial" | "multilobe" | "converge"
   `related`   array of other topic keys shown as "Related antennas"
   ============================================================ */
const ANTENNA_TOPICS = {

  "yagi-uda": {
    name: "Yagi-Uda Antenna",
    tagline: "A driven dipole flanked by parasitic elements that turn broadcast reception into a directional beam.",
    bg: "directional",
    radiation: { type: "lobe", note: "Strong single forward lobe, minor rear lobe" },
    stats: [ { label: "Typical gain", value: "6–15 dBi" }, { label: "Polarization", value: "Linear" }, { label: "Common use", value: "TV reception" } ],
    overview: "The Yagi-Uda is the classic rooftop TV antenna shape: a row of parallel elements mounted on a boom, all working together so the antenna favors one direction far more than any single dipole could.",
    structure: [
      { id: "reflector", title: "Reflector", desc: "A slightly longer element behind the driven element that bounces energy forward instead of backward." },
      { id: "driven", title: "Driven Element", desc: "A half-wave dipole connected directly to the feedline — the only element actually fed with signal." },
      { id: "directors", title: "Directors", desc: "One or more shorter elements in front that reinforce the signal in the forward direction." },
      { id: "boom", title: "Boom", desc: "The support rod holding every element in precise alignment and spacing." }
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
    ],
    reconfigurable: {
      possible: true,
      text: "Yes — a Yagi-Uda can be made pattern-reconfigurable by switching which elements are electrically \"active\" reflectors vs. directors (e.g. with PIN diodes loading each parasitic element). Flipping those switches changes which direction is the reflector and which is the director, steering the main beam without moving any hardware — the same switching philosophy this project applies to polarization instead of beam direction."
    },
    related: ["dipole", "array"]
  },

  "patch": {
    name: "Microstrip Patch Antenna",
    tagline: "A flat rectangle of copper on a PCB, radiating from the edges of a thin resonant cavity.",
    bg: "field",
    radiation: { type: "broadside", note: "Broad single lobe, straight out of the board" },
    stats: [ { label: "Profile", value: "Low, planar" }, { label: "Polarization", value: "Linear or circular" }, { label: "Common use", value: "GPS, WLAN" } ],
    overview: "A microstrip patch is just a metal rectangle etched onto one side of a dielectric substrate, with a ground plane on the other side. It's thin, light, and cheap to reproduce in volume — which is why it's everywhere in consumer electronics.",
    structure: [
      { id: "patch", title: "Patch", desc: "The top conductor whose length sets the resonant frequency." },
      { id: "substrate", title: "Substrate", desc: "A dielectric layer between patch and ground; its permittivity and thickness shape bandwidth and efficiency." },
      { id: "ground", title: "Ground Plane", desc: "The bottom conductor that completes the resonant cavity and shields what's behind the antenna." },
      { id: "feed", title: "Feed", desc: "A coaxial probe or inset microstrip line delivering signal to the patch at a matched impedance point." }
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
    ],
    reconfigurable: {
      possible: true,
      text: "Yes — extensively. Patches are the most common platform for reconfigurable antennas because switches can be embedded directly in the copper pattern: truncated corners with PIN diodes switch polarization (this project), slots or stubs switch frequency, and switched parasitic patches or feed points can steer the beam. Low profile and PCB-native construction make it easy to route the digital control lines needed to drive those switches."
    },
    related: ["dipole", "array", "helical"]
  },

  "dipole": {
    name: "Dipole Antenna",
    tagline: "Two straight conductor arms and a feed point — the reference antenna against which almost everything else is measured.",
    bg: "symmetric",
    radiation: { type: "omni", note: "Omnidirectional in the plane perpendicular to the wire" },
    stats: [ { label: "Feed impedance", value: "~73 Ω" }, { label: "Polarization", value: "Linear" }, { label: "Common use", value: "Wi-Fi routers, broadcast" } ],
    overview: "A half-wave dipole is the simplest practical antenna: split a wire at its center, feed it there, and let each half be roughly a quarter-wavelength long. Its behavior is so well understood that it serves as the baseline unit ('dBd') for comparing antenna gain.",
    structure: [
      { id: "arm1", title: "Arm 1", desc: "One quarter-wavelength conductor extending from the feed point." },
      { id: "feed", title: "Feed Point", desc: "The center gap where the transmission line connects, driving current onto both arms." },
      { id: "arm2", title: "Arm 2", desc: "The second quarter-wavelength conductor, extending in the opposite direction." }
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
    ],
    reconfigurable: {
      possible: true,
      text: "Yes, in a limited but useful way — switching in or out sections of each arm (loading) changes the dipole's electrical length and therefore its resonant frequency, letting one physical wire cover more than one band. Pattern reconfiguration is harder for a lone dipole; that usually needs parasitic elements, as in a Yagi-Uda."
    },
    related: ["yagi-uda", "patch"]
  },

  "horn": {
    name: "Horn Antenna",
    tagline: "A flared metal waveguide that gradually widens a confined RF wave into free space.",
    bg: "sweep",
    radiation: { type: "lobe", note: "Clean, well-predicted single main lobe" },
    stats: [ { label: "Typical gain", value: "10–25 dBi" }, { label: "Polarization", value: "Linear (usually)" }, { label: "Common use", value: "Radar, dish feeds" } ],
    overview: "A horn antenna is a metal waveguide that flares outward at the open end, gradually transforming a tightly confined guided wave into a wave that matches free space — with almost none of the impedance mismatch a bare waveguide opening would cause.",
    structure: [
      { id: "waveguide", title: "Waveguide Throat", desc: "The narrow feed section carrying a single, well-defined guided-wave mode." },
      { id: "flare", title: "Flared Horn", desc: "The gradually widening walls that transition the wave from guided to free-space propagation." },
      { id: "aperture", title: "Aperture", desc: "The open mouth of the horn; its size largely sets the achievable gain and beamwidth." }
    ],
    working: "Because the flare widens gradually rather than abruptly, the wave's impedance changes smoothly from the waveguide's characteristic impedance to that of free space, avoiding the reflections a sudden opening would cause. The larger the aperture relative to a wavelength, the narrower and higher-gain the resulting beam — a direct, well-understood relationship that makes horns useful both as antennas and as calibrated gain references.",
    characteristics: [ { label: "Bandwidth", value: "Very wide, often over an octave" }, { label: "Gain", value: "Scales with aperture size" }, { label: "Pattern purity", value: "Clean, well-predicted pattern" }, { label: "Power handling", value: "High, useful for radar transmitters" } ],
    applications: [
      { title: "Radar systems", desc: "Feed elements for parabolic dishes, or standalone at short range." },
      { title: "Microwave links", desc: "Point-to-point backhaul links between towers." },
      { title: "Antenna measurement", desc: "Standard-gain horns used as calibrated references in anechoic chambers." }
    ],
    facts: [
      "Because its behavior is so predictable, a 'standard gain horn' is a common calibration reference in antenna test labs.",
      "Horns feed almost every satellite dish you've ever seen — the small protruding cone at the dish's focal point."
    ],
    reconfigurable: {
      possible: false,
      text: "Rarely — a horn's performance comes from its fixed metal geometry, so there's little room for electronic switching without disturbing the smooth impedance taper that makes it work. Where tunability is needed, designers typically add a corrugated or dielectric-loaded section, or simply swap the feed the horn illuminates, rather than reconfiguring the horn itself."
    },
    related: ["parabolic"]
  },

  "parabolic": {
    name: "Parabolic Reflector Antenna",
    tagline: "A curved metal dish that turns a small feed antenna into an enormous effective aperture.",
    bg: "converging",
    radiation: { type: "converge", note: "Extremely narrow, high-gain pencil beam" },
    stats: [ { label: "Typical gain", value: "30–50+ dBi" }, { label: "Beamwidth", value: "Very narrow" }, { label: "Common use", value: "Satellite, deep space" } ],
    overview: "A parabolic dish isn't the antenna doing the actual radiating — a small feed antenna at its focal point does that. The dish is a passive reflector shaped so every ray from that focal point leaves the dish traveling perfectly parallel, concentrating energy into an extremely narrow, high-gain beam.",
    structure: [
      { id: "feed", title: "Feed Antenna", desc: "Typically a small horn, placed exactly at the dish's focal point." },
      { id: "dish", title: "Reflector Dish", desc: "A parabolic-curved conducting surface that redirects incoming or outgoing rays." },
      { id: "struts", title: "Support Struts", desc: "Hold the feed precisely in place relative to the dish." }
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
    ],
    reconfigurable: {
      possible: false,
      text: "The dish itself is a fixed passive reflector, so it isn't electronically reconfigurable — but the feed at its focal point can be. Swapping or electronically adjusting the feed (for example a switchable-polarization feed) changes the polarization or frequency the whole system responds to without touching the dish, and mechanically steering the dish remains the usual way to change pointing direction."
    },
    related: ["horn"]
  },

  "helical": {
    name: "Helical Antenna",
    tagline: "A wire wound into a helix over a ground plane — the natural way to generate circular polarization.",
    bg: "spiral",
    radiation: { type: "axial", note: "Focused beam along the helix axis (axial mode)" },
    stats: [ { label: "Polarization", value: "Circular (inherent)" }, { label: "Modes", value: "Normal or axial" }, { label: "Common use", value: "Satellite comms" } ],
    overview: "A helical antenna is a wire coiled into a spring shape above a ground plane. Depending on how large the coil is relative to the wavelength, it behaves in one of two very different ways — a compact near-omnidirectional radiator, or a focused, naturally circularly-polarized beam.",
    structure: [
      { id: "helix", title: "Helix", desc: "The coiled conductor, defined by its diameter, pitch (spacing between turns), and number of turns." },
      { id: "ground", title: "Ground Plane", desc: "A conducting disk or mesh beneath the helix, shaping the radiation pattern." },
      { id: "feed", title: "Feed", desc: "Connects the transmission line to the base of the helix." }
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
    ],
    reconfigurable: {
      possible: true,
      text: "Yes, though less commonly than patches — switching which turns of the helix are active (shorting or opening turns near the feed) can shift the resonant frequency or move the antenna between normal and axial mode. Switching the winding sense of active sections has also been explored as a way to flip between RHCP and LHCP electronically, the same functional goal as this project's patch, just on a different geometry."
    },
    related: ["patch", "array"]
  },

  "array": {
    name: "Antenna Array",
    tagline: "Many simple elements, fed with a coordinated phase pattern, acting as one steerable antenna.",
    bg: "multi",
    radiation: { type: "multilobe", note: "Steerable main beam, controlled sidelobes" },
    stats: [ { label: "Elements", value: "2 to thousands" }, { label: "Key ability", value: "Electronic beam steering" }, { label: "Common use", value: "Cellular towers, radar" } ],
    overview: "Rather than build one large, complicated antenna, an array combines many small, simple elements — often patches or dipoles — and controls the phase and amplitude fed to each one. The interference between all those elements' signals is what actually shapes the combined antenna's pattern.",
    structure: [
      { id: "elements", title: "Elements", desc: "Individual radiators (commonly patches or dipoles), identical and evenly spaced." },
      { id: "feednet", title: "Feed Network", desc: "Splits the signal to each element with a controlled phase and amplitude." },
      { id: "phase", title: "Phase Shifters", desc: "In an electronically steered array, these adjust each element's phase in real time to steer the beam without moving any hardware." }
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
    ],
    reconfigurable: {
      possible: true,
      text: "Reconfigurability is arguably the whole point of an array — phase shifters at each element steer the beam electronically, amplitude tapering reshapes sidelobes, and individual elements can even be reconfigurable antennas themselves (like this project's patch), stacking polarization- or frequency-agility on top of beam steering for a fully adaptive front end."
    },
    related: ["patch", "yagi-uda"]
  },

  "pifa": {
    name: "PIFA (Planar Inverted-F Antenna)",
    tagline: "A grounded plate antenna folded into the tight, metal-crowded interior of a modern phone.",
    bg: "field",
    radiation: { type: "broadside", note: "Broad, hemispherical pattern skewed away from the ground plane" },
    stats: [ { label: "Profile", value: "Low, internal" }, { label: "Polarization", value: "Linear" }, { label: "Common use", value: "Smartphones" } ],
    overview: "A PIFA is essentially a quarter-wave patch folded down and grounded at one edge with a shorting pin or plate — a compromise shape purpose-built to fit inside the thin, densely packed interior of a mobile device while still resonating at cellular and Wi-Fi frequencies.",
    structure: [
      { id: "plate", title: "Radiating Plate", desc: "A metal plate suspended above the ground plane, roughly a quarter-wavelength long thanks to the short." },
      { id: "short", title: "Shorting Plate/Pin", desc: "Connects one edge of the radiating plate to ground, which is what lets the plate be so much shorter than a normal patch." },
      { id: "feed", title: "Feed Pin", desc: "A separate pin feeding the plate at an impedance-matched point, near the short." },
      { id: "ground", title: "Ground Plane", desc: "The device's own PCB ground, which the antenna's performance depends heavily on." }
    ],
    working: "The shorting connection forces a quarter-wave resonance instead of the half-wave resonance a plain patch would need, roughly halving the size required for a given frequency. That size saving comes at a cost: bandwidth is narrower and performance is sensitive to the size and shape of the ground plane it sits above — which is exactly why phone antenna performance can vary between models even with a similar-looking PIFA.",
    characteristics: [ { label: "Size", value: "~half a patch, thanks to shorting" }, { label: "Bandwidth", value: "Narrow, ground-plane dependent" }, { label: "Efficiency", value: "Moderate, sensitive to nearby components" }, { label: "Integration", value: "Very common inside phones and IoT devices" } ],
    applications: [
      { title: "Smartphones", desc: "Cellular and Wi-Fi antennas folded into the internal frame or a small carrier." },
      { title: "IoT devices", desc: "Compact wireless modules where board space is extremely limited." },
      { title: "Wearables", desc: "Wherever a low-profile internal antenna is needed near other electronics." }
    ],
    facts: [
      "The 'inverted-F' name comes from the antenna's side profile, which resembles an upside-down letter F.",
      "Because nearby components detune a PIFA, manufacturers often reserve a dedicated 'keep-out zone' around it on the PCB."
    ],
    reconfigurable: {
      possible: true,
      text: "Yes — PIN diodes or RF-MEMS switches connecting extra slots or stub lengths on the plate can retune a PIFA between cellular bands, letting one small antenna cover multiple bands instead of needing a separate radiator for each — valuable given how little internal volume a phone can spare."
    },
    related: ["patch", "dipole"]
  },

  "loop": {
    name: "Loop Antenna",
    tagline: "A closed conducting loop that couples primarily to the magnetic field, not the electric field.",
    bg: "symmetric",
    radiation: { type: "figure8", note: "Figure-eight pattern, nulls in the plane of the loop" },
    stats: [ { label: "Coupling", value: "Predominantly magnetic" }, { label: "Polarization", value: "Linear" }, { label: "Common use", value: "AM radio, RFID, wearables" } ],
    overview: "A loop antenna is a closed conducting loop, small or large relative to a wavelength. Small loops respond mainly to the magnetic component of an RF wave rather than the electric component, which gives them useful noise-rejection properties that straight-wire antennas don't have.",
    structure: [
      { id: "loop", title: "Loop Conductor", desc: "The closed conducting path, whose circumference relative to wavelength determines its behavior." },
      { id: "feed", title: "Feed Gap", desc: "The small break in the loop where the transmission line connects." },
      { id: "core", title: "Ferrite Core (optional)", desc: "A magnetic core used in many small loops to boost effective aperture without enlarging the physical loop." }
    ],
    working: "When a loop's circumference is much smaller than a wavelength, current flows nearly uniformly around it, and the antenna radiates a figure-eight pattern with nulls in the plane of the loop — the opposite orientation to a dipole's pattern. This magnetic-dominant behavior makes small loops naturally good at rejecting local electric-field noise, which is exactly why they're favored for AM broadcast reception and near-field RFID readers, where interference rejection matters more than gain.",
    characteristics: [ { label: "Pattern", value: "Figure-eight, nulls in loop plane" }, { label: "Noise rejection", value: "Good — favors magnetic field over electric field" }, { label: "Efficiency", value: "Can be low for very small loops without a ferrite core" }, { label: "Size", value: "Compact; wraps easily around device edges" } ],
    applications: [
      { title: "AM radios", desc: "Ferrite-core loops hidden inside portable and car radios." },
      { title: "RFID readers", desc: "Near-field coupling to tags at short range." },
      { title: "Smartwatches", desc: "Wrapped around the case edge for Bluetooth/Wi-Fi." }
    ],
    facts: [
      "Small loops are sometimes called 'magnetic antennas' for exactly this magnetic-field-dominant behavior.",
      "Large 'magnetic loop' antennas are prized by ham radio operators for being compact yet efficient even at low frequencies."
    ],
    reconfigurable: {
      possible: true,
      text: "Yes — switching in extra loop length or capacitive loading changes a loop's resonant frequency, a technique already common in tunable AM/FM ferrite-loop radios. Pattern or polarization reconfiguration is less common for simple loops than for patches, since the loop's magnetic-dipole behavior offers fewer independent modes to switch between."
    },
    related: ["dipole", "patch"]
  }
};
