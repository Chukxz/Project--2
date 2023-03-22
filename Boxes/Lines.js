var verList = [];
var horList = [];
var corners = [];

class DrawLines {

    lineMatrixHorizontal(R, num, ctx, canvas, color, lineWidth) { //the horizontal lines
        let hor = num / R;
        ctx.beginPath();
        ctx.moveTo(0, Math.round(canvas.height / hor));
        ctx.lineTo(Math.round(canvas.width), Math.round(canvas.height / hor));
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        horList[horList.length] = Math.round(canvas.height / hor);
        return horList
    }

    showHorlist() {
        return horList
    }


    lineMatrixVertical(R, num, ctx, canvas, color, lineWidth) { //the vertical lines
        var ver = num / R;
        ctx.beginPath();
        ctx.moveTo(Math.round(canvas.width / ver), 0);
        ctx.lineTo(Math.round(canvas.width / ver), Math.round(canvas.height));
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        verList[verList.length] = Math.round(canvas.width / ver);
        return verList


    }

    showVerList() {
        return verList
    }


    drawLines(num, ctx, canvas, color, lineWidth, Radius, opacity) { //draws the vertical and horizontal canvas lines
        verList.splice(0, verList.length)
        horList.splice(0, horList.length)

        for (let R = 0; R <= num; R++) {
            this.lineMatrixHorizontal(R, num, ctx, canvas, color, lineWidth, opacity);
            this.lineMatrixVertical(R, num, ctx, canvas, color, lineWidth, opacity);
        }
        ctx.beginPath();
        ctx.arc(verList[0], horList[0], Radius, 0, 2 * Math.PI, true);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(verList[0], horList[num], Radius, 0, 2 * Math.PI, true);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(verList[num], horList[0], Radius, 0, 2 * Math.PI, true);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(verList[num], horList[num], Radius, 0, 2 * Math.PI, true);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fill();
        corners = [
            [verList[0], horList[0], 'first'],
            [verList[0], horList[num], 'second'],
            [verList[num], horList[0], 'third'],
            [verList[num], horList[num], 'fourth']
        ]
        return corners;
    }

    showCorners() {
        return corners;
    }
    message() {
        return "Object drawlines exported from Project-2/Boxes/Lines.js";
    }
}

let drawlines = new DrawLines;

export { drawlines };