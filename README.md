# cpp_average

----

> Async native module (written in c++/v8) to calculate the average value of an array in Node.js

----
## usage

----

    var avg = require('cpp_average');
    avg([1, 20, 34.45, 57.23, 37, 25], function(r) {
            console.log(r, ' is the average')
    })
