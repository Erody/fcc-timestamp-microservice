const express = require('express');
const moment = require('moment');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send("Pass either a unix timestamp or a natural language date (example: January 1, 2016) as parameter.");
});

app.get('/:time', (req, res) => {
	const timeString = req.params.time;
	const parsed = Date.parse(timeString);
	if(moment.unix(timeString).isValid()) {
		const unix = moment.unix(timeString).format('X');
		const natural = moment.unix(timeString).format('MMMM D, YYYY');
		const time = {
			unix,
			natural,
		};
		res.json(time);
	} else if(moment(parsed).isValid()) {
		const unix = moment(parsed).format('X');
		const natural = moment(parsed).format('MMMM D, YYYY');
		const time = {
			unix,
			natural,
		};
		res.json(time);
	} else {
		res.json({
			"unix": null,
			"natural": null,
		})
	}
});

// dev error handling
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});