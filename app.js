// core
var express     = require('express')
  , app         = express()
  , fs          = require('fs')
  , path        = require('path')
  , config      = JSON.parse(fs.readFileSync('config.json'))
  , bodyParser  = require('body-parser')
  ;

var mg = require("./email")

var jade = require("jade")

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

app.get('/our-work', function (req, res) { res.render('our-work') })

app.get('/our-work/kate-dyer-campaign', function (req, res) { res.render('kate-dyer-campaign') })

app.get('/planner', function (req, res) { res.render('project-planner') })

app.post('/planner', function (req, res) {
    console.debug("In planner post")
    console.debug(req.body)

    var serviceKeys = ["web-design", "branding", "print-design", "social-media"]

    var services = []

    for (var i = 0; i < serviceKeys.length; i++) {
        if (serviceKeys[i] in req.body) {
            services.push(req.body[serviceKeys[i]])
        }
    }
    console.log(services)

    var templateOptions = {
        globals: [],
        name: req.body.human_name,
        phone: req.body.phone,
        email: req.body.email,
        budget: req.body.budget,
        description: req.body['proj-description'],
        services: services,
        startDate: req.body["start-date"],
        doneDate: req.body["done-date"],
        timestamp: new Date()
    }

    var emailData = {
        from: "ELCG_APP@elcreativegroup.com",
        to: ["nick@elcreativegroup.com", "n.e.lorenson@gmail.com"],
        subject: "Project Planner Submissions",
        html: jade.renderFile("views/email/planner-submission.jade", templateOptions)
    }

    mg.messages().send(emailData, function (err, resBody) {
        if (err) {
            res.redirect("/planner")
            throw err
        }

        console.log(JSON.stringify(resBody))
        res.redirect("/thanks")
    })
})

app.get("/thanks", function (req, res) {
    res.render("thanks")
})

app.post('/contact-form', function (req, res) {
    console.log(req.body)
    res.json(200, {status: 'recieved, no action', body: req.body})
})

app.get("/our-work/clarksville-roller-derby", function (req, res) {
    res.render("rrs")
})

module.exports = app
