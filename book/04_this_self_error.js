var fs = require('fs');

function FileObject() {
	this. filename = '';

	this.file_exists = function(callback) {
		console.log("about to open: " + this.filename);
		fs.open(this.filename, 'r', function(err, handle) {
			if(err) {
				console.log("Can't open: " + this.filename);
				console.log("The value of 'this' : " + this);
				callback(err);
				return;
			}

			fs.close(handle, function() {});
			callback(null, true);
		})
	}
}

// 上述代码中添加一个属性——filename和一个方法——file_exists。该方法会做如下事情：
// 尝试以只读的方式打开filename属性指定的文件
// 如果文件不存在，则打印日记信息，并把err作为参数来调用回调函数
// 如果文件存在，调用回调函数，以表明打开文件成功。

var fo = new FileObject();
fo.filename = "file_that_does_not_exist";

fo.file_exists(function(err, results) {
	if(err) {
		console.log("Aw, bummer: " + JSON.stringify(err));
		return;
	}

	console.log("file exists !!! ")
})


// 大多数情况下，当一个函数前端套在另一个函数中时，它会自动继承父/宿主函数的作用域，
// 因而就能访问所有的变量了。那么为什么嵌套的回调函数却没有返回正确的filename属性的
// 值呢？
// 这个问题归根于this关键字和异步回调函数本身。别忘了，当你调用fs.open这样的函数的时候，
// 他会首先初始化自己，然后调用底层的操作系统函数，并把回调函数插入到事件队列中去。执行完
// 会立即返回给FileObject#file_exists函数，然后退出。但fs.open函数完成任务后，Node就会调
// 用该回调函数，但此时，该函数已经不再拥有FileObject这个类的继承关系了，所以回调函数会被重新
// 赋予新的this指针