from flask import request, jsonify, redirect, url_for
from app import db
from app.models import User, Doctor, Patient
from app.api import bp

@bp.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'message': 'Email address already in use'}), 400

    user = User(
        name=data.get('name'),
        email=data.get('email'),
        role=data.get('role')
    )
    user.set_password(data.get('password'))
    db.session.add(user)
    db.session.commit()

    if user.role == 'doctor':
        doctor = Doctor(user_id=user.id, license_number=data.get('license'))
        db.session.add(doctor)
    elif user.role == 'patient':
        patient = Patient(user_id=user.id, status='New')
        db.session.add(patient)
    
    db.session.commit()
    
    return jsonify({'message': 'Registration successful'}), 201

@bp.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    user = User.query.filter_by(email=data.get('email')).first()
    
    if user is None or not user.check_password(data.get('password')):
        return jsonify({'message': 'Invalid email or password'}), 401
    
    # In a real app, you would create a session token (JWT) here
    # For now, we just confirm success.
    
    return jsonify({'message': 'Login successful', 'role': user.role}), 200
