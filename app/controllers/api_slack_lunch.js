var express = require('express');
var api_slack_lunch_router = express.Router();

var request = require('request');

api_slack_lunch_router.post("/", function (req, res) {
    console.log(req.body)
    if (req.body.text == "lunch is here") {
        var options = {
            method: 'post',
            body: {'text': '<!channel> Lunch is here!'},
            json: true,
            url: "https://hooks.slack.com/services/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"
        };
        request(options, function (err, response, body) {
            if (err) res.sendStatus(500);
            console.log(response.body)
            res.json(response.body)
        })
    } else {
        res.status(500).send('Wrong command')
    }
});

module.exports = api_slack_lunch_router;