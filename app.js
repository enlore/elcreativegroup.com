// core
var express     = require('express')
  , app         = express()
  , fs          = require('fs')
  , path        = require('path')
  , config      = JSON.parse(fs.readFileSync('config.json'))
  , bodyParser  = require('body-parser')
  ;

// dependencies
var less        = require('less-middleware')
  , morgan      = require('morgan')
  ;

// express config
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'views'))

// app config
app.set('port', process.env.PORT || config.port || 3000)

var lessOptions = {
    debug: false,
    dest: path.join(__dirname, 'static'),
    preprocess: {
        path: function (pathname, req) {
            return pathname.replace('/css', '') 
        } 
    }
}

if (app.get('env') === 'development') {
   lessOptions.debug = true 
   app.locals.pretty = true
}

app.use(less(path.join(__dirname, 'less'), lessOptions))
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

app.get('/portfolio/kate-dyer-campaign', function (req, res) {
    res.render('kate_dyer_campaign')
})

app.post('/contact-form', function (req, res) {
    console.log(req.body)
    res.json(200, {status: 'recieved, no action', body: req.body})
})

module.exports = app
