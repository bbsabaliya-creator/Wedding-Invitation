const INVITE_CONFIG = {
  couple: {
    groomName: "Bhargav",
    brideName: "Ayushi",
    guestSalutation: "",
    welcomeLine: "We would be delighted to have you with us as we celebrate the beginning of forever.",
    heroDateText: "Sunday, 20th December 2026",
    heroTimeText: "6 PM ONWARDS",
    heroPhoto: "photos/couple-hero.jpg"
  },

  saveTheDate: {
    monthLabel: "DECEMBER 2026",
    year: 2026,
    monthIndex: 2, // 0 = Jan, 1 = Feb, 2 = Mar ... 11 = Dec
    daysInMonth: 31,
    startWeekday: 1, // 0 = Sun, 1 = Mon, 2 = Tue ... 6 = Sat
    highlightedDates: [15], // Dates marked with a heart on the calendar
    note: "Save the Date — Celebration in Surat"
  },

  ourStory: [
    {
      chapterLabel: "Chapter One",
      title: "The First Glance",
      locationDate: "SURAT • 2025",
      photo: "photos/story-1.jpg",
      quote: "A handful of moments, but ours is my favorite."
    },
    {
      chapterLabel: "Chapter Two",
      title: "A Shared Journey",
      locationDate: "BARODA • 2025",
      photo: "photos/story-2.jpg",
      quote: "Every road felt lighter side by side."
    },
    {
      chapterLabel: "Chapter Three",
      title: "Growing Together",
      locationDate: "AHMEDABAD • 2026",
      photo: "photos/story-3.jpg",
      quote: "Where laughter turned into forever."
    },
    {
      chapterLabel: "Chapter Four",
      title: "Our Beginning",
      locationDate: "SURAT • 2026",
      photo: "photos/story-4.jpg",
      quote: "Two hearts ready for a lifetime."
    }
  ],

  families: {
    heading: "Two Families, One Heart",
    subHeading: "THE SAVALIYA & DOBARIYA FAMILIES",
    tagline: "Two lineages intertwined with tradition, warmth, and timeless grace.",
    groomFamilyLabel: "GROOM'S FAMILY",
    groomParents: "Mr. Bharat & Mrs. Vilas Savaliya",
    groomInvitesLine: "cordially invite you to celebrate the wedding ceremony of their beloved son",
    groomNote: "“Son of honour, stepping forward with devotion, warmth, and abiding joy.”",
    brideFamilyLabel: "BRIDE'S FAMILY",
    brideParents: "Mr. Harsukh & Mrs. Kanchan Dobariya",
    brideInvitesLine: "cordially invite you to celebrate the auspicious wedding of",
    brideNote: "“Daughter of grace, carrying family love into a radiant new dawn.”"
  },

  ceremonies: [
    {
      name: "HALDI",
      date: "21 DECEMBER 2026",
      time: "10:00 AM",
      venue: "THE GARDEN PAVILION",
      location: "Koregaon Park, Pune",
      dressCode: "Sunshine Yellow & Festive Florals",
      mapsQuery: "Koregaon Park Pune"
    },
    {
      name: "MEHENDI",
      date: "21 DECEMBER 2026",
      time: "4:00 PM",
      venue: "THE GARDEN PAVILION",
      location: "Koregaon Park, Pune",
      dressCode: "Floral Prints & Festive",
      mapsQuery: "Koregaon Park Pune"
    },
    {
      name: "SANGEET",
      date: "22 DECEMBER 2026",
      time: "7:30 PM",
      venue: "THE GRAND BALLROOM",
      location: "Bund Garden Road, Pune",
      dressCode: "Indo-Western & Glamour",
      mapsQuery: "Bund Garden Road Pune"
    },
    {
      name: "WEDDING",
      date: "23 DECEMBER 2026",
      time: "6:30 PM",
      venue: "CENTRAL MANDAP",
      location: "Laxmi Lawns, Hadapsar, Pune",
      dressCode: "Royal Traditional Attire",
      mapsQuery: "Laxmi Lawns Hadapsar Pune"
    },
    {
      name: "RECEPTION",
      date: "24 DECEMBER 2026",
      time: "8:00 PM",
      venue: "CRYSTAL BANQUET",
      location: "Hadapsar, Pune",
      dressCode: "Formal Black Tie / Chic",
      mapsQuery: "Hadapsar Pune"
    }
  ],

  keepsake: {
    photos: [
      { src: "photos/keepsake-1.jpg", quote: "“Every love story is beautiful, but ours is my favorite.”" },
      { src: "photos/keepsake-2.jpg", quote: "“Whatever our souls are made of, his and mine are the same.”" }
    ]
  },

  venue: {
    kicker: "THE WEDDING",
    title: "Where Forever Begins",
    venueName: "LAXMI LAWNS, PUNE",
    address: "Magarpatta, Hadapsar, Pune",
    dateText: "MONDAY, 15 MARCH 2027",
    timeText: "6 PM ONWARDS",
    mapsUrl: "https://maps.google.com/?q=Laxmi+Lawns+Hadapsar+Pune"
  },

  rsvp: {
    salutation: "Dear Meera & Family",
    question: "Will you join us ?",
    buttonText: "ACCEPT THE INVITATION"
  },

  blessingForm: {
    salutation: "Dear Meera & Family",
    title: "Leave a Blessing",
    subtitle: "Your words will become a cherished part of our beginning.",
    toLabel: "TO AARAV & ANANYA"
  },

  blessingsList: [
    { quote: "May your love grow deeper with every sunrise, and may your home always be filled with warmth and joyous laughter.", author: "PRIYA & ROHAN", relation: "Cousins" },
    { quote: "Wishing you both endless happiness, health, and togetherness in this new chapter.", author: "MEERA & VIKRAM", relation: "Family" }
  ],

  thankYou: {
    topLine: "WITH ALL OUR LOVE",
    title: "Thank you",
    subLine: "for being a part of our story",
    footerCode: "XV • III • MMXXVII"
  }
};

// Build the ordered scenes matching the video flow
const scenes = [
  { id: "welcome-hero", chapterIndex: 0, render: renderWelcomeHero },
  { id: "welcome-arch", chapterIndex: 0, render: renderWelcomeArch },
  { id: "save-the-date", chapterIndex: 1, render: renderSaveTheDate },
  ...INVITE_CONFIG.ourStory.map((item, idx) => ({
    id: `story-${idx}`,
    chapterIndex: 2,
    render: () => renderStoryCard(item)
  })),
  { id: "families-together", chapterIndex: 3, render: renderFamiliesTogether },
  { id: "families-parents", chapterIndex: 3, render: renderFamiliesParents },
  ...INVITE_CONFIG.ceremonies.map((cer, idx) => ({
    id: `ceremony-${idx}`,
    chapterIndex: 4,
    render: () => renderCeremony(cer)
  })),
  { id: "keepsake", chapterIndex: 5, render: renderKeepsake },
  { id: "venue", chapterIndex: 6, render: renderVenue },
  { id: "rsvp", chapterIndex: 7, render: renderRsvp },
  { id: "blessing-form", chapterIndex: 8, render: renderBlessingForm },
  { id: "blessings-list", chapterIndex: 9, render: renderBlessingsList },
  { id: "thank-you", chapterIndex: 10, render: renderThankYou }
];

const journeyChapters = [
  "Welcome",
  "Save the Date",
  "Our Story",
  "With Families",
  "The Ceremonies",
  "Our Keepsake",
  "Where Forever Begins",
  "Will You Join Us",
  "Leave a Blessing",
  "Warm Blessings",
  "Thank You"
];

let sceneIndex = 0;
let blessingIdx = 0;
let musicStarted = false;

const stage = document.getElementById("stage");
const backBtn = document.getElementById("backBtn");
const continueBtn = document.getElementById("continueBtn");
const menuToggle = document.getElementById("menuToggle");
const drawerOverlay = document.getElementById("drawerOverlay");
const drawerClose = document.getElementById("drawerClose");
const drawerList = document.getElementById("drawerList");
const roamingHeart = document.getElementById("roamingHeart");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

// Heart coordinates along the curved red dashed trail
const heartWaypoints = [
  { x: 245, y: 125 },
  { x: 285, y: 185 },
  { x: 145, y: 245 },
  { x: 195, y: 310 },
  { x: 255, y: 365 },
  { x: 135, y: 425 },
  { x: 225, y: 485 },
  { x: 185, y: 535 },
  { x: 130, y: 590 },
  { x: 210, y: 640 },
  { x: 175, y: 510 },
  { x: 235, y: 390 },
  { x: 150, y: 290 },
  { x: 240, y: 210 },
  { x: 190, y: 165 }
];

function moveHeartForScene(idx) {
  const wp = heartWaypoints[idx % heartWaypoints.length];
  roamingHeart.style.left = `${wp.x}px`;
  roamingHeart.style.top = `${wp.y}px`;
}

function getAllBlessings() {
  try {
    const stored = JSON.parse(localStorage.getItem("custom_invite_blessings") || "null");
    return Array.isArray(stored) && stored.length ? stored : INVITE_CONFIG.blessingsList;
  } catch {
    return INVITE_CONFIG.blessingsList;
  }
}

function renderWelcomeHero() {
  const c = INVITE_CONFIG.couple;
  return `
    <div class="scene-enter">
      <h1 class="script-heading">Welcome</h1>
      <div class="kicker">${c.guestSalutation}</div>
      <div class="couple-names">
        ${c.groomName}
        <span class="amp">&</span>
        ${c.brideName}
      </div>
      <p class="quote-text">${c.welcomeLine}</p>
      <div class="meta-line">${c.heroDateText} • ${c.heroTimeText}</div>
      <img class="hero-art" src="${c.heroPhoto}" alt="${c.groomName} and ${c.brideName}" />
    </div>
  `;
}

function renderWelcomeArch() {
  const c = INVITE_CONFIG.couple;
  return `
    <div class="scene-enter">
      <div class="kicker">TOGETHER WITH THEIR FAMILIES</div>
      <div class="couple-names">
        <span class="script-heading" style="font-size:38px;">${c.groomName.split(" ")[0]}</span>
        <span class="meta-line" style="margin:6px 0;">WEDS</span>
        <span class="script-heading" style="font-size:38px;">${c.brideName.split(" ")[0]}</span>
      </div>
      <p class="quote-text">${c.heroDateText} • ${c.heroTimeText}</p>
    </div>
  `;
}

function renderSaveTheDate() {
  const s = INVITE_CONFIG.saveTheDate;
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  let cells = days.map((d) => `<div class="cal-day-name">${d}</div>`).join("");
  for (let i = 0; i < s.startWeekday; i++) {
    cells += `<div></div>`;
  }
  for (let d = 1; d <= s.daysInMonth; d++) {
    const isHi = s.highlightedDates.includes(d);
    cells += `<div class="cal-date ${isHi ? "highlight" : ""}">${d}</div>`;
  }
  return `
    <div class="scene-enter">
      <div class="kicker">SAVE THE DATE</div>
      <div class="calendar-box">
        <div class="cal-month">${s.monthLabel}</div>
        <div class="cal-grid">${cells}</div>
      </div>
      <p class="quote-text">${s.note}</p>
    </div>
  `;
}

function renderStoryCard(item) {
  return `
    <div class="scene-enter">
      <div class="kicker">A HANDFUL OF MOMENTS</div>
      <h2 class="script-heading">Our Story</h2>
      <div class="polaroid">
        <img src="${item.photo}" alt="${item.title}" />
        <div class="polaroid-caption">${item.chapterLabel}</div>
      </div>
      <div class="couple-names" style="font-size:24px;">${item.title}</div>
      <div class="kicker">${item.locationDate}</div>
      <p class="quote-text">“${item.quote}”</p>
    </div>
  `;
}

function renderFamiliesTogether() {
  const f = INVITE_CONFIG.families;
  return `
    <div class="scene-enter">
      <h2 class="script-heading">${f.heading}</h2>
      <div class="meta-line">${f.subHeading}</div>
      <p class="quote-text">${f.tagline}</p>
    </div>
  `;
}

function renderFamiliesParents() {
  const f = INVITE_CONFIG.families;
  const c = INVITE_CONFIG.couple;
  return `
    <div class="scene-enter">
      <div class="info-card">
        <div class="family-block">
          <div class="family-role">${f.groomFamilyLabel}</div>
          <div class="family-names">${f.groomParents}</div>
          <div class="kicker" style="margin-top:4px;">${f.groomInvitesLine}</div>
          <div class="couple-names" style="font-size:24px;">${c.groomName}</div>
          <p class="quote-text" style="font-size:13.5px;">${f.groomNote}</p>
        </div>
        <div class="family-block">
          <div class="family-role">${f.brideFamilyLabel}</div>
          <div class="family-names">${f.brideParents}</div>
          <div class="kicker" style="margin-top:4px;">${f.brideInvitesLine}</div>
          <div class="couple-names" style="font-size:24px;">${c.brideName}</div>
          <p class="quote-text" style="font-size:13.5px;">${f.brideNote}</p>
        </div>
      </div>
    </div>
  `;
}

function renderCeremony(cer) {
  const mapLink = `https://maps.google.com/?q=${encodeURIComponent(cer.mapsQuery || `${cer.venue} ${cer.location}`)}`;
  return `
    <div class="scene-enter">
      <div class="kicker">CEREMONIES</div>
      <h2 class="ceremony-title">${cer.name}</h2>
      <div class="info-card">
        <div class="detail-row">📅 ${cer.date}</div>
        <div class="detail-row">⏰ ${cer.time}</div>
        <div class="detail-row">📍 ${cer.venue} — ${cer.location}</div>
        <div class="detail-row">✨ ${cer.dressCode}</div>
      </div>
      <div class="btn-row">
        <a class="pill-btn pill-gold" href="${mapLink}" target="_blank" rel="noopener">VIEW LOCATION →</a>
        <button type="button" class="pill-btn pill-outline" onclick="alert('Added ${cer.name} (${cer.date}, ${cer.time}) to your schedule!')">Save to Calendar</button>
      </div>
    </div>
  `;
}

function renderKeepsake() {
  return `
    <div class="scene-enter">
      <h2 class="script-heading">Our Keepsake</h2>
      ${INVITE_CONFIG.keepsake.photos.map((p) => `
        <div class="polaroid" style="width:165px;">
          <img src="${p.src}" alt="Keepsake" style="height:105px;" />
        </div>
        <p class="quote-text" style="font-size:14px;">${p.quote}</p>
      `).join("")}
    </div>
  `;
}

function renderVenue() {
  const v = INVITE_CONFIG.venue;
  return `
    <div class="scene-enter">
      <div class="kicker">${v.kicker}</div>
      <h2 class="script-heading">${v.title}</h2>
      <div class="info-card">
        <div class="couple-names" style="font-size:22px;">${v.venueName}</div>
        <div class="kicker">${v.address}</div>
        <div class="detail-row">${v.dateText}</div>
        <div class="detail-row">${v.timeText}</div>
      </div>
      <div class="btn-row">
        <a class="pill-btn pill-gold" href="${v.mapsUrl}" target="_blank" rel="noopener">VIEW LOCATION →</a>
      </div>
    </div>
  `;
}

function renderRsvp() {
  const r = INVITE_CONFIG.rsvp;
  return `
    <div class="scene-enter">
      <div class="script-heading" style="font-size:32px;">${r.salutation}</div>
      <h2 class="couple-names" style="font-size:28px;">${r.question}</h2>
      <form class="form-box" id="rsvpForm">
        <input class="input-field" type="text" id="guestName" placeholder="Your Full Name" required />
        <input class="input-field" type="number" id="guestCount" min="1" max="15" value="2" placeholder="Guests" />
        <button type="submit" class="pill-btn pill-crimson">♥ ${r.buttonText}</button>
        <div class="feedback-msg" id="rsvpMsg"></div>
      </form>
    </div>
  `;
}

function renderBlessingForm() {
  const b = INVITE_CONFIG.blessingForm;
  return `
    <div class="scene-enter">
      <div class="script-heading" style="font-size:32px;">${b.salutation}</div>
      <h2 class="couple-names" style="font-size:28px;">${b.title}</h2>
      <p class="quote-text">${b.subtitle}</p>
      <div class="kicker">${b.toLabel}</div>
      <form class="form-box" id="blessingForm">
        <input class="input-field" type="text" id="senderName" placeholder="Your Name" required />
        <textarea class="textarea-field" id="wishText" rows="3" placeholder="Write your wishes, prayers & blessings..." required></textarea>
        <button type="submit" class="pill-btn pill-gold">SEND BLESSING</button>
        <div class="feedback-msg" id="blessingMsg"></div>
      </form>
    </div>
  `;
}

function renderBlessingsList() {
  const list = getAllBlessings();
  const item = list[blessingIdx % list.length];
  return `
    <div class="scene-enter">
      <div class="kicker">HEARTFELT WISHES</div>
      <h2 class="script-heading">Warm Blessings</h2>
      <div class="blessing-card">
        <p class="quote-text">“${item.quote}”</p>
        <div class="family-names" style="font-size:16px;">${item.author}</div>
        <div class="kicker">${item.relation}</div>
      </div>
      <div class="pager-row">
        <button type="button" class="pill-btn pill-outline" id="prevWish">←</button>
        <span>${String((blessingIdx % list.length) + 1).padStart(2, "0")} / ${String(list.length).padStart(2, "0")}</span>
        <button type="button" class="pill-btn pill-outline" id="nextWish">→</button>
      </div>
    </div>
  `;
}

function renderThankYou() {
  const t = INVITE_CONFIG.thankYou;
  const c = INVITE_CONFIG.couple;
  return `
    <div class="scene-enter">
      <div class="kicker">${t.topLine}</div>
      <h2 class="script-heading" style="font-size:52px;">${t.title}</h2>
      <p class="quote-text">${t.subLine}</p>
      <div class="couple-names" style="font-size:24px;">
        ${c.groomName.split(" ")[0]} <span style="color:#d61f36;">♥</span> ${c.brideName.split(" ")[0]}
      </div>
      <div class="meta-line">${t.footerCode}</div>
    </div>
  `;
}

function renderDrawer() {
  const activeChapter = scenes[sceneIndex].chapterIndex;
  drawerList.innerHTML = journeyChapters.map((title, idx) => `
    <li class="drawer-item ${idx === activeChapter ? "active" : ""}" data-chapter="${idx}">
      <span class="drawer-num">${String(idx + 1).padStart(2, "0")}</span>
      <span class="drawer-title">${title}</span>
      <span class="drawer-heart">♥</span>
    </li>
  `).join("");

  drawerList.querySelectorAll(".drawer-item").forEach((el) => {
    el.addEventListener("click", () => {
      const targetChapter = Number(el.dataset.chapter);
      const firstSceneIdx = scenes.findIndex((s) => s.chapterIndex === targetChapter);
      if (firstSceneIdx !== -1) {
        goToScene(firstSceneIdx);
      }
      drawerOverlay.classList.remove("open");
    });
  });
}

function renderStage() {
  stage.innerHTML = scenes[sceneIndex].render();
  backBtn.classList.toggle("hidden", sceneIndex === 0);

  const isLast = sceneIndex === scenes.length - 1;
  continueBtn.innerHTML = isLast ? "REPLAY ↻" : "CONTINUE →";

  moveHeartForScene(sceneIndex);
  renderDrawer();

  const rsvpForm = document.getElementById("rsvpForm");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("guestName").value.trim();
      const count = document.getElementById("guestCount").value;
      localStorage.setItem("custom_invite_rsvp", JSON.stringify({ name, count }));
      document.getElementById("rsvpMsg").textContent = `RSVP noted for ${name} (${count} guest${count > 1 ? "s" : ""}).`;
      rsvpForm.reset();
    });
  }

  const blessingForm = document.getElementById("blessingForm");
  if (blessingForm) {
    blessingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const sender = document.getElementById("senderName").value.trim();
      const wish = document.getElementById("wishText").value.trim();
      const updated = [{ quote: wish, author: sender.toUpperCase(), relation: "Well-Wisher" }, ...getAllBlessings()];
      localStorage.setItem("custom_invite_blessings", JSON.stringify(updated));
      document.getElementById("blessingMsg").textContent = "Thank you! Your blessing has been saved.";
      blessingForm.reset();
    });
  }

  const prevWish = document.getElementById("prevWish");
  const nextWish = document.getElementById("nextWish");
  if (prevWish && nextWish) {
    const total = getAllBlessings().length;
    prevWish.addEventListener("click", () => {
      blessingIdx = (blessingIdx - 1 + total) % total;
      renderStage();
    });
    nextWish.addEventListener("click", () => {
      blessingIdx = (blessingIdx + 1) % total;
      renderStage();
    });
  }
}

function startMusicOnce() {
  if (!bgMusic || musicStarted) return;
  bgMusic.play().then(() => {
    musicStarted = true;
    musicToggle.classList.add("playing");
  }).catch(() => {});
}

function goToScene(idx) {
  sceneIndex = ((idx % scenes.length) + scenes.length) % scenes.length;
  renderStage();
  startMusicOnce();
}

continueBtn.addEventListener("click", () => {
  if (sceneIndex === scenes.length - 1) {
    goToScene(0);
  } else {
    goToScene(sceneIndex + 1);
  }
});

backBtn.addEventListener("click", () => {
  if (sceneIndex > 0) {
    goToScene(sceneIndex - 1);
  }
});

menuToggle.addEventListener("click", () => {
  drawerOverlay.classList.add("open");
});

drawerClose.addEventListener("click", () => {
  drawerOverlay.classList.remove("open");
});

drawerOverlay.addEventListener("click", (e) => {
  if (e.target === drawerOverlay) {
    drawerOverlay.classList.remove("open");
  }
});

musicToggle.addEventListener("click", () => {
  if (!bgMusic) return;
  if (bgMusic.paused) {
    bgMusic.play().then(() => {
      musicStarted = true;
      musicToggle.classList.add("playing");
    }).catch(() => {});
  } else {
    bgMusic.pause();
    musicToggle.classList.remove("playing");
  }
});

renderStage();
