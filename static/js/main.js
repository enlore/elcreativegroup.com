$(document).ready(function (e) {
    $contactForm = $('#contact-form') 

    $contactForm.on('submit', function (e) {
        e.preventDefault() 

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
    })
})
