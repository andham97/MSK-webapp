/**
 * Created by andreashammer on 30/12/2016.
 */
var showingError = false;
var t;
function add(){
    clearTimeout(t);
    showingError = true;
    $("#response").html("<strong>Behandler</strong>").slideDown("medium").css("background", "#ffb658");
    $.ajax({
        url: extractCurrentDomain() + "/api/trip/add",
        method: "GET",
        data: {
            heading: $("#heading").val(),
            dateOfEvent: new Date($("#dateOfEvent").val()),
            arrangerGroup: $("#arranger").val(),
            description: $("#desc").val()
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
                $("#response").html("<strong>Turen er opprettet</strong>").slideDown("medium").css("background", "#76b852");
                t = setTimeout(function(){
                    $("#response").slideUp("fast");
                    showingError = false;
                    window.location = "/trip/myTrips";
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