window.onload = function () {
  loadDivContent();
  // Andra åtgärder som ska utföras när sidan laddas
};

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

// Funktion för att spara `div`-innehållet i localStorage
function saveDivContent() {
  // Hämta innehållet från `div`
  var divContent = document.getElementById("editableDiv").innerHTML;

  // Hämta den befintliga arrayen från localStorage, eller skapa en ny om den inte finns
  var savedContent = localStorage.getItem("divContentArray");
  var contentArray = savedContent ? JSON.parse(savedContent) : [];

  // Lägg till det nya innehållet i arrayen
  contentArray.push(divContent);

  // Spara den uppdaterade arrayen i localStorage
  localStorage.setItem("divContentArray", JSON.stringify(contentArray));
}

// Funktion för att hämta och visa innehållet från localStorage
function loadDivContent() {
  var savedContent = localStorage.getItem("divContentArray");
  if (savedContent) {
    var contentArray = JSON.parse(savedContent);
    // Här kan du bearbeta och visa varje element i arrayen efter behov
    // Till exempel: visa det senaste sparade innehållet
    document.getElementById("editableDiv").innerHTML =
      contentArray[contentArray.length - 1];
  }
}

document.getElementById("saveButton").addEventListener("click", saveDivContent);

document.getElementById("getButton").addEventListener("click", function () {
  // Hämta sparade data från localStorage
  var savedContent = localStorage.getItem("divContentArray");
  if (savedContent) {
    var contentArray = JSON.parse(savedContent);
    // Anta att du vill visa det senaste innehållet
    var latestContent = contentArray[contentArray.length - 1];
    // Visa innehållet i en div
    document.getElementById("contentDisplayDiv").innerHTML = latestContent;
  } else {
    console.log("Inget innehåll finns sparad i localStorage");
  }
});

// Exempelanvändning
saveDivContent(); // Anropa denna funktion när du vill spara innehållet
loadDivContent(); // Anropa denna funktion när du vill läsa in sparade innehåll
