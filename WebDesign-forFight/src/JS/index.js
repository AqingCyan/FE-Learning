$(function() {
    $('.panel').css({'height': $(window).height()});
    $.scrollify({
        section: '.panel'
    });

    $('.counter').countUp({
        delay: 10,
        time: 2000
    });
});

