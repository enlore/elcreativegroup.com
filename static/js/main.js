$(document).ready(function () {
    console.info('Ready!')

    var $nav_button         = $('#nav-button')
        , $navbar           = $('#navbar')
        , $left_panel       = $('#left-panel')
        , $right_panel      = $('#right-panel')
        , $portfolio_anchor = $('#portfolio-anchor')

    $nav_button.on('click', function () {
        $navbar.toggleClass('active')
        $left_panel.toggleClass('active')
        $right_panel.toggleClass('active')
    })

    $portfolio_anchor.on('click', function () {
        $navbar.toggleClass('active')
        $left_panel.toggleClass('active')
        $right_panel.toggleClass('active')
    })
})
