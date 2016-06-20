var student = require('./student');
var teacher = require('./teacher');

function add(teacherName, students) {
	teacher.add(teacherName);
	students.forEach(function(item, index) {
		student.add(item);
	});
}


/*
  把属性赋给exports.add 和 module.exports 是一样的
 */


exports.add = add;	// 如果希望模块成为一个传统的模块实例，使用这个

// module.exports = add;  // 模块成为一个特别的对象类型，使用这个