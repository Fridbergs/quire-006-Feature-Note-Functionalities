document.getElementById("fileInput").addEventListener("change", function (e) {
  var file = e.target.files[0];
  if (!file.type.startsWith("image/")) {
    return;
  }

  var reader = new FileReader();
  reader.onload = function (e) {
    var img = document.createElement("img");
    img.src = e.target.result;
    img.style.width = "100%";
    img.style.height = "auto";
    img.style.resize = "both";
    img.style.overflow = "auto";
    img.id = "resizableImage"; // Tilldela ID

    document.getElementById("editableDiv").appendChild(img);
    addResizeListeners(img); // Lägg till eventlyssnare för den nya bilden
  };
  reader.readAsDataURL(file);
});

function addResizeListeners(img) {
  let isResizing = false;
  let startX, startY, startWidth, startHeight;

  img.addEventListener("dblclick", () => {
    isResizing = !isResizing;
    img.classList.toggle("resizable");
  });

  img.addEventListener("mousedown", (e) => {
    if (isResizing) {
      startX = e.clientX;
      startY = e.clientY;
      startWidth = img.offsetWidth;
      startHeight = img.offsetHeight;
      e.preventDefault();
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (isResizing) {
      let newWidth = startWidth + e.clientX - startX;
      let newHeight = startHeight + e.clientY - startY;
      img.style.width = newWidth + "px";
      img.style.height = newHeight + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    isResizing = false;
  });
}
