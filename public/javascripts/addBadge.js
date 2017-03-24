/**
 * Created by andreashammer on 30/12/2016.
 */
var showingError = false;
var t;
function add(){
    clearTimeout(t);
    showingError = true;
    $("#response").html("<strong>Behandler</strong>").slideDown("medium").css("background", "#ffb658");
    var arr = $("#req").val().split("\n");
    for(var i = 0; i < arr.length; i++){
        if(arr[i] == "") {
            arr.splice(i, 1);
            i = 0;
        }
    }
    $.ajax({
        url: extractCurrentDomain() + "/api/badge/add",
        method: "GET",
        data: {
            title: $("#title").val(),
            description: $("#desc").val(),
            requirements: arr
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
                    window.location = "/badges";
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