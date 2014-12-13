;(function ($) {
    $(document).ready(function (e) {
        //skrollr.init({forceHeight: false})

        /*
         * Navbar squeeze
         * ****************************/
        $window = $(window)
        $navbar = $('.navbar-elcg')
        $logo = $('.logo')
        $window.on('scroll', function (e) {
            //console.log($(window).scrollTop())

            if ($window.scrollTop() >= 100) {
                $navbar.addClass('active')
                $logo.addClass('active')
            } else if ($window.scrollTop() < 100) {
                $navbar.removeClass('active')
                $logo.removeClass('active')
            }
        })

        /*
         * Form validator
         * **************/
        function validateForm(e, form, fieldsMessages) {
            var hasErrors = false
            // should i jQuery this element? what happens if i jQuery an already jQueried element?
            $form = form

            fieldsMessages.forEach(function (elem, index) {
                $field = $form.find("[name=" + elem.name +"]")

                if ($field.prop("type") === "radio") {
                    // one member of a radio group must be checked
                }

                else if ($field.prop("type") === "checkbox") {
                    // at least one checkbox must be checked
                }

                else {
                    // text and textarea types are required to have content
                    if ($field.val() === "") {
                        $field.siblings('label').text(elem.message)
                        $field.parent('.form-group').addClass('has-error')
                        $field.parents('fieldset').find('legend').addClass('has-error')
                        hasErrors = true
                    } else {
                        $field.parent('.form-group').removeClass('has-error')
                        $field.parents('fieldset').find('legend').removeClass('has-error')
                        $field.siblings('label').text(elem.label)
                    }
                }
            })

            if (!hasErrors) {
                e.target.submit()
            }
        }

        /*
         * Project planner interactions
         * ****************************/
        var $projectPlanner = $('#project-planner')

        var budgetElems = [
            "#budget-1",
            "#budget-2",
            "#budget-3",
            "#budget-4"
        ]

        budgetElems.forEach(function (elem, index) {
            $projectPlanner.delegate(elem, 'click', function (e) {
                // clear the visual cue from the other, now inactive controls
                budgetElems.forEach(function (elem, index) {
                    $(elem).find(".control").removeClass("active")
                    $(elem).find('label').removeClass("active")
                })

                // toggle the visual cue on the active control
                $(elem).find('label').addClass("active")
                $(elem).find('.control').addClass("active")

                // and set its state to checked
                $(elem).find('input[type=radio]').prop("checked", true)
            })
        })

        var servicesElems = [
            "#branding-control",
            "#social-media-control",
            "#print-design-control",
            "#web-design-control"
        ]


        servicesElems.forEach(function (elem) {
            $projectPlanner.delegate(elem, 'click', function (e) {
                $(elem).find("label").toggleClass("active")
                $(elem).find("span").toggleClass("active")
                $(elem).find(".control").toggleClass("active")

                var checkbox = $(elem).find("input[type=checkbox]")
                checkbox.prop("checked", !checkbox.is(":checked"))

                console.log(checkbox.is(":checked"))
            })
        })

        $projectPlanner.on("submit", function (e) {
            e.preventDefault()

            var ppFieldsMessages = [
                {name: 'human_name', message: 'What\'s your name?', label: 'Your name:'},
                {name: 'phone', message: 'Can we have your number?', label: 'Your phone:'},
                {name: 'email', message: 'Can we have your email?', label: 'Your email:'},
                {name: 'budget', message: "Please enter a budget", label: ""},
                {name: 'start-date', message: "When do you need to start?", label: "Ideal start date"},
                {name: 'done-date', message: "When do you need it done?", label: "Ideal done date"},
                {name: 'proj-description', message: "Tell us about your project.", label: "Description"},
            ]

            validateForm(e, $projectPlanner, ppFieldsMessages)
        })
    })
}).call(this, jQuery)
