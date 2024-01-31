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
});

resizableImage.addEventListener("mousedown", (e) => {
  if (isResizing) {
    startX = e.clientX;
    startY = e.clientY;
    startWidth = resizableImage.offsetWidth;
    startHeight = resizableImage.offsetHeight;
  }
});

document.addEventListener("mousemove", (e) => {
  if (isResizing) {
    const newWidth = startWidth + e.clientX - startX;
    const newHeight = startHeight + e.clientY - startY;
    resizableImage.style.width = newWidth + "px";
    resizableImage.style.height = newHeight + "px";
    resizableImage.style.width = newWidth + "px !important";
    resizableImage.style.height = newHeight + "px !important";
  }
});

document.addEventListener("mouseup", () => {
  isResizing = false;
  resizableImage.classList.remove("resizable");
});
