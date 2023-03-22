class DrawCanvas {

    drawCanvas(canvas, canvWidth, color, width, height, opacity) {
        canvas.style.borderStyle = 'solid';
        canvas.style.borderWidth = canvWidth;
        canvas.style.borderColor = color;
        canvas.style.opacity = opacity;
        canvas.width = width;
        canvas.height = height;
    }
    message() {
        return "Object drawcanvas exported from Project-2/Boxes/Canvas.js";
    }
}

let drawcanvas = new DrawCanvas;

export { drawcanvas };