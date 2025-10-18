from app import db
from app.models import HealthEntry
from app.api import bp
from flask import request, jsonify

@bp.route('/entries', methods=['POST'])
def add_entry():
    data = request.get_json() or {}
    if 'entry_type' not in data or 'data' not in data:
        return jsonify({'error': 'Missing data'}), 400

    entry = HealthEntry(entry_type=data['entry_type'], data=data['data'])
    db.session.add(entry)
    db.session.commit()
    return jsonify({'message': 'Entry created successfully'}), 201

@bp.route('/entries', methods=['GET'])
def get_entries():
    entries = HealthEntry.query.order_by(HealthEntry.timestamp.desc()).all()
    results = [
        {
            'id': entry.id,
            'entry_type': entry.entry_type,
            'data': entry.data,
            'timestamp': entry.timestamp.strftime('%Y-%m-%d %H:%M:%S')
        } for entry in entries
    ]
    return jsonify(results)

@bp.route('/dashboard-stats', methods=['GET'])
def get_dashboard_stats():
    # --- Stability Score Calculation ---
    # A simple algorithm based on the latest Blood Pressure entry
    latest_bp_entry = HealthEntry.query.filter_by(entry_type='bp').order_by(HealthEntry.timestamp.desc()).first()
    stability_score = 80 # Default score
    prediction = "Stable"

    if latest_bp_entry:
        systolic_avg = (int(latest_bp_entry.data.get('morning_systolic', 120)) +
                        int(latest_bp_entry.data.get('afternoon_systolic', 120)) +
                        int(latest_bp_entry.data.get('night_systolic', 120))) / 3
        if systolic_avg > 140:
            stability_score = 55
            prediction = "High Risk"
        elif systolic_avg > 130:
            stability_score = 72
            prediction = "Slightly Elevated"

    # --- Chart Data Calculation ---
    # Get the last 5 stability scores to show progress
    recent_entries = HealthEntry.query.filter_by(entry_type='bp').order_by(HealthEntry.timestamp.asc()).limit(5).all()
    chart_labels = [entry.timestamp.strftime('%b %d') for entry in recent_entries]
    chart_data = []
    for entry in recent_entries:
        systolic_avg = (int(entry.data.get('morning_systolic', 120)) +
                        int(entry.data.get('afternoon_systolic', 120)) +
                        int(entry.data.get('night_systolic', 120))) / 3
        score = 80
        if systolic_avg > 140: score = 55
        elif systolic_avg > 130: score = 72
        chart_data.append(score)

    return jsonify({
        'stability_score': stability_score,
        'prediction': prediction,
        'chart_data': {
            'labels': chart_labels,
            'data': chart_data
        }
    })

