/**
 * ROYAL INDIAN WEDDING INVITATION - HOME SCREEN JAVASCRIPT
 * Handles Floating Rose Petals Canvas & Robust Audio Play/Pause System
 */

document.addEventListener("DOMContentLoaded", () => {
  initPetalsCanvas();
  initHomeAudioSystem();
  initHomeCountdownTimer();
  initHomeScrollStory();
  initHomeLanguageSystem();
  initHomeMediaModal();
  initEventsCardsSystem();
});

/* ==========================================================================
   SCROLL-DRIVEN STORYTELLING UNVEIL ENGINE
   Progression Phases:
   0.00 - 0.25: Sacred Background & Ganpati Reveal
   0.20 - 0.45: Groom and Bride Details Unveil
   0.40 - 0.65: Sacred Knot (home_center.png) Blooms in Center
   0.58 - 0.76: Auspicious Countdown Banner Appears at Bottom-Center
   0.75 - 1.00: THEN Royal Events Cards (Haldi, Mehndi, Sangeet, Barat, DINNER)
                Glides up smoothly into center stage!
   ========================================================================== */
function initHomeScrollStory() {
  const bgBackdrop = document.querySelector(".home-bg-backdrop");
  const bgVignette = document.querySelector(".home-bg-glow-vignette");
  const homeContainer = document.querySelector(".sacred-home-container");
  const ganpatiSection = document.querySelector(".sacred-home-left");
  const sacredRight = document.querySelector(".sacred-home-right");
  const groomSection = document.querySelector(".groom-details-top");
  const brideSection = document.querySelector(".bride-details-bottom");
  const knotWrapper = document.querySelector(".home-center-wrapper");
  const scrollHint = document.getElementById("scroll-unveil-hint");
  const countdownBanner = document.getElementById("home-countdown-banner");
  const eventsSection = document.getElementById("royal-events-section");

  if (!bgBackdrop || !groomSection || !brideSection || !knotWrapper) return;

  let targetProgress = 0;
  let currentProgress = 0;
  const maxScroll = 1200; // snappy refined scroll for responsive reveal
  let accumulatedScroll = 0;

  // Wheel listener
  window.addEventListener("wheel", (e) => {
    const isOverEvents = e.target.closest("#royal-events-section");
    if (isOverEvents && currentProgress >= 0.75) {
      if (e.deltaY > 0 || (e.deltaY < 0 && eventsSection.scrollTop > 5)) {
        return; // allow natural vertical scroll down inside events & Family Blessings
      }
    }

    e.preventDefault();
    accumulatedScroll += e.deltaY * 1.25;
    accumulatedScroll = Math.max(0, Math.min(maxScroll, accumulatedScroll));
    targetProgress = accumulatedScroll / maxScroll;
  }, { passive: false });

  // Touch listener for mobile & tablets
  let touchStartY = 0;
  window.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) {
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    const isOverEvents = e.target.closest("#royal-events-section");
    if (isOverEvents && currentProgress >= 0.75) {
      if (eventsSection.scrollTop > 5) {
        return; // allow natural vertical scrolling inside events & family blessings
      }
    }

    if (e.touches.length > 0) {
      const touchCurrentY = e.touches[0].clientY;
      const deltaY = (touchStartY - touchCurrentY) * 2.0;
      touchStartY = touchCurrentY;
      accumulatedScroll += deltaY;
      accumulatedScroll = Math.max(0, Math.min(maxScroll, accumulatedScroll));
      targetProgress = accumulatedScroll / maxScroll;
    }
  }, { passive: true });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (["ArrowDown", "PageDown", " "].includes(e.key)) {
      accumulatedScroll = Math.min(maxScroll, accumulatedScroll + 350);
      targetProgress = accumulatedScroll / maxScroll;
    } else if (["ArrowUp", "PageUp"].includes(e.key)) {
      accumulatedScroll = Math.max(0, accumulatedScroll - 350);
      targetProgress = accumulatedScroll / maxScroll;
    }
  });

  // Clicking on hint instantly reveals the celebration smoothly
  if (scrollHint) {
    scrollHint.addEventListener("click", () => {
      accumulatedScroll = maxScroll;
      targetProgress = 1;
    });
  }

  function mapRange(val, inMin, inMax, outMin, outMax) {
    if (val <= inMin) return outMin;
    if (val >= inMax) return outMax;
    return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
  }

  function renderFrame() {
    currentProgress += (targetProgress - currentProgress) * 0.12;
    const isMobile = window.innerWidth <= 768;

    // 1. Background Blur & Vignette (0.04 to 0.25)
    const blurPx = mapRange(currentProgress, 0.04, 0.25, 0, 4.5);
    const brightness = mapRange(currentProgress, 0.04, 0.25, 0.94, 0.58);
    const vignetteOpacity = mapRange(currentProgress, 0.04, 0.25, 0.15, 1);

    bgBackdrop.style.filter = `blur(${blurPx.toFixed(2)}px) brightness(${brightness.toFixed(3)}) saturate(1.25) contrast(1.08)`;
    if (bgVignette) {
      bgVignette.style.opacity = vignetteOpacity.toFixed(3);
    }

    if (!isMobile) {
      /* ================================================================
         DESKTOP / WEB VIEW PROGRESSION:
         0.06 - 0.25: Ganpati fades in on left
         0.18 - 0.38: Groom details reveal
         0.30 - 0.48: Bride details reveal
         0.42 - 0.60: Sacred Knot blooms in center
         0.52 - 0.68: Countdown timer reveals at bottom center
         0.68 - 0.78: Sacred Union & Countdown dissolve gracefully to 0
         0.76 - 0.92: Royal Events Section unrolls cleanly with ZERO overlap!
         ================================================================ */
      const unionStageOpacity = currentProgress <= 0.68
        ? 1
        : mapRange(currentProgress, 0.68, 0.78, 1, 0);
      const unionStageScale = currentProgress <= 0.68
        ? 1
        : mapRange(currentProgress, 0.68, 0.78, 1, 0.94);

      if (homeContainer) {
        homeContainer.style.opacity = unionStageOpacity.toFixed(3);
        homeContainer.style.pointerEvents = unionStageOpacity < 0.05 ? "none" : "auto";
        homeContainer.style.visibility = currentProgress >= 0.78 ? "hidden" : "visible";
      }

      // Ganpati Image Reveal (0.06 to 0.25)
      if (ganpatiSection) {
        let ganpatiOpacity = mapRange(currentProgress, 0.06, 0.25, 0, 1) * unionStageOpacity;
        const ganpatiScale = mapRange(currentProgress, 0.06, 0.25, 0.92, 1.0) * unionStageScale;
        const ganpatiTranslateX = mapRange(currentProgress, 0.06, 0.25, -35, 0);
        ganpatiSection.style.opacity = ganpatiOpacity.toFixed(3);
        ganpatiSection.style.filter = "none";
        ganpatiSection.style.transform = `translateX(${ganpatiTranslateX.toFixed(1)}px) scale(${ganpatiScale.toFixed(3)})`;
      }

      // Groom Details Reveal (0.18 to 0.38)
      let groomOpacity = mapRange(currentProgress, 0.18, 0.38, 0, 1) * unionStageOpacity;
      const groomTranslateY = mapRange(currentProgress, 0.18, 0.38, -25, 0);
      groomSection.style.opacity = groomOpacity.toFixed(3);
      groomSection.style.filter = "none";
      groomSection.style.transform = `translateY(${groomTranslateY.toFixed(1)}px)`;

      // Bride Details Reveal (0.30 to 0.48)
      let brideOpacity = mapRange(currentProgress, 0.30, 0.48, 0, 1) * unionStageOpacity;
      const brideTranslateY = mapRange(currentProgress, 0.30, 0.48, 25, 0);
      brideSection.style.opacity = brideOpacity.toFixed(3);
      brideSection.style.filter = "none";
      brideSection.style.transform = `translateY(${brideTranslateY.toFixed(1)}px)`;

      // Sacred Knot home_center.png Bloom (0.42 to 0.60)
      let knotOpacity = mapRange(currentProgress, 0.42, 0.60, 0, 1) * unionStageOpacity;
      const knotScale = mapRange(currentProgress, 0.42, 0.60, 0.85, 1.0) * unionStageScale;
      knotWrapper.style.opacity = knotOpacity.toFixed(3);
      knotWrapper.style.filter = "none";
      knotWrapper.style.transform = `scale(${knotScale.toFixed(3)})`;

      if (sacredRight) {
        sacredRight.style.opacity = unionStageOpacity.toFixed(3);
        sacredRight.style.filter = "none";
      }

      // Countdown Timer Banner (0.52 to 0.68, then fades out gracefully by 0.78)
      if (countdownBanner) {
        let cdOpacity = 0;
        if (currentProgress < 0.52) {
          cdOpacity = 0;
        } else if (currentProgress <= 0.68) {
          cdOpacity = mapRange(currentProgress, 0.52, 0.68, 0, 1);
        } else {
          cdOpacity = mapRange(currentProgress, 0.68, 0.78, 1, 0);
        }
        const cdTranslateY = mapRange(currentProgress, 0.52, 0.68, 18, 0);
        countdownBanner.style.opacity = cdOpacity.toFixed(3);
        countdownBanner.style.transform = `translateX(-50%) translateY(${cdTranslateY.toFixed(1)}px)`;
        countdownBanner.style.pointerEvents = cdOpacity > 0.5 ? "auto" : "none";
        countdownBanner.style.visibility = cdOpacity <= 0 ? "hidden" : "visible";
      }

      // ROYAL EVENTS SECTION (0.76 to 0.94)
      if (eventsSection) {
        if (currentProgress < 0.74) {
          eventsSection.style.opacity = "0";
          eventsSection.style.visibility = "hidden";
          eventsSection.style.pointerEvents = "none";
          eventsSection.classList.remove("visible");
        } else {
          const evOpacity = mapRange(currentProgress, 0.74, 0.92, 0, 1);
          const evTranslateY = mapRange(currentProgress, 0.74, 0.92, 35, 0);
          eventsSection.style.opacity = evOpacity.toFixed(3);
          eventsSection.style.transform = `translateY(${evTranslateY.toFixed(1)}px)`;
          eventsSection.style.visibility = "visible";
          eventsSection.style.pointerEvents = evOpacity > 0.4 ? "auto" : "none";
          if (evOpacity > 0.1) {
            eventsSection.classList.add("visible");
          } else {
            eventsSection.classList.remove("visible");
          }
        }
      }

    } else {
      /* ================================================================
         MOBILE DEVICE PROGRESSION:
         0.06 - 0.20: Groom & Bride reveal
         0.15 - 0.30: Knot bloom & Ganpati reveal
         0.32 - 0.48: Groom, Bride, Knot fade out gracefully; Ganpati moves to center and glows
         0.48 - 0.62: Countdown timer reveals below Ganpati
         0.64 - 0.76: Ganpati & Countdown dissolve gracefully to 0
         0.76 - 0.92: Royal Events Section unrolls cleanly with ZERO overlap!
         ================================================================ */
      // 1. Groom details
      let groomOpacity = mapRange(currentProgress, 0.06, 0.20, 0, 1);
      if (currentProgress > 0.32) {
        groomOpacity = mapRange(currentProgress, 0.32, 0.48, 1, 0);
      }
      const groomTranslateY = currentProgress <= 0.32
        ? mapRange(currentProgress, 0.06, 0.20, -15, 0)
        : mapRange(currentProgress, 0.32, 0.48, 0, 20);
      groomSection.style.opacity = groomOpacity.toFixed(3);
      groomSection.style.filter = "none";
      groomSection.style.transform = `translateY(${groomTranslateY.toFixed(1)}px)`;

      // 2. Bride details
      let brideOpacity = mapRange(currentProgress, 0.08, 0.22, 0, 1);
      if (currentProgress > 0.32) {
        brideOpacity = mapRange(currentProgress, 0.32, 0.48, 1, 0);
      }
      const brideTranslateY = currentProgress <= 0.32
        ? mapRange(currentProgress, 0.08, 0.22, 15, 0)
        : mapRange(currentProgress, 0.32, 0.48, 0, 25);
      brideSection.style.opacity = brideOpacity.toFixed(3);
      brideSection.style.filter = "none";
      brideSection.style.transform = `translateY(${brideTranslateY.toFixed(1)}px)`;

      // 3. Sacred knot
      let knotOpacity = mapRange(currentProgress, 0.15, 0.30, 0, 1);
      let knotScale = mapRange(currentProgress, 0.15, 0.30, 0.88, 1.0);
      if (currentProgress > 0.32) {
        knotOpacity = mapRange(currentProgress, 0.32, 0.48, 1, 0);
        knotScale = mapRange(currentProgress, 0.32, 0.48, 1.0, 0.88);
      }
      knotWrapper.style.opacity = knotOpacity.toFixed(3);
      knotWrapper.style.filter = "none";
      knotWrapper.style.transform = `scale(${knotScale.toFixed(3)})`;

      // 4. Ganpati: Initial fade-in (0.06 - 0.20), expands to majestic center (0.32 - 0.52), fades out (0.64 - 0.76)
      if (ganpatiSection) {
        let ganpatiOpacity = mapRange(currentProgress, 0.06, 0.20, 0, 1);
        let ganpatiScale = mapRange(currentProgress, 0.06, 0.20, 0.92, 1.0);
        let ganpatiTranslateY = mapRange(currentProgress, 0.06, 0.20, -15, 0);

        if (currentProgress > 0.32 && currentProgress <= 0.64) {
          const growScale = mapRange(currentProgress, 0.32, 0.52, 1.0, 1.75);
          const centerShiftY = mapRange(currentProgress, 0.32, 0.52, 0, window.innerHeight * 0.17);
          ganpatiScale = growScale;
          ganpatiTranslateY = centerShiftY;
          ganpatiOpacity = 1;
        } else if (currentProgress > 0.64) {
          ganpatiOpacity = mapRange(currentProgress, 0.64, 0.76, 1, 0);
          ganpatiScale = 1.75;
          ganpatiTranslateY = window.innerHeight * 0.17;
        }

        ganpatiSection.style.opacity = ganpatiOpacity.toFixed(3);
        ganpatiSection.style.transform = `translateY(${ganpatiTranslateY.toFixed(1)}px) scale(${ganpatiScale.toFixed(3)})`;
        ganpatiSection.style.pointerEvents = ganpatiOpacity < 0.05 ? "none" : "auto";
        ganpatiSection.style.filter = (currentProgress > 0.36 && currentProgress <= 0.64)
          ? `drop-shadow(0 15px 35px rgba(0,0,0,0.9)) drop-shadow(0 0 35px rgba(249, 228, 150, ${mapRange(currentProgress, 0.36, 0.52, 0.35, 0.8).toFixed(2)}))`
          : "none";
      }

      // Container visibility
      if (homeContainer) {
        const mobContainerOpacity = currentProgress <= 0.64
          ? 1
          : mapRange(currentProgress, 0.64, 0.76, 1, 0);
        homeContainer.style.opacity = mobContainerOpacity.toFixed(3);
        homeContainer.style.pointerEvents = mobContainerOpacity < 0.05 ? "none" : "auto";
        homeContainer.style.visibility = currentProgress >= 0.76 ? "hidden" : "visible";
      }

      // 5. Countdown Timer on Mobile (0.48 - 0.62 prominent, fades out 0.64 - 0.76)
      if (countdownBanner) {
        let cdOpacity = 0;
        if (currentProgress < 0.48) {
          cdOpacity = 0;
        } else if (currentProgress <= 0.64) {
          cdOpacity = mapRange(currentProgress, 0.48, 0.62, 0, 1);
        } else {
          cdOpacity = mapRange(currentProgress, 0.64, 0.76, 1, 0);
        }
        const cdTranslateY = mapRange(currentProgress, 0.48, 0.62, 16, 0);
        countdownBanner.style.opacity = cdOpacity.toFixed(3);
        countdownBanner.style.transform = `translateX(-50%) translateY(${cdTranslateY.toFixed(1)}px)`;
        countdownBanner.style.pointerEvents = cdOpacity > 0.5 ? "auto" : "none";
        countdownBanner.style.visibility = cdOpacity <= 0 ? "hidden" : "visible";
      }

      // 6. ROYAL EVENTS SECTION ON MOBILE (0.76 to 0.94)
      if (eventsSection) {
        if (currentProgress < 0.74) {
          eventsSection.style.opacity = "0";
          eventsSection.style.visibility = "hidden";
          eventsSection.style.pointerEvents = "none";
          eventsSection.classList.remove("visible");
        } else {
          const evOpacity = mapRange(currentProgress, 0.74, 0.92, 0, 1);
          const evTranslateY = mapRange(currentProgress, 0.74, 0.92, 35, 0);
          eventsSection.style.opacity = evOpacity.toFixed(3);
          eventsSection.style.transform = `translateY(${evTranslateY.toFixed(1)}px)`;
          eventsSection.style.visibility = "visible";
          eventsSection.style.pointerEvents = evOpacity > 0.4 ? "auto" : "none";
          if (evOpacity > 0.1) {
            eventsSection.classList.add("visible");
          } else {
            eventsSection.classList.remove("visible");
          }
        }
      }
    }

    requestAnimationFrame(renderFrame);
  }

  requestAnimationFrame(renderFrame);
}

/* ==========================================================================
   COUNTDOWN TIMER FOR WEB VIEW PRESENTATION CARD
   ========================================================================== */
function initHomeCountdownTimer() {
  const daysEl = document.getElementById("home-cd-days");
  const hoursEl = document.getElementById("home-cd-hours");
  const minsEl = document.getElementById("home-cd-mins");
  const secsEl = document.getElementById("home-cd-secs");

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

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent = String(mins).padStart(2, "0");
    secsEl.textContent = String(secs).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

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
   2. ROYAL AUDIO SYSTEM (PLAY/PAUSE TOGGLE & STATUS SYNC)
   ========================================================================== */
let audioCtx = null;
let isMusicPlaying = false;
let synthTimer = null;
let bgAudio = null;

function updateMusicButtonUI(playing) {
  const musicBtn = document.getElementById("floating-music-btn");
  const musicIcon = document.getElementById("music-play-pause-icon");

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
}

function initHomeAudioSystem() {
  const musicBtn = document.getElementById("floating-music-btn");
  bgAudio = document.getElementById("bg-audio");

  if (!bgAudio) {
    bgAudio = new Audio(window.WEDDING_CONFIG?.music?.audioUrl || "assets/audio/AUD-20260928-WA0008.mp3");
    bgAudio.loop = true;
  }

  bgAudio.volume = 0.8;
  bgAudio.addEventListener("ended", () => {
    if (!bgAudio.loop) {
      pauseMusic();
    }
  });

  updateMusicButtonUI(false);

  if (musicBtn) {
    musicBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isMusicPlaying) {
        pauseMusic();
      } else {
        startMusic();
      }
    });
  }

  // Check autoplay flag from URL or SessionStorage
  const urlParams = new URLSearchParams(window.location.search);
  const shouldAutoPlay = urlParams.get("play") === "1" || sessionStorage.getItem("wedding_music_autoplay") === "true";

  if (shouldAutoPlay) {
    startMusic();
  }

  // Also enable playback on first user tap anywhere if browser blocked initial autoplay
  const handleFirstInteraction = () => {
    if (!isMusicPlaying && shouldAutoPlay) {
      startMusic();
    }
    document.removeEventListener("click", handleFirstInteraction);
    document.removeEventListener("touchstart", handleFirstInteraction);
  };

  document.addEventListener("click", handleFirstInteraction, { once: true });
  document.addEventListener("touchstart", handleFirstInteraction, { once: true });
}

function startMusic() {
  if (isMusicPlaying) return;

  if (bgAudio) {
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isMusicPlaying = true;
          updateMusicButtonUI(true);
        })
        .catch((err) => {
          console.warn("Audio element play error, trying synthesized Shehnai:", err);
          playSynthesizedShehnai();
        });
      return;
    } else {
      isMusicPlaying = true;
      updateMusicButtonUI(true);
      return;
    }
  }

  playSynthesizedShehnai();
}

function pauseMusic() {
  isMusicPlaying = false;
  if (bgAudio) {
    try {
      bgAudio.pause();
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
    console.warn("Shehnai synthesizer error:", err);
  }
}

function playRaagYamanLoop() {
  if (!audioCtx || !isMusicPlaying) return;

  const scale = [293.66, 329.63, 369.99, 415.30, 440.00, 493.88, 554.37, 587.33];
  const pattern = [
    { note: 0, dur: 1.4, amp: 0.08 },
    { note: 2, dur: 0.9, amp: 0.09 },
    { note: 1, dur: 1.2, amp: 0.08 },
    { note: 3, dur: 1.8, amp: 0.11 },
    { note: 4, dur: 1.5, amp: 0.1 },
    { note: 6, dur: 1.2, amp: 0.09 },
    { note: 7, dur: 2.2, amp: 0.12 }
  ];

  let curTime = audioCtx.currentTime + 0.05;

  pattern.forEach((step) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const freq = scale[step.note];

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, curTime);

    gain.gain.setValueAtTime(0.001, curTime);
    gain.gain.exponentialRampToValueAtTime(step.amp, curTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, curTime + step.dur);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(curTime);
    osc.stop(curTime + step.dur);

    curTime += step.dur;
  });

  const totalDurationMs = (curTime - audioCtx.currentTime) * 1000;
  synthTimer = setTimeout(() => {
    if (isMusicPlaying) {
      playRaagYamanLoop();
    }
  }, totalDurationMs);
}

/* ==========================================================================
   LANGUAGE TOGGLE SYSTEM (HINDI / ENGLISH)
   Reads all data dynamically from WEDDING_CONFIG.translations
   ========================================================================== */
function initHomeLanguageSystem() {
  const langBtn = document.getElementById("floating-lang-btn");
  const langBtnText = document.getElementById("lang-btn-text");

  if (!langBtn || !langBtnText) return;

  function getTranslationData(lang) {
    if (typeof WEDDING_CONFIG !== "undefined" && WEDDING_CONFIG.translations && WEDDING_CONFIG.translations[lang]) {
      return WEDDING_CONFIG.translations[lang];
    }
    // Fallback if config is missing
    return {
      btnLabel: lang === "en" ? "अ" : "EN",
      btnTitle: lang === "en" ? "हिंदी में देखें / View in Hindi" : "View in English / अंग्रेजी में देखें",
      scrollHint: lang === "en" ? "Scroll to Unveil" : "दर्शन हेतु स्क्रॉल करें",
      groom: {
        name: lang === "en" ? "Krishna Kumar" : "कृष्ण कुमार",
        kinship: lang === "en" ? "Son of" : "सुपुत्र",
        parents: lang === "en" ? "Smt. Kalyani Bid & Shri Sukumar Bid" : "श्रीमती सुनीता एवं श्री राजेन्द्र सिंघानिया"
      },
      bride: {
        name: lang === "en" ? "Kumari Muskan" : "कुमारी मुस्कान",
        kinship: lang === "en" ? "Daughter of" : "सुपुत्री",
        parents: lang === "en" ? "Smt. Annu Prasad & Shri Uday Shankar Prasad" : "श्रीमती अन्नू प्रसाद एवं श्री उदय शंकर प्रसाद"
      },
      countdown: {
        days: lang === "en" ? "Days" : "दिन",
        hours: lang === "en" ? "Hours" : "घंटे",
        mins: lang === "en" ? "Mins" : "मिनट",
        secs: lang === "en" ? "Secs" : "सेकंड"
      }
    };
  }

  let currentLang = localStorage.getItem("wedding_site_lang") || "en";

  function applyLanguage(lang) {
    const t = getTranslationData(lang);
    currentLang = lang;
    localStorage.setItem("wedding_site_lang", lang);

    // Update Button Icon & Label
    langBtnText.textContent = t.btnLabel || (lang === "en" ? "अ" : "EN");
    langBtn.setAttribute("title", t.btnTitle || "");
    langBtn.setAttribute("aria-label", t.btnTitle || "");

    // Toggle body class for Devanagari typography
    if (lang === "hi") {
      document.body.classList.add("lang-hindi");
    } else {
      document.body.classList.remove("lang-hindi");
    }

    // Update Text Elements Dynamically
    const groomNameEl = document.getElementById("groom-name-text");
    const groomKinshipEl = document.getElementById("groom-kinship-text");
    const groomParentsEl = document.getElementById("groom-parents-text");
    const brideNameEl = document.getElementById("bride-name-text");
    const brideKinshipEl = document.getElementById("bride-kinship-text");
    const brideParentsEl = document.getElementById("bride-parents-text");
    const scrollHintEl = document.getElementById("scroll-hint-text");
    const cdDaysEl = document.getElementById("cd-label-days");
    const cdHoursEl = document.getElementById("cd-label-hours");
    const cdMinsEl = document.getElementById("cd-label-mins");
    const cdSecsEl = document.getElementById("cd-label-secs");

    if (groomNameEl && t.groom) groomNameEl.textContent = t.groom.name;
    if (groomKinshipEl && t.groom) groomKinshipEl.textContent = t.groom.kinship;
    if (groomParentsEl && t.groom) groomParentsEl.textContent = t.groom.parents;
    if (brideNameEl && t.bride) brideNameEl.textContent = t.bride.name;
    if (brideKinshipEl && t.bride) brideKinshipEl.textContent = t.bride.kinship;
    if (brideParentsEl && t.bride) brideParentsEl.textContent = t.bride.parents;
    if (scrollHintEl) scrollHintEl.textContent = t.scrollHint;
    if (cdDaysEl && t.countdown) cdDaysEl.textContent = t.countdown.days;
    if (cdHoursEl && t.countdown) cdHoursEl.textContent = t.countdown.hours;
    if (cdMinsEl && t.countdown) cdMinsEl.textContent = t.countdown.mins;
    if (cdSecsEl && t.countdown) cdSecsEl.textContent = t.countdown.secs;

    // Update Royal Events Section Text Dynamically
    if (t.eventsSection) {
      const evSubtitleEl = document.getElementById("events-sec-subtitle");
      const evTitleEl = document.getElementById("events-sec-title");
      if (evSubtitleEl) evSubtitleEl.textContent = t.eventsSection.subtitle;
      if (evTitleEl) evTitleEl.textContent = t.eventsSection.title;

      // Update Nav Pill Tab Labels
      const pillMap = {
        "haldi": lang === "hi" ? "हल्दी" : "Haldi",
        "mehendi": lang === "hi" ? "मेहंदी" : "Mehndi",
        "sangeet": lang === "hi" ? "संगीत" : "Sangeet",
        "barat": lang === "hi" ? "बारात" : "Barat",
        "DINNER": lang === "hi" ? "रिसेप्शन" : "DINNER"
      };
      const pillHaldi = document.getElementById("pill-haldi-text");
      const pillMehendi = document.getElementById("pill-mehendi-text");
      const pillSangeet = document.getElementById("pill-sangeet-text");
      const pillBarat = document.getElementById("pill-barat-text");
      const pillDINNER = document.getElementById("pill-DINNER-text");
      if (pillHaldi) pillHaldi.textContent = pillMap.haldi;
      if (pillMehendi) pillMehendi.textContent = pillMap.mehendi;
      if (pillSangeet) pillSangeet.textContent = pillMap.sangeet;
      if (pillBarat) pillBarat.textContent = pillMap.barat;
      if (pillDINNER) pillDINNER.textContent = pillMap.DINNER;

      // Update Individual Cards
      if (Array.isArray(t.eventsSection.events)) {
        t.eventsSection.events.forEach((ev) => {
          const badgeEl = document.getElementById(`card-badge-${ev.id}`);
          const titleEl = document.getElementById(`card-title-${ev.id}`);
          const taglineEl = document.getElementById(`card-tagline-${ev.id}`);
          const dateEl = document.getElementById(`card-date-${ev.id}`);
          const timeEl = document.getElementById(`card-time-${ev.id}`);
          const venueEl = document.getElementById(`card-venue-${ev.id}`);
          const dressEl = document.getElementById(`card-dress-${ev.id}`);
          const descEl = document.getElementById(`card-desc-${ev.id}`);
          const mapBtnEl = document.getElementById(`btn-map-${ev.id}`);
          const calBtnEl = document.getElementById(`btn-cal-${ev.id}`);

          if (badgeEl) badgeEl.textContent = ev.badge;
          if (titleEl) titleEl.textContent = ev.name;
          if (taglineEl) taglineEl.textContent = ev.tagline;
          if (dateEl) dateEl.textContent = ev.date;
          if (timeEl) timeEl.textContent = ev.time;
          if (venueEl) venueEl.textContent = ev.venue;
          if (dressEl) {
            const dot = dressEl.querySelector(".color-dot");
            dressEl.innerHTML = "";
            if (dot) dressEl.appendChild(dot);
            dressEl.appendChild(document.createTextNode(" " + ev.dressCode));
          }
          if (descEl) descEl.textContent = ev.description;
          if (mapBtnEl) {
            const span = mapBtnEl.querySelector("span");
            if (span) span.textContent = t.eventsSection.btnMap || "View Venue";
          }
          if (calBtnEl) {
            const span = calBtnEl.querySelector("span");
            if (span) span.textContent = t.eventsSection.btnCalendar || "Add to Calendar";
          }
        });
      }
    }

    // Update Family Blessings Section Text Dynamically
    if (t.familyBlessings) {
      const fbSanskrit = document.getElementById("fb-sanskrit-tag");
      const fbTitle = document.getElementById("fb-title");
      const fbSubtitle = document.getElementById("fb-subtitle");
      const fbQuote = document.getElementById("fb-quote-text");
      const fbGroomTitle = document.getElementById("fb-groom-family-title");
      const fbGroomBadge = document.getElementById("fb-groom-family-badge");
      const fbGroomAncLabel = document.getElementById("fb-groom-ancestor-label");
      const fbGroomAncestors = document.getElementById("fb-groom-ancestors");
      const fbGroomParLabel = document.getElementById("fb-groom-parents-label");
      const fbGroomParents = document.getElementById("fb-groom-parents");
      const fbBrideTitle = document.getElementById("fb-bride-family-title");
      const fbBrideBadge = document.getElementById("fb-bride-family-badge");
      const fbBrideAncLabel = document.getElementById("fb-bride-ancestor-label");
      const fbBrideAncestors = document.getElementById("fb-bride-ancestors");
      const fbBrideParLabel = document.getElementById("fb-bride-parents-label");
      const fbBrideParents = document.getElementById("fb-bride-parents");
      const fbGratitudeLabel = document.getElementById("fb-gratitude-label");
      const fbGratitudeVal = document.getElementById("fb-gratitude-val");

      if (fbSanskrit) fbSanskrit.textContent = t.familyBlessings.sanskritTag;
      if (fbTitle) fbTitle.textContent = t.familyBlessings.title;
      if (fbSubtitle) fbSubtitle.textContent = t.familyBlessings.subtitle;
      if (fbQuote) fbQuote.textContent = t.familyBlessings.quote;

      if (t.familyBlessings.groomFamily) {
        if (fbGroomTitle) fbGroomTitle.textContent = t.familyBlessings.groomFamily.title;
        if (fbGroomBadge) fbGroomBadge.textContent = t.familyBlessings.groomFamily.badge;
        if (fbGroomAncLabel) fbGroomAncLabel.textContent = t.familyBlessings.groomFamily.ancestorLabel;
        if (fbGroomAncestors) fbGroomAncestors.textContent = t.familyBlessings.groomFamily.ancestors;
        if (fbGroomParLabel) fbGroomParLabel.textContent = t.familyBlessings.groomFamily.parentsLabel;
        if (fbGroomParents) fbGroomParents.textContent = t.familyBlessings.groomFamily.parents;
      }

      if (t.familyBlessings.brideFamily) {
        if (fbBrideTitle) fbBrideTitle.textContent = t.familyBlessings.brideFamily.title;
        if (fbBrideBadge) fbBrideBadge.textContent = t.familyBlessings.brideFamily.badge;
        if (fbBrideAncLabel) fbBrideAncLabel.textContent = t.familyBlessings.brideFamily.ancestorLabel;
        if (fbBrideAncestors) fbBrideAncestors.textContent = t.familyBlessings.brideFamily.ancestors;
        if (fbBrideParLabel) fbBrideParLabel.textContent = t.familyBlessings.brideFamily.parentsLabel;
        if (fbBrideParents) fbBrideParents.textContent = t.familyBlessings.brideFamily.parents;
      }

      if (fbGratitudeLabel) fbGratitudeLabel.textContent = t.familyBlessings.gratitudeLabel;
      if (fbGratitudeVal) fbGratitudeVal.textContent = t.familyBlessings.gratitudeVal;
    }

    // Update Media Button Tooltip & Modal Title
    const mediaBtnEl = document.getElementById("floating-media-btn");
    const mediaHeadingEl = document.getElementById("media-modal-heading");
    if (mediaBtnEl) {
      mediaBtnEl.setAttribute("title", lang === "hi" ? "फोटो गैलरी एवं यादें" : "Photo Gallery & Moments");
      mediaBtnEl.setAttribute("aria-label", lang === "hi" ? "फोटो गैलरी एवं यादें" : "Photo Gallery & Moments");
    }
    if (mediaHeadingEl) {
      mediaHeadingEl.textContent = lang === "hi" ? "शाही यादें एवं फोटो गैलरी" : "Royal Moments & Gallery";
    }
  }

  langBtn.addEventListener("click", () => {
    const nextLang = currentLang === "en" ? "hi" : "en";
    applyLanguage(nextLang);
  });

  // Initialize with current preference
  applyLanguage(currentLang);
}

/* ==========================================================================
   ROYAL EVENTS CARDS SYSTEM (HALDI, MEHNDI, SANGEET, BARAT, DINNER)
   Interactive Tabs, Arrow Nav, 3D Card Tilt, Calendar Add & Smooth Scroll
   ========================================================================== */
function initEventsCardsSystem() {
  const eventsSection = document.getElementById("royal-events-section");
  const pills = document.querySelectorAll(".event-nav-pill");
  const cards = document.querySelectorAll(".event-card");

  if (cards.length === 0) return;

  let activeIndex = 0;

  function scrollToCard(index) {
    if (index < 0) index = 0;
    if (index >= cards.length) index = cards.length - 1;
    activeIndex = index;

    const targetCard = cards[index];
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    updateActiveState(index);
  }

  function updateActiveState(index) {
    pills.forEach((p, idx) => {
      const isSelected = idx === index;
      p.classList.toggle("active", isSelected);
      p.setAttribute("aria-selected", isSelected ? "true" : "false");
    });

    cards.forEach((c, idx) => {
      c.classList.toggle("active", idx === index);
    });
  }

  // Pill tab click
  pills.forEach((pill) => {
    pill.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = parseInt(pill.getAttribute("data-index"), 10);
      if (!isNaN(idx)) scrollToCard(idx);
    });
  });

  // Vertical scroll observer (auto update active pill while scrolling down)
  if (eventsSection) {
    let scrollTimeout;
    eventsSection.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const secRect = eventsSection.getBoundingClientRect();
        const viewportCenter = secRect.top + secRect.height * 0.35;
        let closestIdx = 0;
        let minDistance = Infinity;

        cards.forEach((card, idx) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.top + cardRect.height / 2;
          const dist = Math.abs(cardCenter - viewportCenter);
          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        });

        if (closestIdx !== activeIndex) {
          activeIndex = closestIdx;
          updateActiveState(closestIdx);
        }
      }, 50);
    }, { passive: true });
  }

  // 3D Card Hover Tilt Effect for Desktop
  if (window.matchMedia("(pointer: fine)").matches) {
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -9;
        const rotateY = ((x - centerX) / centerX) * 9;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.02)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  // Add to Calendar buttons handler
  document.querySelectorAll(".btn-calendar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const eventId = btn.getAttribute("data-event-id");
      handleAddToCalendar(eventId);
    });
  });
}

/* ==========================================================================
   CALENDAR EVENT EXPORT & GOOGLE CALENDAR GENERATOR
   ========================================================================== */
function handleAddToCalendar(eventId) {
  const eventsData = {
    haldi: {
      title: "Haldi Ceremony -Muskan & Krishna Wedding",
      start: "20261124T100000",
      end: "20261124T130000",
      location: "Sangli Resort Lawns",
      description: "Auspicious Haldi Ceremony of Muskan & Krishna. Dress code: Festive Yellow."
    },
    mehendi: {
      title: "Mehendi Celebration - Muskan & Krishna Wedding",
      start: "20261124T160000",
      end: "20261124T193000",
      location: "Sangli Resort Courtyard",
      description: "Mehendi & High Tea celebration of Muskan & Krishna. Dress code: Emerald Green & Floral."
    },
    sangeet: {
      title: "Sangeet Night - Muskan & Krishna Wedding",
      start: "20261124T200000",
      end: "20261125T010000",
      location: "Grand Ballroom, Sangli Resor",
      description: "Sangeet Night & dinner of Muskan & Krishna. Dress code: Glamorous Indo-Western."
    },
    barat: {
      title: "Shubh Vivah - Muskan & Krishna Wedding",
      start: "20261125T163000",
      end: "20261125T235900",
      location: "Sangli Resort Mandap, Dhanbad",
      description: "Varmala & Sacred Pheras of Muskan & Krishna. Shubh Vivah."
    },
    DINNER: {
      title: "DINNER - Muskan & Krishna",
      start: "20261125T193000",
      end: "20261125T235900",
      location: "Sangli Resort Banquet, Dhanbad",
      description: "DINNER & Feast of Muskan & Krishna."
    },
    blessings: {
      title: "Mangal Ashirwad & Blessings - Muskan & Krishna Wedding",
      start: "20261125T100000",
      end: "20261125T235900",
      location: "Sangli Resort Dhanbad",
      description: "Family Blessings & Divine Prayers with Prasad Parivar for Muskan & Krishna."
    }
  };

  const ev = eventsData[eventId] || eventsData.barat;
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(ev.title)}&dates=${ev.start}/${ev.end}&details=${encodeURIComponent(ev.description)}&location=${encodeURIComponent(ev.location)}`;

  window.open(gcalUrl, "_blank", "noopener,noreferrer");
}

/* ==========================================================================
   ROYAL MEDIA / MOMENTS GALLERY SYSTEM
   ========================================================================== */
function initHomeMediaModal() {
  const mediaBtn = document.getElementById("floating-media-btn");
  const modal = document.getElementById("royal-media-modal");
  const backdrop = document.getElementById("media-modal-backdrop");
  const closeBtn = document.getElementById("media-modal-close-btn");
  const container = document.getElementById("media-gallery-container");

  if (!modal || !mediaBtn) return;

  const defaultGallery = [
    { src: "assets/images/couple_hero.jpg", caption: "Royal Pre-Wedding Portrait", category: "Pre-Wedding" },
    { src: "assets/images/gallery_prewedding.jpg", caption: "Palace Walk & Sunset Moments", category: "Moments" },
    { src: "assets/images/groom_portrait.jpg", caption: "Groom Royal Portrait", category: "Groom" },
    { src: "assets/images/bride_portrait.jpg", caption: "Bride Royal Portrait", category: "Bridal" },
    { src: "assets/images/gallery_mehendi.jpg", caption: "Joyous Festive Mehendi Celebrations", category: "Festivities" },
    { src: "assets/images/gallery_mandap.jpg", caption: "Lakeside Floral Mandap", category: "Decor" }
  ];

  const galleryItems = (typeof WEDDING_CONFIG !== "undefined" && Array.isArray(WEDDING_CONFIG.gallery) && WEDDING_CONFIG.gallery.length > 0)
    ? WEDDING_CONFIG.gallery
    : defaultGallery;

  // Populate gallery
  if (container) {
    container.innerHTML = galleryItems.map((item, idx) => `
      <div class="media-gallery-item" data-idx="${idx}">
        <img src="${item.src}" alt="${item.caption || 'Wedding Photo'}" loading="lazy" />
        <div class="media-gallery-item-overlay">
          ${item.category ? `<span class="media-gallery-item-tag">${item.category}</span>` : ''}
          <span class="media-gallery-item-caption">${item.caption || ''}</span>
        </div>
      </div>
    `).join("");
  }

  function openModal() {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  mediaBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}
