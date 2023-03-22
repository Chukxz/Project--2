import { drawlines } from "../Boxes/Lines.js";
import { drawcanvas } from "../Boxes/Canvas.js";
import { dragresize } from "./Drag.js";

window.onload = function() {
    sessionStorage.clear()

    function message() {
        return " and imported into Project-2/Main/Main.js"
    }

    console.log(drawlines.message() + message());
    console.log(drawcanvas.message() + message());
    console.log(dragresize.message() + message());



    var body = document.getElementById('body'), //0
        canvas = document.getElementById('maindivcanvas'), //1
        ctx = canvas.getContext('2d'), //2
        para = document.getElementById("para"), //3
        para2 = document.getElementById('para2'), //4
        para3 = document.getElementById('para3'), //5
        pass = document.getElementById('pass'), //6
        Root = document.querySelector(':root'), //7
        time = 3000, //8
        CanvWidth = Number(localStorage.getItem('CanvWidth'));
    const canvWidth = `${CanvWidth}px`; //10 
    var CanvWidth = CanvWidth * 2,
        lineWidth = 1, //11
        maindiv = document.getElementById('maindiv'),
        Radius = 4, //12
        R = 128,
        G = 128,
        B = 128,
        cols = [Math.abs(R - 128), Math.abs(G), Math.abs(B)],
        prgb = `rgba(${cols[0]},${cols[1]},${cols[2]})`,
        color = prgb, //9
        opacity = 100,
        List,
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
        maxImgHt = Number(localStorage.getItem('maxImgHt'));

    Root.style.backgroundColor = `rgb(${R},${G},${B})`;

    ranges[0].style.backgroundColor = prgb;
    ranges[1].style.backgroundColor = prgb;

    var image = {
            overaldesc: document.getElementById('overaldesc'),
            secdiv: document.getElementById('secdiv'),
            img: document.getElementById('myimg')
        }
        //content, divcolor, divcolor2, divcolor3, top, left, width, height, padTopp, padBott, padTop, padBot



    List = [body, canvas, ctx, para, para2, para3, pass, //0 - 6
        Root, time, color, canvWidth, lineWidth, Radius //7 - 12
    ];


    function arrangeCanvas(canvas, ctx, color, canvWidth, lineWidth, num, width, height, opacity) {
        drawcanvas.drawCanvas(canvas, canvWidth, color, width, height, opacity);
        drawlines.drawLines(num, ctx, canvas, color, lineWidth, Radius);
        canvwt.value = canvas.width;
        canvht.value = canvas.height;
    }

    const offsetVal = maindiv.offsetLeft;

    dragresize.dragElement(maindiv, canvas, Radius, image, CanvWidth, offsetVal);
    arrangeCanvas(List[1], List[2], List[9], List[10], List[11], num, canvas.width, canvas.height, opacity);


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
        arrangeCanvas(List[1], List[2], color, List[10], List[11], num, canvas.width, canvas.height, opacity)
    }

    range2.oninput = function() {
        num = range2.value;
        spec.innerHTML = range2.value;
    }

    // fl.style.left = (fl.offsetLeft + 100) + 'px';


    window.onmouseup = function() { arrangeCanvas(List[1], List[2], color, List[10], List[11], num, canvas.width, canvas.height); }


    // window.onresize = function() {
    //     console.log(window.innerWidth, window.innerHeight, window.outerWidth, window.outerHeight);
    //     td.style.left = (window.innerWidth - (window.innerWidth / 3.5)) + 'px';
    //     flexs.style.left = (window.innerWidth - (window.innerWidth / 3)) + 'px';
    //     colorsliders.style.marginTop = `${(window.innerHeight - (window.innerHeight / 5))}` + 'px';

    // }

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

            arrangeCanvas(List[1], List[2], List[9], List[10], List[11], num, image.img.width - CanvWidth, image.img.height - CanvWidth);
        } else if (imgwidth.value > maxImgWt) {
            imgwidth.style.color = 'red';
        }
    };
    imgheight.oninput = function() {
        if (imgheight.value <= maxImgHt) {
            if (imgheight.value == maxImgHt) {
                imgheight.style.color = 'grey';
            } else if (imgheight.value < maxImgHt && imgheight.value > 100) {
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

            arrangeCanvas(List[1], List[2], List[9], List[10], List[11], num, image.img.width - CanvWidth, image.img.height - CanvWidth);
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
                arrangeCanvas(List[1], List[2], List[9], List[10], List[11], num, canvas.width, canvas.height);
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
                arrangeCanvas(List[1], List[2], List[9], List[10], List[11], num, canvas.width, canvas.height);
            }
        }
    }
    canvht.onchange = function() { console.log('changed') }

    // function show() {
    //     console.log(image.img.width, image.img.height, canvas.width, canvas.height);
    //     console.log(sessionStorage);
    //     console.log(localStorage);
    //     setTimeout(show, 5000);
    // }

    // show();



    window.onclick = function(e) {
        let x = e.clientX;
        let y = e.clientY;
        console.log(x, y)
        console.log(document.elementFromPoint(x, y))
        console.log(document.elementsFromPoint(x, y))
    }
    var button = document.getElementsByTagName('.btn-fill');
    for (let i = 0; i < button.length; i++) {
        button[i].onclick = console.log("clicked");
    }
    // window.addEventListener('keydown', (e) => { if (e.shiftKey == false && e.ctrlKey == false && e.altKey == false && e.code == "Enter") { console.log(e.key) } })
}