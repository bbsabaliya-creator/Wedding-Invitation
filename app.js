const pages = [
  { num: "01", title: "Welcome", sub: "Together With Their Families", body: "Aarav & Meera invite you to celebrate their wedding." },
  { num: "02", title: "Save the Date", sub: "Mark Your Calendar", body: "14th & 15th December 2026 • Udaipur" },
  { num: "03", title: "Our Story", sub: "How It Began", body: "Two cups of filter coffee, a delayed flight, and five years of love." },
  { num: "04", title: "With Families", sub: "Blessings Of", body: "Mrs. Sunita & Mr. Rajesh Sharma & Mrs. Kavita & Mr. Vikram Mehta" },
  { num: "05", title: "The Ceremonies", sub: "Wedding Schedule", body: "Mehendi & Sangeet: Dec 14, 4 PM • Pheras & Reception: Dec 15, 6:30 PM" },
  { num: "06", title: "Our Keepsake", sub: "Favorite Moments", body: "Snapshots from our journey.", photos: ["photos/photo-1.jpg", "photos/photo-2.jpg"] },
  { num: "07", title: "Where Forever Begins", sub: "The Venue", body: "The Oberoi Udaivilas, Udaipur", venuePhoto: "photos/venue.jpg", mapsUrl: "https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur" },
  { num: "08", title: "Will You Join Us", sub: "RSVP", body: "Let us know if you'll be joining us.", type: "rsvp" },
  { num: "09", title: "Leave a Blessing", sub: "Guestbook", body: "Share a warm wish for the couple.", type: "blessing-form" },
  { num: "10", title: "Warm Blessings", sub: "Notes From Loved Ones", body: "Wishes from family and friends.", type: "blessings-list" },
  { num: "11", title: "Thank You", sub: "With Love", body: "Thank you for being part of our celebration." }
];

const defaultBlessings = [
  { name: "The Sharma Family", text: "Wishing you both a lifetime of love and joy." },
  { name: "Rohan & Ananya", text: "Can't wait to celebrate with you!" }
];

let currentIndex = 0;
let waveProgress = 0;
let animFrameId = null;
let musicStarted = false;

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const menuToggle = document.getElementById("menuToggle");
const quickMenu = document.getElementById("quickMenu");
const allPagesList = document.getElementById("allPagesList");
const activeDetailCard = document.getElementById("activeDetailCard");
const continueBtn = document.getElementById("continueBtn");
const waveGuidePath = document.getElementById("waveGuidePath");
const waveActivePath = document.getElementById("waveActivePath");
const sineHeart = document.getElementById("sineHeart");

// Sine + Cosine combined curve point for t in [0, 1]
function getWavePoint(t) {
  const width = 340;
  const centerY = 35;
  const amp = 20;
  const x = t * width;
  // Blend of sine and cosine waves across the journey
  const y = centerY - amp * (0.75 * Math.sin(t * Math.PI * 3) + 0.25 * Math.cos(t * Math.PI * 3));
  return { x, y };
}

function buildWavePath(maxT) {
  const steps = 120;
  const limit = Math.max(1, Math.floor(steps * maxT));
  let d = "";
  for (let i = 0; i <= limit; i++) {
    const t = i / steps;
    const pt = getWavePoint(t);
    d += (i === 0 ? "M " : " L ") + `${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
  }
  return d;
}

function positionHeartAt(t) {
  const stage = document.getElementById("waveStage");
  const pt = getWavePoint(t);
  const padX = 24;
  const usableWidth = Math.max(100, stage.clientWidth - padX * 2);
  const px = padX + t * usableWidth;
  const py = (pt.y / 70) * stage.clientHeight;

  // Tilt heart slightly along the wave slope
  const nextPt = getWavePoint(Math.min(1, t + 0.01));
  const angleDeg = (Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * 180) / Math.PI;

  sineHeart.style.left = `${px}px`;
  sineHeart.style.top = `${py}px`;
  sineHeart.style.transform = `translate(-50%, -50%) rotate(${angleDeg.toFixed(1)}deg)`;
  waveActivePath.setAttribute("d", buildWavePath(t));
}

function animateHeartTo(targetIndex) {
  const targetT = pages.length > 1 ? targetIndex / (pages.length - 1) : 0;
  const startT = waveProgress;
  const startTime = performance.now();
  const duration = 550;

  if (animFrameId) cancelAnimationFrame(animFrameId);

  function step(now) {
    const elapsed = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    waveProgress = startT + (targetT - startT) * eased;
    positionHeartAt(waveProgress);

    if (elapsed < 1) {
      animFrameId = requestAnimationFrame(step);
    }
  }

  animFrameId = requestAnimationFrame(step);
}

function startMusicIfNeeded() {
  if (!bgMusic || musicStarted) return;
  bgMusic.play().then(() => {
    musicStarted = true;
    musicToggle.classList.add("playing");
  }).catch(() => {});
}

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

menuToggle.addEventListener("click", () => {
  quickMenu.classList.toggle("open");
});

document.getElementById("jumpStartBtn").addEventListener("click", () => {
  goToPage(0);
  quickMenu.classList.remove("open");
});

document.getElementById("jumpRsvpBtn").addEventListener("click", () => {
  goToPage(7);
  quickMenu.classList.remove("open");
});

document.getElementById("jumpBlessingBtn").addEventListener("click", () => {
  goToPage(8);
  quickMenu.classList.remove("open");
});

function getBlessings() {
  try {
    const saved = JSON.parse(localStorage.getItem("wedding_blessings") || "null");
    return Array.isArray(saved) && saved.length ? saved : defaultBlessings;
  } catch {
    return defaultBlessings;
  }
}

function saveBlessing(name, text) {
  const list = getBlessings();
  list.unshift({ name: name.trim() || "Well-Wisher", text: text.trim() });
  localStorage.setItem("wedding_blessings", JSON.stringify(list));
}

function renderAllPagesList() {
  allPagesList.innerHTML = pages.map((p, idx) => `
    <li class="page-row ${idx === currentIndex ? "active" : ""}" data-idx="${idx}">
      <span class="page-row-num">${p.num}</span>
      <span class="page-row-title">${p.title}</span>
      <span class="page-row-heart">♥</span>
    </li>
  `).join("");

  allPagesList.querySelectorAll(".page-row").forEach((row) => {
    row.addEventListener("click", () => {
      goToPage(Number(row.dataset.idx));
    });
  });
}

function renderActiveDetail() {
  const p = pages[currentIndex];
  let extra = "";

  if (Array.isArray(p.photos)) {
    extra = `<div class="photo-grid">${p.photos.map((src, i) => `<img src="${src}" alt="Photo ${i + 1}" />`).join("")}</div>`;
  }
  if (p.venuePhoto) {
    extra += `<img class="single-photo" src="${p.venuePhoto}" alt="${p.title}" />`;
    if (p.mapsUrl) {
      extra += `<a class="action-btn" href="${p.mapsUrl}" target="_blank" rel="noopener">OPEN IN MAPS</a>`;
    }
  }
  if (p.type === "rsvp") {
    extra = `
      <form class="form-stack" id="rsvpForm">
        <input class="form-input" type="text" id="rsvpName" placeholder="Your Name" required />
        <select class="form-select" id="rsvpStatus">
          <option value="Attending">Joyfully Attending</option>
          <option value="Not Attending">Unable to Attend</option>
        </select>
        <input class="form-input" type="number" id="rsvpGuests" min="1" max="10" value="2" />
        <button type="submit" class="action-btn">SUBMIT RSVP</button>
        <div class="status-msg" id="rsvpMsg"></div>
      </form>
    `;
  }
  if (p.type === "blessing-form") {
    extra = `
      <form class="form-stack" id="blessingForm">
        <input class="form-input" type="text" id="blessingName" placeholder="Your Name" required />
        <textarea class="form-textarea" id="blessingText" rows="2" placeholder="Write your wish..." required></textarea>
        <button type="submit" class="action-btn">POST BLESSING</button>
        <div class="status-msg" id="blessingMsg"></div>
      </form>
    `;
  }
  if (p.type === "blessings-list") {
    const items = getBlessings();
    extra = `
      <div class="blessings-feed">
        ${items.map((b) => `<div class="blessing-item">“${b.text}”<span class="blessing-author">— ${b.name}</span></div>`).join("")}
      </div>
    `;
  }

  activeDetailCard.innerHTML = `
    <div class="detail-sub">${p.num} • ${p.sub}</div>
    <h1 class="detail-title">${p.title}</h1>
    <p class="detail-body">${p.body}</p>
    ${extra}
  `;

  const rsvpForm = document.getElementById("rsvpForm");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("rsvpName").value.trim();
      const status = document.getElementById("rsvpStatus").value;
      const guests = document.getElementById("rsvpGuests").value;
      localStorage.setItem("wedding_rsvp_last", JSON.stringify({ name, status, guests }));
      document.getElementById("rsvpMsg").textContent = `Saved RSVP for ${name} (${guests}).`;
      rsvpForm.reset();
    });
  }

  const blessingForm = document.getElementById("blessingForm");
  if (blessingForm) {
    blessingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      saveBlessing(document.getElementById("blessingName").value, document.getElementById("blessingText").value);
      document.getElementById("blessingMsg").textContent = "Blessing added!";
      blessingForm.reset();
    });
  }
}

function goToPage(index) {
  currentIndex = ((index % pages.length) + pages.length) % pages.length;
  renderAllPagesList();
  renderActiveDetail();
  animateHeartTo(currentIndex);
  startMusicIfNeeded();
}

continueBtn.addEventListener("click", () => {
  goToPage(currentIndex + 1);
});

window.addEventListener("resize", () => positionHeartAt(waveProgress));

waveGuidePath.setAttribute("d", buildWavePath(1));
renderAllPagesList();
renderActiveDetail();
positionHeartAt(0);
