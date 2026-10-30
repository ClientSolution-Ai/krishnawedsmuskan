/**
 * ROYAL INDIAN WEDDING INVITATION - MASTER JAVASCRIPT
 * Features:
 * 1. 3D Royal Palace Double Doors opening on click
 * 2. Pure single-screen scrollable layout (no tab buttons / pure continuous scroll)
 * 3. Floating Rose Petals & Golden Sparkle Particles Canvas
 * 4. Live Countdown to Auspicious Muhurat (25 Nov 2026)
 * 5. Classical Shehnai / Raag Yaman Synthesizer
 * 6. Interactive In-Screen RSVP Form & Live Blessings Guestbook Wall
 * 7. In-Screen Photo Gallery Lightbox Preview
 */

document.addEventListener("DOMContentLoaded", () => {
  initPetalsCanvas();
  initRoyalDoorsExperience();
  initCountdownTimer();
  initAudioSystem();
  initRSVPAndWishes();
  initGalleryLightbox();
  initScrollAnimations();
  initClickSparkles();
  initCardTilt3D();
});

/* ==========================================================================
   1. FLOATING ROSE PETALS & GOLDEN PARTICLES CANVAS
   ========================================================================== */
function initPetalsCanvas() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const maxPetals = window.innerWidth < 768 ? 20 : 35;

  const petalTypes = [
    { type: "rose", color: "rgba(190, 20, 55, ", size: 12 },
    { type: "marigold", color: "rgba(235, 165, 30, ", size: 10 },
    { type: "sparkle", color: "rgba(249, 228, 150, ", size: 4.5 }
  ];

  for (let i = 0; i < maxPetals; i++) {
    petals.push(createPetal(true));
  }

  function createPetal(randomY = false) {
    const template = petalTypes[Math.floor(Math.random() * petalTypes.length)];
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -20,
      size: template.size + Math.random() * 5,
      speedY: 0.7 + Math.random() * 1.2,
      speedX: -0.4 + Math.random() * 0.8,
      rotation: Math.random() * 360,
      rotSpeed: -1.2 + Math.random() * 2.4,
      opacity: 0.35 + Math.random() * 0.45,
      type: template.type,
      color: template.color,
      sway: Math.random() * 0.03,
      swayCounter: Math.random() * Math.PI * 2
    };
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.swayCounter += p.sway;
      p.x += Math.sin(p.swayCounter) * 1.1 + p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.type === "rose") {
        ctx.beginPath();
        ctx.fillStyle = p.color + p.opacity + ")";
        ctx.ellipse(0, 0, p.size * 0.7, p.size * 1.1, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === "marigold") {
        ctx.beginPath();
        ctx.fillStyle = p.color + p.opacity + ")";
        ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.fillStyle = p.color + p.opacity + ")";
        ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
        ctx.shadowColor = "rgba(255, 230, 120, 0.7)";
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      ctx.restore();

      if (p.y > height + 25 || p.x < -25 || p.x > width + 25) {
        petals[i] = createPetal(false);
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. ROYAL PALACE DOORS OPENING EXPERIENCE
   ========================================================================== */
function initRoyalDoorsExperience() {
  const doorsScreen = document.getElementById("royal-doors-screen");
  const doorsContainer = document.getElementById("doors-container");
  const openDoorsBtn = document.getElementById("open-doors-btn");
  const royalSeal = document.getElementById("royal-door-seal");

  if (!doorsScreen) return;

  function handleOpenDoors() {
    if (doorsScreen.classList.contains("opening") || doorsScreen.classList.contains("opened")) return;

    doorsScreen.classList.add("opening");

    // Play royal temple chimes & start Shehnai music
    playRoyalChime();
    startBackgroundMusic();

    // After door swing animation, unveil the single-screen website
    setTimeout(() => {
      doorsScreen.classList.add("opened");
    }, 1400);
  }

  if (doorsContainer) doorsContainer.addEventListener("click", handleOpenDoors);
  if (openDoorsBtn) openDoorsBtn.addEventListener("click", handleOpenDoors);
  if (royalSeal) royalSeal.addEventListener("click", handleOpenDoors);
}

/* ==========================================================================
   3. DYNAMIC COUNTDOWN TIMER
   ========================================================================== */
function initCountdownTimer() {
  const daysEl = document.getElementById("count-days");
  const hoursEl = document.getElementById("count-hours");
  const minsEl = document.getElementById("count-mins");
  const secsEl = document.getElementById("count-secs");

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const targetDateStr = (typeof WEDDING_CONFIG !== "undefined" && WEDDING_CONFIG.weddingDate?.targetIso)
    ? WEDDING_CONFIG.weddingDate.targetIso
    : "2026-11-25T19:00:00+05:30";
  const targetTime = new Date(targetDateStr).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetTime - now;

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const newDays = String(days).padStart(2, "0");
    const newHours = String(hours).padStart(2, "0");
    const newMins = String(mins).padStart(2, "0");
    const newSecs = String(secs).padStart(2, "0");

    if (daysEl.textContent !== newDays) {
      daysEl.textContent = newDays;
      daysEl.classList.add("digit-pulse");
      setTimeout(() => daysEl.classList.remove("digit-pulse"), 300);
    }
    if (hoursEl.textContent !== newHours) {
      hoursEl.textContent = newHours;
      hoursEl.classList.add("digit-pulse");
      setTimeout(() => hoursEl.classList.remove("digit-pulse"), 300);
    }
    if (minsEl.textContent !== newMins) {
      minsEl.textContent = newMins;
      minsEl.classList.add("digit-pulse");
      setTimeout(() => minsEl.classList.remove("digit-pulse"), 300);
    }
    if (secsEl.textContent !== newSecs) {
      secsEl.textContent = newSecs;
      secsEl.classList.add("digit-pulse");
      setTimeout(() => secsEl.classList.remove("digit-pulse"), 300);
    }
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   4. ROYAL AUDIO SYSTEM (CUSTOM MP3 / SHEHNAI RAAG SYNTHESIZER)
   ========================================================================== */
let audioCtx = null;
let isMusicPlaying = false;
let synthTimer = null;
let bgAudioElement = null;

function updateMusicButtonUI(playing) {
  const musicBtn = document.getElementById("floating-music-btn");
  const musicIcon = document.getElementById("music-play-pause-icon");
  const musicText = document.getElementById("music-pill-text");
  const musicConfig = (typeof WEDDING_CONFIG !== "undefined" && WEDDING_CONFIG.music) ? WEDDING_CONFIG.music : {};

  if (musicBtn) {
    if (playing) {
      musicBtn.classList.add("playing");
      musicBtn.setAttribute("title", "Pause Music");
      musicBtn.setAttribute("aria-label", "Pause Music");
    } else {
      musicBtn.classList.remove("playing");
      musicBtn.setAttribute("title", "Play Music");
      musicBtn.setAttribute("aria-label", "Play Music");
    }
  }

  if (musicIcon) {
    if (playing) {
      musicIcon.className = "fa-solid fa-pause";
    } else {
      musicIcon.className = "fa-solid fa-play";
    }
  }

  if (musicText) {
    musicText.textContent = playing
      ? (musicConfig.playingTitle || "Pause Music")
      : (musicConfig.title || "Play Music");
  }
}

function initAudioSystem() {
  const musicBtn = document.getElementById("floating-music-btn");
  if (!musicBtn) return;

  const musicConfig = (typeof WEDDING_CONFIG !== "undefined" && WEDDING_CONFIG.music) ? WEDDING_CONFIG.music : {};
  updateMusicButtonUI(false);

  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isMusicPlaying) {
      pauseBackgroundMusic();
    } else {
      startBackgroundMusic();
    }
  });
}

function startBackgroundMusic() {
  if (isMusicPlaying) return;

  const musicConfig = (typeof WEDDING_CONFIG !== "undefined" && WEDDING_CONFIG.music) ? WEDDING_CONFIG.music : {};

  // If a custom MP3/Audio file URL is configured
  if (musicConfig.audioUrl && musicConfig.audioUrl.trim() !== "") {
    try {
      if (!bgAudioElement) {
        bgAudioElement = new Audio(musicConfig.audioUrl.trim());
        bgAudioElement.loop = musicConfig.loop !== false;
        bgAudioElement.volume = musicConfig.volume !== undefined ? musicConfig.volume : 0.8;
        bgAudioElement.addEventListener("ended", () => {
          if (!bgAudioElement.loop) {
            pauseBackgroundMusic();
          }
        });
      }

      const playPromise = bgAudioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isMusicPlaying = true;
            updateMusicButtonUI(true);
          })
          .catch((err) => {
            console.warn("Custom audio playback failed, falling back to Shehnai synth:", err);
            playSynthesizedShehnai();
          });
      } else {
        isMusicPlaying = true;
        updateMusicButtonUI(true);
      }
      return;
    } catch (e) {
      console.warn("Error initiating custom audio:", e);
    }
  }

  // Fallback: Synthesized Royal Shehnai
  playSynthesizedShehnai();
}

function playSynthesizedShehnai() {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    isMusicPlaying = true;
    updateMusicButtonUI(true);

    playRaagYamanLoop();
  } catch (err) {
    console.warn("Audio playback error:", err);
  }
}

function pauseBackgroundMusic() {
  isMusicPlaying = false;
  if (bgAudioElement) {
    try {
      bgAudioElement.pause();
    } catch (e) { }
  }
  if (synthTimer) {
    clearTimeout(synthTimer);
    synthTimer = null;
  }
  if (audioCtx && audioCtx.state === "running") {
    try {
      audioCtx.suspend();
    } catch (e) { }
  }
  updateMusicButtonUI(false);
}

function playRoyalChime() {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.12);
      gain.gain.setValueAtTime(0.18, audioCtx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.12 + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + idx * 0.12);
      osc.stop(audioCtx.currentTime + idx * 0.12 + 0.8);
    });
  } catch (e) { }
}

function playRaagYamanLoop() {
  if (!audioCtx || !isMusicPlaying) return;

  const scale = [293.66, 329.63, 369.99, 415.30, 440.00, 493.88, 554.37, 587.33];
  const pattern = [
    { note: 0, dur: 1.4, amp: 0.08 },
    { note: 1, dur: 1.2, amp: 0.10 },
    { note: 2, dur: 1.6, amp: 0.12 },
    { note: 4, dur: 1.4, amp: 0.11 },
    { note: 6, dur: 1.2, amp: 0.10 },
    { note: 7, dur: 2.2, amp: 0.14 },
    { note: 6, dur: 1.0, amp: 0.10 },
    { note: 5, dur: 1.2, amp: 0.09 },
    { note: 4, dur: 1.5, amp: 0.10 },
    { note: 2, dur: 1.4, amp: 0.11 },
    { note: 1, dur: 1.2, amp: 0.09 },
    { note: 0, dur: 2.5, amp: 0.11 }
  ];

  let step = 0;
  function triggerNextNote() {
    if (!isMusicPlaying || !audioCtx) return;

    const item = pattern[step % pattern.length];
    const freq = scale[item.note];

    if (step % 4 === 0) {
      playTanpuraDrone();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(item.amp, audioCtx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + item.dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + item.dur);

    step++;
    synthTimer = setTimeout(triggerNextNote, item.dur * 1000 * 0.85);
  }

  triggerNextNote();
}

function playTanpuraDrone() {
  if (!audioCtx || !isMusicPlaying) return;
  const droneFreqs = [146.83, 220.00];
  droneFreqs.forEach(freq => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.025, audioCtx.currentTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 4.0);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 4.0);
  });
}

/* ==========================================================================
   5. IN-SCREEN RSVP FORM & BLESSINGS WALL
   ========================================================================== */
function initRSVPAndWishes() {
  const rsvpForm = document.getElementById("rsvp-form");
  const wishesList = document.getElementById("wishes-scroll-box");
  const wishesCount = document.getElementById("wishes-count");
  const statusAlert = document.getElementById("rsvp-status-alert");
  const optionPills = document.querySelectorAll(".option-pill");

  // Attendance Pills Toggle
  optionPills.forEach(pill => {
    pill.addEventListener("click", () => {
      optionPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const radio = pill.querySelector("input");
      if (radio) radio.checked = true;
    });
  });

  // Default Initial Wishes
  const defaultWishes = [
    {
      name: "Smt. Kalyani Bid & Shri Sukumar Bid",
      message: "May God shower infinite blessings, joyous health, and eternal companionship on Krishna & Muskan.",
      time: "Family Blessing"
    },
    {
      name: "Smt. Annu & Shri Uday Shankar Prasad",
      message: "Dearest Muskan & Krishna, walking together in love and harmony, may your life be filled with laughter and prosperity.",
      time: "Family Blessing"
    },
    {
      name: "Rohan & Meera Singhania",
      message: "Can't wait to dance at the Sangeet! Heartiest congratulations bhaiya & bhabhi!",
      time: "3 hours ago"
    },
    {
      name: "Aditya Prasad",
      message: "Wishing dearest di & jiju the most magical royal wedding and endless happiness together!",
      time: "5 hours ago"
    }
  ];

  let savedWishes = [];
  try {
    savedWishes = JSON.parse(localStorage.getItem("km_scroll_wishes") || "[]");
  } catch (e) {
    savedWishes = [];
  }

  function renderWishes() {
    if (!wishesList) return;
    const all = [...savedWishes, ...defaultWishes];
    if (wishesCount) wishesCount.textContent = all.length;
    wishesList.innerHTML = "";

    all.forEach(w => {
      const item = document.createElement("div");
      item.className = "wish-item";
      item.innerHTML = `
        <div class="wish-header">
          <span class="wish-author"><i class="fa-solid fa-feather-pointed" style="color: var(--gold-300); font-size: 0.7rem;"></i> ${escapeHTML(w.name)}</span>
          <span class="wish-time">${escapeHTML(w.time || "Just now")}</span>
        </div>
        <p class="wish-text">“${escapeHTML(w.message)}”</p>
      `;
      wishesList.appendChild(item);
    });
  }

  renderWishes();

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("guest-name")?.value.trim();
      const phone = document.getElementById("guest-phone")?.value.trim() || "";
      const count = document.getElementById("guest-count")?.value || "2";
      const attending = document.querySelector('input[name="attending"]:checked')?.value || "Yes";
      const message = document.getElementById("guest-message")?.value.trim();

      if (!name) return;

      const newWish = {
        name: name,
        attending: attending,
        guestCount: count,
        phone: phone,
        message: message || (attending === "Yes" ? "Joyfully looking forward to celebrating your sacred wedding!" : "Warmest blessings and congratulations on your royal wedding!"),
        time: "Just now"
      };

      savedWishes.unshift(newWish);
      try {
        localStorage.setItem("km_scroll_wishes", JSON.stringify(savedWishes));
      } catch (err) { }

      renderWishes();

      if (statusAlert) {
        statusAlert.style.display = "block";
        statusAlert.style.background = "rgba(45, 127, 94, 0.25)";
        statusAlert.style.border = "1px solid #2D7F5E";
        statusAlert.style.color = "#86efac";
        statusAlert.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${escapeHTML(name)}</strong>! Your RSVP &amp; blessing have been recorded.`;
      }

      showToast("✨ RSVP and blessing posted successfully!");
      rsvpForm.reset();
      optionPills.forEach(p => p.classList.remove("active"));
      if (optionPills[0]) optionPills[0].classList.add("active");
    });
  }

  // Quick Emoji Blessing Reactions
  const emojiButtons = document.querySelectorAll(".quick-blessing-btn");
  emojiButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const emoji = btn.getAttribute("data-emoji") || "❤️";

      // Spawn floating flying emojis from button position
      const rect = btn.getBoundingClientRect();
      const count = 4;
      for (let i = 0; i < count; i++) {
        const floatEl = document.createElement("div");
        floatEl.className = "floating-flying-emoji";
        floatEl.textContent = emoji;
        floatEl.style.left = (rect.left + rect.width / 2) + "px";
        floatEl.style.top = rect.top + "px";

        const rx = (Math.random() * 120 - 60) + "px";
        const rot = (Math.random() * 40 - 20) + "deg";
        floatEl.style.setProperty("--rx", rx);
        floatEl.style.setProperty("--rot", rot);

        document.body.appendChild(floatEl);

        setTimeout(() => {
          if (floatEl.parentNode) floatEl.parentNode.removeChild(floatEl);
        }, 1600);
      }

      // Quick message mappings
      const msgMap = {
        "❤️": "Wishing Krishna & Muskan a lifetime filled with immense love and boundless joy! ❤️",
        "🪔": "May the divine blessings of God forever illuminate your path of holy matrimony! 🪔",
        "🌸": "Showering sacred marigolds & endless heartfelt congratulations on the royal couple! 🌸",
        "✨": "Radiant congratulations! May your married life sparkle with eternal happiness! ✨",
        "🙏": "Warmest regards, heartfelt prayers and Namaste to both noble families! 🙏"
      };

      const quickWish = {
        name: "Honored Guest",
        message: msgMap[emoji] || `Heartiest blessings and congratulations! ${emoji}`,
        time: "Just now"
      };

      savedWishes.unshift(quickWish);
      try {
        localStorage.setItem("km_scroll_wishes", JSON.stringify(savedWishes));
      } catch (err) { }

      renderWishes();
      showToast(`${emoji} Instant blessing sent to Krishna & Muskan!`);
    });
  });
}

/* ==========================================================================
   6. IN-SCREEN PHOTO GALLERY LIGHTBOX ZOOM
   ========================================================================== */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("inscreen-lightbox");
  const lightboxImg = document.getElementById("lightbox-img-view");
  const lightboxCap = document.getElementById("lightbox-caption-text");
  const closeBtn = document.getElementById("close-lightbox-btn");
  const overlayBg = document.querySelector(".lightbox-overlay-bg");

  if (!lightbox || !lightboxImg) return;

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const src = item.getAttribute("data-img");
      const cap = item.getAttribute("data-cap");
      lightboxImg.src = src;
      lightboxCap.innerHTML = cap || "Krishna &amp; Muskan Wedding Photo";
      lightbox.classList.add("active");
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
  }

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (overlayBg) overlayBg.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

// In-Screen Toast Alert
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast-notification");
  const toastMsg = document.getElementById("toast-message");
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add("show");

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ==========================================================================
   7. INTERACTIVE SCROLL REVEALS & MICRO-ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const scrollCard = document.querySelector(".royal-scroll-card");
  const reveals = document.querySelectorAll(".reveal-init");
  if (!reveals.length) return;

  if ("IntersectionObserver" in window && scrollCard) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        root: scrollCard,
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    reveals.forEach((el) => observer.observe(el));
  } else {
    // Fallback if observer not supported
    reveals.forEach((el) => el.classList.add("in-view"));
  }
}

/* ==========================================================================
   8. INTERACTIVE GOLDEN CLICK SPARKLES
   ========================================================================== */
function initClickSparkles() {
  const sparkleSymbols = ["✨", "✦", "★", "🪔", "🌸"];

  document.addEventListener("pointerdown", (e) => {
    // Avoid creating sparkles when clicking input controls or buttons if not desired
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") return;

    const count = 6;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "sparkle-burst-particle";
      p.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
      p.style.left = e.clientX + "px";
      p.style.top = e.clientY + "px";

      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
      const distance = 30 + Math.random() * 45;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const rot = (Math.random() * 360 - 180) + "deg";

      p.style.setProperty("--dx", dx + "px");
      p.style.setProperty("--dy", dy + "px");
      p.style.setProperty("--rot", rot);

      document.body.appendChild(p);

      setTimeout(() => {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 900);
    }
  });
}

/* ==========================================================================
   9. INTERACTIVE 3D PERSPECTIVE TILT ON CEREMONY CARDS
   ========================================================================== */
function initCardTilt3D() {
  const cards = document.querySelectorAll(".ceremony-card, .story-event-card, .timeline-story-card, .family-pillar-card, .family-invitation-quote-banner, .vow-card, .highlight-card, .faq-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.015)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}
