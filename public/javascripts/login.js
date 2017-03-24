/**
 * Created by andreashammer on 25/09/2016.
 */
var showingError = false;
var t;
$(function(){
    $('.message a').click(function(){
        if($(this).attr('id') == "rec")
            window.location = "/recover";
        else
            window.location = "/register";
    });
    $("#lpassword").on("keypress", function(e){
        if(e.keyCode == 13){
            login();
        }
    });
    document.cookie = "timeoffset=" + (new Date()).getTimezoneOffset() / -60;
    if(getCookie("_id")){
        window.location = "/";
    }
});

function login(){
    clearTimeout(t);
    $("#response").html("").slideUp(0).css("background", "#ff606c");
    if(!getCookie("cookieconsent_dismissed")){
        showingError = true;
        $("#response").html("<strong>You must allow cookies to access this site</strong>").slideDown("medium");
        return;
    }
    $.ajax({
        url: extractCurrentDomain() + "/api/user/login",
        method: "GET",
        data: {
            username: $("#lusername").val(),
            password: $("#lpassword").val()
        },
        success: function(data){
            if(data.err) {
                showingError = true;
                $("#response").html("<strong>" + data.err + "</strong>").slideDown("medium");
                return;
            }
            var d = new Date();
            d.setHours(23);
            d.setMinutes(59);
            d.setSeconds(59);
            document.cookie = "_id=" + data._id + ";expires=" + d.toGMTString();
            window.location = "/";
        },
        error: function(a){
            showingError = true;
            $("#response").html("<strong>" + a.responseText + "</strong>").slideDown("medium");
        }
    });
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}