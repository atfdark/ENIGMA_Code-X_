// This script will be shared across all doctor-facing pages
document.addEventListener('DOMContentLoaded', function() {
    const API_URL = '/api'; // Use relative URL since it's served from the same domain

    // --- Sidebar Toggle Logic (for mobile) ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('open');
        });
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('open') && !sidebar.contains(e.target)) {
                 sidebar.classList.remove('open');
            }
        });
    }

    // --- Page-specific Logic ---
    const page = document.body.id;

    if (page === 'dashboard-page') {
        fetchSummaryData();
        fetchUpcomingAppointments();
    }
    if (page === 'patients-page') {
        fetchAllPatients();
        document.getElementById('patientSearch')?.addEventListener('keyup', filterPatients);
    }
    if (page === 'appointments-page') {
        // You can add appointment fetching logic here
    }
    if (page === 'reports-page') {
        // You can add reports fetching logic here
    }


    // --- Data Fetching Functions ---
    async function fetchSummaryData() {
        try {
            const response = await fetch(`${API_URL}/doctors/dashboard-summary`);
            const data = await response.json();
            renderSummaryCards(data);
        } catch (error) {
            console.error("Error fetching summary data:", error);
        }
    }

    async function fetchUpcomingAppointments() {
        try {
            const response = await fetch(`${API_URL}/doctors/upcoming-appointments`);
            const data = await response.json();
            renderAppointments(data, 'appointment-list');
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    }
    
    async function fetchAllPatients() {
        try {
            const response = await fetch(`${API_URL}/doctors/patients`);
            const patients = await response.json();
            renderPatientsTable(patients);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    }

    // --- Rendering Functions ---
    function renderSummaryCards(data) {
        const container = document.getElementById('summary-cards');
        if(!container) return;
        container.innerHTML = `
            <div class="card"><div class="card-icon blue"><i class="fas fa-calendar-check"></i></div><div class="card-info"><h3>${data.appointments_today}</h3><p>Appointments Today</p></div></div>
            <div class="card"><div class="card-icon green"><i class="fas fa-user-plus"></i></div><div class="card-info"><h3>${data.new_patients}</h3><p>New Patients</p></div></div>
            <div class="card"><div class="card-icon yellow"><i class="fas fa-envelope-open-text"></i></div><div class="card-info"><h3>${data.unread_messages}</h3><p>Unread Messages</p></div></div>
            <div class="card"><div class="card-icon red"><i class="fas fa-vial"></i></div><div class="card-info"><h3>${data.pending_lab_results}</h3><p>Pending Labs</p></div></div>`;
    }

    function renderAppointments(appointments, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        if (appointments.length === 0) {
            container.innerHTML = '<p>No upcoming appointments.</p>';
            return;
        }
        container.innerHTML = appointments.map(apt => `
            <div class="appointment-item">
                <img src="https://placehold.co/90x90/e6f0fa/333?text=${apt.patient_name.charAt(0)}" alt="Patient" class="patient-avatar">
                <div class="appointment-details"><h4>${apt.patient_name}</h4><p>${apt.reason}</p></div>
                <div class="appointment-time">${apt.time}</div>
            </div>`).join('');
    }

    function renderPatientsTable(patients) {
        const tableBody = document.getElementById('patientTableBody');
        if (!tableBody) return;
        tableBody.innerHTML = patients.map(p => `
            <tr>
                <td><div class="patient-name-cell"><img src="https://placehold.co/90x90/e6f0fa/333?text=${p.name.charAt(0)}" alt="Patient" class="patient-avatar-small"><span>${p.name}</span></div></td>
                <td>${p.last_visit}</td>
                <td>${p.diagnosis}</td>
                <td><span class="status status-${p.status}">${p.status}</span></td>
                <td><button class="action-btn"><i class="fas fa-eye"></i></button><button class="action-btn"><i class="fas fa-pen"></i></button></td>
            </tr>`).join('');
    }

    // --- Filter Logic ---
    function filterPatients() {
        const searchTerm = document.getElementById('patientSearch').value.toLowerCase();
        const rows = document.getElementById('patientTableBody').getElementsByTagName('tr');
        for (let row of rows) {
            row.style.display = row.textContent.toLowerCase().includes(searchTerm) ? "" : "none";
        }
    }
});
