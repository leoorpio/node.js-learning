var _class = require('./class');


exports.add = function(_classes) {
	_classes.forEach(function(item, index)) {
		var teacherName = item.teacherName;
		var students = item.students;
		_class.add(teacherName, students);	
	}
}
