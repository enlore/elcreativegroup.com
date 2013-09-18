from flask import Flask
from config import Config
import logging
from logging.handlers import SMTPHandler, RotatingFileHandler
from logging import Formatter
from .frontend.views import frontend

def create_app():
    app = Flask('elcreativegroup')
    config_app(app, config=None)
    setup_logging(app)
    bootstrap_blueprints(app)
    return app

def bootstrap_blueprints(app):
    app.register_blueprint(frontend)

def config_app(app, config):
    if config is not None:
        app.config.from_object(config)
        app.logger.info('config from %s' % config)

    app.config.from_object(Config)

def setup_logging(app):
    if app.config['FILE_LOGGING']:
        # rotate them logs, boy
        fh = RotatingFileHandler(app.config['FILE_LOG'], 
                maxBytes=10000, backupCount=3 )
        log_format ="""
        =======================================================
        '%(asctime)s %(levelname)s: %(message)s '
            '[in %(pathname)s:%(lineno)d]'
        """
        fh.setFormatter(Formatter(log_format))
        app.logger.addHandler(fh)
        app.logger.info('LOGGING TO FILESYSTEM @ %s' % app.config['FILE_LOG'])

    if app.config['EMAIL_LOGGING']:
        # and the email handler
        serv = '127.0.0.1'
        sender = 'elcreateive@chilidog'
        rcpt = app.config['ADMINS']
        subj = u'[elcreativegroup.com BARFED]'
        mh = SMTPHandler(serv, sender, rcpt, subj)
        mh.setLevel(logging.ERROR)
        mail_format ="""
        OH JESUS
        Message type: %(levelname)s
        Location: %(pathname)s:%(lineno)d
        Module: %(module)s
        Function: %(funcName)s
        Time: %(asctime)s

        Message:

        %(message)s
        """
        mh.setFormatter(mail_format)
        app.logger.addHandler(mh)
        app.logger.info('LOGGING VIA EMAIL')
