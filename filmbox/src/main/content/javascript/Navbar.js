window.addEventListener("load", function(evt) {

    var request = new XMLHttpRequest();

    request.open("GET", "https://mountainman97.github.io/WebDocuments19-20/filmbox/src/main/content/xml/nav.xml", true);
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            fillInformation(request);
        }
    };

    this.console.log(request.readyState);
});

function fillInformation(file) {

    var xmlDoc = file.responseXML;
    var title = (location.pathname.substring(location.pathname.lastIndexOf("/") + 1));

    var tab = xmlDoc.getElementsByTagName("Tab");

    var element = document.createElement("li");
    element.innerHTML = '<img class="logo" src="resources/filmboxLogo.svg" alt="logo" />';
    document.getElementById("NavList").appendChild(element);

    for (var i = 0; i < tab.length; i++) {
        var tabTitle = "",
            tabDest = "",
            tabClass = "",
            tabKey = "";
        var t = tab[i].childNodes;

        tabTitle = t[1].textContent;
        tabDest = t[3].textContent;
        tabKey = t[4].textContent; //accessKey

        if (tabDest == title) {
            tabClass = "active";
        }

        var element = document.createElement("li");

        if (t.length > 5) {
            var dropElement = "";
            for (var j = 5; j < t.length; j++) {
                if (t[j].childNodes[1] != null) {
                    var tempTitle = t[j].childNodes[1].textContent;
                    var tempDest = t[j].childNodes[3].textContent;
                    var tempAccesskey = t[j].lastChild.textContent;
                    dropElement += '<a href="' + tempDest + '"  accesskey="' + tempAccesskey + '" >' + tempTitle + '</a>';
                }
            }

            element.className = "CollabseMovieNav";
            element.setAttribute("onmouseover", "showlist()");
            element.setAttribute("onmouseout", "hidelist()");
            element.innerHTML = '<a class="' + tabClass + '" href="' + tabDest + '">' + tabTitle + '</a>' +
                '<div id="movielist">' + dropElement + '</div>';

            console.log(element);

            document.getElementById("NavList").appendChild(element);
        } else {
            element.innerHTML = '<a class="' + tabClass + '" href="' + tabDest +
                '">' + tabTitle + '</a></li>';
            document.getElementById("NavList").appendChild(element);
        }

    }
};