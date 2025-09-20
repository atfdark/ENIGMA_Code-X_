from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

# --- User and Role Models ---

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(256))
    role = db.Column(db.String(50), nullable=False)  # 'doctor' or 'patient'

    # Relationships
    doctor = db.relationship('Doctor', back_populates='user', uselist=False)
    patient = db.relationship('Patient', back_populates='user', uselist=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.email}>'

class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    specialty = db.Column(db.String(120))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True)
    
    # Relationships
    user = db.relationship('User', back_populates='doctor')
    patients = db.relationship('Patient', backref='doctor', lazy='dynamic')
    appointments = db.relationship('Appointment', backref='doctor', lazy='dynamic')

    def __repr__(self):
        return f'<Doctor {self.full_name}>'

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    date_of_birth = db.Column(db.Date)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True)

    # Relationships
    user = db.relationship('User', back_populates='patient')
    appointments = db.relationship('Appointment', backref='patient', lazy='dynamic')
    health_entries = db.relationship('HealthEntry', backref='patient', lazy='dynamic')

    def __repr__(self):
        return f'<Patient {self.full_name}>'

# --- Health Data and Appointment Models ---

class HealthEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    entry_type = db.Column(db.String(50), nullable=False)  # 'diabetes' or 'bp'
    data = db.Column(db.JSON, nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'))

    def __repr__(self):
        return f'<HealthEntry {self.entry_type} on {self.timestamp}>'

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    reason = db.Column(db.String(200))
    status = db.Column(db.String(50), default='Scheduled')  # e.g., 'Scheduled', 'Completed', 'Cancelled'
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'))
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'))

    def __repr__(self):
        return f'<Appointment with Dr. {self.doctor_id} on {self.date}>'

