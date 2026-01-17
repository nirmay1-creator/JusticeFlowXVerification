

let database = [];

/* Load historical cases */
fetch("cases.json")
  .then(res => res.json())
  .then(data => database = data)
  .catch(() => console.warn("cases.json not loaded – running in demo mode"));

/* Normalize crime input */
function normalizeCrime(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_");
}

/* MAIN ANALYSIS TRIGGER */
function runAnalysis() {
  const crime = normalizeCrime(document.getElementById("crimeType").value);
  const sev = parseInt(document.getElementById("severity").value);

  if (!crime || isNaN(sev)) {
    alert("Please enter valid crime type and severity");
    return;
  }

  document.getElementById("scanBox").classList.remove("hidden");
  document.getElementById("results").classList.add("hidden");
  document.getElementById("aiBox").classList.add("hidden");
  document.getElementById("charges").classList.add("hidden");

  setTimeout(() => {
    document.getElementById("scanBox").classList.add("hidden");
    analyzeCase(crime, sev);
  }, 2000);
}

/* CORE ANALYSIS */
function analyzeCase(crime, sev) {
  const similar = database.filter(c =>
    normalizeCrime(c.crime) === crime &&
    Math.abs(c.severity - sev) <= 2
  );

  const convicted = similar.filter(c => c.convicted).length;
  const rate = similar.length
    ? Math.round((convicted / similar.length) * 100)
    : 0;

  const failure = similar.length
    ? mostCommon(similar.map(c => c.failure))
    : "No historical failure pattern";

  document.getElementById("casesFound").innerText = similar.length;
  document.getElementById("convictionRate").innerText = rate + "%";
  document.getElementById("convictionBar").style.width = rate + "%";
  document.getElementById("failure").innerText = failure;

  document.getElementById("results").classList.remove("hidden");

  generateAIMessage(similar.length, rate, failure);
  chargeEngine(crime, sev);
}

/* AI MESSAGE */
function generateAIMessage(count, rate, failure) {
  document.getElementById("aiMsg").innerHTML = `
    Analysis complete.<br><br>
    • ${count} historical cases matched<br>
    • Estimated conviction probability: <b>${rate}%</b><br>
    • Primary legal risk: <b>${failure}</b><br><br>
    ⚠ AI-generated assistance only. Final judicial authority required.
  `;
  document.getElementById("aiBox").classList.remove("hidden");
}

/* CHARGE & IPC ENGINE (25+ CRIMES) */
function chargeEngine(crime, sev) {

  const crimeIPCMap = {
    theft: ["IPC 378", "IPC 379"],
    robbery: ["IPC 390", "IPC 392"],
    burglary: ["IPC 445", "IPC 457"],
    assault: ["IPC 351", "IPC 352"],
    grievous_hurt: ["IPC 320", "IPC 325"],
    murder: ["IPC 302"],
    attempt_murder: ["IPC 307"],
    kidnapping: ["IPC 359", "IPC 363"],
    abduction: ["IPC 362"],
    rape: ["IPC 375", "IPC 376"],
    sexual_assault: ["IPC 354"],
    domestic_violence: ["IPC 498A"],
    dowry_harassment: ["IPC 498A", "IPC 304B"],
    cyber_fraud: ["IPC 420", "IT Act 66C"],
    identity_theft: ["IPC 419", "IT Act 66D"],
    hacking: ["IT Act 43", "IT Act 66"],
    forgery: ["IPC 463", "IPC 465"],
    document_forgery: ["IPC 468"],
    criminal_breach_trust: ["IPC 405", "IPC 406"],
    extortion: ["IPC 383", "IPC 384"],
    rioting: ["IPC 146", "IPC 147"],
    arson: ["IPC 435", "IPC 436"],
    trafficking: ["IPC 370"],
    terrorism: ["IPC 121", "UAPA"],
    bribery: ["IPC 171E", "PC Act"],
    corruption: ["PC Act 7", "PC Act 13"]
  };

  const ipcSections = crimeIPCMap[crime] || ["IPC 34", "IPC 120B"];

  document.getElementById("ipc").innerText = ipcSections.join(", ");

  document.getElementById("level").innerText =
    sev >= 8 ? "Critical" :
    sev >= 6 ? "High" :
    sev >= 4 ? "Moderate" : "Low";

  document.getElementById("bail").innerText =
    sev >= 9 ? "Very Low" :
    sev >= 7 ? "Low" :
    sev >= 4 ? "Medium" : "High";

  document.getElementById("charges").classList.remove("hidden");
}

/* UTILITY */
function mostCommon(arr) {
  return arr.sort((a, b) =>
    arr.filter(v => v === a).length -
    arr.filter(v => v === b).length
  ).pop();
}
