if (!localStorage.getItem("images")) {
  var xobj = new XMLHttpRequest();
  xobj.open("GET", "imagesList.json", false);
  xobj.send(null);
  var jsonObject = JSON.parse(xobj.responseText);
  localStorage.setItem("images", JSON.stringify(jsonObject));
}
var myArray = JSON.parse(localStorage.getItem("images"));

localStorage.setItem("images", JSON.stringify(myArray));
console.log(
  "localStorage object:" + JSON.parse(localStorage.getItem("images"))
);

//console.log("obj" + obj.images[0].url);
myFunction(myArray);
function myFunction(arr) {
  console.log(arr);
  var out = "";
  var i;
  console.log(arr.images[0]);
  for (i = 0; i < arr.images.length; i++) {
    out +=
      '<img src="' + arr.images[i].url + '" height="300px" width="280px"/>';
  }
  document.getElementById("showImages").innerHTML = out;
}
