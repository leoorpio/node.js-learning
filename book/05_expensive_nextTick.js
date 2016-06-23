function compute_intersection(arr1, arr2, callback) {
	// let's break up the bigger of the two arrays
	var bigger = arr1.length > arr2.length ? arr1 : arr2;
	var smaller = bigger.length == arr1.length ? arr2 : arr1;
	var biglen = bigger.length;
	var smlen = smaller.length;

	var sidx = 0; // starting idex of any chunk
	var size = 10; // 100 at a time, can adjust!
	var results = []; // intermediate results

	// for each chunk of "size" elements in bigger, search through smaller
	
	function sub_compute_intersection() {
		for(var i = sidx; i < (sidx + size) && i < biglen; i++) {
			for(var j = 0; j < smlen; j++) {
				if(bigger[i] == smaller[j]) {
					results.push(smaller[j]);
					break;
				}
			}
		}

		if(i >= biglen) {
			callback(null, results); // no errer, send back results
		} else {
			sidx += size;
			process.nextTick(sub_compute_intersection);
		}
	}

	sub_compute_intersection();
}

var a1 = [ 3476, 2457, 7547, 34523, 3, 6, 7,2, 77, 8, 2345,
           7623457, 2347, 23572457, 237457, 234869, 237,
           24572457524] ;
var a2 = [ 3476, 75347547, 2457634563, 56763472, 34574, 2347,
           7, 34652364 , 13461346, 572346, 23723457234, 237,
           234, 24352345, 537, 2345235, 2345675, 34534,
           7582768, 284835, 8553577, 2577257,545634, 457247247,
           2345 ];

compute_intersection(a1, a2, function (err, results) {
    if (err) {
        console.log(err);
    } else {
        console.log(results);
    }
});


// 利用全局对象process中的nextTick方法。这种方法好像在跟系统说“我放弃控制权，
// 你可以在空闲的时候执行我提供给你的函数”。相较于使用setTimeout函数，这种方
// 式会显著提高执行速度。
// 
// 在这个新版本中，只需简单地将较大的输入数组分割成10个元素一组的数据块（可以
// 是任意大小的数据块），分别计算交叉元素，然后调用process#nextTick函数，从而
// 允许Node处理其他事件或者请求。只有当该任务的队列面前没有事件时，才会继续执行
// 该任务。