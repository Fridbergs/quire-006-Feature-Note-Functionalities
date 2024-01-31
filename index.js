document.getElementById("fileInput").addEventListener("change", function (e) {
  let file = e.target.files[0]; // Hämta den valda filen

  if (!file.type.startsWith("image/")) {
    return;
  } // Se till att det är en bildfil

  let img = document.createElement("img");
  img.classList.add("image");
  img.file = file;

  // Läs in och visa bilden
  let reader = new FileReader();
  reader.onload = (function (aImg) {
    return function (e) {
      aImg.src = e.target.result;
    };
  })(img);

  reader.readAsDataURL(file);

  // Lägg till bilden i container
  let container = document.getElementById("imageContainer");

  container.appendChild(img);
});

document.getElementById("customButton").addEventListener("click", function () {
  document.getElementById("fileInput").click();
});

document.getElementById("fileInput").addEventListener("change", function () {
  let fileInput = document.getElementById("fileInput");
  let chosenFile = fileInput.files[0];
  if (chosenFile) {
    document.getElementById("fileChosen").textContent = chosenFile.name;
  } else {
    document.getElementById("fileChosen").textContent = "Ingen fil vald";
  }
});
