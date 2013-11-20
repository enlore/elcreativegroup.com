$(document).ready(function () {
    console.info('Ready!')

    var $nav_button = $('#nav-button')
        , $navbar = $('#navbar')
        , $left_panel = $('#left-panel')
        , $right_panel = $('#right-panel')

    $nav_button.on('click', function () {
        $navbar.toggleClass('active')
        $left_panel.toggleClass('active')
        $right_panel.toggleClass('active')
    })
})
