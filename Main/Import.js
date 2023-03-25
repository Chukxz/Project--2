localStorage.setItem('image', 'absent');

var image = document.getElementById('myimg'),

    images = [],

    wd = {
        [0]: '0px',
        [1]: '0px',
        [2]: '0px',
    },

    hg = {
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

const btns = document.querySelectorAll(".-btn"),
    btnTxt = document.querySelectorAll('.btn-txt'),
    btnFill = document.querySelectorAll('.btn-fill'),
    btnPlace = document.querySelectorAll('.-btn-place'),
    button = document.getElementsByTagName('button'),
    del = document.querySelector('#delete');

btns[1].style.backgroundColor = '#4CAF50';

btnFill[1].style.opacity = 0.5;

for (let i = 0; i < btns.length; i++) {
    wd[i] = window.getComputedStyle(btnTxt[i]).width;
    hg[i] = window.getComputedStyle(btnTxt[i]).height;
    twd[i] = window.getComputedStyle(btns[i]).width;
    thg[i] = window.getComputedStyle(btns[i]).height;
    offsetL = btnTxt[i].offsetLeft;
    btnTxt[i].style.left = (Number(twd[i].slice(0, -2)) / 2) - (Number(wd[i].slice(0, -2)) / 2) - offsetL + 'px';

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
        btnTxt[i].style.color = 'magenta';
    })
    btnPlace[i].addEventListener('mouseout', {} = (e) => {
        const x = e.clientX - btns[i].offsetLeft;
        const y = e.offsetY - btns[i].offsetTop;

        btnFill[i].style.top = y + 'px';
        btnFill[i].style.left = x + 'px';
        btnFill[i].style.width = '0px';
        btnFill[i].style.height = '0px';
        btnTxt[i].style.color = 'rgb(128,128,128)';
    })

    btnPlace[i].addEventListener('touchstart', {} = (e) => {
        const x = e.clientX - btns[i].offsetLeft;
        const y = e.offsetY - btns[i].offsetTop;

        btnFill[i].style.width = '1000px';
        btnFill[i].style.height = '1000px';
        btnFill[i].style.top = y + 'px';
        btnFill[i].style.left = x + 'px';
        btnTxt[i].style.color = 'magenta';
    }, { 'passive': true })

    btnPlace[i].addEventListener('touchend', {} = (e) => {
        const x = e.clientX - btns[i].offsetLeft;
        const y = e.offsetY - btns[i].offsetTop;

        btnFill[i].style.top = y + 'px';
        btnFill[i].style.left = x + 'px';
        btnFill[i].style.width = '0px';
        btnFill[i].style.height = '0px';
        btnTxt[i].style.color = 'rgb(128,128,128)';
    }, { 'passive': true })
}

function update() {
    if (localStorage.getItem('image') === 'absent') {
        btns[0].style.backgroundColor = 'red';
        btnTxt[0].style.backgroundColor = 'red';
        btnFill[0].style.opacity = 0;
        btnPlace[0].onclick = function() {
            var runCount = 0;

            function exec() {
                let mytimeout = setTimeout(exec, 50);
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

            exec();
        }

        btnTxt[1].innerHTML = 'Add Image(s)';

        del.style.display = 'none';
        btnPlace[1].style.width = twd[1];

        btns[2].style.backgroundColor = 'red';
        btnTxt[2].style.backgroundColor = 'red';
        btnFill[2].style.opacity = 0;
        btnPlace[2].onclick = function() {
            var runCount = 0;

            function exec() {
                let mytimeout = setTimeout(exec, 50);
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
            exec();
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

        //Image

        del.onclick = function() {
            importData();
        }

        btnPlace[1].onclick = function() {
            console.log('Data sent successfully');
        }


        var num = 0;

        //Left
        btnPlace[0].onclick = function() {
            num--;
            if (num < 0) {
                num = images.length - 1;
            }
            image.src = images[num];
        }

        //Right
        btnPlace[2].onclick = function() {
            num++;
            if (num >= images.length) {
                num = 0;
            }
            image.src = images[num];
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
            image.style.visibility = 'visible';
            image.src = images[0];
            localStorage.setItem('image', 'present');
            update();
            return images;
        }
        input.click();
    } else if (localStorage.getItem('image') === 'present') {
        for (let i = 0; i < images.length; i++) {
            images[i] = '';
            image.removeAttribute('src');
            image.style.visibility = 'hidden';
            localStorage.setItem('image', 'absent');
            update();
        }
    }
}