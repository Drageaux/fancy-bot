var express = require('express');
var api_slack_interactive_router = express.Router();


api_slack_interactive_router.post('/', function (req, res) {
    var payload = JSON.parse(req.body.payload);
    if (payload) {
        console.log(payload);
        var challenger = payload.actions[0].value;
        res.status(200).send({
            'text': "Dave challenged " + challenger + " to a Shaolin Showdown!"
        })
    } else {
        res.sendStatus(500);
    }
});

module.exports = api_slack_interactive_router;