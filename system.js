function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateMetrics() {
  // CPU
  const cpu = random(10, 95);
  document.getElementById('cpuMeter').style.width = cpu + '%';
  document.getElementById('cpuValue').innerText = cpu + '%';
  document.getElementById('cpuThreads').innerText = random(4, 16);
  document.getElementById('cpuClock').innerText = (random(2, 5) + Math.random().toFixed(1)) + ' GHz';

  // Memory
  const memUsed = random(4, 32);
  const memFree = 32 - memUsed;
  const memPercent = Math.floor((memUsed / 32) * 100);
  document.getElementById('memoryMeter').style.width = memPercent + '%';
  document.getElementById('memoryValue').innerText = memPercent + '%';
  document.getElementById('memUsed').innerText = memUsed;
  document.getElementById('memFree').innerText = memFree;

  // Disk
  const diskPercent = random(10, 90);
  document.getElementById('diskMeter').style.width = diskPercent + '%';
  document.getElementById('diskValue').innerText = diskPercent + '%';
  document.getElementById('diskRead').innerText = random(50, 500);
  document.getElementById('diskWrite').innerText = random(50, 400);

  // Security
  const secure = Math.random() > 0.1;
  const sec = document.getElementById('securityStatus');
  sec.innerText = secure ? 'SECURE' : 'ALERT';
  sec.className = secure ? 'secure' : 'alert';
  document.getElementById('threats').innerText = secure ? 0 : random(1,5);
  document.getElementById('firewall').innerText = 'Active';
}

// Initial update
updateMetrics();

// Update every 2s
setInterval(updateMetrics, 2000);
function goDashboard() {
  window.location.href = "index.html";
}
// Back to Dashboard Button
const backBtn = document.getElementById('backBtn');
if(backBtn){
  backBtn.addEventListener('click', () => {
    window.location.href = 'index.html'; // change to your dashboard URL
  });
}
