/**
 * Created by andreashammer on 23/09/2016.
 */
$(function() {
    $("div").click(function () {
        var id = $(this).data("id");
        if(id == undefined)
            return;
        window.location = "/trip?id=" + id;
    });
});