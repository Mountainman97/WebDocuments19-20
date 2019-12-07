window.addEventListener("load", function (evt) {
    readXMLData("./filmbox/src/main/resources/test.xml", showXMLData);
});

function readXMLData (xmlFilePath, successCallback, errorCallback) {
    var successCallback = typeof successCallback === "function" 
      ? successCallback : function (data) {console.log(data);};
    var errorCallback = typeof errorCallback === "function" 
      ? errorCallback : function (data) {console.log("Error:", data);};
    var xmlhttp = new XMLHttpRequest();     
    // register the onload event which triggers when 
    // loading was finished and no errors were encountered
    xmlhttp.onload = function (evt) {
      successCallback(xmlhttp.responseXML); 
    }
    // register the onerror event which triggers when 
    // errors are encountered (e.g., missing file, invalid content, etc)
    xmlhttp.onerror = function () {
      errorCallback("failed to load the XML file: " + xmlFilePath); 
    }
    // start reading the file (asynchronous operation)
    xmlhttp.open("GET", xmlFilePath);
    xmlhttp.send();
  };

  function showXMLData (xmlDoc) {
        var i = 0, j = 0, n = 0, movieTitle = "";

        var movieXMLEl = null;
        var movieDiv = null;

        var htmlParentEl = document.getElementById("xmlDataContainer");
        var xmlDocRootEl =  xmlDoc.getElementsByTagName("library")[0];
        var bookXMLElements = xmlDocRootEl.getElementsByTagName("Movie");

        for (i = 0; i < bookXMLElements.length; i++) {
            movieXMLEl = bookXMLElements.item(i);
            movieDiv = document.createElement("div");
            movieDiv.classList.add("movie");
            
            movieTitle = document.createElement("p");
            movieTitle.innerHTML = movieXMLEl.getElementsByTagName("title")[0].textContent;
            movieDiv.append(movieTitle);

            htmlParentEl.append(movieDiv);
        }
  }