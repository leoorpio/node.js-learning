// 2016年6月23日15:31:57

var http = require('http'),
	fs = require('fs');
/*
	load_album_list函数本身的唯一参数是一个回调函数。因为load_album_list函数本身是异步的，
	他需要知道当自己完成工作之后要将相册列表传递到哪里。它不能将结果返回给调用者，因为它
	会在fs.readdir函数调用回调函数并给出结果之前就执行完毕。

	这就是Node应用编程的核心技术：告诉Node去做某件事情，并在Node完成时告知Node将结果传递给谁。
 */
function load_album_list(callback) {
	// fs.readdir(path, callback)
	fs.readdir(
		'albums',
		 function(err, files) {
		 	if(err) {
		 		callback(err);
		 		return;
		 	}
		 	callback(null, files);
	})
}

function handle_incoming_requEst(req, res) {
	console.log("Incoming Request:" + req.method + "  " + req.url);
	load_album_list(function(err, albums) {
		if(err) {
			res.writeHead(503, {"Content-Type:": "application/json"});
			res.end(JSON.stringify(err) + "\n");
			return;
		}
		var out = { error: null,
					data: {albums: albums}};
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(JSON.stringify(out) + "\n");
	});
}

var s = http.createServer(handle_incoming_requEst);
s.listen(8080);