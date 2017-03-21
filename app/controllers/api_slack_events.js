var express = require('express');
var api_slack_events_router = express.Router();


api_slack_events_router.post('/', function (req, res) {
    if (req.query.challenge){
        res.json({
            "value": req.query.challenge
        })
    } else {
        res.sendStatus(500);
    }
});

module.exports = api_slack_events_router;