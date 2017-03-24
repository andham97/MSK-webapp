/**
 * Created by andreashammer on 17/12/2016.
 */
function extractDomainWithURL(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        var u = url.split('/');
        domain = u[0] + "//" + url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }
    return domain;
}

function extractCurrentDomain(){
    return extractDomainWithURL(window.location.href);
}