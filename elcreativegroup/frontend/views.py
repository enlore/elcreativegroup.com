from flask import Blueprint

frontend = Blueprint('frontend', __name__, template_folder='templates')

@frontend.route('/')
def index():
    return 'oh hair'
