document.getElementById("fileInput").addEventListener("change", function (e) {
  let file = e.target.files[0];
  if (!file.type.startsWith("image/")) {
    return;
  }

  let reader = new FileReader();
  reader.onload = function (e) {
    let img = document.createElement("img");
    img.src = e.target.result;
    img.style.width = "100%";
    img.style.height = "auto";
    img.style.resize = "both";
    img.style.overflow = "hidden";
    img.id = "resizableImage"; // Tilldela ID

    document.getElementById("editableDiv").appendChild(img);
    addResizeListeners(img); // Lägg till eventlyssnare för den nya bilden
  };
  reader.readAsDataURL(file);
});

//Funktion för att ändra storlek på bilden
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
  let divContent = document.getElementById("editableDiv").innerHTML;

  // Kontrollera om innehållet är tomt eller bara innehåller blanksteg
  if (divContent.trim() === "") {
    console.log("Inget innehåll att spara");
    return; // Avsluta funktionen om det inte finns något innehåll att spara
  }

  // Hämta den befintliga arrayen från localStorage, eller skapa en ny om den inte finns
  let savedContent = localStorage.getItem("divContentArray");
  let contentArray = savedContent ? JSON.parse(savedContent) : [];

  // Lägg till det nya innehållet i arrayen
  contentArray.push(divContent);

  // Spara den uppdaterade arrayen i localStorage
  localStorage.setItem("divContentArray", JSON.stringify(contentArray));
}

// Funktion för att hämta och visa innehållet från localStorage
function loadDivContent() {
  let savedContent = localStorage.getItem("divContentArray");
  if (savedContent) {
    let contentArray = JSON.parse(savedContent);
    // Här kan du bearbeta och visa varje element i arrayen efter behov
    // Till exempel: visa det senaste sparade innehållet
    document.getElementById("editableDiv").innerHTML =
      contentArray[contentArray.length - 1];
  }
}

document.getElementById("saveButton").addEventListener("click", saveDivContent);

document.getElementById("getButton").addEventListener("click", function () {
  // Hämta sparade data från localStorage
  let savedContent = localStorage.getItem("divContentArray");
  if (savedContent) {
    let contentArray = JSON.parse(savedContent);
    // Anta att du vill visa det senaste innehållet
    let latestContent = contentArray[contentArray.length - 1];
    // Visa innehållet i en div
    document.getElementById("contentDisplayDiv").innerHTML = latestContent;
  } else {
    console.log("Inget innehåll finns sparat i localStorage");
  }
});

// Exempelanvändning
saveDivContent(); // Anropa denna funktion när du vill spara innehållet
// loadDivContent(); // Anropa denna funktion när du vill läsa in sparade innehåll
