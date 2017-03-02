const express = require('express');
const moment = require('moment');

const app = express();

app.get('/', (req, res) => {
	res.send('Pass a natural or unix date as parameter.');
	// Make this a little prettier
	// run it on heroku
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

app.listen(3000, () => {
	console.log('listening on port 3000...');
});