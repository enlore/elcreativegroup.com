var express = require('express')
    , app = express()
    , less_middleware = require('less-middleware')
    , path = require('path')

app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'views'))

var less_opts = {
    prefix  : 'css'
    , src   : path.join(__dirname, 'static')
    , paths : path.join(__dirname, 'static')
}

app.configure('development', function () {
    app.locals.pretty = true
    less_opts.compress = false
    less_opts.debug = true
})

app.configure('production', function () {
    app.locals.pretty = false
    less_opts.compress = true
    less_opts.debug = false
})

app.use(less_middleware(less_opts))
app.use(express.static(path.join(__dirname, 'static')))

app.get('/', function (req, resp) {
    resp.render('index', {})
})

exports.start = function (port) {
    app.listen(port, function () {
        console.info('** Listening on localhost:%s', port)
    })
}
