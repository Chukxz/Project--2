class Plot {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    plotvar() {
        var plot = 0;
        return plot;
    }
    incplotvar() {
        window.onclick = function() {
            plotvar() + 1
        }
    }
}