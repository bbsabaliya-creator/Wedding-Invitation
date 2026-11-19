const chapters = [
  {
    num: "01",
    title: "Welcome",
    subtitle: "TOGETHER WITH THEIR FAMILIES",
    body: "Aarav & Meera invite you to share in the joy of their wedding celebration."
  },
  {
    num: "02",
    title: "Save the Date",
    subtitle: "MARK YOUR CALENDAR",
    body: "14th & 15th December 2026<br>Udaipur, Rajasthan"
  },
  {
    num: "03",
    title: "Our Story",
    subtitle: "HOW IT BEGAN",
    body: "Two cups of filter coffee, a delayed flight in Mumbai, and five years of shared laughter led us here."
  },
  {
    num: "04",
    title: "With Families",
    subtitle: "WITH THE BLESSINGS OF",
    body: "Mrs. Sunita & Mr. Rajesh Sharma<br>&amp;<br>Mrs. Kavita & Mr. Vikram Mehta"
  },
  {
    num: "05",
    title: "The Ceremonies",
    subtitle: "WEDDING SCHEDULE",
    body: "<strong>Mehendi &amp; Sangeet:</strong> Dec 14, 4:00 PM<br><strong>Pheras &amp; Reception:</strong> Dec 15, 6:30 PM"
  },
  {
    num: "06",
    title: "Our Keepsake",
    subtitle: "FAVORITE MOMENTS",
    body: "A few snapshots from our journey together.",
    photos: ["photos/photo-1.jpg", "photos/photo-2.jpg"]
  },
  {
    num: "07",
    title: "Where Forever Begins",
    subtitle: "THE VENUE",
    body: "The Oberoi Udaivilas, Udaipur",
    venuePhoto: "photos/venue.jpg",
    mapsUrl: "https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur"
  },
  {
    num: "08",
    title: "Will You Join Us",
    subtitle: "RSVP",
    body: "Kindly let us know if you can celebrate with us.",
    type: "rsvp"
  },
  {
    num: "09",
    title: "Leave a Blessing",
    subtitle: "GUESTBOOK",
    body: "Write a note or prayer for the couple.",
    type: "blessing-form"
  },
  {
    num: "10",
    title: "Warm Blessings",
    subtitle: "NOTES FROM LOVED ONES",
    body: "Words of love gathered from family and friends.",
    type: "blessings-list"
  },
  {
    num: "11",
    title: "Thank You",
    subtitle: "WITH LOVE",
    body: "Thank you for being part of our story and our special day."
  }
];

const defaultBlessings = [
  { name: "The Sharma Family", text: "Wishing you both a lifetime of happiness, health, and togetherness." },
  { name: "Rohan & Ananya", text: "So thrilled for the two of you—can't wait to dance at the sangeet!" }
];

let currentIndex = 0;
let musicStarted = false;

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const menuToggle = document.getElementById("menuToggle");
const overlay = document.getElementById("journeyOverlay");
const chapterList = document.getElementById("chapterList");
const slideContent = document.getElementById("slideContent");
const continueBtn = document.getElementById("continueBtn");

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

function startMusicIfNeeded() {
  if (!bgMusic || musicStarted) return;
  bgMusic.play().then(() => {
    musicStarted = true;
    musicToggle.classList.add("playing");
  }).catch(() => {
    // Browser blocked autoplay or file is missing; user can click the music button
  });
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

function renderChapterList() {
  chapterList.innerHTML = chapters.map((ch, idx) => `
    <li class="chapter-item ${idx === currentIndex ? "active" : ""}" data-index="${idx}">
      <span class="chapter-num">${ch.num}</span>
      <span class="chapter-name">${ch.title}</span>
      <span class="chapter-heart">&#9829;</span>
    </li>
  `).join("");

  chapterList.querySelectorAll(".chapter-item").forEach((el) => {
    el.addEventListener("click", () => {
      currentIndex = Number(el.dataset.index);
      renderSlide();
      setDrawerOpen(false);
      startMusicIfNeeded();
    });
  });
}

function renderSlide() {
  const ch = chapters[currentIndex];
  let extra = "";

  if (Array.isArray(ch.photos)) {
    extra = `
      <div class="photo-grid">
        ${ch.photos.map((src, i) => `<img src="${src}" alt="${ch.title} photo ${i + 1}" />`).join("")}
      </div>
    `;
  }

  if (ch.venuePhoto) {
    extra += `<img class="single-photo" src="${ch.venuePhoto}" alt="${ch.title}" />`;
    if (ch.mapsUrl) {
      extra += `<a class="action-btn" style="display:inline-block;margin-top:12px;text-decoration:none;" href="${ch.mapsUrl}" target="_blank" rel="noopener">OPEN IN MAPS</a>`;
    }
  }

  if (ch.type === "rsvp") {
    extra = `
      <form class="form-stack" id="rsvpForm">
        <input class="form-input" type="text" id="rsvpName" placeholder="Your Full Name" required />
        <select class="form-select" id="rsvpStatus">
          <option value="Joyfully Attending">Joyfully Attending</option>
          <option value="Regretfully Unable to Attend">Regretfully Unable to Attend</option>
        </select>
        <input class="form-input" type="number" id="rsvpGuests" min="1" max="10" value="2" placeholder="Number of Guests" />
        <button type="submit" class="action-btn">SUBMIT RSVP</button>
        <div class="status-msg" id="rsvpStatusMsg"></div>
      </form>
    `;
  }

  if (ch.type === "blessing-form") {
    extra = `
      <form class="form-stack" id="blessingForm">
        <input class="form-input" type="text" id="blessingName" placeholder="Your Name" required />
        <textarea class="form-textarea" id="blessingText" rows="3" placeholder="Write your blessing..." required></textarea>
        <button type="submit" class="action-btn">POST BLESSING</button>
        <div class="status-msg" id="blessingStatusMsg"></div>
      </form>
    `;
  }

  if (ch.type === "blessings-list") {
    const items = getBlessings();
    extra = `
      <div class="blessings-feed">
        ${items.map((b) => `
          <div class="blessing-item">
            <span>&ldquo;${b.text}&rdquo;</span>
            <span class="blessing-author">&mdash; ${b.name}</span>
          </div>
        `).join("")}
      </div>
    `;
  }

  slideContent.innerHTML = `
    <div class="slide-subtitle">${ch.subtitle}</div>
    <h1 class="slide-title">${ch.title}</h1>
    <p class="slide-body">${ch.body}</p>
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
      document.getElementById("rsvpStatusMsg").textContent = `Saved RSVP for ${name} (${guests} guest${guests > 1 ? "s" : ""}).`;
      rsvpForm.reset();
    });
  }

  const blessingForm = document.getElementById("blessingForm");
  if (blessingForm) {
    blessingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("blessingName").value;
      const text = document.getElementById("blessingText").value;
      saveBlessing(name, text);
      document.getElementById("blessingStatusMsg").textContent = "Blessing added to Warm Blessings!";
      blessingForm.reset();
    });
  }

  renderChapterList();
}

function setDrawerOpen(open) {
  overlay.classList.toggle("open", open);
  menuToggle.textContent = open ? "✕" : "☰";
}

menuToggle.addEventListener("click", () => {
  setDrawerOpen(!overlay.classList.contains("open"));
});

continueBtn.addEventListener("click", () => {
  startMusicIfNeeded();
  if (overlay.classList.contains("open")) {
    setDrawerOpen(false);
  } else {
    currentIndex = (currentIndex + 1) % chapters.length;
    renderSlide();
  }
});

renderSlide();
