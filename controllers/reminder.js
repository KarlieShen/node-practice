//Reminder
var mongoose = require('mongoose');
var moment = require('moment');
var i = 0;
//Reminder Schema
var reminderSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	urgency: {
		type: String,
	},
	type: {
		type: String,
	},
	deadline: {
		type: String,
	},
	create_time: {
		type: String,
		default: moment().format('L')
	}
});
var Reminder = module.exports = mongoose.model('Reminder', reminderSchema);

//Get Reminders
module.exports.getReminders = (callback, limit) => {
	Reminder.find(callback).limit(limit);
}
//Update Reminders
module.exports.updateReminder = (name, update, options, callback) => {
	var query = {name: name};
	Reminder.findOneAndUpdate(query, update, options, callback);;
}
//Add Reminder
module.exports.addReminder = (reminder, callback) => {
	Reminder.create(reminder, callback);
}
//Delete Reminders
module.exports.deleteReminder = (query, callback) => {
	Reminder.remove(query, callback);
}
