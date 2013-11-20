$(document).ready(function () {
    console.info('Ready!')

    var $nav_button = $('#nav-button')
        , $navbar = $('#navbar')

    $nav_button.on('click', function () {
        $navbar.toggleClass('active')
    })
})
