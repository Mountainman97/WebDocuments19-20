window.addEventListener("load", function (evt) {
    
    var request = new XMLHttpRequest();

    request.open("GET", "https://mountainman97.github.io/WebDocuments19-20/filmbox/src/main/resources/movies.xml", true);
    request.send();

    request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			fillInformation(request);
		}
    };

    this.console.log(request.readyState);
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
        element.innerHTML = '<h2>' + (i+1) + '</h2> <a href="MovieInfo.xhtml"><img class="movie" src="' + movieURL + '" alt="revenant" /></a><div class="description"><h3>' + 
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
        div.innerHTML = '<h2>' + i + '</h2> <a href="MovieInfo.xhtml"><img class="movie" src="' + movieURL + '" alt="revenant" /></a><div class="description"><h3>' + 
            movieTitle + '</h3><p>Regie:' + movieRegie +'</p><p>Year:' + movieYear +'</p></div>';

        document.getElementsByClassName("month")[0].appendChild(div);
    }
};