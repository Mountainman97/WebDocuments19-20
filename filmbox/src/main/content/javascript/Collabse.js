/*used in FAQ
 */
function showOnClick(id) {
	var x = document.getElementById(id);
	if (x.style.display === "block") {
		x.style.display = "none";
	} else {
		x.style.display = "block";
	}
}


function showlist() {
	var list = document.getElementById("movielist");
	var orangePanner = document.getElementById("OrangePanner");
	list.style.display = "block";
	orangePanner.style.display = "none"
}

function hidelist() {
	var list = document.getElementById("movielist");
	var orangePanner = document.getElementById("OrangePanner");
	list.style.display = "none";
	orangePanner.style.display = "block"
}