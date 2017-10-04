var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
Reminder = require('./controllers/reminder');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('./public'));

mongoose.connect('mongodb://localhost/karliedb', {useMongoClient: true});

var db = mongoose.connection;

app.get('/', (req, res) => {
	Reminder.getReminders((err, reminders) => {
		if(err) {
			throw err;
		}
		res.render('todo', {reminders: reminders});
	})	
});
//更新联系人
app.put('/', (req, res) => {
	var name = req.body.name;
	var update = req.body;
	Reminder.updateReminder(name, update, {}, (err, reminder) => {
		if(err) {
			throw err;
		}
		res.json(reminder);
	});	
});

//添加联系人
app.post('/', (req, res) => {
	var reminder = req.body;
	Reminder.addReminder(reminder, (err, reminder) => {
		if(err) {
			throw err;
		}
		res.json(reminder);
	})
});
//删除联系人
app.delete('/', (req, res) => {
	var query = req.body;
	Reminder.deleteReminder(query, (err, reminder) => {
		if(err) {
			throw err;
		}
		res.json(reminder);
	});
});


app.listen(8080);
console.log('You are listening to port 8080');