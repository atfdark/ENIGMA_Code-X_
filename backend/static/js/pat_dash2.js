// // Hero Nudges
// const heroNudges = [
//     "Take a deep breath and feel the calm 🌿",
//     "Small steps every day lead to big health improvements 💪",
//     "Remember to hydrate and nourish your body 💧",
//     "A calm mind keeps the heart healthy ❤",
//     "Smile! Positivity boosts your well-being 😊"
// ];

// function newHeroNudge() {
//     const random = Math.floor(Math.random() * heroNudges.length);
//     document.getElementById("heroNudge").innerText = heroNudges[random];
// }

// // Navbar Screen Navigation
// function showScreen(screen) {
//     document.getElementById('dashboardScreen').style.display = screen === 'dashboard' ? 'block' : 'none';
//     document.getElementById('entriesScreen').style.display = screen === 'entries' ? 'block' : 'none';

//     document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
//     if (screen === 'dashboard') document.querySelector('.nav-link:nth-child(1)').classList.add('active');
//     else document.querySelector('.nav-link:nth-child(2)').classList.add('active');
// }

// // Tabs in Entries screen
// function openTab(tabName, evt) {
//     document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
//     document.getElementById(tabName).style.display = 'block';

//     document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
//     if (evt) evt.currentTarget.classList.add('active');
// }

// // Submit entries (Diabetes/BP) with date & calculate stability
// function submitEntry(type) {
//     const tableId = type === 'diabetes' ? 'diabetesEntries' : 'bpEntries';
//     const pastTableId = type === 'diabetes' ? 'diabetesPast' : 'bpPast';
//     const recentDivId = type === 'diabetes' ? 'diabetesRecent' : 'bpRecent';

//     const table = document.getElementById(tableId);
//     const pastTable = document.getElementById(pastTableId);
//     const recentDiv = document.getElementById(recentDivId);

//     const today = new Date();
//     const dateStr = today.toLocaleDateString();

//     // Create date header row in past table
//     const dateRow = document.createElement('tr');
//     const dateCell = document.createElement('td');
//     dateCell.colSpan = 4;
//     dateCell.innerText = Date: ${ dateStr };
//     dateCell.style.fontWeight = '700';
//     dateCell.style.background = '#e0f0ff';
//     dateRow.appendChild(dateCell);
//     pastTable.appendChild(dateRow);

//     const tbody = pastTable.tBodies[0] || pastTable.createTBody();
//     recentDiv.innerHTML = <h4>Recent Entries (${dateStr}):</h4>;

//     let stabilityScore = 100;

//     // Iterate over input rows
//     for (let i = 1; i < table.rows.length; i++) { // skip header
//         const inputRow = table.rows[i];
//         const checkup = inputRow.cells[0].innerText.toLowerCase();
//         const morning = inputRow.cells[1].querySelector('input').value || '-';
//         const afternoon = inputRow.cells[2].querySelector('input').value || '-';
//         const night = inputRow.cells[3].querySelector('input').value || '-';

//         // Add to past table (non-editable)
//         const row = tbody.insertRow();
//         [checkup, morning, afternoon, night].forEach(val => row.insertCell().innerText = val);

//         // Add to recent entries div
//         recentDiv.innerHTML += <div>${checkup} → Morning: ${morning}, Afternoon: ${afternoon}, Night: ${night}</div>;

//         // Stability calculation rules
//         [morning, afternoon, night].forEach(val => {
//             const num = parseFloat(val);
//             if (!isNaN(num)) {
//                 if (checkup.includes('glucose')) {
//                     if (num < 70 || num > 140) stabilityScore -= 15;
//                 } else if (checkup.includes('systolic')) {
//                     if (num >= 130 && num < 140) stabilityScore -= 10;
//                     else if (num >= 140) stabilityScore -= 20;
//                 } else if (checkup.includes('diastolic')) {
//                     if (num >= 80 && num < 90) stabilityScore -= 10;
//                     else if (num >= 90) stabilityScore -= 20;
//                 } else if (checkup.includes('heart rate')) {
//                     if (num < 60 || num > 100) stabilityScore -= 10;
//                 }
//             }
//         });
//     }

//     // Clear input fields
//     table.querySelectorAll('.input-cell').forEach(input => input.value = '');

//     // Determine status
//     let status = "Stable ✅";
//     let color = "#4caf50";
//     if (stabilityScore < 50) {
//         status = "Alert ❌";
//         color = "#f44336";
//     } else if (stabilityScore < 80) {
//         status = "Warning ⚠";
//         color = "#ff9800";
//     }

//     // Update dashboard
//     document.getElementById('score').innerText = stabilityScore + "%";
//     document.getElementById('score').style.color = color;
//     document.querySelector('#score').nextElementSibling.innerHTML = AI predicts: <strong>${status}</strong>;
// }

// // Community Posts
// function addPost() {
//     const input = document.getElementById("newPost");
//     if (input.value.trim() !== "") {
//         const post = document.createElement("div");
//         post.classList.add("post");
//         post.innerText = input.value;
//         document.getElementById("communityPosts").prepend(post);
//         input.value = "";
//     }
// }

// // Chart.js Progress Chart
// const ctx = document.getElementById('progressChart').getContext('2d');
// new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
//         datasets: [{
//             label: 'Health Stability',
//             data: [70, 75, 80, 85, 82],
//             borderColor: '#66a6ff',
//             backgroundColor: 'rgba(102,166,255,0.2)',
//             fill: true,
//             tension: 0.3
//         }]
//     },
//     options: {
//         responsive: true,
//         plugins: { legend: { display: false } }
//     }
// });

// function requestAppointment() {
//     const button = document.getElementById('requestConsultBtn');
//     const status = document.getElementById('appointmentStatus');

//     // Dummy patient info
//     const patientInfo = {
//         name: "John Doe",
//         age: 45,
//         condition: "High BP & Stress",
//         preferredTime: new Date().toLocaleString()
//     };

//     // Disable button to simulate processing
//     button.disabled = true;
//     button.innerText = "Requesting...";

//     // Simulate API call / appointment request delay
//     setTimeout(() => {
//         button.disabled = false;
//         button.innerText = "Request Video Consult";

//         // Show confirmation
//         status.innerHTML = `✅ Appointment Requested! <br>
//         Patient: ${patientInfo.name} <br>
//         Condition: ${patientInfo.condition} <br>
//         Scheduled Time: ${patientInfo.preferredTime}`;
//     }, 1500); // 1.5 seconds delay to simulate processing
// }
