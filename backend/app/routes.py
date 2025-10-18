from flask import Blueprint, render_template

# --- THIS IS THE FIX ---
# We define the blueprint here, making this file self-contained.
main_bp = Blueprint('main', __name__)

# --- Public Pages ---

@main_bp.route('/')
def landing_page():
    """This is the instruction for the main homepage."""
    return render_template('landing.html')

@main_bp.route('/selection')
def selection_page():
    return render_template('role_sel.html')

# --- Authentication Pages ---

@main_bp.route('/doctor/login')
def doc_login_page():
    return render_template('doc_login.html')

@main_bp.route('/patient/login')
def patient_login_page():
    return render_template('pateint.html')

# --- Doctor-Protected Pages ---

@main_bp.route('/doctor/dashboard')
def dashboard():
    return render_template('doc_dash.html')

@main_bp.route('/doctor/patients')
def patients():
    return render_template('pat_page.html')

@main_bp.route('/doctor/appointments')
def appointments():
    return render_template('appointments.html')

@main_bp.route('/doctor/reports')
def reports():
    return render_template('reports.html')

# --- Patient-Protected Page ---

@main_bp.route('/patient/dashboard')
def patient_dashboard():
    return render_template('pat_dash.html')

@main_bp.route('/patient/entries')
def patient_entries():
    return render_template('entries.html')



