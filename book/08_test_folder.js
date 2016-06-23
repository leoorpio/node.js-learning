var http = require('http'),
	fs = require('fs');

function load_album_list(callback) {
	fs.readdir(
		'albums',
		function(err, files) {
			if(err) {
				callback(err);
				return;
			}

			var only_dirs = [];

			// 这样写或出现错误。因为大多数循环和异步回调不能兼容
			// 为了解决这个问题，必须使用递归。
			for(var i = 0; i < files.length; i++) {
			//	fs.stat = function(path, callback)
				fs.stat(
					'albums/' + files[i],
					function(err, stats) {
						if(stats.isDirectory()) {
							only_dirs.push(files[i]);
						}
					}
				)
			}

			callback(null, only_dirs);
	});
}

function handle_incoming_request(req, res) {
	console.log("Incoming Request: " + req.method + "  " + req.url);
	load_album_list(function(err, albums) {
		if(err) {
			res.writeHead(500, {"Content-Type": "application/json"});
			res.end("\n" + JSON.stringify(err) + "\n");
			return;
		}

		var out = { error: null,
					data:{albums: albums}};
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end("\n" + JSON.stringify(out) + "\n");
	})
}

var s = http.createServer(handle_incoming_request);
s.listen(8080);


/*
	>创建一个only_dirs数组来缓存响应。
	>对于文件数组的每一项，调用非阻塞函数fs.stat并将其传入给特定的函数，测试这个
	 文件是否是个目录。
	>当所有的非阻塞函数都开始后，退出for循环并调用callback参数。因为Node.js是单线
	 程运行的，所以所有的fs.stat函数都没有机会执行及调用回调函数，最后导致only_dirs
	 的值一直是null，并将这个值传给提供的回调函数。实际上，当fs.stat的回调函数最终被
	 执行时，已经无人在乎了。

 */
