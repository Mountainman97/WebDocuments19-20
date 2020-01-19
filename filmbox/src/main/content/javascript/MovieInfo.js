function saveMovie(movie) {
    // passing the clicked id to next page
    sessionStorage.setItem('movieID', movie);
}

window.addEventListener("load", function(evt) {

    var request2 = new XMLHttpRequest();

    request2.open("GET", "https://mountainman97.github.io/WebDocuments19-20/filmbox/src/main/content/xml/movies.xml", true);
    request2.send();

    request2.onreadystatechange = function() {
        if (request2.readyState == 4 && request2.status == 200) {
            fillInformation(request2);
        }
    };
});

function fillInformation(file) {

    xmlDoc = file.responseXML;
    var title = (location.pathname.substring(location.pathname.lastIndexOf("/") + 1));
    var id = this.sessionStorage.getItem('movieID');

    var movie = xmlDoc.getElementsByTagName("Movie");

    console.log(id);
    console.log(title);

    // catch that we only run this function when we are on MovieInfo.html
    if (title === "MovieInfo.html") {

        for (var i = 0; i < movie.length; i++) {
            var chosen = movie[i];

            console.log(chosen);

            var movieTitle = "",
                movieRegie = "",
                movieYear = "",
                movieURL = "";

            var movieProd = "",
                movieMusic = "",
                movieRun = "",
                moviePlot = "";

            // check if clicked Movie was found
            if (chosen.id == id) {
                console.log(chosen);

                var container = document.getElementsByTagName("main");

                movieTitle = chosen.childNodes[1].textContent;
                movieRegie = chosen.childNodes[3].textContent;
                movieYear = chosen.childNodes[5].textContent;
                movieURL = chosen.childNodes[7].textContent;
                movieProd = chosen.childNodes[9].textContent;
                movieMusic = chosen.childNodes[11].textContent;
                movieRun = chosen.childNodes[13].textContent;
                moviePlot = chosen.childNodes[15].textContent;

                // <div class="img"> ... </div>
                var img = document.createElement("div");
                img.className = "img";
                img.innerHTML = '<img class="movieimg" src="' + movieURL + '" alt="..." height="auto" width="300"/>';

                console.log(img);

                var text = document.createElement("div");
                text.className = "text";

                text.innerHTML = '<div class="information"><div><p><strong>Year:</strong></p>' +
                    '<p><strong>Directed:</strong></p><p><strong>Producer:</strong></p>' +
                    '<p><strong>Music:</strong></p><p><strong>Running time:</strong></p>' +
                    '</div><div class="right"><p>' + movieYear + '</p><p>' + movieRegie + '</p>' +
                    '<p>' + movieProd + '</p><p>' + movieMusic + '</p><p>' + movieRun + ' minutes' +
                    '</p></div></div><div class="description"><h2>Plot</h2><p>' + moviePlot +
                    '</p></div>';

                console.log(text);

                console.log(container);

                document.getElementById("main").appendChild(img);
                document.getElementById("main").appendChild(text);

                document.getElementById("MovieTitle").innerHTML = movieTitle;
            }
        }


    } // else on other page -> wait for possible onCLick

};