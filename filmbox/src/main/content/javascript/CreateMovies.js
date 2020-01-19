window.addEventListener("load", function(evt) {

    var request = new XMLHttpRequest();

    request.open("GET", "https://mountainman97.github.io/WebDocuments19-20/filmbox/src/main/content/xml/nav.xml", true);
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            fillInformation(request);
        }
    };

    var request2 = new XMLHttpRequest();

    request2.open("GET", "https://mountainman97.github.io/WebDocuments19-20/filmbox/src/main/content/xml/movies.xml", true);
    request2.send();

    request2.onreadystatechange = function() {
        if (request2.readyState == 4 && request2.status == 200) {
            fillInformation2(request2);
        }
    };
});

function fillInformation2(file) {

    var xmlDoc = file.responseXML;

    var movie = xmlDoc.getElementsByTagName("Movie");

    var movieTitle = "",
        movieRegie = "",
        movieYear = "",
        movieURL = "";

    // iterate thru the best 5 Movies ever
    for (var i = 0; i < 5; i++) {
        var m = movie[i].childNodes;
        movieTitle = m[1].textContent;
        movieRegie = m[3].textContent;
        movieYear = m[5].textContent;
        movieURL = m[7].textContent;
        var div = document.createElement("div");
        div.className = "ranked";
        div.innerHTML = "<h2>" + (i + 1) + "</h2>";

        var a = document.createElement("a");
        a.setAttribute("href", "MovieInfo.html");
        a.setAttribute("data-id", movieTitle);
        a.setAttribute("onclick", "saveMovie(this.getAttribute('data-id'))")
        a.innerHTML = '<img class="movie" src="' + movieURL + '" alt="' + movieTitle + '" height="auto" width="300"/>';

        var des = document.createElement("div");
        des.className = "description";
        des.innerHTML = '<h2>' + movieTitle + '</h2><p>Regie:' + movieRegie + '</p><p>Year:' + movieYear + '</p>';

        div.appendChild(a);
        div.appendChild(des);

        console.log(div);

        document.getElementsByClassName("ever")[0].appendChild(div);
    }

    // console.log(ever);

    // iterate thru the best 5 Movies last month
    for (var j = 5; j < 10; j++) {
        var m = movie[j].childNodes;
        movieTitle = m[1].textContent;
        movieRegie = m[3].textContent;
        movieYear = m[5].textContent;
        movieURL = m[7].textContent;

        var div = document.createElement("div");
        div.className = "ranked";
        div.innerHTML = "<h2>" + (j - 4) + "</h2>";


        var a = document.createElement("a");
        a.setAttribute("href", "MovieInfo.html");
        a.setAttribute("data-id", movieTitle);
        a.setAttribute("onclick", "saveMovie(this.getAttribute('data-id'))")
        a.innerHTML = '<img class="movie" src="' + movieURL + '" alt="' + movieTitle + '" height="auto" width="300" />';

        var des = document.createElement("div");
        des.className = "description";
        des.innerHTML = '<h2>' + movieTitle + '</h2><p>Regie:' + movieRegie + '</p><p>Year:' + movieYear + '</p>';

        div.appendChild(a);
        div.appendChild(des);

        console.log(div);

        document.getElementsByClassName("month")[0].appendChild(div);
    }
};

function saveMovie(movie) {
    // passing the clicked id to next page
    sessionStorage.setItem('movieID', movie);
}