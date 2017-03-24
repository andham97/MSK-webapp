/**
 * Created by andreashammer on 23/09/2016.
 */
$(function() {
    $("div").click(function () {
        var id = $(this).data("id");
        if(id == undefined || window.location.search != "")
            return;
        window.location = "/badges?id=" + id;
    });
    $("#participate").click(function(){
        var ttt = this;
        bootbox.confirm({
            message: "Er du sikker på at du har fullført merket?",
            buttons: {
                confirm: {
                    label: 'Ja',
                    className: 'button-success'
                },
                cancel: {
                    label: 'Nei',
                    className: 'button-error'
                }
            },
            callback: function (result) {
                if (!result)
                    return;
                $.ajax({
                    url: extractCurrentDomain() + "/api/badge/completed",
                    method: "GET",
                    data: {
                        id: $(ttt).data("id")
                    },
                    success: function (d) {
                        $(ttt).after(function(){
                            return "<span class='pure-button button-success'>Allerede fullført</span>";
                        }).remove();
                        $.notify("Registrert", {className: "success"});
                    },
                    error: function (a) {
                        $.notify(a.responseText, {className: "error"});
                    }
                });
            }
        });
    });
});