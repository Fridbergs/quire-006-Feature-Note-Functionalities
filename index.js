//Kod för att kunna flytta på bilden.
const resizableImage = document.getElementById("resizableImage");

resizableImage.addEventListener("input", function () {
  // Uppdatera bildens storlek baserat på användarens ändringar
  const newWidth = resizableImage.width;
  const newHeight = resizableImage.height;
  resizableImage.style.width = newWidth + "px";
  resizableImage.style.height = newHeight + "px";
});
