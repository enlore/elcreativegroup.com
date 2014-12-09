$(document).ready(function (e) {
    skrollr.init({forceHeight: false})

    /*
     * Navbar squeeze
     * ****************************/
    $window = $(window)
    $navbar = $('.navbar-elcg')
    $logo = $('.logo')
    $window.on('scroll', function (e) {
        console.log($(window).scrollTop())

        if ($window.scrollTop() >= 100) {
            $navbar.addClass('active')
            $logo.addClass('active')
        } else if ($window.scrollTop() < 100) {
            $navbar.removeClass('active')
            $logo.removeClass('active')
        }
    })

    /*
     * Loading masque
     * ****************************/
    setTimeout(function () {
        console.log('timeout fun')
        $('.masque').fadeOut(600, function () {
            $('.masque').removeClass('active')
        })
    }, 2000)

    /*
     * Contact form validation
     * ****************************/
    $contactForm = $('#contact-form')

    $contactForm.delegate('input.form-control, textarea', 'focus', function (e) {
        $contactForm.find('h3.success').text('Send Us A Message').removeClass('success')
    })

    $contactForm.on('submit', function (e) {
        e.preventDefault()

        var fieldsMessages = [
            {name: 'human_name', message: 'What\'s your name?', label: 'Your name:'},
            {name: 'phone', message: 'Can we have your number?', label: 'Your phone:'},
            {name: 'email', message: 'Can we have your email?', label: 'Your email:'},
            {name: 'message', message: 'What can we help you with?', label: 'What can we do for you?'}
        ]

        var hasErrors = false

        for (var i = 0; i < fieldsMessages.length; i ++) {
            var field = $contactForm.find('[name=' + fieldsMessages[i].name + ']')
            if (field.val() === '') {
                console.log(fieldsMessages[i].message)
                $contactForm.find('[for='+ fieldsMessages[i].name +']').text(fieldsMessages[i].message)
                field.parent('.form-group').addClass('has-error')
                hasErrors = true
            } else {
                $contactForm.find('[for='+ fieldsMessages[i].name +']').text(fieldsMessages[i].label)
                field.parent('.form-group').removeClass('has-error')
            }
        }

        if (!hasErrors) {
            e.target.submit()
        }
    })

    /*
     * Project planner interactions
     * ****************************/

    var $projectPlanner = $('#project-planner')
    $projectPlanner.delegate('.budget label', 'click', function (e) {
        console.log(e.target, " clicked")
        $(e.target).find('span').toggleClass("active")
    })

    $projectPlanner.delegate('.budget label span', 'click', function (e) {
        $(e.target).toggleClass('active')
    })
})
