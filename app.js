var express             = require('express')
    , app               = express()
    , less_middleware   = require('less-middleware')
    , path              = require('path')
    , routes            = require('./routes')

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

app.get('/', routes.index)
app.get('/blog', function (req, res) { res.render('blog') })
app.get('/tarboosh', routes.tarboosh)
app.get('/ahlure', routes.ahlure)
app.get('/cafedelight', routes.cafedelight)
app.get('/logos', routes.logos)

app.get('/palettes', function (req, resp) {
    resp.render('palettes')
})

exports.start = function (port) {
    app.listen(port, function () {
        console.info('** Listening on localhost:%s', port)
    })
}
