import os

# Get the absolute path of the directory where this file is located
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    """Base configuration settings for the Flask app."""
    
    # A secret key is needed for session management and other security features
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'a-super-secret-key-that-you-should-change'
    
    # --- Database Configuration ---
    # This is the crucial line that the error is asking for.
    # It tells SQLAlchemy where to find your database file.
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
        
    # This disables a feature of SQLAlchemy that is not needed and adds overhead.
    SQLALCHEMY_TRACK_MODIFICATIONS = False

