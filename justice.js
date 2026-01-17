console.log("Justice.js loaded");

/* =========================
   SYSTEM PASSWORD
   ========================= */
const SYSTEM_PASSWORD = "justice123"; // change this safely


document.addEventListener("DOMContentLoaded", () => {

  console.log("DOM ready");

  /* =========================
     ACCESS POPUP
     ========================= */
  function showAccessPopup(granted, callback) {
    const popup = document.createElement("div");
    popup.className = "access-popup";
    popup.textContent = granted ? "✅ ACCESS GRANTED" : "❌ ACCESS DENIED";
    document.body.appendChild(popup);

    setTimeout(() => popup.classList.add("show"), 50);
    setTimeout(() => popup.classList.remove("show"), 2500);
    setTimeout(() => {
      popup.remove();
      if (granted && callback) callback();
    }, 3000);
  }

  /* =========================
     PASSWORD CHECK
     ========================= */
  function requestPassword(onSuccess) {
    const password = prompt("🔐 Enter Security Password");

    if (password === SYSTEM_PASSWORD) {
      showAccessPopup(true, onSuccess);
    } else {
      showAccessPopup(false);
    }
  }

  /* =========================
     BOOT-UP SEQUENCE
     ========================= */
  const bootOverlay = document.createElement("div");
  bootOverlay.id = "bootOverlay";
  bootOverlay.innerHTML = `<h1>JusticeFlowX Loading...</h1><div id="bootLog"></div>`;
  document.body.appendChild(bootOverlay);

  const bootLog = document.getElementById("bootLog");
  const bootMessages = [
    "Initializing Fingerprint System...",
    "Activating Facial Recognition...",
    "Syncing Criminal Database...",
    "Loading Surveillance Grid...",
    "All Systems Online!"
  ];

  let bootIndex = 0;
  const bootInterval = setInterval(() => {
    if (bootIndex < bootMessages.length) {
      const div = document.createElement("div");
      div.textContent = bootMessages[bootIndex++];
      bootLog.appendChild(div);
      bootLog.scrollTop = bootLog.scrollHeight;
    } else {
      clearInterval(bootInterval);
      bootOverlay.remove();
    }
  }, 800);

  /* =========================
     SCAN BUTTONS
     ========================= */
  const buttons = document.querySelectorAll(".scan-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();

      const scanType = btn.textContent.toLowerCase().includes("finger")
        ? "finger"
        : "retina";

      const overlay = document.createElement("div");
      overlay.className = scanType === "finger"
        ? "fingerprint-scan"
        : "retina-scan";

      document.body.appendChild(overlay);

      setTimeout(() => {
        overlay.remove();

        requestPassword(() => {
          window.location.href = btn.getAttribute("href");
        });

      }, 2500);
    });
  });

  /* =========================
     TERMINAL LOGS
     ========================= */
  const terminal = document.createElement("div");
  terminal.id = "terminalLogs";
  document.body.appendChild(terminal);

  const cyberLogs = [
    "[SYSTEM] Fingerprint module online",
    "[ALERT] Drone sector 7B activated",
    "[INFO] Facial database synced",
    "[SYSTEM] Firewall scan complete",
    "[ALERT] Unauthorized access blocked",
    "[INFO] AI threat detection updated"
  ];

  setInterval(() => {
    const div = document.createElement("div");
    div.textContent = cyberLogs[Math.floor(Math.random() * cyberLogs.length)];
    terminal.appendChild(div);

    if (terminal.children.length > 15) {
      terminal.removeChild(terminal.firstChild);
    }
    terminal.scrollTop = terminal.scrollHeight;
  }, 1500);

  /* =========================
     PARTICLES
     ========================= */
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = 10 + Math.random() * 10 + "s";
    p.style.animationDelay = Math.random() * 10 + "s";
    document.body.appendChild(p);
  }

  /* =========================
     BRAND GLITCH (NO CAPS, NO GLOW)
     ========================= */
  const brand = document.querySelector(".brand");
  if (brand) {
    brand.setAttribute("data-text", brand.textContent);

    setInterval(() => {
      brand.style.transform = `translate(${Math.random() * 2}px, ${Math.random() * 2}px)`;
      setTimeout(() => {
        brand.style.transform = "translate(0,0)";
      }, 120);
    }, 2500);
  }

  /* =========================
     HOVER SOUND
     ========================= */
  const scanSound = new Audio(
    "https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-interface-zoom-890.mp3"
  );

  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      scanSound.currentTime = 0;
      scanSound.play().catch(() => {});
    });
  });

});

/* =========================
   MENU DROPDOWN
   ========================= */
const menuBtn = document.getElementById("menuBtn");
const dropdown = document.getElementById("menuDropdown");

if (menuBtn && dropdown) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
  });

  document.addEventListener("click", () => {
    dropdown.classList.remove("show");
  });
}
const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault(); // prevent default link behavior
    // Try to close the window
    window.close();

    // If window.close() fails (most browsers), redirect to a goodbye page
    setTimeout(() => {
        alert("You have been logged out. Please close the tab manually if it didn't close automatically.");
        window.location.href = "about:blank"; // blank page
    }, 100);
});
