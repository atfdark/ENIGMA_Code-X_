document.addEventListener('DOMContentLoaded', function() {
    // --- Sidebar Toggle Logic (for all pages) ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }
    
    document.addEventListener('click', function(event) {
        if (sidebar && sidebar.classList.contains('open') && !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('open');
        }
    });

    // --- Patient Page: Live Search/Filter Logic ---
    const patientSearchInput = document.getElementById('patientSearch');
    const patientTableBody = document.getElementById('patientTableBody');

    if (patientSearchInput && patientTableBody) {
        patientSearchInput.addEventListener('keyup', function() {
            const searchTerm = patientSearchInput.value.toLowerCase();
            const tableRows = patientTableBody.getElementsByTagName('tr');

            for (let i = 0; i < tableRows.length; i++) {
                const row = tableRows[i];
                const rowText = row.textContent || row.innerText;
                
                if (rowText.toLowerCase().includes(searchTerm)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            }
        });
    }

    // --- Appointments Page Tab Logic ---
    const tabs = document.querySelectorAll('.tab-link');
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function(event) {
                event.preventDefault();
                const targetId = this.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);

                document.querySelectorAll('.appointment-list-full').forEach(list => {
                    list.style.display = 'none';
                });
                tabs.forEach(t => t.classList.remove('active'));

                if (targetContent) {
                    targetContent.style.display = 'flex';
                }
                this.classList.add('active');
            });
        });
    }

    // --- NEW: Reports Page Filter Logic ---
    const reportSearchInput = document.getElementById('reportSearch');
    const reportTypeFilter = document.getElementById('filterByType');
    const reportList = document.getElementById('reportList');

    if (reportList && (reportSearchInput || reportTypeFilter)) {
        const reportItems = reportList.querySelectorAll('.report-item');

        function filterReports() {
            const searchTerm = reportSearchInput.value.toLowerCase();
            const typeFilter = reportTypeFilter.value;

            reportItems.forEach(item => {
                const itemText = item.textContent || item.innerText;
                const itemType = item.getAttribute('data-type');
                
                const matchesSearch = itemText.toLowerCase().includes(searchTerm);
                const matchesType = (typeFilter === "") || (itemType === typeFilter);

                if (matchesSearch && matchesType) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
            });
        }

        if (reportSearchInput) {
            reportSearchInput.addEventListener('keyup', filterReports);
        }
        if (reportTypeFilter) {
            reportTypeFilter.addEventListener('change', filterReports);
        }
    }
});