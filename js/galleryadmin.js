var modal = document.getElementById("myModal");
var btn = document.getElementById("myButton");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
};
span.onclick = function() {
  modal.style.display = "none";
};
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
function renderModal(id) {
  window.index = id;
  var editModal = document.getElementById("editModal");
  editModal.style.display = "block";
  var editSpan = document.getElementsByClassName("editClose")[0];
  editSpan.onclick = function() {
    editModal.style.display = "none";
  };
  document.getElementById("editUrl").value = myArray.images[id].url;
  document.getElementById("editName").value = myArray.images[id].name;
  document.getElementById("editInfo").value = myArray.images[id].info;
  document.getElementById("editDate").value = myArray.images[id].date;
}
function deleteImage() {
  if (localStorage.getItem("images")) {
    var myArray = JSON.parse(localStorage.getItem("images"));
    myArray.images.splice(window.index, 1);
    localStorage.setItem("images", JSON.stringify(myArray));

    myFunction(myArray);
  }
}
function validateForm(imageUrl, imageName, imageInfo, imageUploadedDate) {
  if (imageUrl == "") {
    alert("Please enter a non-empty url");
    return false;
  }
  if (imageUrl.match(/\.(jpeg|jpg|gif|png)$/) == null) {
    alert("Please enter a valid url");
    return false;
  }
  if (imageName == "") {
    alert("Please enter a non-empty name for the image");
    return false;
  }
  if (imageUploadedDate == "") {
    alert("Please enter a non-empty date");
    return false;
  }
  var dateParts = imageUploadedDate.split("/");
  var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  if (dateObject == "Invalid Date") {
    alert("Please enter a valid date");
    return false;
  }
  return true;
}
function addImage() {
  console.log("Add image called");
  if (!localStorage.getItem("images")) {
    var xobj = new XMLHttpRequest();
    xobj.open("GET", "imagesList.json", false);
    xobj.send(null);
    var myArray = JSON.parse(xobj.responseText);
  } else {
    var myArray = JSON.parse(localStorage.getItem("images"));
  }
  var imageUrl = document.forms["imageForm"]["url"].value;
  var imageName = document.forms["imageForm"]["name"].value;
  var imageInfo = document.forms["imageForm"]["info"].value;
  var imageUploadedDate = document.forms["imageForm"]["date"].value;

  if (!validateForm(imageUrl, imageName, imageInfo, imageUploadedDate)) {
    return;
  }

  console.log(imageUrl + " " + imageName);
  myArray.images.push({
    //add the image
    name: imageName,
    url: imageUrl,
    info: imageInfo,
    date: imageUploadedDate
  });
  localStorage.setItem("images", JSON.stringify(myArray));
  console.log(
    "localStorage object:" + JSON.parse(localStorage.getItem("images"))
  );
  var obj = JSON.parse(localStorage.getItem("images"));
  //console.log("obj" + obj.images[0].url);
  myFunction(obj);
}
function editImage() {
  var imageUrl = document.getElementById("editUrl").value;
  var imageName = document.getElementById("editName").value;
  var imageInfo = document.getElementById("editInfo").value;
  var imageUploadedDate = document.getElementById("editDate").value;
  if (!validateForm(imageUrl, imageName, imageInfo, imageUploadedDate)) {
    return;
  }
  console.log(window.index);
  var editArray = JSON.parse(localStorage.getItem("images"));
  editArray.images[window.index].name = imageName;
  editArray.images[window.index].url = imageUrl;
  editArray.images[window.index].info = imageInfo;
  editArray.images[window.index].date = imageUploadedDate;
  localStorage.setItem("images", JSON.stringify(editArray));
}
if (!localStorage.getItem("images")) {
  var xobj = new XMLHttpRequest();
  xobj.open("GET", "imagesList.json", false);
  xobj.send(null);
  var myArray = JSON.parse(xobj.responseText);
} else {
  var myArray = JSON.parse(localStorage.getItem("images"));
}
localStorage.setItem("images", JSON.stringify(myArray));

myFunction(myArray);
function myFunction(arr) {
  console.log(arr);
  var out = "";
  var i;
  console.log(arr.images[0]);
  for (i = 0; i < arr.images.length; i++) {
    out +=
      '<img src="' +
      arr.images[i].url +
      '" onclick="renderModal(' +
      i +
      ')" height="300px" width="280px"/>';
  }

  document.getElementById("showImages").innerHTML = out;
}
