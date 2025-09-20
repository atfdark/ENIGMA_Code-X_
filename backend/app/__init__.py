import sys
import os

# --- NEW CODE TO FIX THE IMPORT ERROR ---
# This forces Python to look for files in your 'backend' folder.
# It makes the import system more robust, regardless of how you run the script.
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
# --- END OF NEW CODE ---

from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

# Create the extension objects globally
db = SQLAlchemy()
migrate = Migrate()
socketio = SocketIO(cors_allowed_origins="*")

def create_app(config_class=Config):
    """
    Creates and configures the Flask application.
    """
    app = Flask(__name__,
                static_folder='../static',
                template_folder='../templates')
    
    app.config.from_object(config_class)

    # Initialize Extensions with the App
    db.init_app(app)
    migrate.init_app(app, db)
    socketio.init_app(app)
    CORS(app)

    # --- Register Blueprints ---
    from app.routes import main_bp
    app.register_blueprint(main_bp)

    from app.api import bp as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')

    # Import events and models
    from . import events, models

    return app

