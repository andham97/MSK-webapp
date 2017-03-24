/**
 * Created by andreashammer on 28/12/2016.
 */
var router = {};

router.getMenu = function(user, url){
    var ret = "";
    console.log(url);
    if(user.tripAdmin)
        ret += "<li><a" + (url == "/myTrips" ? " class='selected'" : "") + " href='/trip/myTrips'><img src='/images/icons/calendar.png'> Mine turer<img src='/images/icons/arrow.png' class='arrow'></a></li>";
    return ret;
};

module.exports = router;