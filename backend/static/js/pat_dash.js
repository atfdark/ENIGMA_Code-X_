// Hero Nudges
const heroNudges = [
    "Take a deep breath and feel the calm 🌿",
    "Small steps every day lead to big health improvements 💪",
    "Remember to hydrate and nourish your body 💧",
    "A calm mind keeps the heart healthy ❤",
    "Smile! Positivity boosts your well-being 😊"
  ];
  
  function newHeroNudge() {
    const random = Math.floor(Math.random() * heroNudges.length);
    document.getElementById("heroNudge").innerText = heroNudges[random];
  }
  
  // Navbar Screen Navigation
  function showScreen(screen) {
    document.getElementById('dashboardScreen').style.display = screen === 'dashboard' ? 'block' : 'none';
    document.getElementById('entriesScreen').style.display = screen === 'entries' ? 'block' : 'none';
    document.getElementById('reportsScreen').style.display = screen === 'reports' ? 'block' : 'none';
  
    document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
    if (screen === 'dashboard') document.querySelector('.nav-link:nth-child(1)').classList.add('active');
    else if (screen === 'entries') document.querySelector('.nav-link:nth-child(2)').classList.add('active');
    else if (screen === 'reports') document.querySelector('.nav-link:nth-child(3)').classList.add('active');
  }
  
  // Tabs in Entries screen
  function openTab(tabName, evt) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.getElementById(tabName).style.display = 'block';
  
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (evt) evt.currentTarget.classList.add('active');
  }
  
  // Store past entries by type and date
  let pastEntries = { diabetes: {}, bp: {} };
  
  // Save to local storage
  function saveEntries() {
    try {
      localStorage.setItem('healthEntries', JSON.stringify(pastEntries));
    } catch (e) {
      console.error("Could not save to local storage: ", e);
    }
  }
  
  // Load from local storage
  function loadEntries() {
    try {
      const savedData = localStorage.getItem('healthEntries');
      if (savedData) {
        pastEntries = JSON.parse(savedData);
        updatePastTable('diabetes');
        updatePastTable('bp');
        updateChart();
      }
    } catch (e) {
      console.error("Could not load from local storage: ", e);
    }
  }
  
  // Submit entries (Diabetes/BP) with date & calculate stability
  function submitEntry(type) {
    const tableId = type === 'diabetes' ? 'diabetesEntries' : 'bpEntries';
    const recentDivId = type === 'diabetes' ? 'diabetesRecent' : 'bpRecent';
    const dateInputId = type === 'diabetes' ? 'diabetesDate' : 'bpDate';
  
    const table = document.getElementById(tableId);
    const recentDiv = document.getElementById(recentDivId);
  
    const selectedDate = document.getElementById(dateInputId).value;
    const dateStr = selectedDate ? new Date(selectedDate).toLocaleDateString() : new Date().toLocaleDateString();
  
    if (!pastEntries[type][dateStr]) pastEntries[type][dateStr] = [];
  
    let stabilityScore = 100;
    const dailyEntries = [];
  
    for (let i = 1; i < table.rows.length; i++) {
      const row = table.rows[i];
      const checkup = row.cells[0].innerText.toLowerCase();
      const values = Array.from(row.cells).slice(1).map(cell => cell.querySelector('input, select')?.value || '');
  
      dailyEntries.push({ checkup, values });
  
      values.forEach(val => {
        const num = parseFloat(val);
        if (!isNaN(num)) {
          if (checkup.includes('glucose')) { if (num < 70 || num > 140) stabilityScore -= 15; }
          else if (checkup.includes('systolic')) { if (num >= 130 && num < 140) stabilityScore -= 10; else if (num >= 140) stabilityScore -= 20; }
          else if (checkup.includes('diastolic')) { if (num >= 80 && num < 90) stabilityScore -= 10; else if (num >= 90) stabilityScore -= 20; }
          else if (checkup.includes('heart rate')) { if (num < 60 || num > 100) stabilityScore -= 10; }
          if (checkup.includes('medication taken') && val.toLowerCase() === 'no') stabilityScore -= 5;
        }
      });
    }
  
    pastEntries[type][dateStr].push(...dailyEntries);
    table.querySelectorAll('.input-cell').forEach(input => input.value = '');
  
    updatePastTable(type);
  
    // ✅ Fixed string template
    recentDiv.innerHTML = `<h4>Recent Entries (${dateStr}):</h4>`;
    pastEntries[type][dateStr].forEach(entry => {
      recentDiv.innerHTML += `<div>${entry.checkup} → Morning: ${entry.values[0] || '-'}, Afternoon: ${entry.values[1] || '-'}, Night: ${entry.values[2] || '-'}</div>`;
    });
  
    let status = "Stable ✅", color = "#4caf50";
    if (stabilityScore < 50) { status = "Alert ❌"; color = "#f44336"; }
    else if (stabilityScore < 80) { status = "Warning ⚠"; color = "#ff9800"; }
  
    document.getElementById('score').innerText = stabilityScore + "%";
    document.getElementById('score').style.color = color;
    document.getElementById('stabilityStatus').innerHTML = `AI predicts: <strong>${status}</strong>`;
  
    updateChart();
    saveEntries();
  }
  
  // Update past entries table
  function updatePastTable(type) {
    const pastTableId = type === 'diabetes' ? 'diabetesPast' : 'bpPast';
    const pastTable = document.getElementById(pastTableId);
    pastTable.innerHTML = "";
  
    const entries = pastEntries[type];
    const dates = Object.keys(entries).sort((a, b) => new Date(a) - new Date(b));
  
    dates.forEach(date => {
      const dateRow = pastTable.insertRow();
      const dateCell = dateRow.insertCell();
      dateCell.colSpan = 4;
      dateCell.innerHTML = `Date: ${date}`;
      dateCell.style.fontWeight = '700';
      dateCell.style.background = '#e0f0ff';
  
      entries[date].forEach(entry => {
        const row = pastTable.insertRow();
        row.insertCell().innerText = entry.checkup;
        entry.values.forEach(val => row.insertCell().innerText = val);
      });
    });
  }
  
  // Community Posts
  function addPost() {
    const input = document.getElementById("newPost");
    if (input.value.trim() !== "") {
      const post = document.createElement("div");
      post.classList.add("post");
      post.innerText = input.value;
      document.getElementById("communityPosts").prepend(post);
      input.value = "";
    }
  }
  
  // Chart.js setup
  const ctx = document.getElementById('progressChart').getContext('2d');
  const progressChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Health Stability',
        data: [],
        borderColor: '#66a6ff',
        backgroundColor: 'rgba(102,166,255,0.2)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { suggestedMin: 0, suggestedMax: 100 } }
    }
  });
  
  // Update chart dynamically
  function updateChart() {
    const allDates = new Set();
    Object.values(pastEntries).forEach(typeObj => {
      Object.keys(typeObj).forEach(date => allDates.add(date));
    });
  
    const sortedDates = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b));
    const data = sortedDates.map(date => {
      let score = 100;
      Object.values(pastEntries).forEach(typeObj => {
        if (typeObj[date]) {
          typeObj[date].forEach(entry => {
            entry.values.forEach(val => {
              const num = parseFloat(val);
              if (!isNaN(num)) {
                const check = entry.checkup;
                if (check.includes('glucose')) { if (num < 70 || num > 140) score -= 15; }
                else if (check.includes('systolic')) { if (num >= 130 && num < 140) score -= 10; else if (num >= 140) score -= 20; }
                else if (check.includes('diastolic')) { if (num >= 80 && num < 90) score -= 10; else if (num >= 90) score -= 20; }
                else if (check.includes('heart rate')) { if (num < 60 || num > 100) score -= 10; }
                if (check.includes('medication taken') && val.toLowerCase() === 'no') score -= 5;
              }
            });
          });
        }
      });
      return score;
    });
  
    progressChart.data.labels = sortedDates;
    progressChart.data.datasets[0].data = data;
    progressChart.update();
  }
  
  // Request Doctor Appointment
  function requestAppointment() {
    const button = document.getElementById('requestConsultBtn');
    const status = document.getElementById('appointmentStatus');
  
    const patientInfo = {
      name: "John Doe",
      age: 45,
      condition: "High BP & Stress",
      preferredTime: new Date().toLocaleString()
    };
  
    button.disabled = true;
    button.innerText = "Requesting...";
  
    setTimeout(() => {
      button.disabled = false;
      button.innerText = "Request Video Consult";
      status.innerHTML = `✅ Appointment Requested! <br>
        Patient: ${patientInfo.name} <br>
        Condition: ${patientInfo.condition} <br>
        Scheduled Time: ${patientInfo.preferredTime}`;
    }, 1500);
  }
  
  // Call load function on script run
  loadEntries();
  
  function clearData() {
    localStorage.removeItem("healthEntries");  // ✅ only clear health data
    pastEntries = { diabetes: {}, bp: {} };
    window.location.reload();
  }
  
  // Medication reminders stored locally
  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  
  function addReminder() {
    const medTime = document.getElementById("medTime").value;
    const medName = document.getElementById("medName").value.trim();
    const list = document.getElementById("reminderList");
  
    if (!medTime || !medName) {
      alert("Please enter both medication name and time.");
      return;
    }
  
    const reminder = { time: medTime, name: medName };
    reminders.push(reminder);
    localStorage.setItem("reminders", JSON.stringify(reminders));
  
    renderReminders();
    document.getElementById("medName").value = "";
  }
  
  // Show reminders on page load
  function renderReminders() {
    const list = document.getElementById("reminderList");
    list.innerHTML = "";
  
    if (reminders.length === 0) {
      list.innerHTML = "<li>No reminders yet</li>";
      return;
    }
  
    reminders.forEach(rem => {
      const li = document.createElement("li");
      li.textContent = `${rem.name} at ${rem.time}`;
      list.appendChild(li);
    });
  }
  
  window.onload = function () {
    renderReminders();
  };
  