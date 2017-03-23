var express = require('express');
var api_slack_events_router = express.Router();

var slack_api = require("./custom_slack_web_api")();
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/groot-gamify';
var storage = require('../../config/botkit_mongo_storage')({mongoUri: mongoUri});

api_slack_events_router.post('/', function (req, res) {
    // tally reactions added
    if (req.body.event && req.body.event.type == "reaction_added") {
        console.log("** EVENT TRIGGERED: reaction_added");
        var item = req.body.event.item;

        if (item && item.type == "message") {
            slack_api.reactions.get({
                channel: item.channel,
                timestamp: item.ts
            }, function (err, response) {
                console.log("** RESPONSE:\n------------\n", response, "\n------------");
                var emojis = response.message.reactions;
                var userId = response.message.user;
                var totalCount = 0;
                emojis.forEach(function (emoji) {
                    totalCount += emoji.count ? emoji.count : 0;
                });
                if (totalCount < 5) {
                    res.sendStatus(200)
                } else {
                    addPoints(userId, totalCount, res);
                }
            })
        } else if (item && item.type == "file") {
            slack_api.reactions.get({
                file: item.file
            }, function (err, response) {
                console.log("** RESPONSE:\n------------\n", response, "\n------------");
                var emojis = response.file.reactions;
                var userId = response.file.user;
                var totalCount = 0;
                emojis.forEach(function (emoji) {
                    totalCount += emoji.count ? emoji.count : 0;
                });
                if (totalCount < 5) {
                    res.sendStatus(200)
                } else {
                    addPoints(userId, totalCount, res);
                }
            })
        }
    } else {
        res.sendStatus(500);
        return;
    }
});

function addPoints(userId, points, res) {
    storage.users.get(userId, function (err, user) {
        if (err || !user) {
            user = {
                id: member,
                team_id: message.team,
                score: points
            }
        }
        controller.storage.users.save(user, function (err, savedUser) {
            if (err) console.log('err:', err);
            if (isNaN(savedUser.score) || !savedUser.score) {
                savedUser.score = points;
            } else {
                savedUser.score += points;
            }
            controller.storage.users.save(savedUser, function (err, finalUser) {
                console.log("User " + finalUser.id + " updated with score " + finalUser.score)
                res.json(finalUser);
            });
        });
    });
}


module.exports = api_slack_events_router;