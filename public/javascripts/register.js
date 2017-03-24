/**
 * Created by andreashammer on 25/09/2016.
 */
var showingError = false;
var t;
$(function(){
    $('.message a').click(function(){
        window.location = "/login";
    });
    $("#lpassword").on("keypress", function(e){
        if(e.keyCode == 13){
            login();
        }
    });
});

function register(){
    clearTimeout(t);
    $("#response").html("").slideUp(0).css("background", "#ff606c");
    if(!getCookie("cookieconsent_dismissed")){
        showingError = true;
        $("#response").html("<strong>You must allow cookies to access this site</strong>").slideDown("medium");
        return;
    }
    var date = new Date($("#birthDay").val());
    if($("#uname").val() == "") {
        error("Du må fylle inn et brukernavn");
        return;
    }
    else if($("#pwd").val() == ""){
        error("Du må fylle inn et passord");
        return;
    }
    else if($("#email").val() == ""){
        error("Du må fylle inn en E-post");
        return;
    }
    else if($("#name").val() == ""){
        error("Du må fylle inn navn");
        return;
    }
    else if($("#address").val() == ""){
        error("Du må fylle inn addresse");
        return;
    }
    else if($("#pnr").val() == ""){
        error("Du må fylle inn postnummer");
        return;
    }
    else if($("#ps").val() == ""){
        error("Du må fylle inn poststed");
        return;
    }
    else if($("#phoneNumber").val() == ""){
        error("Du må fylle inn telefonnummeret ditt");
        return;
    }
    else if($("#speidergruppe").val() == ""){
        error("Du må fylle inn speidergruppen du tilhører");
        return;
    }
    else if($("#regularPills").val() == ""){
        error("Du må fylle inn eventuell daglig medisinbruk (skriv evt. Ingen)");
        return;
    }
    else if($("#allergier").val() == ""){
        error("Du må fylle inn allergier (skriv evt. Ingen)");
        return;
    }
    else if(date == "Invalid Date"){
        error("Fødselsdagen er ikke en gyldig dato");
        return;
    }
    $.ajax({
        url: extractCurrentDomain() + "/api/user/register",
        method: "GET",
        data: {
            username: $("#uname").val(),
            password: $("#pwd").val(),
            email: $("#email").val(),
            name: $("#name").val(),
            address: $("#address").val() + ", " + $("#pnr").val() + " " + $("#ps").val(),
            allergier: $("#allergier").val(),
            phoneNumber: $("#phoneNumber").val(),
            photoPermission: $("#photoPermission").val(),
            regularPills: $("#regularPills").val(),
            speiderGruppe: $("#speidergruppe").val(),
            birthDay: date
        },
        success: function(data){
            showingError = true;
            $("#response").html("<strong>Success registering now you can login</strong>").css("background", "#76b852").slideDown("medium");
            t = setTimeout(function(){
                $("#response").slideUp("fast");
                showingError = false;
            }, 1500);
            window.location = "/login";
        },
        error: function(a){
            showingError = true;
            $("#response").html("<strong>" + a.responseText + "</strong>").slideDown("medium");
        }
    });
}

function error(msg){
    showingError = true;
    $("#response").html("<strong>" + msg + "</strong>").slideDown("medium");
    window.scrollTo(0, 0);
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}