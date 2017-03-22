var express = require('express');
var api_slack_events_router = express.Router();
var slack_web_api = require("./custom_slack_web_api");

api_slack_events_router.post('/', function (req, res) {
    console.log(req.body);

    // events API verification
    if (req.body.challenge) {
        res.json({
            "value": req.body.challenge
        })
    } else {
        res.sendStatus(500);
        return;
    }

    if (req.body.event && req.body.event.type == "reaction_added"){
        console.log("reaction_added")
        slack_web_api.reactions.get({
            channel: 'G0ZJLUQM8',
            timestamp: '1490197183.479945'
        }, function(err, response){
            console.log("Slack Web API response:", response);
        })
    }
});

module.exports = api_slack_events_router;