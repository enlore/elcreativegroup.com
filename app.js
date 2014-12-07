// core
var express     = require('express')
  , app         = express()
  , fs          = require('fs')
  , path        = require('path')
  , config      = JSON.parse(fs.readFileSync('config.json'))
  , bodyParser  = require('body-parser')
  ;

if (app.get("env") === "development" || app.get("env") === "debug") {
    console.debug = console.log.bind(null, "##### _ >")
}

// dependencies
var morgan      = require('morgan')
  ;

// express config
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'views'))

// app config
app.set('port', process.env.PORT || config.port || 3000)

if (app.get('env') === 'development') {
   app.locals.pretty = true
}

app.use(express.static(path.join(__dirname, 'static')))

app.use(morgan({
    format: 'dev',
    skip: function (req, res) {
        return res.satusCode === 304
    }
}))

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function (req, res) { res.render('index') })
app.get('/about-us', function (req, res) { res.render('about') })
app.get('/faq', function (req, res) { res.render('faq') })

app.get('/our-work', function (req, res) { res.render('our-work') })

app.get('/our-work/kate-dyer-campaign', function (req, res) { res.render('kate-dyer-campaign') })

app.get('/planner', function (req, res) { res.render('project-planner') })

app.post('/planner', function (req, res) {
    console.debug("In planner post")
    console.debug(req.body)
    res.redirect("/planner")
})

app.post('/contact-form', function (req, res) {
    console.log(req.body)
    res.json(200, {status: 'recieved, no action', body: req.body})
})

module.exports = app
