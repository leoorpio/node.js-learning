var fs = require('fs');

var file;
var buf = new Buffer(100000);


// fs.open函数是异步执行的
// function(path, flags, mode, callback)
// 
fs.open (
    'info.txt', 'r',
    function (err, handle) {
        file = handle;
    }
);


// function(fd, buffer, offset, length, position, callback)
fs.read (
    file, buf, 0, 100000, null,
    function (err, length) {
        console.log(buf.toString());
        fs.close(file, function () { /* don't care */ });
    }
);

// 如果就这么运行上面这段程序，它会抛出错误并退出。到底怎么回事？这是因为
// fs.open函数是异步执行的，他会在文件打开之前立刻返回，而handle值会返回给
// 回调函数。在文件打开之前，file变量不会被赋值，它的值会在fs.open函数的回调
// 函数中被接收。
// 因此，如果在它后面立即调用fs.read函数，file的值认为undefined。
//