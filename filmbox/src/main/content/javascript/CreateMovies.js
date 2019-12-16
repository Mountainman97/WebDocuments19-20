window.addEventListener("load", function (evt) {
    
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

function fillInformation (file) {

    var xmlDoc = file.responseXML;

    var movie = xmlDoc.getElementsByTagName("Movie");

    console.log(file);
    console.log(xmlDoc);
    console.log(movie);

    var movieTitle = "", movieRegie = "", movieYear = "", movieURL = "";


    // iterate thru the best 5 Movies ever
    for (var i = 0; i < 5; i++) {
        var m = movie[i].childNodes;
        movieTitle = m[1].textContent;
        movieRegie = m[3].textContent;
        movieYear = m[5].textContent;
        movieURL = m[7].textContent;

        console.log(movieURL);

        var element = document.createElement("div");
        element.className = "ranked";
        element.innerHTML = '<h2>' + (i+1) + '</h2> <a href="MovieInfo.html"><img class="movie" src="' + movieURL + '" alt="revenant" /></a><div class="description"><h3>' + 
            movieTitle + '</h3><p>Regie:' + movieRegie +'</p><p>Year:' + movieYear +'</p></div>';

        console.log(element);

        document.getElementsByClassName("ever")[0].appendChild(element);
    }

   // console.log(ever);

    // iterate thru the best 5 Movies last month
    for (var i = 5; i < movie.length; i++) {
        var m = movie[i].childNodes;
        movieTitle = m[1].textContent;
        movieRegie = m[3].textContent;
        movieYear = m[5].textContent;
        movieURL = m[7].textContent;

        var div = document.createElement("div");
        div.className = "ranked";
        div.innerHTML = '<h2>' + i + '</h2> <a href="MovieInfo.html"><img class="movie" src="' + movieURL + '" alt="revenant" /></a><div class="description"><h3>' + 
            movieTitle + '</h3><p>Regie:' + movieRegie +'</p><p>Year:' + movieYear +'</p></div>';

        document.getElementsByClassName("month")[0].appendChild(div);
    }
};


function fillInformation2 (file) {

    var xmlDoc = file.responseXML;
    var title = (location.pathname.substring(location.pathname.lastIndexOf("/") + 1));

    var tab = xmlDoc.getElementsByTagName("Tab");

    var elementImg = document.createElement("li");
    elementImg.innerHTML = '<img class="logo" src="resources/filmboxLogo.svg" alt="logo" />';
    document.getElementById("NavList").appendChild(elementImg);

    console.log(tab.length);

    for (var i = 0; i < tab.length; i++) {
        var tabTitle = "", tabDest = "", tabClass = "";
        var t = tab[i].childNodes;

        tabTitle = t[1].textContent;
        tabDest = t[3].textContent;

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

                    dropElement += '<a href="' + tempDest + '">' +  tempTitle + '</a>';
                }
            }


            element.className = "CollabseMovieNav";
            element.setAttribute("onmouseover" ,"showlist()");
            element.setAttribute("onmouseout" ,"hidelist()");
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