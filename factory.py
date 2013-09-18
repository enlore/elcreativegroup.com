from flask import Flask

def create_app():
    app = Flask('elcreativegroup')
    config_app(app)
    return app

def config_app(config):
    if config is not None:
        app.config.from_object(config)
        app.logger.info('config from %s' % config)
