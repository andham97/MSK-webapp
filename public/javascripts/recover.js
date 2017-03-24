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

function recover(){
    clearTimeout(t);
    showingError = true;
    $("#response").html("<strong>Behandler</strong>").slideDown("medium").css("background", "#ffb658");
    $.ajax({
        url: extractCurrentDomain() + "/api/user/recover",
        method: "GET",
        data: {
            email: $("#email").val()
        },
        success: function(data){
            if(data.err) {
                $("#response").html("<strong>" + data.err + "</strong>").slideDown("medium").css("background", "#ff606c");
                t = setTimeout(function(){
                    $("#response").slideUp("fast");
                    showingError = false;
                }, 1500);
            }
            else {
                $("#response").html("<strong>E-post er sendt</strong>").slideDown("medium").css("background", "#76b852");
                t = setTimeout(function(){
                    $("#response").slideUp("fast");
                    showingError = false;
                }, 1500);
            }
        },
        error: function(a){
            $("#response").html("<strong>" + a.responseText + "</strong>").slideDown("medium").css("background", "#ff606c");
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