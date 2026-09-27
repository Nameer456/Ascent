/**
 * Alpine Ascents — Master Application Script
 * Powered by jQuery 3.7.1, Leaflet.js, and Chart.js
 * Implements all 29 requested features with robust fallback architecture.
 */

$(function () {

  "use strict";

  /* ==========================================================================
     IN-MEMORY FALLBACK DATA STORE (For file:/// CORS resilience)
     ========================================================================== */
  const FALLBACK_DATA = {
    counter: { count: 1420 },
    expedition: {
      targetPeak: "K2 Basecamp & Gondogoro La Traverse",
      departureDate: new Date(Date.now() + 65 * 24 * 60 * 60 * 1000).toISOString(),
      guide: "Hassan Khan (Lead UIAGM Guide)",
      slotsRemaining: 4,
      elevation: "5,585m Max Pass",
      difficulty: "Challenging Alpine Trek",
      location: "Skardu, Gilgit-Baltistan, Pakistan"
    },
    content: {
      history: {
        title: "History of Mountaineering",
        subtitle: "From sacred heights to modern lightweight speed ascents",
        lead: "Mountaineering began as exploration and science before transforming into one of the purest expressions of human endurance.",
        items: [
          { era: "The Golden Age (1854 – 1865)", icon: "fa-landmark", description: "Pioneering ascents of the Wetterhorn and Matterhorn by Whymper, establishing the first Alpine standards." },
          { era: "The Silver Age & Greater Ranges (1865 – 1900s)", icon: "fa-compass", description: "Expeditions moved into the Caucasus, Andes, and the giants of the Karakoram and Himalaya." },
          { era: "The 8,000-Metre Milestones (1950 – 1964)", icon: "fa-mountain-sun", description: "Annapurna fell first in 1950, followed by Everest in 1953 by Hillary & Tenzing, and K2 in 1954." },
          { era: "Alpine Style Revolution (1975 – Present)", icon: "fa-feather", description: "Messner and Habeler proved summits could be reached without supplemental oxygen in self-contained teams." }
        ]
      },
      types: {
        title: "Styles & Disciplines of Climbing",
        subtitle: "How climbers approach the world's most formidable faces",
        lead: "Each discipline demands distinct physical conditioning, technical systems, and psychological composure.",
        items: [
          { title: "Alpine Style", badge: "Pure & Fast", icon: "fa-person-hiking", description: "Climbing with all gear and food in a continuous push without fixed ropes or supplementary oxygen." },
          { title: "Expedition / Siege Style", badge: "High Altitude", icon: "fa-campground", description: "Establishing progressive high camps, fixed ropes, and rotating teams to haul supplies up 8,000m peaks." },
          { title: "Big Wall Climbing", badge: "Multi-Day Vertical", icon: "fa-mountain", description: "Ascending sheer granite faces over multiple days, sleeping suspended on portable portaledges." },
          { title: "Mixed & Ice Climbing", badge: "Technical Mastery", icon: "fa-icicles", description: "Climbing frozen waterfalls and delicate interfaces of verglas, snow, and rock using modern ice tools." },
          { title: "Ski Mountaineering (Skimo)", badge: "High Velocity", icon: "fa-person-skiing", description: "Skinning up steep glaciated peaks with skis on pack, followed by a high-commitment descent." }
        ]
      },
      techniques: {
        title: "Technical Progression in Sequence",
        subtitle: "The structured order in which mountain craft is mastered",
        lead: "Step by step, safety systems and movement discipline work together.",
        items: [
          { step: "01", title: "Movement & Precise Footwork", icon: "fa-shoe-prints", description: "Centering gravity over footholds, trusting friction on granite, and kicking stable snow buckets." },
          { step: "02", title: "Roping Up & Belaying", icon: "fa-link", description: "Tying certified figure-eight knots, constructing equalized multi-point anchors, and dynamic belaying." },
          { step: "03", title: "Active & Passive Protection", icon: "fa-shield-halved", description: "Placing cams, hexes, nuts, and ice screws to ensure arresting capacity under severe fall forces." },
          { step: "04", title: "Ice Axe Self-Arrest", icon: "fa-person-falling", description: "Driving the adze and pick into snowpack within milliseconds of a slip to prevent momentum buildup." },
          { step: "05", title: "Crevasse Rescue & Hauling", icon: "fa-life-ring", description: "Rigging 3:1 Z-pulley or 5:1 complex hauling systems to extract fallen teammates from glacier crevasses." },
          { step: "06", title: "Acclimatization & Pacing", icon: "fa-heart-pulse", description: "Applying climb high, sleep low schedules to increase red blood cell count while monitoring SpO2." }
        ]
      },
      sheltering: {
        title: "Sheltering Above the Treeline",
        subtitle: "Rest is a vital survival decision as terrain steepens",
        lead: "From comfortable European refuges to minimalist hanging portaledges in the Karakoram.",
        items: [
          { title: "Mountain Huts & Refuges", icon: "fa-house-chimney-window", description: "Staffed alpine refuges providing hot broth, bunks, and route intelligence before alpine starts." },
          { title: "Base & High Altitude Camps", icon: "fa-tents", description: "Geodesic expedition dome tents secured with deadman anchors to withstand 120 km/h storm winds." },
          { title: "Snow Caves & Quinzees", icon: "fa-igloo", description: "Hand-carved chambers into wind-drifted snow that trap body heat at 0°C during -40°C outside storms." },
          { title: "Bivouac Ledges (Bivy)", icon: "fa-bed", description: "Minimalist emergency sacks on narrow rock ledges, clipped directly into anchor protection." },
          { title: "Suspended Portaledges", icon: "fa-layer-group", description: "Engineered aluminum platform cots hanging from a single master point on overhanging big walls." }
        ]
      },
      hazards: {
        title: "Mountain Hazards & Objective Risk",
        subtitle: "Recognizing dangers early and having zero hesitation to turn back",
        lead: "The mountain makes no compromises. Disciplined safety protocols preserve lives.",
        items: [
          { title: "Avalanches & Slab Releases", severity: "Critical", icon: "fa-burst", description: "Wind-loaded slabs on 30°–45° slopes. Mitigated with transceivers, probes, shovels, and snowpack pits." },
          { title: "Altitude Illness (AMS / HAPE / HACE)", severity: "Severe", icon: "fa-lungs", description: "Hypobaric hypoxia leading to fluid in lungs or brain. Prevented by pacing and immediate descent." },
          { title: "Concealed Glacial Crevasses", severity: "High", icon: "fa-water", description: "Chasms masked by fragile snow bridges. Traversed only on roped teams with rescue kits prepared." },
          { title: "Serac Collapse & Rockfall", severity: "High", icon: "fa-cubes-stacked", description: "Thermal expansion and shifting ice towers. Avoided by climbing in sub-zero early hours (2 AM starts)." },
          { title: "Hypothermia & Frostbite", severity: "Severe", icon: "fa-snowflake", description: "Severe wind chill. Prevented with 800-fill down suits, vapor barrier liners, and high-altitude boots." }
        ]
      }
    },
    mountains: [
      { name: "Mount Everest", height: 8848, difficulty: 8.8, range: "Mahalangur Himalaya", country: "Nepal / China", deathRate: "3.5%", highlight: "Highest point on Earth, Hillary Step bottleneck, Death Zone" },
      { name: "K2 (Savage Mountain)", height: 8611, difficulty: 9.9, range: "Karakoram", country: "Pakistan / China", deathRate: "23.2%", highlight: "Steep technical climbing, Bottleneck serac, severe storms" },
      { name: "Kangchenjunga", height: 8586, difficulty: 9.2, range: "Eastern Himalaya", country: "Nepal / India", deathRate: "19.8%", highlight: "Extreme isolation, persistent high winds, sacred summit boundary" },
      { name: "Nanga Parbat", height: 8126, difficulty: 9.7, range: "Western Himalaya", country: "Pakistan", deathRate: "21.6%", highlight: "4,500m Rupal Face, world's highest wall, sudden blizzards" },
      { name: "Annapurna I", height: 8091, difficulty: 9.8, range: "Annapurna Himalaya", country: "Nepal", deathRate: "29.4%", highlight: "Massive avalanche liability, high objective hazard" },
      { name: "Broad Peak", height: 8051, difficulty: 8.0, range: "Karakoram", country: "Pakistan / China", deathRate: "6.8%", highlight: "Long summit ridge, False Summit navigation, Karakoram views" },
      { name: "Gasherbrum I", height: 8080, difficulty: 8.5, range: "Karakoram", country: "Pakistan", deathRate: "8.5%", highlight: "Remote Karakoram glacier approach, technical ice couloirs" },
      { name: "Mont Blanc", height: 4809, difficulty: 6.2, range: "Graian Alps", country: "France / Italy", deathRate: "1.2%", highlight: "Alpine classic, Grand Couloir rockfall, Goûter refuge" },
      { name: "Matterhorn", height: 4478, difficulty: 7.5, range: "Pennine Alps", country: "Switzerland / Italy", deathRate: "4.1%", highlight: "Exposed Hörnli Ridge, sheer pyramidal granite, fixed ropes" }
    ],
    organizations: [
      { id: "acp", name: "Alpine Club of Pakistan", location: "Islamabad, Pakistan", founded: 1974, lat: 33.7294, lng: 73.0931, zoom: 7, region: "Karakoram & Western Himalaya", description: "National governing body managing permits for K2, Nanga Parbat, and the Gasherbrums.", website: "alpineclub.org.pk", badge: "Home of K2" },
      { id: "tac", name: "The Alpine Club", location: "London, United Kingdom", founded: 1857, lat: 51.5237, lng: -0.0827, zoom: 8, region: "Global & Historic", description: "The world's first mountaineering club, founded in London. Pioneer of the Alpine Golden Age.", website: "alpine-club.org.uk", badge: "World's Oldest" },
      { id: "caf", name: "Club Alpin Français (FFCAM)", location: "Chamonix & Paris, France", founded: 1874, lat: 45.9237, lng: 6.8694, zoom: 9, region: "Mont Blanc & Alps", description: "Operates 120+ mountain refuges across the French Alps and Pyrenees.", website: "ffcam.fr", badge: "Mont Blanc Gate" },
      { id: "nma", name: "Nepal Mountaineering Association", location: "Kathmandu, Nepal", founded: 1973, lat: 27.7172, lng: 85.3240, zoom: 8, region: "Himalaya & Everest", description: "Administers trekking peaks across Nepal, runs the Mountain Academy.", website: "nepalmountaineering.org", badge: "Gateway to Everest" },
      // { id: "aac", name: "American Alpine Club", location: "Golden, Colorado, USA", founded: 1902, lat: 39.7555, lng: -105.2211, zoom: 7, region: "Rockies & Cascades", description: "Provides rescue coverage grants, publishes Accidents in North American Climbing.", website: "americanalpineclub.org", badge: "North America" },
      // { id: "cai", name: "Club Alpino Italiano", location: "Milan, Italy", founded: 1863, lat: 45.4642, lng: 9.1900, zoom: 8, region: "Dolomites & Gran Paradiso", description: "Manages 700+ Alpine huts and the legendary National Alpine Cliff Rescue Corps.", website: "cai.it", badge: "Dolomites & Alps" }
    ],
    records: [
      { id: 1, year: 1953, peak: "Mount Everest", elevation: "8,848m", climber: "Edmund Hillary & Tenzing Norgay", category: "First Ascent", country: "Nepal / China", description: "First confirmed human ascent of the highest point on Earth via the South Col." },
      { id: 2, year: 1954, peak: "K2 (Godwin-Austen)", elevation: "8,611m", climber: "Achille Compagnoni & Lino Lacedelli", category: "First Ascent", country: "Pakistan", description: "First ascent of the Savage Mountain via the Abruzzi Spur." },
      { id: 3, year: 1975, peak: "Mount Everest", elevation: "8,848m", climber: "Junko Tabei", category: "Women First", country: "Japan", description: "Tabei becomes the first woman to summit Everest, overcoming a Camp II avalanche." },
      { id: 4, year: 1978, peak: "Mount Everest", elevation: "8,848m", climber: "Reinhold Messner & Peter Habeler", category: "Without O2", country: "Italy / Austria", description: "First ascent without bottled oxygen, revolutionizing human physiology standards." },
      { id: 5, year: 1986, peak: "All 14 Eight-Thousanders", elevation: "8,000m+", climber: "Reinhold Messner", category: "Milestone", country: "Italy", description: "First climber to conquer all 14 peaks above 8,000 meters entirely without oxygen." },
      { id: 6, year: 2019, peak: "14 Peaks Speed Record", elevation: "8,000m+", climber: "Nirmal Purja (Nimsdai)", category: "Speed", country: "Nepal", description: "Summits all 14 of the world's 8,000m peaks in just 6 months and 6 days." },
      { id: 7, year: 2021, peak: "K2 Winter Ascent", elevation: "8,611m", climber: "Nimsdai Purja & Sherpa Team", category: "Winter", country: "Nepal / Pakistan", description: "Historic first-ever winter summit of K2 in temperatures reaching -55°C." },
      { id: 8, year: 2023, peak: "14 Peaks World Record", elevation: "8,000m+", climber: "Kristin Harila & Tenjen Lama", category: "Speed", country: "Norway / Nepal", description: "Completed all 14 peaks in 92 days, setting a new benchmark in mountaineering." }
    ],
    packages: [
      {
        id: "pkg-beginner",
        tier: "Beginner / Intermediate",
        badge: "Popular",
        title: "Hunza & Fairy Meadows Alpine Trek",
        duration: "7 Days / 6 Nights",
        elevation: "3,300m Base Camp",
        price: "Rs. 65,000",
        image: "images/4.png",
        description: "Ideal initiation into northern Pakistan alpine trekking. Fairy Meadows reflections of Nanga Parbat, Beyal Camp, and Karakoram Highway.",
        itinerary: [
          "Day 1: Arrival in Islamabad & drive to Chilas via KKH",
          "Day 2: Raikot Bridge jeep ride and hike to Fairy Meadows",
          "Day 3: Day hike to Beyal Camp and View Point",
          "Day 4: Push to Nanga Parbat Base Camp (3,900m)",
          "Day 5: Transfer to Karimabad & historic Baltit Fort",
          "Day 6: Attabad Lake boating & Passu Glacier suspension bridge",
          "Day 7: Scenic return drive to Islamabad"
        ],
        gearIncluded: ["Shared 4-season all-weather tents", "Nutritious mountain meals & mineral water", "Certified alpine trekking guide", "First aid trauma kit & SpO2 monitoring"],
        gearRequired: ["Ankle-support trekking boots", "Fleece layers & thermal innerwear", "UV400 glacier sunglasses & SPF 50+"]
      },
      {
        id: "pkg-intermediate",
        tier: "Advanced Trekker",
        badge: "Glacier Classic",
        title: "K2 Basecamp & Concordia Trek",
        duration: "14 Days / 13 Nights",
        elevation: "5,150m Concordia",
        price: "Rs. 185,000",
        image: "images/2.png",
        description: "The throne room of the mountain gods. Trek the mighty Baltoro Glacier directly to Concordia beneath K2, Broad Peak, and Gasherbrum.",
        itinerary: [
          "Day 1-2: Flight to Skardu, briefing at ACP headquarters",
          "Day 3: Jeep drive to Askole village",
          "Day 4-6: Trek along Braldu River: Jhola to Paiju Camp",
          "Day 7: Acclimatization rest day beneath Trango Towers",
          "Day 8-10: Stepping onto Baltoro Glacier: Urdukas to Goro II",
          "Day 11: Grand arrival at Concordia with view of K2",
          "Day 12: High push to K2 Basecamp (Gilkey Memorial)",
          "Day 13-14: Return via Ali Camp and Skardu transfer"
        ],
        gearIncluded: ["Insulated high-altitude tents with sleeping mats", "Porters, mountain kitchen crew, mess tent", "Garmin InReach satellite SOS terminal", "Official government peak permits & toll fees"],
        gearRequired: ["-15°C down sleeping bag", "Crampons & microspikes for glaciated ice", "Hard-shell waterproof Gore-Tex outerwear"]
      },
      {
        id: "pkg-expert",
        tier: "Extreme Mountaineer",
        badge: "Peak Summit",
        title: "Spantik Peak (Golden Peak) Expedition",
        duration: "24 Days / 23 Nights",
        elevation: "7,027m Summit Push",
        price: "Rs. 420,000",
        image: "images/3.png",
        description: "A serious 7,000m technical peak in the Spantik-Sosbun Range. Ideal proving ground before tackling 8,000-metre giants.",
        itinerary: [
          "Day 1-3: Skardu equipment inspection, jeep to Arandu",
          "Day 4-7: Chogolungma Glacier trek to Spantik Basecamp (4,300m)",
          "Day 8-14: Route fixing & rotations to Camp 1 & 2",
          "Day 15-18: High Camp 3 establishment (6,200m) & weather window",
          "Day 19: Summit Push via Southeast Ridge to 7,027m apex",
          "Day 20-22: Safe descent & environmental cleanup",
          "Day 23-24: Trek to Arandu & return to Islamabad"
        ],
        gearIncluded: ["Dynamic climbing ropes & snow pickets", "Basecamp satellite link & weather forecast updates", "UIAGM/IFMGA certified guide ratio 1:2", "Emergency supplementary oxygen cylinder at Camp 3"],
        gearRequired: ["Double or triple mountaineering boots (8000m rated)", "Climbing harness, ice axes, jumar ascenders", "800-fill summit down suit & certified helmet"]
      }
    ],
    testimonials: [
      { id: 1, name: "Sarah Jenkins", role: "High-Altitude Alpinist", expedition: "K2 Basecamp & Gondogoro La", avatar: "SJ", stars: 5, quote: "Alpine Ascents delivered beyond expectation. The route preparation, acclimatization schedule, and safety equipment in the Karakoram gave our entire expedition absolute confidence.", year: "2024" },
      { id: 2, name: "Tariq Mahmood", role: "Expedition Leader", expedition: "Passu Cones Technical Ascent", avatar: "TM", stars: 5, quote: "The guides understood the mountain conditions down to the hour. When sudden weather rolled in, their instant emergency shelter protocol saved what could have been a desperate night.", year: "2025" },
      { id: 3, name: "Elena Rostova", role: "Alpine Photojournalist", expedition: "Baltoro Glacier 14-Day Traverse", avatar: "ER", stars: 5, quote: "Standing at Concordia surrounded by four 8,000m giants was a lifelong dream. The logistics, hot meals at high camps, and satellite communication were unmatched.", year: "2025" },
      { id: 4, name: "Marcus Vance", role: "Mountaineering Instructor", expedition: "Hunza Technical Ice Camp", avatar: "MV", stars: 5, quote: "The depth of technical knowledge regarding crampon footwork, belaying rigs, and avalanche avoidance was gold-standard. Highly recommended for ambitious climbers.", year: "2026" }
    ],
    gallery: [
      { id: 1, title: "Karakoram Ridgeline Ascent", category: "Expedition", location: "Gilgit-Baltistan, Pakistan", image: "images/18.jfif", full: "images/18.jfif", video: "images/31.mp4", caption: "Navigating knife-edge snow arêtes at 6,200m." },
      { id: 2, title: "Summit Dawn over Karakoram", category: "Summit", location: "Skardu, Pakistan", image: "images/34.jpg", full: "images/34.jpg", video: "images/35.mp4", caption: "First golden light touching high altitude peaks." },
      { id: 3, title: "Vertical Granite Face", category: "Technical", location: "Trango Towers, Pakistan", image: "images/36.jpg", full: "images/36.jpg", video: "images/37.mp4", caption: "Aider climbing and crack jams on steep rock." },
      { id: 4, title: "Glacier Traverse & Crevasse Fields", category: "Ice & Snow", location: "Baltoro Glacier", image: "images/33.jpg", full: "images/33.jpg", video: "images/30.mp4", caption: "Roped team negotiating deep glacial fractures." },
      { id: 5, title: "High Camp Under Starlight", category: "Camp Life", location: "Concordia, Pakistan", image: "images/14.jfif", full: "images/14.jfif", video: "images/32.mp4", caption: "Sub-zero bivouac beneath the Milky Way." },
      { id: 6, title: "Ice Fall Technical Route", category: "Ice & Snow", location: "Passu Glacier, Hunza", image: "images/38.jpg", full: "images/38.jpg", video: "images/39.mp4", caption: "Precision crampon placements on vertical ice cascades." },
      { id: 7, title: "Storm Clearing at Basecamp", category: "Expedition", location: "Nanga Parbat Diamir Face", image: "images/41.jpg", full: "images/41.jpg", video: "images/40.mp4", caption: "Watching cloud inversions roll through the high valley." },
      { id: 8, title: "Alpine Push to the Apex", category: "Summit", location: "Broad Peak Col", image: "images/50.avif", full: "images/50.avif", video: "images/51.mp4", caption: "The final 300 vertical meters toward the summit." }
    ],
    faq: [
      { id: 1, question: "How physically fit do I need to be for a multi-day high-altitude trek?", answer: "You should have a strong cardiovascular base (running, stair climbing with pack, cycling) and be able to hike 6–8 hours consecutively with a 12–15 kg backpack. Endurance matters far more than maximum muscle bulk. Zone-2 aerobic training for 3 to 6 months prior is strongly recommended." },
      { id: 2, question: "How do your teams prevent and manage Acute Mountain Sickness (AMS)?", answer: "Our itineraries enforce the proven mountaineering rule: climb high, sleep low, with built-in acclimatization rest days every 1,000 meters above 3,000m. Every guide carries a pulse oximeter, emergency bottled oxygen, a hyperbaric Gamow bag, and satellite SOS transceivers." },
      { id: 3, question: "What personal mountaineering equipment is mandatory versus provided?", answer: "We provide shared expedition tents, cooking stoves, fixed ropes, snow anchors, satellite comms, and medical kits. You must bring personal base layers, 800-fill down jacket, technical mountaineering boots (crampon-compatible), crampons, ice axe, climbing harness, helmet, and UV400 glacier sunglasses." },
      { id: 4, question: "What environmental and Leave-No-Trace policies must climbers observe?", answer: "All garbage must be carried down from high camps to designated base camp disposal points under strict Alpine Club of Pakistan regulations. Chemical waste, plastic packaging, and spent canisters are weighed out. We adhere strictly to zero-trace alpine ethics." },
      { id: 5, question: "What is the turnaround rule if weather deteriorates near the summit?", answer: "Our expedition leads enforce a strict non-negotiable 1:00 PM turnaround time on summit push days, regardless of proximity to the apex. In the mountains, reaching the summit is optional; returning safely to base camp is mandatory." }
    ],
    reviews: [
      { id: 1, name: "Hamza Abbasi", rating: 5, date: "2026-08-14", expedition: "K2 Basecamp & Concordia", review: "The logistical precision of Alpine Ascents was incredible. The guides anticipated weather shifts, the food was hot and nutritious at 4,800m, and the emergency backup protocols gave me total peace of mind." },
      { id: 2, name: "Zainab Chaudhry", rating: 5, date: "2026-07-29", expedition: "Fairy Meadows & Nanga Parbat", review: "Fabulous experience for an intermediate hiker! The staff were supportive, attentive to hydration and acclimatization pacing, and always kept morale soaring high." },
      { id: 3, name: "David Miller", rating: 4, date: "2026-06-18", expedition: "Hunza & Passu Cones", review: "Snow conditions turned rough on day 5, but lead guide Hassan rerouted us safely with zero drama. Truly authentic mountain guides who respect safety above all." },
      { id: 4, name: "Ayesha Siddiqui", rating: 5, date: "2026-05-10", expedition: "Skardu Mountain Trek", review: "The pre-trip briefing and gear checklist were super clear. Loved the interactive planner on the website too — exact budget estimations with no hidden fees." }
    ]
  };

  /** Helper to fetch JSON with automatic fallback */
  function fetchJsonWithFallback(url, fallbackKey, callback) {
    $.getJSON(url)
      .done(function (data) {
        callback(data);
      })
      .fail(function () {
        // Transparent fallback so file:/// double-click always succeeds
        callback(FALLBACK_DATA[fallbackKey]);
      });
  }

  /* ==========================================================================
     24. TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  window.showToast = function (type, title, message) {
    const icon =
      type === "success" ? "fa-circle-check" :
      type === "error"   ? "fa-circle-xmark" : "fa-circle-info";
    const $toast = $(`
      <div class="toast-msg toast-${type}">
        <i class="fa-solid ${icon}" style="font-size:18px;margin-top:2px;"></i>
        <div>
          <strong style="display:block;font-size:13px;color:var(--navy);">${title}</strong>
          <span style="font-size:12px;color:var(--muted);">${message}</span>
        </div>
      </div>
    `);

    $("#toastContainer").append($toast);

    setTimeout(function () {
      $toast.addClass("fade-out");
      setTimeout(function () { $toast.remove(); }, 350);
    }, 3200);
  };

  /* ==========================================================================
     13. PRELOADER ANIMATION
     ========================================================================== */
  const hidePreloader = function () {
    const $pre = $("#preloader");
    if ($pre.length && !$pre.hasClass("fade-out")) {
      $pre.addClass("fade-out");
      setTimeout(function () { $pre.remove(); }, 550);
    }
  };
  $(window).on("load", hidePreloader);
  setTimeout(hidePreloader, 1800); // Guarantees page is never blocked

  /* ==========================================================================
     25. SCROLL PROGRESS BAR & 11. STICKY NAVBAR / BACK TO TOP & 28. FLOATING CTA
     ========================================================================== */
  const $nav = $("#siteNav");
  const $backToTop = $("#backToTop");
  const $floatingCta = $("#floatingBookCta");
  const $scrollBar = $("#scrollProgress");
  const $heroMedia = $("#heroMedia");

  $(window).on("scroll", function () {
    const scrollY = $(this).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    // 25. Scroll progress bar
    $scrollBar.css("width", scrollPercent + "%");

    // 11. Sticky navbar
    $nav.toggleClass("scrolled", scrollY > 40);

    // 11. Back to top button
    if (scrollY > 400) {
      $backToTop.addClass("visible");
    } else {
      $backToTop.removeClass("visible");
    }

    // 28. Floating "Book Now" CTA button
    if (scrollY > 350) {
      $floatingCta.addClass("visible");
    } else {
      $floatingCta.removeClass("visible");
    }

    // 15. Parallax scrolling hero background
    if (scrollY < 850 && $heroMedia.length) {
      $heroMedia.css("transform", `translate3d(0, ${scrollY * 0.35}px, 0)`);
    }
  });

  $backToTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });

  /* ==========================================================================
     9. SMOOTH SCROLL NAVIGATION
     ========================================================================== */
  $('a[href^="#"]').on("click", function (e) {
    const targetHref = $(this).attr("href");
    if (!targetHref || targetHref === "#" || targetHref === "#top") {
      $("html, body").animate({ scrollTop: 0 }, 500);
      return;
    }
    const $target = $(targetHref);
    if ($target.length) {
      e.preventDefault();
      $("html, body").animate(
        { scrollTop: $target.offset().top - 72 },
        600
      );
      // Close mobile menu if open
      $("#navMenu").removeClass("is-open");
      $("#navToggle").attr("aria-expanded", "false");
    }
  });

  /* ==========================================================================
     3. MENU HOVER + ACTIVE COLOR CHANGE & 4. DROPDOWN FADE
     ========================================================================== */
  $(".nav-link").hover(
    function () {
      $(this).css("transition", "color 0.2s ease, transform 0.2s ease");
    },
    function () {
      // Return to default
    }
  );

  $(".nav-link").on("click", function () {
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
  });

  // Mobile menu toggle
  $("#navToggle").on("click", function () {
    const isOpen = $("#navMenu").toggleClass("is-open").hasClass("is-open");
    $(this).attr("aria-expanded", String(isOpen));
  });

  // 4. Menu dropdowns: .fadeIn(250) / .fadeOut(250)
  $(".nav-dropdown").hover(
    function () {
      $(this).find(".nav-dropdown-menu").stop(true, true).fadeIn(250);
    },
    function () {
      $(this).find(".nav-dropdown-menu").stop(true, true).fadeOut(250);
    }
  );

  /* ==========================================================================
     2. VISITOR COUNTER (Logo ke saath) + jquery.countTo style animation
     ========================================================================== */
  fetchJsonWithFallback("data/counter.json", "counter", function (data) {
    const storageKey = "alpine_visitor_count_sim";
    let count = parseInt(localStorage.getItem(storageKey), 10);
    if (isNaN(count)) {
      count = (data && data.count) ? data.count : 1420;
    }
    count += 1;
    localStorage.setItem(storageKey, String(count));

    // Smooth counter animation from 0 to target
    const $visitorNum = $("#visitorNumber");
    $({ countNum: 0 }).animate(
      { countNum: count },
      {
        duration: 1600,
        easing: "swing",
        step: function () {
          $visitorNum.text(Math.floor(this.countNum).toLocaleString());
        },
        complete: function () {
          $visitorNum.text(this.countNum.toLocaleString());
        }
      }
    );
  });

  /* ==========================================================================
     1. LIVE SCROLLING TICKER (Date, Time, Location) + Geolocation
     ========================================================================== */
  let userLocationString = "Locating Coordinates…";

  // Geolocation API (HTML5)
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        // Free reverse geocoding via OpenStreetMap Nominatim
        $.getJSON(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`)
          .done(function (res) {
            const addr = res.address || {};
            const city = addr.city || addr.town || addr.village || addr.county || addr.state || "Active Zone";
            const country = addr.country || "";
            userLocationString = country ? `${city}, ${country}` : city;
          })
          .fail(function () {
            userLocationString = `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`;
          });
      },
      function () {
        userLocationString = "Skardu & Karakoram Range";
      },
      { timeout: 7000 }
    );
  } else {
    userLocationString = "Karakoram & Western Himalaya";
  }

  function updateTicker() {
    const now = new Date();
    const dateFormatted = now.toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
    const timeFormatted = now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    const $track = $("#tickerTrack");

    // Render the ticker only once. Replacing the HTML every second restarts the
    // CSS marquee animation and causes the duplicated text to visually overlap.
    if (!$track.data("initialized")) {
      const items = [
        `<span class="ticker-item"><i class="fa-regular fa-calendar-days ticker-highlight"></i> <strong class="js-ticker-date"></strong></span>`,
        `<span class="ticker-item"><i class="fa-regular fa-clock ticker-highlight"></i> <strong class="js-ticker-time"></strong></span>`,
        `<span class="ticker-item"><i class="fa-solid fa-location-crosshairs ticker-highlight"></i> <span class="js-ticker-location"></span></span>`,
        `<span class="ticker-item"><span class="dot">●</span> <span>K2 Basecamp Weather: <strong>-14°C, Clear Wind 18 km/h</strong></span></span>`,
        `<span class="ticker-item"><span class="dot">●</span> <span>Alpine Ascents: Expeditions, Safety &amp; High Altitude Guidance</span></span>`
      ];

      const contentHtml = items.join("");
      // Duplicate back-to-back for a seamless 50% marquee loop.
      $track.html(contentHtml + contentHtml).data("initialized", true);
    }

    // Update only the text nodes so the running animation is never reset.
    $track.find(".js-ticker-date").text(dateFormatted);
    $track.find(".js-ticker-time").text(timeFormatted);
    $track.find(".js-ticker-location").text(userLocationString);
  }

  updateTicker();
  setInterval(updateTicker, 1000);

  /* ==========================================================================
     17. EXPEDITION COUNTDOWN TIMER
     ========================================================================== */
  fetchJsonWithFallback("data/expedition.json", "expedition", function (exp) {
    if (!exp) return;
    if (exp.targetPeak) $("#countdownTargetName").text(exp.targetPeak);

    const targetTime = new Date(exp.departureDate || Date.now() + 60 * 86400000).getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const diff = Math.max(0, targetTime - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      $("#countDays").text(String(days).padStart(2, "0"));
      $("#countHours").text(String(hours).padStart(2, "0"));
      $("#countMins").text(String(mins).padStart(2, "0"));
      $("#countSecs").text(String(secs).padStart(2, "0"));
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  });

  /* ==========================================================================
     4 & 5. JSON-DRIVEN SPA DYNAMIC CONTENT (History, Types, Techniques, Sheltering, Hazards)
     ========================================================================== */
  fetchJsonWithFallback("data/content.json", "content", function (content) {
    $("#spaSkeleton").fadeOut(200, function () {
      $(this).remove();
    });

    if (!content) return;

    // Render History Pane
    if (content.history) {
      let html = `
        <div class="reveal in">
          <h3 style="font-size:24px;color:var(--navy);margin-bottom:6px;">${content.history.title}</h3>
          <p style="color:var(--orange);font-weight:700;margin-bottom:12px;">${content.history.subtitle}</p>
          <p class="lede" style="margin-bottom:28px;">${content.history.lead}</p>
          <div class="spa-cards-grid">
      `;
      content.history.items.forEach(item => {
        html += `
          <div class="spa-card">
            <div class="spa-card-icon"><i class="fa-solid ${item.icon}"></i></div>
            <h4 style="font-size:16px;color:var(--navy);margin-bottom:8px;">${item.era}</h4>
            <p style="font-size:13px;line-height:1.7;margin:0;">${item.description}</p>
          </div>
        `;
      });
      html += `</div></div>`;
      $("#spaPaneHistory").html(html);
    }

    // Render Types Pane
    if (content.types) {
      let html = `
        <div class="reveal in">
          <h3 style="font-size:24px;color:var(--navy);margin-bottom:6px;">${content.types.title}</h3>
          <p style="color:var(--orange);font-weight:700;margin-bottom:12px;">${content.types.subtitle}</p>
          <p class="lede" style="margin-bottom:28px;">${content.types.lead}</p>
          <div class="spa-cards-grid">
      `;
      content.types.items.forEach(item => {
        html += `
          <div class="spa-card">
            <span class="spa-card-badge">${item.badge}</span>
            <div class="spa-card-icon"><i class="fa-solid ${item.icon}"></i></div>
            <h4 style="font-size:16px;color:var(--navy);margin-bottom:8px;">${item.title}</h4>
            <p style="font-size:13px;line-height:1.7;margin:0;">${item.description}</p>
          </div>
        `;
      });
      html += `</div></div>`;
      $("#spaPaneTypes").html(html);
    }

    // Render Techniques Pane
    if (content.techniques) {
      let html = `
        <div class="reveal in">
          <h3 style="font-size:24px;color:var(--navy);margin-bottom:6px;">${content.techniques.title}</h3>
          <p style="color:var(--orange);font-weight:700;margin-bottom:12px;">${content.techniques.subtitle}</p>
          <p class="lede" style="margin-bottom:28px;">${content.techniques.lead}</p>
          <div class="spa-cards-grid">
      `;
      content.techniques.items.forEach(item => {
        html += `
          <div class="spa-card">
            <span class="spa-card-badge">Step ${item.step}</span>
            <div class="spa-card-icon"><i class="fa-solid ${item.icon}"></i></div>
            <h4 style="font-size:16px;color:var(--navy);margin-bottom:8px;">${item.title}</h4>
            <p style="font-size:13px;line-height:1.7;margin:0;">${item.description}</p>
          </div>
        `;
      });
      html += `</div></div>`;
      $("#spaPaneTechniques").html(html);
    }

    // Render Sheltering Pane
    if (content.sheltering) {
      let html = `
        <div class="reveal in">
          <h3 style="font-size:24px;color:var(--navy);margin-bottom:6px;">${content.sheltering.title}</h3>
          <p style="color:var(--orange);font-weight:700;margin-bottom:12px;">${content.sheltering.subtitle}</p>
          <p class="lede" style="margin-bottom:28px;">${content.sheltering.lead}</p>
          <div class="spa-cards-grid">
      `;
      content.sheltering.items.forEach(item => {
        html += `
          <div class="spa-card">
            <div class="spa-card-icon"><i class="fa-solid ${item.icon}"></i></div>
            <h4 style="font-size:16px;color:var(--navy);margin-bottom:8px;">${item.title}</h4>
            <p style="font-size:13px;line-height:1.7;margin:0;">${item.description}</p>
          </div>
        `;
      });
      html += `</div></div>`;
      $("#spaPaneSheltering").html(html);
    }

    // Render Hazards Pane
    if (content.hazards) {
      let html = `
        <div class="reveal in">
          <h3 style="font-size:24px;color:var(--navy);margin-bottom:6px;">${content.hazards.title}</h3>
          <p style="color:var(--orange);font-weight:700;margin-bottom:12px;">${content.hazards.subtitle}</p>
          <p class="lede" style="margin-bottom:28px;">${content.hazards.lead}</p>
          <div class="spa-cards-grid">
      `;
      content.hazards.items.forEach(item => {
        const badgeClass =
          item.severity === "Critical" ? "badge-critical" :
          item.severity === "Severe"   ? "badge-severe" : "badge-high";
        html += `
          <div class="spa-card">
            <span class="spa-card-badge ${badgeClass}">${item.severity} Risk</span>
            <div class="spa-card-icon"><i class="fa-solid ${item.icon}"></i></div>
            <h4 style="font-size:16px;color:var(--navy);margin-bottom:8px;">${item.title}</h4>
            <p style="font-size:13px;line-height:1.7;margin:0;">${item.description}</p>
          </div>
        `;
      });
      html += `</div></div>`;
      $("#spaPaneHazards").html(html);
    }
  });

  // SPA Tab Switching with jQuery .fadeOut(200) / .fadeIn(400)
  $(".spa-tab-btn").on("click", function () {
    const tabName = $(this).data("tab");
    $(".spa-tab-btn").removeClass("active").attr("aria-selected", "false");
    $(this).addClass("active").attr("aria-selected", "true");

    const targetPaneId = "#spaPane" + tabName.charAt(0).toUpperCase() + tabName.slice(1);

    $(".spa-content-pane:visible").fadeOut(200, function () {
      $(targetPaneId).fadeIn(380);
    });
  });

  // Dropdown target jumper for SPA tabs
  $("[data-spa-target]").on("click", function (e) {
    e.preventDefault();
    const target = $(this).data("spa-target");
    $(`.spa-tab-btn[data-tab="${target}"]`).trigger("click");
    $("html, body").animate({
      scrollTop: $("#spaSection").offset().top - 70
    }, 600);
  });

  /* ==========================================================================
     16. INTERACTIVE ELEVATION & DIFFICULTY CHART (Chart.js)
     ========================================================================== */
  fetchJsonWithFallback("data/mountains.json", "mountains", function (peaks) {
    if (!peaks || !$("#elevationChart").length || typeof Chart === "undefined") return;

    const labels = peaks.map(p => p.name);
    const heights = peaks.map(p => p.height);
    const difficulties = peaks.map(p => p.difficulty);

    const ctx = document.getElementById("elevationChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Summit Elevation (m)",
            data: heights,
            backgroundColor: "rgba(37, 99, 235, 0.75)",
            borderColor: "rgba(37, 99, 235, 1)",
            borderWidth: 1.5,
            borderRadius: 6,
            yAxisID: "y"
          },
          {
            label: "Technical Difficulty (1-10)",
            data: difficulties,
            type: "line",
            borderColor: "rgba(255, 122, 0, 1)",
            backgroundColor: "rgba(255, 122, 0, 0.2)",
            borderWidth: 3,
            pointBackgroundColor: "rgba(255, 122, 0, 1)",
            pointRadius: 6,
            pointHoverRadius: 9,
            yAxisID: "y1"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            labels: { font: { family: "Montserrat", weight: "700" } }
          },
          tooltip: {
            backgroundColor: "rgba(7, 22, 74, 0.95)",
            titleFont: { family: "Montserrat", weight: "800" }
          }
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: { display: true, text: "Elevation (Meters)", font: { weight: "700" } },
            min: 3000,
            max: 9500
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: { display: true, text: "Difficulty Grade", font: { weight: "700" } },
            min: 0,
            max: 11,
            grid: { drawOnChartArea: false }
          }
        },
        onClick: function (evt, elements) {
          if (elements && elements.length > 0) {
            const index = elements[0].index;
            const p = peaks[index];
            $("#inspectPeakName").text(p.name);
            $("#inspectPeakRange").text(`Range: ${p.range} • ${p.country}`);
            $("#inspectPeakHighlight").text(p.highlight);
            $("#inspectPeakHeight").text(p.height.toLocaleString() + " m");
            $("#inspectPeakDiff").text(p.difficulty + " / 10");
            $("#inspectPeakDeath").text(p.deathRate || "—");

            $("#peakInspectCard").addClass("trip-result-update");
            setTimeout(function () { $("#peakInspectCard").removeClass("trip-result-update"); }, 400);
          }
        }
      }
    });
  });

  /* ==========================================================================
     6. GEOLOCATION API & MAP (ORGANIZATIONS / CLUBS)
     ========================================================================== */
  fetchJsonWithFallback("data/organizations.json", "organizations", function (orgs) {
    const $mapEl = $("#clubsMap");
    if (!orgs || !$mapEl.length || typeof L === "undefined") return;

    // Keep the original Pakistan-focused view and make the map fully interactive.
    const map = L.map("clubsMap", {
      scrollWheelZoom: true,
      dragging: true,
      doubleClickZoom: true,
      touchZoom: true,
      boxZoom: true,
      keyboard: true,
      zoomControl: true
    }).setView([30.3753, 69.3451], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      minZoom: 2,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    let listHtml = "";
    const markerMap = {};

    orgs.forEach(function (org) {
      const lat = Number(org.lat);
      const lng = Number(org.lng);
      const hasCoords = Number.isFinite(lat) && Number.isFinite(lng);

      listHtml += `
        <li data-org-id="${org.id}" tabindex="0" style="cursor:pointer;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;">
            <h3 style="font-size:15px;color:var(--navy);margin:0 0 4px;">${org.name}</h3>
            <span style="font-size:9px;font-weight:800;background:#edf3ff;color:var(--blue);padding:2px 8px;border-radius:12px;white-space:nowrap;">${org.badge || "Club"}</span>
          </div>
          <p style="font-size:12px;color:var(--muted);margin:0 0 6px;"><strong>${org.location}</strong> (Est. ${org.founded})</p>
          <p style="font-size:11px;color:var(--muted);margin:0;">${org.description}</p>
        </li>
      `;

      if (!hasCoords) return;

      const marker = L.marker([lat, lng]).addTo(map);
      marker.bindPopup(`
        <div class="map-popup">
          <h3>${org.name}</h3>
          <strong>${org.location}</strong>
          <p>${org.description}</p>
          ${org.website ? `<a href="https://${org.website}" target="_blank" rel="noopener noreferrer">Visit Portal &rarr;</a>` : ""}
        </div>
      `);
      markerMap[String(org.id)] = marker;
    });

    $("#organizationsList").html(listHtml);

    // Keep the map in the same useful regional view as the original design.
    map.setView([30.3753, 69.3451], 4, { animate: false });

    function refreshMap() {
      map.invalidateSize({ animate: false });
    }

    setTimeout(refreshMap, 100);
    setTimeout(refreshMap, 500);
    setTimeout(refreshMap, 1200);

    $("#organizationsList").on("click", "li", function () {
      const id = String($(this).data("org-id"));
      const org = orgs.find(function (o) { return String(o.id) === id; });
      const marker = markerMap[id];
      if (!org || !marker) return;

      const lat = Number(org.lat);
      const lng = Number(org.lng);
      map.flyTo([lat, lng], Number(org.zoom) || 7, {
        animate: true,
        duration: 1.0
      });
      setTimeout(function () { marker.openPopup(); }, 450);
    });

    $("#organizationsList").on("keydown", "li", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        $(this).trigger("click");
      }
    });
  });

  /* ==========================================================================
     10. SEARCH / FILTER RECORDS
     ========================================================================== */
  fetchJsonWithFallback("data/records.json", "records", function (records) {
    if (!records) return;

    function renderRecords(list) {
      if (!list.length) {
        $("#recordsGrid").html('<p style="grid-column:1/-1;text-align:center;padding:40px;color:var(--muted);">No matching mountaineering records found.</p>');
        return;
      }
      let html = "";
      list.forEach(rec => {
        html += `
          <div class="record-card record-item" data-category="${rec.category}">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="record-year">${rec.year}</span>
              <span style="font-size:10px;font-weight:800;color:var(--blue);background:#eef4ff;padding:2px 8px;border-radius:12px;">${rec.category}</span>
            </div>
            <h4 style="font-size:17px;color:var(--navy);margin:14px 0 4px;">${rec.peak}</h4>
            <p style="font-size:12px;color:var(--orange);font-weight:700;margin:0 0 8px;">${rec.climber} (${rec.country})</p>
            <p style="font-size:12px;color:var(--muted);line-height:1.7;margin:0;">${rec.description}</p>
            <div class="record-meta"><i class="fa-solid fa-mountain"></i><span>${rec.elevation || "8,000m+"}</span><span>•</span><span>${rec.country}</span></div>
          </div>
        `;
      });
      $("#recordsGrid").html(html);
    }

    renderRecords(records);

    // Live search filter on keyup
    $("#recordsSearch").on("keyup", function () {
      const q = $(this).val().toLowerCase().trim();
      const activeCat = $(".record-cat-btn.active").data("cat");

      const filtered = records.filter(r => {
        const matchesQuery =
          r.peak.toLowerCase().includes(q) ||
          r.climber.toLowerCase().includes(q) ||
          String(r.year).includes(q) ||
          r.country.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q);
        const matchesCat = (activeCat === "all" || r.category === activeCat);
        return matchesQuery && matchesCat;
      });

      renderRecords(filtered);
    });

    // Category filter pills
    $(".record-cat-btn").on("click", function () {
      $(".record-cat-btn").removeClass("active");
      $(this).addClass("active");
      $("#recordsSearch").trigger("keyup");
    });
  });

  /* ==========================================================================
     18. BEFORE / AFTER ROUTE COMPARISON SLIDER
     ========================================================================== */
  const $sliderBox = $("#routeComparisonSlider");
  const $beforeClip = $("#sliderBeforeClip");
  const $sliderHandle = $("#sliderHandle");
  let isDraggingSlider = false;

  function updateSliderPosition(clientX) {
    if (!$sliderBox.length) return;
    const rect = $sliderBox[0].getBoundingClientRect();
    let posX = clientX - rect.left;
    posX = Math.max(0, Math.min(posX, rect.width));
    const pct = (posX / rect.width) * 100;
    $beforeClip.css("width", pct + "%");
    $sliderHandle.css("left", pct + "%");
  }

  $sliderBox.on("mousedown touchstart", function (e) {
    isDraggingSlider = true;
    const clientX = e.type.startsWith("touch") ? e.originalEvent.touches[0].clientX : e.clientX;
    updateSliderPosition(clientX);
  });

  $(window).on("mousemove touchmove", function (e) {
    if (!isDraggingSlider) return;
    const clientX = e.type.startsWith("touch") ? e.originalEvent.touches[0].clientX : e.clientX;
    updateSliderPosition(clientX);
  });

  $(window).on("mouseup touchend", function () {
    isDraggingSlider = false;
  });

  /* ==========================================================================
     20. EXPEDITION PACKAGES & MODAL POPUPS
     ========================================================================== */
  fetchJsonWithFallback("data/packages.json", "packages", function (packages) {
    if (!packages) return;

    let html = "";
    packages.forEach(pkg => {
      html += `
        <article class="package-card" data-pkg-id="${pkg.id}">
          <div class="package-img-wrap">
            <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
            <span class="difficulty ${pkg.id === 'pkg-expert' ? 'challenging' : 'easy'}" style="position:absolute;top:14px;right:14px;">${pkg.badge}</span>
          </div>
          <div class="package-body">
            <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px;">
              <i class="fa-regular fa-clock"></i> ${pkg.duration} • ${pkg.elevation}
            </div>
            <h3 style="font-size:18px;color:var(--navy);margin-bottom:8px;">${pkg.title}</h3>
            <p style="font-size:13px;color:var(--muted);line-height:1.6;flex:1;margin-bottom:18px;">${pkg.description}</p>
            <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--line);padding-top:14px;">
              <span class="package-price">${pkg.price}</span>
              <button type="button" class="btn btn-primary js-view-package" data-id="${pkg.id}" style="padding:8px 16px;font-size:11px;">
                View Details
              </button>
            </div>
          </div>
        </article>
      `;
    });
    $("#packagesGrid").html(html);

    // Open Package Modal Handler
    $(".js-view-package").on("click", function () {
      const id = $(this).data("id");
      const pkg = packages.find(p => p.id === id);
      if (!pkg) return;

      let itineraryHtml = pkg.itinerary.map(it => `<li><i class="fa-solid fa-check" style="color:#10b981;margin-right:8px;"></i>${it}</li>`).join("");
      let gearIncHtml = pkg.gearIncluded.map(g => `<li><i class="fa-solid fa-shield" style="color:var(--blue);margin-right:8px;"></i>${g}</li>`).join("");
      let gearReqHtml = pkg.gearRequired.map(g => `<li><i class="fa-solid fa-person-hiking" style="color:var(--orange);margin-right:8px;"></i>${g}</li>`).join("");

      const modalContent = `
        <span class="eyebrow-label"><i class="fa-solid fa-mountain"></i> ${pkg.tier}</span>
        <h2 id="pkgModalTitle" style="color:var(--navy);margin:6px 0 14px;">${pkg.title}</h2>
        <div style="display:flex;gap:20px;flex-wrap:wrap;font-size:13px;font-weight:700;color:var(--muted);margin-bottom:18px;">
          <span><i class="fa-regular fa-clock"></i> ${pkg.duration}</span>
          <span><i class="fa-solid fa-arrow-up-right-dots"></i> ${pkg.elevation}</span>
          <span style="color:var(--orange);font-size:18px;">${pkg.price}</span>
        </div>
        <p style="font-size:13px;line-height:1.7;color:var(--muted);margin-bottom:20px;">${pkg.description}</p>
        
        <h4 style="font-size:15px;color:var(--navy);margin:16px 0 8px;">Itinerary Schedule</h4>
        <ul style="list-style:none;padding:0;font-size:12px;line-height:2;color:var(--text);">${itineraryHtml}</ul>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:20px;">
          <div>
            <h4 style="font-size:14px;color:var(--navy);margin-bottom:8px;">Included Gear & Logistics</h4>
            <ul style="list-style:none;padding:0;font-size:12px;line-height:1.8;color:var(--muted);">${gearIncHtml}</ul>
          </div>
          <div>
            <h4 style="font-size:14px;color:var(--navy);margin-bottom:8px;">Mandatory Personal Gear</h4>
            <ul style="list-style:none;padding:0;font-size:12px;line-height:1.8;color:var(--muted);">${gearReqHtml}</ul>
          </div>
        </div>

        <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:28px;border-top:1px solid var(--line);padding-top:18px;">
          <button type="button" class="btn btn-ghost" data-close-modal>Close</button>
          <button type="button" class="btn btn-primary js-book-this-package" data-title="${pkg.title}">
            Book This Package
          </button>
        </div>
      `;

      $("#packageModalContent").html(modalContent);
      $("#packageModal").addClass("is-open").attr("aria-hidden", "false");
      document.body.dataset.lightboxOverflow = document.body.style.overflow || "";
      document.body.style.overflow = "hidden";

      // Bind Book button inside modal to open wizard with package preset
      $(".js-book-this-package").on("click", function () {
        const selectedTitle = $(this).data("title");
        $("#packageModal").removeClass("is-open").attr("aria-hidden", "true");
        document.body.style.overflow = document.body.dataset.lightboxOverflow || "";
      delete document.body.dataset.lightboxOverflow;
        openBookingWizard(selectedTitle);
      });
    });

    $("[data-close-modal]").on("click", function () {
      $("#packageModal").removeClass("is-open").attr("aria-hidden", "true");
      $("body").css("overflow", "");
    });
  });

  /* ==========================================================================
     8. SUCCESS STORIES / TESTIMONIALS SLIDER
     ========================================================================== */
  fetchJsonWithFallback("data/testimonials.json", "testimonials", function (stories) {
    if (!stories) return;

    let slidesHtml = "";
    let dotsHtml = "";
    stories.forEach((s, idx) => {
      slidesHtml += `
        <div class="slider-card" data-index="${idx}">
          <div class="slider-card-stars">${"★".repeat(s.stars)}</div>
          <p class="slider-card-quote">“${s.quote}”</p>
          <div class="slider-card-author">
            <div class="slider-avatar">${s.avatar}</div>
            <div>
              <strong style="display:block;color:var(--navy);font-size:15px;">${s.name}</strong>
              <small style="color:var(--muted);">${s.role} • ${s.expedition} (${s.year})</small>
            </div>
          </div>
        </div>
      `;
      dotsHtml += `<div class="slider-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>`;
    });

    $("#testimonialTrack").html(slidesHtml);
    $("#testimonialDots").html(dotsHtml);

    let currentSlide = 0;
    const totalSlides = stories.length;
    let sliderInterval = null;

    function goToSlide(idx) {
      currentSlide = (idx + totalSlides) % totalSlides;
      $("#testimonialTrack").css("transform", `translateX(-${currentSlide * 100}%)`);
      $(".slider-dot").removeClass("active").filter(`[data-index="${currentSlide}"]`).addClass("active");
    }

    $("#nextTestimonial").on("click", function () { goToSlide(currentSlide + 1); });
    $("#prevTestimonial").on("click", function () { goToSlide(currentSlide - 1); });

    $(".slider-dot").on("click", function () {
      goToSlide(parseInt($(this).data("index"), 10));
    });

    function startAutoPlay() {
      sliderInterval = setInterval(function () {
        goToSlide(currentSlide + 1);
      }, 5000);
    }
    function stopAutoPlay() {
      if (sliderInterval) clearInterval(sliderInterval);
    }

    startAutoPlay();
    $("#testimonialsCarousel").hover(stopAutoPlay, startAutoPlay);
  });

  /* ==========================================================================
     7. GALLERY SECTION & LIGHTBOX (With Video & Social Share)
     ========================================================================== */
  fetchJsonWithFallback("data/gallery.json", "gallery", function (galleryItems) {
    if (!galleryItems) return;

    let html = "";
    galleryItems.forEach((item, idx) => {
      html += `
        <div class="gallery-item" data-index="${idx}" data-full="${item.full}" data-video="${item.video || ''}" data-title="${item.title}">
          <img class="gallery-image" src="${item.image}" alt="${item.title}" loading="lazy">
${item.video ? `<video class="gallery-item-video" muted loop playsinline preload="auto" tabindex="-1" aria-hidden="true"><source src="${item.video}" type="video/mp4"></video>` : ''}
          <div class="gallery-overlay">
            <span style="font-size:10px;text-transform:uppercase;color:var(--orange);font-weight:800;">${item.category}</span>
            <h4 style="font-size:14px;color:#fff;margin:4px 0 2px;">${item.title}</h4>
            <small style="color:rgba(255,255,255,0.75);font-size:11px;">${item.location}</small>
          </div>
          ${item.video ? '<span class="gallery-play-badge" aria-hidden="true"><i class="fa-solid fa-play"></i></span>' : ''}
        </div>
      `;
    });
    $("#galleryGrid").html(html);

    

    // Desktop hover video preview; touch devices keep the image and use tap for lightbox.
    const galleryRoot = document.getElementById("galleryGrid");
    if (galleryRoot) {
      galleryRoot.querySelectorAll(".gallery-item").forEach((card) => {
        const video = card.querySelector(".gallery-item-video");
        if (!video) return;

        const startPreview = () => {
          if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            video.currentTime = 0;
            video.play().catch(() => {});
            card.classList.add("is-video-playing");
          }
        };
        const stopPreview = () => {
          video.pause();
          try { video.currentTime = 0; } catch (_) {}
          card.classList.remove("is-video-playing");
        };

        card.addEventListener("mouseenter", startPreview);
        card.addEventListener("mouseleave", stopPreview);
        card.addEventListener("focusin", startPreview);
        card.addEventListener("focusout", stopPreview);
      });
    }

    // Lightbox Logic
    let activeLightboxIdx = 0;

    function renderLightbox(idx) {
      activeLightboxIdx = (idx + galleryItems.length) % galleryItems.length;
      const item = galleryItems[activeLightboxIdx];
      const $inner = $("#lightboxInner");
      $inner.empty();

      if (item.video) {
        const video = document.createElement("video");
        video.src = item.video;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        $inner.append(video);
      } else {
        const img = document.createElement("img");
        img.src = item.full;
        img.alt = item.title;
        $inner.append(img);
      }

      $("#lightboxCaption").html(`<strong>${item.title}</strong> — ${item.caption}`);
      $("#lightbox").addClass("is-open").attr("aria-hidden", "false");
      $("body").css("overflow", "hidden");
    }

    $(".gallery-item").on("click", function () {
      renderLightbox(parseInt($(this).data("index"), 10));
    });

    $("#lightboxNext").on("click", function (e) {
      e.stopPropagation();
      renderLightbox(activeLightboxIdx + 1);
    });

    $("#lightboxPrev").on("click", function (e) {
      e.stopPropagation();
      renderLightbox(activeLightboxIdx - 1);
    });

    function closeLightbox() {
      $("#lightbox").removeClass("is-open").attr("aria-hidden", "true");
      $("#lightboxInner").find("video").each(function () { this.pause(); });
      $("#lightboxInner").empty();
      $("body").css("overflow", "");
    }

    $("#lightboxClose").on("click", closeLightbox);
    $("#lightbox").on("click", function (e) {
      if (e.target === this) closeLightbox();
    });

    $(document).on("keydown", function (e) {
      if (!$("#lightbox").hasClass("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") renderLightbox(activeLightboxIdx + 1);
      if (e.key === "ArrowLeft") renderLightbox(activeLightboxIdx - 1);
    });
  });

  /* ==========================================================================
     19. ACCORDION-STYLE FAQ / GUIDELINES SECTION (.slideToggle)
     ========================================================================== */
  fetchJsonWithFallback("data/faq.json", "faq", function (faqList) {
    if (!faqList) return;

    let html = "";
    faqList.forEach((faq, idx) => {
      html += `
        <div class="faq-item ${idx === 0 ? 'active' : ''}">
          <div class="faq-header" tabindex="0">
            <h4 class="faq-title">${faq.question}</h4>
            <div class="faq-icon"><i class="fa-solid fa-chevron-down"></i></div>
          </div>
          <div class="faq-body" style="${idx === 0 ? 'display:block;' : ''}">
            <p>${faq.answer}</p>
          </div>
        </div>
      `;
    });
    $("#faqAccordion").html(html);

    // Collapsible slideToggle handler
    $("#faqAccordion").on("click", ".faq-header", function () {
      const $item = $(this).closest(".faq-item");
      const $body = $item.find(".faq-body");
      const isAlreadyOpen = $item.hasClass("active");

      // Close all other items
      $(".faq-item").removeClass("active");
      $(".faq-body").slideUp(280);

      if (!isAlreadyOpen) {
        $item.addClass("active");
        $body.slideDown(280);
      }
    });
  });

  /* ==========================================================================
     21. RATING & REVIEW SYSTEM
     ========================================================================== */
  fetchJsonWithFallback("data/reviews.json", "reviews", function (baseReviews) {
    const storageKey = "alpine_climber_reviews_store";
    let stored = [];
    try {
      stored = JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch (e) {
      stored = [];
    }

    const allReviews = stored.concat(baseReviews || []);

    function updateReviewsUI() {
      let totalRating = 0;
      let html = "";

      allReviews.forEach(r => {
        totalRating += Number(r.rating) || 5;
        html += `
          <div class="review-card" style="padding:18px 22px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div class="review-stars" style="color:#f59e0b;font-size:14px;">${"★".repeat(r.rating)}</div>
              <small style="color:var(--muted);">${r.date || "2026"}</small>
            </div>
            <p style="font-size:13px;line-height:1.6;margin:8px 0;color:var(--text);">“${r.review}”</p>
            <strong style="font-size:12px;color:var(--navy);display:block;">${r.name}</strong>
            <small style="color:var(--orange);font-size:11px;">${r.expedition}</small>
          </div>
        `;
      });

      const avg = allReviews.length ? (totalRating / allReviews.length).toFixed(1) : "5.0";
      $("#avgRatingScore").text(avg);
      $("#totalReviewCount").text(`Based on ${allReviews.length} verified expeditions`);
      $("#reviewsList").html(html);
    }

    updateReviewsUI();

    // Star picker logic
    $("#starPicker i").hover(
      function () {
        const val = parseInt($(this).data("value"), 10);
        $("#starPicker i").each(function () {
          $(this).toggleClass("hovered", parseInt($(this).data("value"), 10) <= val);
        });
      },
      function () {
        $("#starPicker i").removeClass("hovered");
      }
    );

    $("#starPicker i").on("click", function () {
      const val = parseInt($(this).data("value"), 10);
      $("#reviewRatingVal").val(val);
      $("#starPicker i").each(function () {
        $(this).toggleClass("selected", parseInt($(this).data("value"), 10) <= val);
      });
    });

    // Form submission
    $("#reviewSubmitForm").on("submit", function (e) {
      e.preventDefault();
      const name = $("#reviewAuthor").val().trim();
      const exp = $("#reviewExpedition").val();
      const text = $("#reviewText").val().trim();
      const stars = parseInt($("#reviewRatingVal").val(), 10) || 5;

      if (!name || !text) {
        showToast("error", "Validation Error", "Please fill in all review fields.");
        return;
      }

      const newRev = {
        id: Date.now(),
        name: name,
        rating: stars,
        date: new Date().toISOString().split("T")[0],
        expedition: exp,
        review: text
      };

      allReviews.unshift(newRev);
      stored.unshift(newRev);
      localStorage.setItem(storageKey, JSON.stringify(stored));

      updateReviewsUI();
      showToast("success", "Review Submitted", "Thank you! Your feedback has been published.");
      this.reset();
      $("#starPicker i").addClass("selected");
      $("#reviewRatingVal").val(5);
    });
  });

  /* ==========================================================================
     22 & 12. MULTI-STEP BOOKING WIZARD
     ========================================================================== */
  let currentWizardStep = 1;

  function setWizardStep(step) {
    currentWizardStep = step;
    $(".wizard-step-panel").removeClass("active");
    $(`#wizardStep${step}`).addClass("active");

    $(".wizard-step-node").removeClass("active completed");
    $(".wizard-step-node").each(function () {
      const s = parseInt($(this).data("step"), 10);
      if (s < step) $(this).addClass("completed");
      else if (s === step) $(this).addClass("active");
    });

    const progressPct = ((step - 1) / 3) * 80;
    $("#wizardProgressBar").css("width", progressPct + "%");
  }

  function validateStep1() {
    let valid = true;
    const name = $("#wizName").val().trim();
    const email = $("#wizEmail").val().trim();
    const phone = $("#wizPhone").val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 3) {
      $("#errWizName").show();
      valid = false;
    } else {
      $("#errWizName").hide();
    }

    if (!emailRegex.test(email)) {
      $("#errWizEmail").show();
      valid = false;
    } else {
      $("#errWizEmail").hide();
    }

    if (phone.length < 9) {
      $("#errWizPhone").show();
      valid = false;
    } else {
      $("#errWizPhone").hide();
    }

    return valid;
  }

  function validateStep2() {
    const date = $("#wizDate").val();
    if (!date) {
      $("#errWizDate").show();
      return false;
    }
    $("#errWizDate").hide();
    return true;
  }

  $("#btnStep1Next").on("click", function () {
    if (validateStep1()) setWizardStep(2);
  });

  $("#btnStep2Prev").on("click", function () { setWizardStep(1); });
  $("#btnStep2Next").on("click", function () {
    if (validateStep2()) setWizardStep(3);
  });

  $("#btnStep3Prev").on("click", function () { setWizardStep(2); });
  $("#btnStep3Next").on("click", function () {
    // Build Step 4 Summary
    const name = $("#wizName").val().trim();
    const email = $("#wizEmail").val().trim();
    const phone = $("#wizPhone").val().trim();
    const exp = $("#wizExpedition").val();
    const date = $("#wizDate").val();
    const climbers = $("#wizClimbers").val();
    const origin = $("#wizOrigin").val();
    const oxygen = $("#wizGearOxygen").is(":checked") ? "Yes (+Rs. 45,000)" : "No";
    const porter = $("#wizGearPorter").is(":checked") ? "Yes (+Rs. 35,000)" : "No";

    const summaryHtml = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:13px;">
        <div><strong>Climber:</strong> ${name}</div>
        <div><strong>Email:</strong> ${email}</div>
        <div><strong>Phone:</strong> ${phone}</div>
        <div><strong>Origin:</strong> ${origin}</div>
        <div><strong>Expedition:</strong> <span style="color:var(--orange);font-weight:700;">${exp}</span></div>
        <div><strong>Target Date:</strong> ${date}</div>
        <div><strong>Party Size:</strong> ${climbers} Traveler(s)</div>
        <div><strong>Emergency O2:</strong> ${oxygen}</div>
        <div><strong>High Porter:</strong> ${porter}</div>
      </div>
    `;
    $("#wizardSummaryBox").html(summaryHtml);
    setWizardStep(4);
  });

  $("#btnStep4Prev").on("click", function () { setWizardStep(3); });

  // Wizard submission
  $("#wizardBookingForm").on("submit", function (e) {
    e.preventDefault();
    const name = $("#wizName").val().trim();
    const exp = $("#wizExpedition").val();
    const date = $("#wizDate").val();

    // 12. Persist to localStorage JSON store
    const bookingRecord = {
      id: "EXP-" + Date.now(),
      name: name,
      email: $("#wizEmail").val().trim(),
      phone: $("#wizPhone").val().trim(),
      expedition: exp,
      date: date,
      climbers: $("#wizClimbers").val(),
      createdAt: new Date().toISOString()
    };

    try {
      const currentBookings = JSON.parse(localStorage.getItem("alpine_all_bookings")) || [];
      currentBookings.push(bookingRecord);
      localStorage.setItem("alpine_all_bookings", JSON.stringify(currentBookings));
    } catch (err) {}

    console.log("Alpine Expedition Booking Saved:", bookingRecord);

    $("#wizardBookingForm").hide();
    $("#wizardSuccessText").html(`
      Thank you, <strong>${name}</strong>! Your application for <strong>${exp}</strong> scheduled for <strong>${date}</strong> has been logged.<br>Our expedition lead will review technical requirements and confirm permits via phone and email.
    `);
    $("#wizardSuccess").prop("hidden", false);

    showToast("success", "Expedition Booked", "Your booking request has been confirmed.");
  });

  window.openBookingWizard = function (presetExpedition) {
    setWizardStep(1);
    $("#wizardBookingForm")[0].reset();
    $("#wizardBookingForm").show();
    $("#wizardSuccess").prop("hidden", true);
    $(".form-error").hide();

    if (presetExpedition) {
      $("#wizExpedition").val(presetExpedition);
    }

    $("#wizardBookingModal").addClass("is-open").attr("aria-hidden", "false");
    $("body").css("overflow", "hidden");
    setTimeout(function () { $("#wizName").focus(); }, 120);
  };

  $("#wizDate").attr("min", new Date().toISOString().split("T")[0]);

  $(".js-open-wizard").on("click", function (e) {
    e.preventDefault();
    openBookingWizard();
  });

  $("[data-close-wizard]").on("click", function () {
    $("#wizardBookingModal").removeClass("is-open").attr("aria-hidden", "true");
    $("body").css("overflow", "");
  });

  /* ==========================================================================
     26. DARK / LIGHT MODE TOGGLE
     ========================================================================== */
  const $themeToggle = $("#themeToggle");
  const savedTheme = localStorage.getItem("alpine-theme-pref");

  if (savedTheme === "dark") {
    $("body").addClass("dark-mode");
  }

  function syncThemeIcon() {
    const isDark = $("body").hasClass("dark-mode");
    $themeToggle.html(isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>');
    $themeToggle.attr("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
  syncThemeIcon();

  $themeToggle.on("click", function () {
    $("body").toggleClass("dark-mode");
    const isDark = $("body").hasClass("dark-mode");
    localStorage.setItem("alpine-theme-pref", isDark ? "dark" : "light");
    syncThemeIcon();
    showToast("info", "Theme Changed", isDark ? "Dark mode activated" : "Light mode activated");
  });

  /* ==========================================================================
     27. SOCIAL SHARE BUTTONS
     ========================================================================== */
  $(".share-btn").on("click", function () {
    const platform = $(this).data("platform");
    const currentUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent("Alpine Ascents — Complete Guide to Mountaineering & Expeditions");

    if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`, "_blank");
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`, "_blank");
    } else if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${title}%20${currentUrl}`, "_blank");
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`, "_blank");
    }
  });

  $("#btnCopyPageLink").on("click", function () {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(function () {
        showToast("success", "Link Copied", "Page URL copied to clipboard!");
      });
    } else {
      showToast("info", "Share Link", window.location.href);
    }
  });

  /* ==========================================================================
     NEWSLETTER SUBSCRIPTION
     ========================================================================== */
  $("#btnSubscribe").on("click", function () {
    const email = $("#emailSubscribe").val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("error", "Invalid Email", "Please provide a valid email address.");
      return;
    }
    showToast("success", "Subscribed", "Welcome to Alpine Ascents Expedition Bulletins!");
    $("#emailSubscribe").val("");
  });

  /* ==========================================================================
     TRIP EXPENSE CALCULATOR
     ========================================================================== */
  const rates = {
    hunza:  { name: "Hunza Valley", transport: 12000, hotel: 14000, food: 7000, activities: 2500, guide: 4000, equipment: 2500, emergency: 1500, misc: 2000 },
    skardu: { name: "Skardu (K2)",  transport: 16000, hotel: 16000, food: 7500, activities: 3500, guide: 4500, equipment: 3000, emergency: 1800, misc: 2500 },
    murree: { name: "Murree Hills", transport: 7000,  hotel: 10000, food: 6000, activities: 1800, guide: 3000, equipment: 1800, emergency: 1200, misc: 1500 },
    naran:  { name: "Naran Kaghan", transport: 8500,  hotel: 11000, food: 6000, activities: 2200, guide: 3200, equipment: 2000, emergency: 1300, misc: 1700 },
    swat:   { name: "Swat Valley",  transport: 7500,  hotel: 9500,  food: 5500, activities: 2000, guide: 3000, equipment: 1800, emergency: 1200, misc: 1500 }
  };

  const origins = {
    islamabad:    { name: "Islamabad / Rawalpindi", transitPerPerson: 0 },
    lahore:       { name: "Lahore", transitPerPerson: 5500 },
    karachi:      { name: "Karachi", transitPerPerson: 18500 },
    faisalabad:   { name: "Faisalabad", transitPerPerson: 6000 },
    peshawar:     { name: "Peshawar", transitPerPerson: 4000 },
    multan:       { name: "Multan", transitPerPerson: 8000 },
    international:{ name: "International Arrival", transitPerPerson: 22000 }
  };

  const packageTiers = {
    standard: { name: "Standard Trekker", multiplier: 0.85 },
    comfort:  { name: "Comfort Alpine", multiplier: 1.00 },
    luxury:   { name: "VIP Extreme Expedition", multiplier: 1.45 }
  };

  const guideTypes = {
    certified: { name: "Certified Alpine Guide (ACP/UIAGM)", guideMultiplier: 1.00 },
    local:     { name: "Native High-Altitude Local Scout", guideMultiplier: 0.70 },
    team:      { name: "Lead Guide + Assistant Team", guideMultiplier: 1.85 },
    none:      { name: "Self-Guided (No Guide Support)", guideMultiplier: 0.00 }
  };

  const ageGroups = {
    adult:  { name: "Standard Adult Party", discount: 0.00, label: "Standard Rate" },
    youth:  { name: "Youth / Students (10% Discount)", discount: 0.10, label: "10% Student Discount" },
    senior: { name: "Senior Mountaineers (+5% Acclimatization)", discount: -0.05, label: "Paced Acclimatization Buffer" }
  };

  const money = n => "Rs. " + Math.round(n).toLocaleString("en-PK");

  function calculateTrip() {
    const destKey = $("#tripDestination").val();
    const city = rates[destKey] || rates.hunza;

    const originKey = $("#tripOrigin").val() || "islamabad";
    const origin = origins[originKey] || origins.islamabad;

    const pkgKey = $("#tripPackage").val() || "comfort";
    const pkg = packageTiers[pkgKey] || packageTiers.comfort;

    const guideKey = $("#tripGuideType").val() || "certified";
    const guideChoice = guideTypes[guideKey] || guideTypes.certified;

    const ageKey = $("#tripAgeGroup").val() || "adult";
    const ageChoice = ageGroups[ageKey] || ageGroups.adult;

    const d = Math.max(3, Math.min(7, Number($("#tripDays").val()) || 5));
    const people = Math.max(1, Math.min(20, Number($("#tripTravelers").val()) || 1));
    $("#tripTravelers").val(people);

    const factor = d / 5;
    const mountainTransport = city.transport * (d <= 3 ? 0.8 : d >= 7 ? 1.15 : 1);
    const sourceTransit = origin.transitPerPerson;
    const hotel = city.hotel * factor * pkg.multiplier;
    const food = city.food * factor * pkg.multiplier;
    const activities = city.activities * factor;
    const guide = city.guide * factor * guideChoice.guideMultiplier;
    const equipment = city.equipment * factor;
    const emergency = city.emergency * factor;
    const misc = city.misc * factor;

    const subtotalPerPerson = mountainTransport + sourceTransit + hotel + food + activities + guide + equipment + emergency + misc;
    const discountAmount = subtotalPerPerson * ageChoice.discount;
    const perPerson = Math.max(0, subtotalPerPerson - discountAmount);
    const total = perPerson * people;
    const nights = d - 1;

    $("#tripResultName").text(`${city.name}`);
    $("#tripMetaSummary").text(`From ${origin.name} • ${pkg.name} • ${guideChoice.name} • ${ageChoice.label}`);
    $("#tripTotal").text(money(total));
    $("#tripTravelerText").text(`For ${people} Traveler${people === 1 ? '' : 's'} (${origin.name})`);
    $("#tripDurationText").text(`${d} Days / ${nights} Night${nights === 1 ? '' : 's'}`);

    $("#tripTransport").text(money(mountainTransport * people));
    $("#tripSourceTransit").text(money(sourceTransit * people));
    $("#tripHotel").text(money(hotel * people));
    $("#tripFood").text(money(food * people));
    $("#tripActivities").text(money(activities * people));
    $("#tripGuide").text(money(guide * people));
    $("#tripEquipment").text(money(equipment * people));
    $("#tripEmergency").text(money(emergency * people));
    $("#tripMisc").text(money(misc * people));
    $("#tripPerPerson").text(money(perPerson));

    const $result = $("#tripResult");
    $result.removeClass("trip-result-update");
    void $result[0].offsetWidth;
    $result.addClass("trip-result-update");
  }

  $("#tripCalculate").on("click", calculateTrip);
  $("#tripPlus").on("click", function () {
    const val = Number($("#tripTravelers").val()) || 1;
    $("#tripTravelers").val(Math.min(20, val + 1));
    calculateTrip();
  });
  $("#tripMinus").on("click", function () {
    const val = Number($("#tripTravelers").val()) || 1;
    $("#tripTravelers").val(Math.max(1, val - 1));
    calculateTrip();
  });
  $("#tripDays, #tripDestination, #tripTravelers, #tripOrigin, #tripPackage, #tripGuideType, #tripAgeGroup").on("change", calculateTrip);
  calculateTrip();

  // Download estimate as text file
  $("#downloadEstimate").on("click", function () {
    const dest = $("#tripResultName").text();
    const meta = $("#tripMetaSummary").text();
    const duration = $("#tripDurationText").text();
    const travelers = $("#tripTravelerText").text();
    const total = $("#tripTotal").text();
    const perPerson = $("#tripPerPerson").text();

    const text = `ALPINE ASCENTS — TRIP ESTIMATE\n====================================\nDestination: ${dest}\nConfiguration: ${meta}\nDuration: ${duration}\nParty: ${travelers}\n\nEXPENSE BREAKDOWN:\nMountain 4x4 Transport: ${$("#tripTransport").text()}\nSource/Origin Transit: ${$("#tripSourceTransit").text()}\nAccommodation & Camps: ${$("#tripHotel").text()}\nExpedition Meals: ${$("#tripFood").text()}\nActivities & Permits: ${$("#tripActivities").text()}\nLocal Guide & Scouting: ${$("#tripGuide").text()}\nTechnical Equipment: ${$("#tripEquipment").text()}\nEmergency Reserve: ${$("#tripEmergency").text()}\nEnvironmental & Toll: ${$("#tripMisc").text()}\n\nTOTAL ESTIMATED EXPENSE: ${total}\nPER PERSON: ${perPerson}\n\nGenerated by Alpine Ascents Intelligence Portal.`;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `alpine-estimate-${dest.toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast("success", "Estimate Downloaded", "Trip estimate saved as a text document.");
  });

  /* ==========================================================================
     ABOUT STATS — COUNT-UP ANIMATION
     Fixes the About section stats staying at 0.
     Values are read from each element's data-target attribute.
     ========================================================================== */
  function animateAboutStats($scope) {
    $scope.find(".count-up").each(function () {
      const $counter = $(this);

      // Prevent the same counter from being animated more than once.
      if ($counter.data("countAnimated")) return;

      const target = parseInt($counter.attr("data-target"), 10);
      if (!Number.isFinite(target)) return;

      const suffix = $counter.attr("data-suffix") || "";
      $counter.data("countAnimated", true);
      $counter.text("0" + suffix);

      $({ value: 0 }).animate(
        { value: target },
        {
          duration: 1400,
          easing: "swing",
          step: function () {
            $counter.text(Math.floor(this.value).toLocaleString() + suffix);
          },
          complete: function () {
            $counter.text(target.toLocaleString() + suffix);
          }
        }
      );
    });
  }

  if ("IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateAboutStats($(entry.target));
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    $(".intro-stats").each(function () {
      statsObserver.observe(this);
    });
  } else {
    animateAboutStats($(".intro-stats"));
  }

  /* ==========================================================================
     14. SCROLL ANIMATIONS (.reveal)
     ========================================================================== */
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $(entry.target).addClass("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    $(".reveal").each(function () {
      observer.observe(this);
    });
  } else {
    $(".reveal").addClass("in");
  }
});
