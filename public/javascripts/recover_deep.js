/**
 * Created by andreashammer on 25/09/2016.
 */
var showingError = false;
var t;
$(function(){
    $("#email").on("keypress", function(e){
        if(e.keyCode == 13){
            recover();
        }
    });
});

function recover(id){
    clearTimeout(t);
    $("#response").html("").slideUp(0).css("background", "#ff606c");
    if($("#np").val() != $("#rnp").val()){
        bootbox.alert("Passordene må være like, prøv igjen");
        $("#np").val("");
        $("#rnp").val("");
        return;
    }
    $.ajax({
        url: extractCurrentDomain() + "/api/user/recover_deep",
        method: "GET",
        data: {
            id: id,
            password: $("#np").val()
        },
        success: function(data){
            if(data.err) {
                showingError = true;
                $("#response").html("<strong>" + data.err + "</strong>").slideDown("medium");
                t = setTimeout(function(){
                    $("#response").slideUp("fast");
                    showingError = false;
                }, 1500);
            }
            else {
                showingError = true;
                $("#response").html("<strong>Passordet er tilbakestillt</strong>").slideDown("medium").css("background", "#76b852");
                setTimeout(function(){
                    window.location = '/login';
                }, 2000);
            }
        },
        error: function(a){
            showingError = true;
            $("#response").html("<strong>" + a.responseText + "</strong>").slideDown("medium");
            t = setTimeout(function(){
                $("#response").slideUp("fast");
                showingError = false;
            }, 1500);
        }
    });
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}