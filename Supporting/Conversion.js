class Convert {
    convert(value) {
        var type = typeof(value)

        if (type == 'string') {
            // console.log('string')
            return value
        }
        if (type == 'number') {
            // console.log('number')
            return value.toString()
        }
        if (type == 'boolean') {
            // console.log('boolean')
        }
        if (type == 'undefined') {
            // console.log('undefined')
        }
        if (type == 'function') {
            // console.log('function')
        }
        if (type == 'object') {
            return value.toString()
        }
        // if (type == 'object') {
        //     if (this.x !== null) {
        //         function isObject(myObject) {
        //             if ((myObject.constructor === Object) === true) {
        //                 console.log('object')
        //             }
        //             return myObject.constructor === Object
        //         }

        //         function isDate(myDate) {
        //             if ((myDate.constructor === Date) === true) {
        //                 console.log('date')
        //             }
        //             return myDate.constructor === Date
        //         }

        //         function isArray(myArray) {
        //             if ((myArray.constructor === Array) === true) {
        //                 console.log('array')
        //             }
        //             return myArray.constructor === Array
        //         }

        //         function isSet(mySet) {
        //             if ((mySet.constructor === Set) === true) {
        //                 console.log('set')
        //             }
        //             return mySet.constructor === Set
        //         }
        //         console.log(isDate(this.x), isArray(this.x), isSet(this.x), isObject(this.x))
        //     } else {
        //         console.log('null')  
        //     }
        // }
    }
    toArrayasNum(value) {
        var strToArr1 = value.split(',')
        for (let xvar = 0; xvar < strToArr1.length; xvar++) {
            strToArr1[xvar] = Number(strToArr1[xvar])
        }
        return strToArr1
    }
    toArrayasStr(value) {
        var strToArr2 = value.split(',')
        return strToArr2
    }
    toNumfromCSSSizes(value) {
        value = value.slice(0, -2);
        return Number(value);
    }
}

let converts = new Convert

converts.toNumfromCSSSizes("200px")

// for (let x = 1; x <= 200; x++) {
//     console.log(`At x = ${x}, res = ` + Math.ceil(1 + Math.cbrt((0.2 * (2 * Math.pow(x, 2))))))
// }

export { converts }


// let show = document.querySelector('#show')
// let para = document.querySelector('#canvas1')

// window.onscroll = function() {
//     const rect = para.getBoundingClientRect()
//     show.innerHTML = "Left: " + rect.left.toFixed() +
//         " Right: " + rect.right.toFixed() +
//         " Top: " + rect.top.toFixed() +
//         " Bottom: " + rect.bottom.toFixed() +
//         " Width: " + rect.width +
//         " Height: " + rect.height +
//         " X: " + rect.x +
//         " Y: " + rect.y
// }

// para.onclick = function(event) {
//     console.log(event.clientX, event.clientY)
// }

// const t = [3, 2, 3, 2, 2, 3, 3, 1, 4, 5, 9]

// let p = 0
// var y;

// if (t.indexOf(p) == -1) {
//     y = 'not found'
// } else { y = 'found' }

// console.log(y)