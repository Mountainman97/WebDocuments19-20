function extractTerm(string) {
    var temp = string.split("\n\t\t\t");
    var result = temp[1].split("\n\t\t");
    return result[0];
}

function extractLetter(string) {
    var temp = string.split("\n\t\t\t\t");
    var result = temp[1].split("\n\t\t");
    return result[0];
}

function fillInformation(file) {

    var xmlDoc = file.responseXML;
    var title = (location.pathname.substring(location.pathname.lastIndexOf("/") + 1));

    var tab = xmlDoc.getElementsByTagName("Tab");

    var element = document.createElement("li");
    element.innerHTML = '<img class="logo" src="resources/filmboxLogo.svg" height="50" width="auto" alt="logo" />';
    document.getElementById("NavList").appendChild(element);

    var tabCounter = 0;

    for (var i = 0; i < tab.length; i++) {
        var tabTitle = "",
            tabDest = "",
            tabClass = "",
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
                    dropElement += '<a href="' + tempDest + '"  accesskey="' + tempKey + '" tabindex="' + tabCounter + '">' + tempTitle + '</a>';
                    tabCounter++;
                }
            }

            element.className = "CollabseMovieNav";
            element.setAttribute("onmouseover", "showlist()");
            element.setAttribute("onmouseout", "hidelist()");
            element.innerHTML = '<a class="' + tabClass + '" href="' + tabDest + '" accesskey="' + tabKey + '" tabindex="' + tabCounter + '">' + tabTitle + '</a>' +
                '<div id="movielist">' + dropElement + '</div>';
            tabCounter++;

            document.getElementById("NavList").appendChild(element);
        } else {
            element.innerHTML = '<a class="' + tabClass + '" accesskey="' + tabKey + '" href="' + tabDest +
                '" tabindex="' + tabCounter + '">' + tabTitle + '</a></li>';
            tabCounter++;
            document.getElementById("NavList").appendChild(element);
        }

    }
};