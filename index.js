var app = require('./app')

app.listen(app.get('port'), function () {
    console.log('~~~~~> Listening on %s in %s mode', app.get('port'), app.get('env'))
})
