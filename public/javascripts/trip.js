/**
 * Created by andreashammer on 25/12/2016.
 */
$(function(){
    $("#participate").click(function(){
        var ttt = this;
        bootbox.confirm({
            message: "Er du sikker på at du vil melde deg " + ($("#participate").html() == "Meld deg av" ? "av" : "på") + " turen?",
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
                    url: extractCurrentDomain() + "/api/trip/participate",
                    method: "GET",
                    data: {
                        id: $(ttt).data("id")
                    },
                    success: function (d) {
                        if (d.add)
                            $("#participate").addClass("button-error").removeClass("button-success").html("Meld deg av");
                        else
                            $("#participate").addClass("button-success").removeClass("button-error").html("Meld deg på");
                        $.notify(d.add ? "Du er meldt på turen" : "Du er meldt av turen", {className: "success"});
                    },
                    error: function (a) {
                        $.notify(a.responseText, {className: "error"});
                    }
                });
            }
        });
    });
});