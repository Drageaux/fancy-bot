var express = require('express');
var api_slack_events_router = express.Router();


api_slack_events_router.post('/', function (req, res) {
    res.sendStatus(200);
    if (req.body.challenge) {
        res.json({
            "value": req.body.challenge
        })
    } else {
        res.sendStatus(500);
    }
});

module.exports = api_slack_events_router;