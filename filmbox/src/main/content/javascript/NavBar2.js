window.addEventListener("load", function(evt) {

    var request = new XMLHttpRequest();

    request.open("GET", "https://mountainman97.github.io/WebDocuments19-20/filmbox/src/main/content/xml/nav.xml", true);
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            fillInformation(request);
        }
    };
});