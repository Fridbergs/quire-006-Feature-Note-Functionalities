document.getElementById("uploadButton").addEventListener("click", function () {
  document.getElementById("fileInput").click(); // Triggar klick på den dolda filväljaren
});

document.getElementById("fileInput").addEventListener("change", function (e) {
  let file = e.target.files[0];
  if (!file.type.startsWith("image/")) {
    return;
  } // Se till att det är en bildfil

  let reader = new FileReader();
  reader.onload = function (e) {
    let img = document.createElement("img");
    img.src = e.target.result;

    img.style.maxWidth = "100%"; // Exempelstorlek, kan ändras
    img.style.MaxHeight = "100%";
    img.style.height = "auto";

    img.style.resize = "both";
    img.style.overflow = "auto";

    document.getElementById("editableDiv").appendChild(img);
  };
  reader.readAsDataURL(file);
});
