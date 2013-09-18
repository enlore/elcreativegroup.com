class DefaultConfig():
    FILE_LOGGING = True

class DevConfig(DefaultConfig):
    EMAIL_LOGGING = False
    SECRET_KEY = 'this is like totally a dev key'
    DEBUG = True
    DB_URI = '/tmp/elcreativegroup.db'
    FILE_LOG = '/tmp/elcreativegroup.info.log'

class Config(DevConfig):
    pass
