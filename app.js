// core
var express     = require('express')
  , app         = express()
  , fs          = require('fs')
  , path        = require('path')
  , config      = JSON.parse(fs.readFileSync('config.json'))
  ;

// dependencies
var less        = require('less-middleware')
  , morgan      = require('morgan')

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
}

app.use(less(path.join(__dirname, 'less'), lessOptions))
app.use(express.static(path.join(__dirname, 'static')))
app.use(morgan({
    format: 'dev',
    skip: function (req, res) {
        return res.satusCode === 304
    }
}))

app.get('/', function (req, res) {
    res.render('index')
})

module.exports = app
