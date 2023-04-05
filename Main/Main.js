import { drawlines } from "../Boxes/Lines.js";
import { drawcanvas } from "../Boxes/Canvas.js";
import { dragresize } from "./Drag.js";

window.onload = function() {
    var body = document.getElementById('body'),
        canvas = document.getElementById('maindivcanvas'),
        ctx = canvas.getContext('2d'),
        Root = document.querySelector(':root'),
        maindiv = document.getElementById("maindiv"),
        html = document.getElementsByTagName('html'),
        CanvWidth = Number(localStorage.getItem('CanvWidth'));

    const canvWidth = `${CanvWidth}px`,
        btns = document.querySelectorAll(".-btn"),
        btnTxt = document.querySelectorAll('.btn-txt'),
        btnFill = document.querySelectorAll('.btn-fill'),
        btnPlace = document.querySelectorAll('.-btn-place'),
        button = document.getElementsByTagName('button'),
        del = document.querySelector('#delete');

    var CanvWidth = CanvWidth * 2,
        lineWidth = 1,
        maindiv = document.getElementById('maindiv'),
        Radius = 4,
        R = 128,
        G = 128,
        B = 128,
        cols = [Math.abs(R - 128), Math.abs(G), Math.abs(B)],
        prgb = `rgba(${cols[0]},${cols[1]},${cols[2]})`,
        color = prgb,
        opacity = 100,
        colorsliders = document.getElementById("colorsliders"),
        range1 = document.getElementById('range1'),
        label1 = document.getElementById('label1'),
        range2 = document.getElementById('range2'),
        inputs = document.getElementById('inputs'),
        ranges = document.querySelectorAll('.ranges'),
        imgwidth = document.querySelector('#imgwidth'),
        imgheight = document.querySelector('#imgheight'),
        canvwt = document.querySelector('#canvaswidth'),
        canvht = document.querySelector('#canvasheight'),
        num = 10,
        maxCanvWt = Number(localStorage.getItem('maxCanvWt')),
        maxCanvHt = Number(localStorage.getItem('maxCanvHt')),
        maxImgWt = Number(localStorage.getItem('maxImgWt')),
        maxImgHt = Number(localStorage.getItem('maxImgHt')),

        xPoint,
        yPoint,
        plotid = 0,
        lineid = 0,
        plotList = [],
        lineList = [],
        xOffset,
        yOffset,
        is_on_existing_point = false,
        repeat_id = null,
        cur_id = { point: null, line: null },
        _has_line = null,
        mytimeout,
        sendoutlist = [];

    Root.style.backgroundColor = `rgb(${R},${G},${B})`;

    ranges[0].style.backgroundColor = prgb;
    ranges[1].style.backgroundColor = prgb;

    let details = navigator.userAgent;
    // console.log(details)

    /*Creating a regular expression containing mobile devices keyword to search it in details string*/

    let isMobileDevice = new RegExp('/Linux|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone|webOS|kindle|PlayBook|U|BB|Touch|X|MeeGo|Nokia/i').test(details);

    if (isMobileDevice) {
        sessionStorage.setItem('draggable', 'non-applicable');
    } else {
        sessionStorage.setItem('draggable', 'applicable');
    }

    var image = {
            overaldesc: document.getElementById('overaldesc'),
            secdiv: document.getElementById('secdiv'),
            img: document.getElementById('myimg')
        },

        images = [],

        wdt = {
            [0]: '0px',
            [1]: '0px',
            [2]: '0px',
        },

        hgt = {
            [0]: '0px',
            [1]: '0px',
            [2]: '0px',
        },

        twd = {
            [0]: '0px',
            [1]: '0px',
            [2]: '0px',
        },

        thg = {
            [0]: '0px',
            [1]: '0px',
            [2]: '0px',
        },

        offsetL;

    //Add images
    localStorage.setItem('image', 'absent');

    btns[1].style.backgroundColor = '#4CAF50';

    btnFill[1].style.opacity = 0.5;

    for (let i = 0; i < btns.length; i++) {
        wdt[i] = window.getComputedStyle(btnTxt[i]).width;
        hgt[i] = window.getComputedStyle(btnTxt[i]).height;
        twd[i] = window.getComputedStyle(btns[i]).width;
        thg[i] = window.getComputedStyle(btns[i]).height;
        offsetL = btnTxt[i].offsetLeft;
        btnTxt[i].style.left = (Number(twd[i].slice(0, -2)) / 2) - (Number(wdt[i].slice(0, -2)) / 2) - offsetL + 'px';

        btnPlace[i].style.width = twd[i];
        btnPlace[i].style.height = thg[i];

        btnPlace[i].style.left = button[i].offsetLeft + 'px';

        btnPlace[i].addEventListener('mouseover', {} = (e) => {
            const x = e.clientX - btns[i].offsetLeft;
            const y = e.offsetY - btns[i].offsetTop;

            btnFill[i].style.width = '1000px';
            btnFill[i].style.height = '1000px';
            btnFill[i].style.top = y + 'px';
            btnFill[i].style.left = x + 'px';
            btnTxt[i].style.color = '#820d82';
        })
        btnPlace[i].addEventListener('mouseout', {} = (e) => {
            const x = e.clientX - btns[i].offsetLeft;
            const y = e.offsetY - btns[i].offsetTop;

            btnFill[i].style.top = y + 'px';
            btnFill[i].style.left = x + 'px';
            btnFill[i].style.width = '0px';
            btnFill[i].style.height = '0px';
            btnTxt[i].style.color = '#deb887';
        })

        btnPlace[i].addEventListener('touchstart', {} = (e) => {
            const x = e.clientX - btns[i].offsetLeft;
            const y = e.offsetY - btns[i].offsetTop;

            btnFill[i].style.width = '1000px';
            btnFill[i].style.height = '1000px';
            btnFill[i].style.top = y + 'px';
            btnFill[i].style.left = x + 'px';
            btnTxt[i].style.color = '#820d82';
        }, { 'passive': true })

        btnPlace[i].addEventListener('touchend', {} = (e) => {
            const x = e.clientX - btns[i].offsetLeft;
            const y = e.offsetY - btns[i].offsetTop;

            btnFill[i].style.top = y + 'px';
            btnFill[i].style.left = x + 'px';
            btnFill[i].style.width = '0px';
            btnFill[i].style.height = '0px';
            btnTxt[i].style.color = '#deb887';
        }, { 'passive': true })
    }

    function update() {
        if (localStorage.getItem('image') === 'absent') {
            btns[0].style.backgroundColor = 'red';
            btnTxt[0].style.backgroundColor = 'red';
            btnFill[0].style.opacity = 0;
            btnPlace[0].onclick = function() {
                var runCount = 0;

                function flash() {
                    let mytimeout = setTimeout(flash, 50);
                    if (runCount < 4) {
                        runCount++;
                        if (runCount % 2 === 0) {
                            btns[0].style.opacity = 1;
                        } else {
                            btns[0].style.opacity = 0.3;
                        }
                        return runCount;
                    } else {
                        clearTimeout(mytimeout);
                    }
                }
                flash();
            }

            btnTxt[1].innerHTML = 'Add Image(s)';

            del.style.display = 'none';
            btnPlace[1].style.width = twd[1];

            btns[2].style.backgroundColor = 'red';
            btnTxt[2].style.backgroundColor = 'red';
            btnFill[2].style.opacity = 0;
            btnPlace[2].onclick = function() {
                var runCount = 0;

                function flash() {
                    let mytimeout = setTimeout(flash, 50);
                    if (runCount < 4) {
                        runCount++;
                        if (runCount % 2 === 0) {
                            btns[2].style.opacity = 1;
                        } else {
                            btns[2].style.opacity = 0.3;
                        }
                        return runCount;
                    } else {
                        clearTimeout(mytimeout);
                    }
                }
                flash();
            }

            //Image
            btnPlace[1].onclick = function() {
                importData();
            }
        } else if (localStorage.getItem('image') === 'present') {

            btns[0].style.backgroundColor = '#4CAF50';
            btnTxt[0].style.backgroundColor = '#4CAF50';
            btnFill[0].style.opacity = 0.5;

            btnTxt[1].innerHTML = "Submit";

            btnPlace[1].style.width = (twd[1].slice(0, -4) - 20) + 'px';
            del.style.display = 'inline';

            btns[2].style.backgroundColor = '#4CAF50';
            btnTxt[2].style.backgroundColor = '#4CAF50';
            btnFill[2].style.opacity = 0.5;

            btnPlace[1].onclick = function() {
                packageplot();
                importData();
            }

            //Image
            del.onclick = function() {
                importData();
            }

            var num = 0;

            //Left
            btnPlace[0].onclick = function() {
                num--;
                if (num < 0) {
                    num = images.length - 1;
                }
                image.img.src = images[num];
            }

            //Right
            btnPlace[2].onclick = function() {
                num++;
                if (num >= images.length) {
                    num = 0;
                }
                image.img.src = images[num];
            }
        }
    }
    update();

    function importData() {
        if (localStorage.getItem('image') === 'absent') {
            let input = document.createElement('input');
            input.type = 'file';
            input.accept = '.jpeg, .jpg, .png, .webp'
            input.multiple = true;
            input.onchange = function() {
                // You can use this method to get files and perform respective operations
                let files = Array.from(input.files);
                for (let i = 0; i < files.length; i++) {
                    images[i] = URL.createObjectURL(files[i]);
                }
                image.img.style.visibility = 'visible';
                image.img.src = images[0];
                localStorage.setItem('image', 'present');
                update();
                return images;
            }
            input.click();
        } else if (localStorage.getItem('image') === 'present') {
            for (let i = 0; i < images.length; i++) {
                images[i] = '';
                image.img.removeAttribute('src');
                image.img.style.background = 'transparent';
                localStorage.setItem('image', 'absent');
                update();
            }
        }
    }

    //Draw the Canvas on startup
    function arrangeCanvas(canvas, ctx, color, canvWidth, lineWidth, num, width, height, opacity) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawcanvas.drawCanvas(canvas, canvWidth, color, width, height, opacity);
        drawlines.drawLines(num, ctx, canvas, color, lineWidth, Radius);
        canvwt.value = canvas.width;
        canvht.value = canvas.height;
    }

    const offsetVal = maindiv.offsetLeft;

    arrangeCanvas(canvas, ctx, color, canvWidth, lineWidth, num, canvas.width, canvas.height, opacity);
    dragresize.dragElement(maindiv, canvas, Radius, image, CanvWidth, offsetVal);


    //For PCs
    html[0].addEventListener('mousedown', {} = (e) => {
        var x = e.clientX,
            y = e.clientY;
        toggleCanvasResizeState(x, y);
    })

    html[0].addEventListener('mouseup', {} = () => {
        clearTimeout(mytimeout);
    })

    window.addEventListener('mouseup', {} = () => {
        arrangeCanvas(canvas, ctx, color, canvWidth, lineWidth, num, canvas.width, canvas.height, opacity);
        renderplot();
    })

    canvas.addEventListener('mousedown', {} = (e) => {
        if (sessionStorage.getItem('draggable') === 'non-applicable') {
            xOffset = maindiv.offsetLeft + canvas.offsetLeft;
            yOffset = maindiv.offsetTop + canvas.offsetTop;
            xPoint = e.clientX - xOffset;
            yPoint = e.clientY - yOffset;
            initiate(xPoint, yPoint);
        }
    })

    canvas.addEventListener('mousemove', {} = (e) => {
        if (cur_id.point !== null && sessionStorage.getItem('draggable') === 'non-applicable') {
            xOffset = maindiv.offsetLeft + canvas.offsetLeft;
            yOffset = maindiv.offsetTop + canvas.offsetTop;
            xPoint = e.clientX - xOffset;
            yPoint = e.clientY - yOffset;
            intermediate(xPoint, yPoint);
        }
    })

    canvas.addEventListener('mouseup', {} = (e) => {
        if (sessionStorage.getItem('draggable') === 'non-applicable') {
            //draw the point
            xOffset = maindiv.offsetLeft + canvas.offsetLeft;
            yOffset = maindiv.offsetTop + canvas.offsetTop;
            xPoint = e.clientX - xOffset;
            yPoint = e.clientY - yOffset;
            finalize(xPoint, yPoint);
        }
    })


    //For Mobiles
    window.addEventListener('touchend', {} = () => {
        arrangeCanvas(canvas, ctx, color, canvWidth, lineWidth, num, canvas.width, canvas.height, opacity);
        renderplot();
    }, { 'passive': true })

    canvas.addEventListener('touchstart', {} = (e) => {
        if (sessionStorage.getItem('draggable') === 'non-applicable') {
            xOffset = maindiv.offsetLeft + canvas.offsetLeft;
            yOffset = maindiv.offsetTop + canvas.offsetTop;
            xPoint = e.touches[0].clientX - xOffset;
            yPoint = e.touches[0].clientY - yOffset;
            initiate(xPoint, yPoint);
        }
    }, { 'passive': true })

    canvas.addEventListener('touchmove', {} = (e) => {
        if (cur_id.point !== null && sessionStorage.getItem('draggable') === 'non-applicable') {
            xOffset = maindiv.offsetLeft + canvas.offsetLeft;
            yOffset = maindiv.offsetTop + canvas.offsetTop;
            xPoint = e.touches[0].clientX - xOffset;
            yPoint = e.touches[0].clientY - yOffset;
            intermediate(xPoint, yPoint);
        }
    }, { 'passive': true })

    canvas.addEventListener('touchend', {} = (e) => {
        e.preventDefault();
        if (sessionStorage.getItem('draggable') === 'non-applicable') {
            xOffset = maindiv.offsetLeft + canvas.offsetLeft;
            yOffset = maindiv.offsetTop + canvas.offsetTop;
            xPoint = e.changedTouches[0].clientX - xOffset;
            yPoint = e.changedTouches[0].clientY - yOffset;
            finalize(xPoint, yPoint);
        }
    }, { 'passive': false })

    function initiate(xPoint, yPoint) {
        if (xPoint > 5 && xPoint < canvas.width - 5 && yPoint > 5 && yPoint < canvas.height - 5) {
            plotList[plotid] = {
                x: xPoint,
                y: yPoint,
                type: 'Point',
                canvW: canvas.width,
                canvH: canvas.height,
                status: 'active',
                line: null,
                pointindex: plotid
            }
            cur_id.point = plotid;
            plotid++;
        }
    }

    //Neccesary functions

    function toggleCanvasResizeState(x, y) {
        var res = document.elementsFromPoint(x, y),
            resString = res[0].toString(),
            result = new RegExp('.?object HTMLHtmlElement.?|.?object HTMLDivElement.?').test(resString);

        if (result === true) {
            let runCount = 0;

            function count() {
                runCount++;
                mytimeout = setTimeout(count, 500);
                if (runCount >= 3) {
                    clearTimeout(mytimeout);
                    if (sessionStorage.getItem('draggable') === 'applicable') {
                        var ans = confirm("Do you want to disable Canvas Resizing?");
                        if (ans === true) {
                            sessionStorage.setItem('draggable', 'non-applicable')
                            renderplot();
                        }
                    } else if (sessionStorage.getItem('draggable') === 'non-applicable') {
                        var ans = confirm("Do you want to enable Canvas Resizing?");
                        if (ans === true) {
                            sessionStorage.setItem('draggable', 'applicable')
                        }
                    }
                    console.log(sessionStorage.getItem('draggable'))
                }
                return runCount;
            }
            count();
        }
    }

    function renderplot() {
        for (let i = 0; i < plotid; i++) {
            if (plotList[i].status === 'active') {
                plotpoints(plotList[i].x, plotList[i].y)
            };
        }
        for (let j = 0; j < lineid; j++) {
            if (lineList[j].status === 'active') {
                plotlines(lineList[j].x1, lineList[j].y1, lineList[j].x2, lineList[j].y2)
            }
        }
    }

    function intermediate(xPoint, yPoint) {
        lineList[lineid] = {
            x1: plotList[cur_id.point].x,
            y1: plotList[cur_id.point].y,
            x2: xPoint,
            y2: yPoint,
            type: 'Line',
            canvW: canvas.width,
            canvH: canvas.height,
            status: 'active',
            startPoint: cur_id.point,
            endPoint: null,
            lineindex: lineid
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(lineList[lineid].x1, lineList[lineid].y1);
        ctx.lineTo(lineList[lineid].x2, lineList[lineid].y2);
        ctx.strokeStyle = 'black';
        ctx.strokeWidth = 2;
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fill();
        cur_id.line = lineid;
    }

    function finalize(xPoint, yPoint) { //check for canvas borders
        if (cur_id.point !== null) {
            if (xPoint > 5 && xPoint < canvas.width - 5 && yPoint > 5 && yPoint < canvas.height - 5) {
                //generate point characteristics
                plotList[plotid] = {
                        x: xPoint,
                        y: yPoint,
                        type: 'Point',
                        canvW: canvas.width,
                        canvH: canvas.height,
                        status: 'active',
                        line: null,
                        pointindex: plotid
                    }
                    //check if line was drawn
                    //line was drawn
                if (cur_id.line !== null) {
                    lineList[cur_id.line].endPoint = plotid;

                    plotList[cur_id.point].line = lineid;
                    plotList[plotid].line = lineid;

                    lineid++;

                }
                //no line was drawn
                else if (cur_id.line === null) {
                    plotList[cur_id.point].status = 'disabled';
                    cur_id.point = null;

                    //check if plot was on previously existing plot
                    for (let i = 0; i < plotid; i++) {
                        if (plotList[i].status === 'active') {
                            if (Math.abs(plotList[i].x - xPoint) <= 2 && Math.abs(plotList[i].y - yPoint) <= 2) {
                                is_on_existing_point = true;
                                repeat_id = i;
                            }
                        }
                    }

                    if (is_on_existing_point === true) {
                        plotList[repeat_id].status = 'disabled';
                        plotList[plotid].status = 'disabled';
                        _has_line = plotList[repeat_id].line;
                        if (_has_line !== null) {
                            lineList[_has_line].status = 'disabled'
                            plotList[lineList[_has_line].startPoint].status = 'disabled';
                            plotList[lineList[_has_line].endPoint].status = 'disabled';
                        }
                    }
                }

                _has_line = null;
                is_on_existing_point = false;
                repeat_id = null;
                plotid++;

            } else {
                plotList[cur_id.point].status = 'disabled';
                lineList[cur_id.line].status = 'disabled';
            }
        }
        //reset parameters
        cur_id = { point: null, line: null }
    }

    function plotpoints(pointX, pointY) {
        ctx.beginPath();
        ctx.arc(pointX, pointY, 2, 0, 2 * Math.PI, false);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fill();
    }

    function plotlines(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'black';
        ctx.strokeWidth = 2;
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fill();
    }

    // canvas.onclick = {} = () => {
    //     renderplot();
    // }

    //Adjusting Opacity and Num (number of lines) sliders
    label1.innerHTML = opacity / 100;
    spec.innerHTML = num;
    range1.value = opacity;
    range2.value = num;

    range1.oninput = function() {
        label1.innerHTML = range1.value / 100;
        opacity = range1.value / 100;
    }
    inputs.oninput = function() {
        color = inputs.value
    }

    colorsliders.oninput = function() {
        arrangeCanvas(canvas, ctx, color, canvWidth, lineWidth, num, canvas.width, canvas.height, opacity);
    }

    range2.oninput = function() {
        num = range2.value;
        spec.innerHTML = range2.value;
    }

    function packageplot() {
        let e = 0;
        for (let i = 0; i < plotid; i++) {
            if (plotList[i].status === 'active') {
                sendoutlist[e] = plotList[i];
                e++;
            };
        }
        for (let j = 0; j < lineid; j++) {
            if (lineList[j].status === 'active') {
                sendoutlist[e] = lineList[j];
                e++;
            }
        }
        sendoutlist = JSON.stringify(sendoutlist);
        //console.log(sendoutlist);
        sendoutlist = [];
        plotList = [];
        lineList = [];
        plotid = 0;
        lineid = 0;
        arrangeCanvas(canvas, ctx, color, canvWidth, lineWidth, num, canvas.width, canvas.height, opacity);
    }

    imgwidth.value = image.img.width;
    imgheight.value = image.img.height;

    imgwidth.style.color = 'grey';
    imgheight.style.color = 'grey';

    canvwt.style.color = 'grey';
    canvht.style.color = 'grey';

    imgwidth.oninput = function() {
        if (imgwidth.value <= maxImgWt) {
            if (imgwidth.value == maxImgWt) {
                imgwidth.style.color = 'grey';
            } else if (imgwidth.value < maxImgWt && imgwidth.value > 100) {
                imgwidth.style.color = 'black';
            } else {
                imgwidth.style.color = 'red';
            }

            image.img.width = imgwidth.value;
            canvwt.value = imgwidth.value - CanvWidth;
            canvas.width = canvwt.value;

            if (canvwt.value <= (maxImgWt - CanvWidth)) {
                if (canvwt.value == (maxImgWt - CanvWidth)) {
                    canvwt.style.color = 'gray';
                } else if (canvwt.value < (maxImgWt - CanvWidth) && canvwt.value > (100 - CanvWidth)) {
                    canvwt.style.color = 'black';
                } else {
                    canvwt.style.color = 'red';
                }
            }

            arrangeCanvas(canvas, ctx, color, canvWidth, lineWidth, num, image.img.width - CanvWidth, image.img.height - CanvWidth);
            renderplot();
        } else if (imgwidth.value > maxImgWt) {
            imgwidth.style.color = 'red';
        }
    };
    imgheight.oninput = function() {
        if (imgheight.value <= maxImgHt) {
            if (imgheight.value == maxImgHt) {
                imgheight.style.color = 'grey';
            } else if ((imgheight.value < maxImgHt) && (imgheight.value > 100)) {
                imgheight.style.color = 'black';
            } else {
                imgheight.style.color = 'red';
            }

            image.img.height = imgheight.value;
            canvht.value = imgheight.value - CanvWidth;
            canvas.height = canvht.value;

            if (canvht.value <= (maxImgHt - CanvWidth)) {
                if (canvht.value == (maxImgHt - CanvWidth)) {
                    canvht.style.color = 'gray';
                } else if (canvht.value < (maxImgHt - CanvWidth) && canvht.value > (100 - CanvWidth)) {
                    canvht.style.color = 'black';
                } else {
                    canvht.style.color = 'red';
                }
            }

            arrangeCanvas(canvas, ctx, color, canvWidth, lineWidth, num, image.img.width - CanvWidth, image.img.height - CanvWidth);
            renderplot();
        } else if (imgheight.value > maxImgHt) {
            imgheight.style.color = 'red';
        }
    };

    canvwt.oninput = function() {
        if (canvwt.value <= maxCanvWt) {
            if (canvwt.value <= (image.img.width - CanvWidth)) {
                if (canvwt.value == (image.img.width - CanvWidth)) {
                    canvwt.style.color = 'gray';
                } else if (canvwt.value < (image.img.width - CanvWidth) && canvwt.value > (100 - CanvWidth)) {
                    canvwt.style.color = 'black';
                } else {
                    canvwt.style.color = 'red';
                }
                canvas.width = canvwt.value;
                arrangeCanvas(canvas, ctx, color, canvWidth, lineWidth, num, canvas.width, canvas.height, opacity);
                renderplot();
            }
        }
    }

    canvht.oninput = function() {
        if (canvht.value <= maxCanvHt) {
            if (canvht.value <= (image.img.height - CanvWidth)) {
                if (canvht.value == (image.img.height - CanvWidth)) {
                    canvht.style.color = 'gray';
                } else if (canvht.value < (image.img.height - CanvWidth) && canvht.value > (100 - CanvWidth)) {
                    canvht.style.color = 'black';
                } else {
                    canvht.style.color = 'red';
                }
                canvas.height = canvht.value;
                arrangeCanvas(canvas, ctx, color, canvWidth, lineWidth, num, canvas.width, canvas.height, opacity);
                renderplot();
            }
        }
    }
}