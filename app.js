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

app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});