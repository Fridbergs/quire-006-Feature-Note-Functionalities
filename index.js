const resizableImage = document.getElementById("resizableImage");
let isResizing = false;
let startX, startY, startWidth, startHeight;

resizableImage.addEventListener("dblclick", () => {
  if (isResizing) {
    isResizing = false;
    resizableImage.classList.remove("resizable");
  } else {
    resizableImage.classList.add("resizable");
    isResizing = true;
  }

  resizableImage.addEventListener("mouseup", (e) => {
    if (isResizing) {
      startX = e.clientX;
      startY = e.clientY;
      startWidth = resizableImage.offsetWidth;
      startHeight = resizableImage.offsetHeight;
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (isResizing) {
      let newWidth = startWidth + e.clientX - startX;
      let newHeight = startHeight + e.clientY - startY;
      resizableImage.style.width = newWidth + "px";
      resizableImage.style.height = newHeight + "px";
    }
  });
});
document.addEventListener("mouseup", () => {
  isResizing = false;
  resizableImage.classList.remove("resizable");
});
