
setTimeout(function () {
    console.log("I've done my work!");
}, 2000);


console.log("I'm waiting for all my work to finish.");




// 2016年6月22日14:53:59

try {
	setTimeout(function() {
		throw new Error("Uh oh!");
	}, 2000);
} catch (e) {
	console.log("I caugth the error : " + e.messege);
}

// setTimeout 的调用的确实在try .. catch代码块中执行的。如果函数跑出错误，
// catch 就会捕获它，然后你就能看到期望的结果了。但是setTimeout函数只是在
// Node的事件队列中添加了一个新事件（是为了告诉Node在给定的等待时间以后调
// 用该函数），然后返回而这个回调函数实际上是在一个新的上下文和作用域中执行的。
// 因此，当在非阻塞IO中调用异步函数的时候，只有极小一部分会抛出错误；大部分情况下，
// 编译器会告诉你出错了