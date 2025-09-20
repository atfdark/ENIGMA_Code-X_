from flask import render_template, Blueprint

# This creates a new "blueprint" for your main pages.
# Think of it as a way to organize your page URLs.
main_bp = Blueprint('main', __name__)

# --- Public Pages ---

@main_bp.route('/')
def landing_page():
    """This is the instruction for the main homepage."""
    return render_template('landing.html')

@main_bp.route('/selection')
def selection_page():
    return render_template('selection.html')

# --- Authentication Pages ---

@main_bp.route('/doctor/login')
def doc_login_page():
    return render_template('doc_login.html')

@main_bp.route('/patient/login')
def patient_login_page():
    return render_template('patient_login.html')

# --- Doctor-Protected Pages ---

@main_bp.route('/doctor/dashboard')
def dashboard():
    return render_template('doc-dash.html')

@main_bp.route('/doctor/patients')
def patients():
    return render_template('patients.html')

@main_bp.route('/doctor/appointments')
def appointments():
    return render_template('appointments.html')

@main_bp.route('/doctor/reports')
def reports():
    return render_template('reports.html')

# --- Patient-Protected Page (Placeholder) ---

@main_bp.route('/patient/dashboard')
def patient_dashboard():
    # This will eventually be the patient dashboard
    return render_template('pat_dash.html')

