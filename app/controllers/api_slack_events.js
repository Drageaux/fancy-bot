var express = require('express');
var api_slack_events_router = express.Router();
var custom_slack_web_api = require("./custom_slack_web_api");

// instantiate web API
var slack_api = custom_slack_web_api();

api_slack_events_router.post('/', function (req, res) {
    if (req.body.event && req.body.event.type == "reaction_added") {
        console.log("reaction_added");
        var item = req.body.event.item;

        if (item && item.type == "message") {
            slack_api.reactions.get({
                channel: item.channel,
                timestamp: item.ts
            }, function (err, response) {
                console.log("Slack Web API response:", response);
            })
        } else if (item && item.type == "file") {
            slack_api.reactions.get({
                file: item.file
            }, function (err, response) {
                console.log("Slack Web API response:", response);
            })
        }

    }

    // events API verification
    if (req.body.challenge) {
        res.json({
            "value": req.body.challenge
        })
    } else {
        res.sendStatus(500);
        return;
    }
});

module.exports = api_slack_events_router;