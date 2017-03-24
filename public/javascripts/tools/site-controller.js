/**
 * Created by andreashammer on 26/09/2016.
 */
$(function() {
    $("img.mobile").click(function () {
        $(".sidebar").slideToggle('fast');
    });

    window.onresize = function (event) {
        if ($(window).width() > 480) {
            $(".sidebar").show();
        }
    };
    $(".spacer").each(function () {
        $(this).css('height', $(this).data('space') + "px");
    });
    window.scrollTo(0, 0);
});