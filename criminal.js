// ================= Criminal Database =================
const criminals = [
  { name:"Rashid Ali", dob:"12-05-1988", citizenship:"Indian", crime:"Robbery", status:"Wanted", case:"IND-CR-1021", location:"Mumbai", photo:"faces/rashid.jpg", fingerprint:"fingers/rashid_fp.png" },
  { name:"Sara Khan", dob:"23-02-1995", citizenship:"Indian", crime:"Fraud", status:"Under Investigation", case:"IND-FR-8891", location:"Delhi", photo:"faces/sara.jpg", fingerprint:"fingers/sara_fp.png" },
  { name:"Imran Sheikh", dob:"05-11-1983", citizenship:"Pakistani", crime:"Assault", status:"Arrested", case:"PK-AST-5534", location:"Lahore", photo:"faces/imran.jpg", fingerprint:"fingers/imran_fp.png" },
  { name:"Aman Verma", dob:"19-08-1990", citizenship:"Indian", crime:"Cyber Crime", status:"Wanted", case:"CYB-9981", location:"Bengaluru", photo:"faces/aman.jpg", fingerprint:"fingers/aman_fp.png" },
  { name:"Rohit Mehta", dob:"11-03-1985", citizenship:"Indian", crime:"Money Laundering", status:"Wanted", case:"ML-7782", location:"Surat", photo:"faces/rohit.jpg", fingerprint:"fingers/rohit_fp.png" },
  { name:"Nisha Patel", dob:"07-07-1992", citizenship:"Indian", crime:"Identity Theft", status:"Under Investigation", case:"ID-3321", location:"Ahmedabad", photo:"faces/nisha.jpg", fingerprint:"fingers/nisha_fp.png" },
  { name:"Arjun Malhotra", dob:"15-01-1980", citizenship:"Indian", crime:"Arms Trafficking", status:"Arrested", case:"ARM-4455", location:"Chandigarh", photo:"faces/arjun.jpg", fingerprint:"fingers/arjun_fp.png" },
  { name:"Fahad Ansari", dob:"29-09-1987", citizenship:"Indian", crime:"Extortion", status:"Wanted", case:"EXT-2222", location:"Hyderabad", photo:"faces/fahad.jpg", fingerprint:"fingers/fahad_fp.png" },
  { name:"Zoya Mirza", dob:"02-12-1994", citizenship:"Indian", crime:"Forgery", status:"Under Investigation", case:"FOR-6642", location:"Pune", photo:"faces/zoya.jpg", fingerprint:"fingers/zoya_fp.png" },
  { name:"Kabir Singh", dob:"21-04-1982", citizenship:"Indian", crime:"Kidnapping", status:"Wanted", case:"KID-9910", location:"Jaipur", photo:"faces/kabir.jpg", fingerprint:"fingers/kabir_fp.png" }
];

// ================= DOM Elements =================
const criminalGrid = document.getElementById("criminalGrid");
const faceImg = document.getElementById("faceImg");
const fingerImg = document.getElementById("fingerImg");
const scanStatus = document.getElementById("scanStatus");
const subjectRecord = document.getElementById("subjectRecord");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");

// ================= Render Criminals =================
function renderCriminals(list) {
    criminalGrid.innerHTML = "";
    list.forEach((criminal, index) => {
        const card = document.createElement("div");
        card.className = "criminal-card";
        card.textContent = criminal.name;
        card.addEventListener("click", () => scanCriminal(index));
        criminalGrid.appendChild(card);
    });
}

// ================= Scan Criminal =================
function scanCriminal(index) {
    const c = criminals[index];

    // Reset
    scanStatus.textContent = "🔄 Scanning...";
    scanStatus.className = "status";
    faceImg.src = "faces/placeholder.jpg";
    fingerImg.src = "fingers/placeholder.png";
    subjectRecord.classList.add("hidden");

    // Start scan animation (scan-line visible)
    const scanLine = document.querySelector(".scan-line");
    scanLine.style.display = "block";

    setTimeout(() => {
        scanLine.style.display = "none";

        // Show images
        faceImg.src = c.photo;
        fingerImg.src = c.fingerprint;

        // Populate details
        document.getElementById("recName").textContent = c.name;
        document.getElementById("recDOB").textContent = c.dob;
        document.getElementById("recCitizenship").textContent = c.citizenship;
        document.getElementById("recCrime").textContent = c.crime;
        document.getElementById("recStatus").textContent = c.status;
        document.getElementById("recCase").textContent = c.case;
        document.getElementById("recLocation").textContent = c.location;

        // Show record box
        subjectRecord.classList.remove("hidden");

        // Update status text
        if (c.status === "Wanted") {
            scanStatus.textContent = "⚠ CRIMINAL MATCH FOUND";
            scanStatus.className = "status red";
        } else {
            scanStatus.textContent = "✅ IDENTITY VERIFIED";
            scanStatus.className = "status green";
        }

        // Optional holographic popup
        showAccessPopup(c.status);
    }, 1600);
}

// ================= Access Popup =================
function showAccessPopup(status) {
    let popup = document.getElementById("accessPopup");
    if (!popup) {
        popup = document.createElement("div");
        popup.id = "accessPopup";
        document.body.appendChild(popup);
    }
    if (status === "Wanted") {
        popup.textContent = "⚠ ALERT: CRIMINAL DETECTED";
        popup.className = "denied";
    } else {
        popup.textContent = "✅ Identity Verified";
        popup.className = "granted";
    }
    popup.style.opacity = "1";

    setTimeout(() => { popup.style.opacity = "0"; }, 2500);
}

// ================= Search & Filter =================
function applyFilters() {
    const search = searchInput.value.toLowerCase();
    const filter = filterSelect.value;

    const filtered = criminals.filter(c => {
        const matchName = c.name.toLowerCase().includes(search);
        const matchStatus = filter === "All" || c.status === filter;
        return matchName && matchStatus;
    });

    renderCriminals(filtered);
}

// ================= Event Listeners =================
searchInput.addEventListener("input", applyFilters);
filterSelect.addEventListener("change", applyFilters);

// ================= Initial Render =================
renderCriminals(criminals);

// ================= Particles =================
for(let i=0;i<50;i++){
    const p = document.createElement("div");
    p.className="particle";
    p.style.left = Math.random()*100+"%";
    p.style.top = Math.random()*100+"%";
    p.style.animationDuration = 2 + Math.random()*3 + "s";
    document.body.appendChild(p);
}

// ================= Retina Ring =================
const ring = document.createElement("div");
ring.className = "retina-ring";
document.querySelector(".scanner-box").appendChild(ring);
function goDashboard() {
  window.location.href = "index.html";
}
