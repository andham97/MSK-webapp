/**
 * Created by andreashammer on 08/01/2017.
 */
var t;
function updatePassword(){
    var newPassword = $("#npassword").val();
    var check = $("#rpassword").val();
    if(newPassword != check){
        $("#response").html("<strong>The new passwords must match</strong>").css("background", "#ff654d").slideDown("medium");
        t = setTimeout(function(){
            $("#response").slideUp("fast");
            showingError = false;
        }, 1500);
        return;
    }
    $.ajax({
        url: extractCurrentDomain() + "/api/user/update",
        method: "GET",
        data: {
            check: {
                password: $("#lpassword").val()
            },
            data: {
                password: newPassword
            }
        },
        success: function(){
            $("#response").html("<strong>Success</strong>").css("background", "#76b852").slideDown("medium");
            t = setTimeout(function(){
                $("#response").slideUp("fast");
                showingError = false;
            }, 1500);
        },
        error: function(a){
            $("#response").html("<strong>" + a.responseText + "</strong>").css("background", "#ff654d").slideDown("medium");
            t = setTimeout(function(){
                $("#response").slideUp("fast");
                showingError = false;
            }, 1500);
        }
    });
}

function logout(){
    document.cookie = "_id=a;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    window.location = "/login";
}