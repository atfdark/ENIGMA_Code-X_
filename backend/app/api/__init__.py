from flask import Blueprint

# Create the blueprint object
bp = Blueprint('api', __name__)

# Import the routes files at the bottom.
# This attaches the routes defined in those files to the blueprint 'bp'.
from app.api import routes, auth