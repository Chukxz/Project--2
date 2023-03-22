// var image = document.getElementById('img1');
// var parentdiv = document.querySelector('#secdiv')
// overalldesc = document.querySelector('#overalldesc')



// function importData() {
//     let input = document.createElement('input');
//     input.type = 'file';
//     input.accept = '.jpeg, .jpg, .png, .webp'
//     input.multiple = true
//     input.onchange = function(event) {
//         //You can use this method to get files and perform respective operations
//         let files = Array.from(input.files);
//         console.log(files)
//         const reader = new FileReader()

//         // reader.addEventListener('progress', event => {
//         //     console.log(event);
//         //     percent = Math.round((event.loaded / event.total) * 100)

//         //     const loadingBar = Array(10) // Create an empty array with 100 elements
//         //         .fill('▯') // Fiil all the elements with the background
//         //         .map((item, index) => Math.round(percent / 10) > index ? '▮' : '▯') // Replace the background
//         //         .join('') // Create a string from the array
//         //     document.location.hash = `${loadingBar}(${percent}%)`
//         // })

//         // reader.addEventListener('load', event => console.log(event.target.result))


//         image.src = URL.createObjectURL(event.target.files[0]);

//         //reader.readAsDataURL(files[0])
//         // reader.readAsArrayBuffer(files[0])
//         // reader.readAsBinaryString(files[0])
//         // reader.readAsText(files[0])
//     };
//     input.click();
// }

// if (image.width < window.innerWidth) {
//     parentdiv.style.marginLeft = (window.innerWidth - image.width - parentdiv.offsetLeft) / 2 + 'px'
// }

// overalldesc.style.marginLeft = (image.width - 148) / 2 + 'px'