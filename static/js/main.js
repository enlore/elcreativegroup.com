$(document).ready(function (e) {
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
            var contactjqXHR = $.ajax('/contact-form', {
                type: 'POST',
                headers: {
                    'X-CSRF-Token': $contactForm.find('[name="_csrf"]').val()
                },
                data: {
                    humane_name : $contactForm.find('[name=human_name]').val(),
                    phone       : $contactForm.find('[name=phone]').val(), 
                    email       : $contactForm.find('[name=email]').val(), 
                    message     : $contactForm.find('[name=message]').val() 
                }
            })

            contactjqXHR.done(function (data, stat, jqXHR) {
                console.log(stat, data) 
                var $fields = $contactForm.find('input[type=text], textarea')

                $fields.each(function (_, field) {
                    $(field).val('') 
                })

                $contactForm.find('h3').replaceWith('<h3 class="success">Thanks! We\'ll be in touch soon.</h3>')
            })

            contactjqXHR.fail(function (jqXHR, stat, err) {
                // stat can be:
                //  null
                //  'timeout'
                //  'error'
                //  'abort'
                //  'parseerror'

                console.log(stat)

                if (err) {
                    console.log(err)
                }
            })
        }
    })
})
