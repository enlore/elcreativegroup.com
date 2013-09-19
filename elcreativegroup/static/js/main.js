$(document).ready(function () {
    var leftFace = $('#left-face')
        ,rightFace = $('#right-face')
        ,faceContainer = $('div.face-box')
        ,containerWidth = faceContainer.width()
        ,offset = faceContainer.offset()

    console.log('width: ' + containerWidth)

    faceContainer.mouseenter(function (e) {
        $(this).mousemove(function(e) {
            leftFace.css({ width: containerWidth - (e.pageX - offset.left) })
            rightFace.css({ width: e.pageX - offset.left })
        }) 
    }).mouseleave(function () {
        leftFace.css({'width': '50%'}) 
        rightFace.css({'width': '50%'})
    })
})
