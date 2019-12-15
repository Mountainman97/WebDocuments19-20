window.addEventListener("load", function (evt) {
    
    var request = new XMLHttpRequest();

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			fillInformation(request);
		}
    };
    
    request.open("GET", "/resources/test.xml", true);
    request.send();

    this.console.log(request.readyState);
});

function fillInformation (file) {

    var xmlDoc = file.responseXML;

    var movie = null;
    var movieTitle = "Frozen 2";
    var movieAuthor = "J.J. Abrams";

    movie = xmlDoc.getElementById("1");
    movieTitle = movie.childNodes[0].textContent;

    document.getElementById("OrangePanner").innerHTML = "<h2>" + movieTitle + "</h2>";

}