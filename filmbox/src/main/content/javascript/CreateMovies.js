window.addEventListener("load", function(evt) {

    var request = new XMLHttpRequest();

    request.open("GET", "https://mountainman97.github.io/WebDocuments19-20/filmbox/src/main/content/xml/movies.xml", true);
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            fillInformation(request);
        }
    };

    var request2 = new XMLHttpRequest();

    request2.open("GET", "https://mountainman97.github.io/WebDocuments19-20/filmbox/src/main/content/xml/nav.xml", true);
    request2.send();

    request2.onreadystatechange = function() {
        if (request2.readyState == 4 && request2.status == 200) {
            fillInformation2(request2);
        }
    };
});

function saveMovie(movie) {
    // passing the clicked id to next page
    sessionStorage.setItem('movieID', movie);
}

function fillInformation2(file) {

    var xmlDoc = file.responseXML;
    var title = (location.pathname.substring(location.pathname.lastIndexOf("/") + 1));

    var tab = xmlDoc.getElementsByTagName("Tab");

    var elementImg = document.createElement("li");
    elementImg.innerHTML = '<img class="logo" src="resources/filmboxLogo.svg" alt="logo" height="50" width="auto"/>';
    document.getElementById("NavList").appendChild(elementImg);

    for (var i = 0; i < tab.length; i++) {
        var tabTitle = "",
            tabDest = "",
            tabClass = "";
            tabKey = "";
        var t = tab[i].childNodes;

        tabTitle = extractTerm(t[1].textContent);
        tabDest = extractTerm(t[3].textContent);
        tabKey = extractTerm(t[5].textContent);

        if (tabDest == title) {
            tabClass = "active";
        }

        var element = document.createElement("li");

        if (t.length > 7) {
            var dropElement = "";
            for (var j = 5; j < t.length; j++) {
                if (t[j].childNodes[1] != null) {
                    var tempTitle = t[j].childNodes[1].textContent;
                    var tempDest = t[j].childNodes[3].textContent;
                    var tempKey = extractLetter(t[j].childNodes[5].textContent);
                    dropElement += '<a href="' + tempDest + '"  accesskey="' + tempKey + '" >' + tempTitle + '</a>';
                }
            }


            element.className = "CollabseMovieNav";
            element.setAttribute("onmouseover", "showlist()");
            element.setAttribute("onmouseout", "hidelist()");
            element.innerHTML = '<a class="' + tabClass + '" href="' + tabDest + '" accesskey="' + tabKey + '">' + tabTitle + '</a>' +
                '<div id="movielist">' + dropElement + '</div>';

            document.getElementById("NavList").appendChild(element);
        } else {
            element.innerHTML = '<a class="' + tabClass + '" accesskey="' + tabKey + '" href="' + tabDest +
                '">' + tabTitle + '</a></li>';
            document.getElementById("NavList").appendChild(element);
        }

    }
};